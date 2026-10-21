
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category: string;
  author_name: string | null;
  status: "draft" | "published";
  content_type: "pdf" | "article";
  pdf_url: string | null;
  pdf_storage_path: string | null;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
};

type ArticleForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  author_name: string;
  content_type: "pdf" | "article";
  status: "draft" | "published";
};

const emptyForm: ArticleForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  category: "Biblical Teaching",
  author_name: "",
  content_type: "pdf",
  status: "draft",
};

const categories = [
  "Biblical Teaching",
  "Bible Study",
  "Devotional",
  "Christian Living",
  "Scripture Study",
  "Apologetics",
  "Prayer",
  "Other",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeFileName(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(-150);
}

export default function ArticleManager({
  userId,
}: {
  userId: string;
}) {
  const supabase = useMemo(() => createClient(), []);

  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setArticles([]);
    } else {
      setArticles((data ?? []) as Article[]);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void loadArticles();
  }, [loadArticles]);

  function startNewResource() {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedPdf(null);
    setError("");
    setNotice("");
  }

  function startEditing(article: Article) {
    setEditingId(article.id);

    setForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt ?? "",
      content: article.content ?? "",
      cover_image_url: article.cover_image_url ?? "",
      category: article.category,
      author_name: article.author_name ?? "",
      content_type: article.content_type ?? "pdf",
      status: article.status,
    });

    setSelectedPdf(null);
    setError("");
    setNotice("");

    document.getElementById("resource-editor")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const title = form.title.trim();
      const slug = slugify(form.slug || form.title);
      const excerpt = form.excerpt.trim() || null;
      const coverImage = form.cover_image_url.trim();

      if (!title || !slug) {
        throw new Error("Please enter a title.");
      }

      if (form.content_type === "article" && !form.content.trim()) {
        throw new Error("Please enter the full article content.");
      }

      if (
        coverImage &&
        !/^https?:\/\/\S+$/i.test(coverImage)
      ) {
        throw new Error("Please enter a valid HTTP or HTTPS cover image URL.");
      }

      if (selectedPdf) {
        if (!selectedPdf.name.toLowerCase().endsWith(".pdf")) {
          throw new Error("Please select a PDF file.");
        }

        if (
          selectedPdf.type &&
          selectedPdf.type !== "application/pdf"
        ) {
          throw new Error("The selected file must be a PDF.");
        }

        if (selectedPdf.size > 25 * 1024 * 1024) {
          throw new Error("The PDF must be 25 MB or smaller.");
        }
      }

      if (
        form.content_type === "pdf" &&
        !selectedPdf &&
        !editingId
      ) {
        throw new Error("Please select a PDF to upload.");
      }

      const existing = editingId
        ? articles.find((item) => item.id === editingId)
        : undefined;

      if (
        form.content_type === "pdf" &&
        !selectedPdf &&
        editingId &&
        !existing?.pdf_storage_path
      ) {
        throw new Error("Please select a PDF file for this resource.");
      }

      const now = new Date().toISOString();

      const baseData = {
        title,
        slug,
        excerpt,
        content: form.content.trim(),
        cover_image_url: coverImage || null,
        category: form.category,
        author_name: form.author_name.trim() || null,
        content_type: form.content_type,
        status: "draft" as const,
        is_featured: form.status === "draft" ? false : (existing?.is_featured ?? false),
        updated_at: now,
      };

      let resourceId = editingId;
      let createdNew = false;

      // Start with a draft so the resource is not public
      // before its PDF has uploaded successfully.
      if (!resourceId) {
        const { data, error: insertError } = await supabase
          .from("articles")
          .insert({
            ...baseData,
            author_id: userId,
            pdf_url: null,
            pdf_storage_path: null,
            is_featured: false,
            published_at: null,
          })
          .select("id")
          .single();

        if (insertError) {
          throw new Error(
            insertError.code === "23505"
              ? "That URL slug is already in use. Choose a different title or slug."
              : insertError.message
          );
        }

        resourceId = data.id;
        createdNew = true;
      }

      let newStoragePath = existing?.pdf_storage_path ?? null;
      let uploadedPath: string | null = null;

      if (selectedPdf && resourceId) {
        const filename = `${Date.now()}-${safeFileName(selectedPdf.name)}`;
        uploadedPath = `articles/${resourceId}/${filename}`;

        const { error: uploadError } = await supabase.storage
          .from("cabl-pdfs")
          .upload(uploadedPath, selectedPdf, {
            contentType: "application/pdf",
            upsert: false,
          });

        if (uploadError) {
          if (createdNew) {
            await supabase.from("articles").delete().eq("id", resourceId);
          }

          throw new Error(`PDF upload failed: ${uploadError.message}`);
        }

        newStoragePath = uploadedPath;
      }

      const finalData = {
        ...baseData,
        status: form.status,
        pdf_url: null,
        pdf_storage_path:
          form.content_type === "pdf" ? newStoragePath : null,
        published_at:
          form.status === "published"
            ? existing?.published_at ?? now
            : null,
        is_featured:
          form.status === "published"
            ? (existing?.is_featured ?? false)
            : false,
      };

      const { error: updateError } = await supabase
        .from("articles")
        .update(finalData)
        .eq("id", resourceId!);

      if (updateError) {
        if (uploadedPath) {
          await supabase.storage.from("cabl-pdfs").remove([uploadedPath]);
        }

        if (createdNew) {
          await supabase.from("articles").delete().eq("id", resourceId!);
        }

        throw new Error(
          updateError.code === "23505"
            ? "That URL slug is already in use. Choose a different title or slug."
            : updateError.message
        );
      }

      // Remove an old PDF only after the database points to the new file.
      if (
        existing?.pdf_storage_path &&
        existing.pdf_storage_path !== newStoragePath &&
        form.content_type === "pdf"
      ) {
        const { error: removeError } = await supabase.storage
          .from("cabl-pdfs")
          .remove([existing.pdf_storage_path]);

        if (removeError) {
          setNotice(
            "Resource saved, but the previous PDF could not be removed. Please check Storage."
          );
        }
      }

      if (
        existing?.pdf_storage_path &&
        form.content_type === "article"
      ) {
        const { error: removeError } = await supabase.storage
          .from("cabl-pdfs")
          .remove([existing.pdf_storage_path]);

        if (removeError) {
          setNotice(
            "Resource saved, but its old PDF could not be removed from Storage."
          );
        }
      }

      if (!notice) {
        setNotice(
          form.status === "published"
            ? "Resource published successfully."
            : "Draft saved successfully."
        );
      }

      setForm(emptyForm);
      setSelectedPdf(null);
      setEditingId(null);
      await loadArticles();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  async function featureResource(article: Article) {
    if (article.status !== "published") {
      setError("Publish this resource before featuring it.");
      return;
    }

    setBusyId(article.id);
    setError("");
    setNotice("");

    if (article.is_featured) {
      setNotice("This resource is already featured.");
      setBusyId(null);
      return;
    }

    const { error: clearError } = await supabase
      .from("articles")
      .update({ is_featured: false })
      .eq("is_featured", true);

    if (clearError) {
      setError(clearError.message);
      setBusyId(null);
      return;
    }

    const { error: featureError } = await supabase
      .from("articles")
      .update({ is_featured: true })
      .eq("id", article.id)
      .eq("status", "published");

    if (featureError) {
      setError(featureError.message);
    } else {
      setNotice(`"${article.title}" is now featured.`);
    }

    setBusyId(null);
    await loadArticles();
  }

  async function deleteResource(article: Article) {
    const confirmed = window.confirm(
      `Permanently delete "${article.title}" and its uploaded PDF? This cannot be undone.`
    );

    if (!confirmed) return;

    setBusyId(article.id);
    setError("");
    setNotice("");

    // Remove the stored PDF first. If this fails, preserve the database row.
    if (article.pdf_storage_path) {
      const { error: storageError } = await supabase.storage
        .from("cabl-pdfs")
        .remove([article.pdf_storage_path]);

      if (storageError) {
        setError(
          `Could not delete the PDF file: ${storageError.message}. The resource was not deleted.`
        );
        setBusyId(null);
        return;
      }
    }

    const { error: deleteError } = await supabase
      .from("articles")
      .delete()
      .eq("id", article.id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setNotice("Resource deleted.");
      if (editingId === article.id) startNewResource();
    }

    setBusyId(null);
    await loadArticles();
  }

  const visibleArticles = articles.filter((article) => {
    const query = search.trim().toLowerCase();

    return (
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      (article.excerpt ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8">
      <section
        id="resource-editor"
        className="scroll-mt-6 rounded-xl border border-[#E8E1D3] bg-[#FDFCF8] p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#294638]">
            {editingId ? "Edit Resource" : "Add a Resource"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload an existing PDF or publish a written article. Save a draft
            if it is not ready for visitors.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {notice && (
          <p
            role="status"
            className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
          >
            {notice}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Resource Type *">
              <select
                required
                value={form.content_type}
                onChange={(e) => {
                  setForm((current) => ({
                    ...current,
                    content_type: e.target.value as "pdf" | "article",
                  }));
                  setSelectedPdf(null);
                }}
                className={inputClass}
              >
                <option value="pdf">PDF Resource</option>
                <option value="article">Written Article</option>
              </select>
            </Field>

            <Field label="Publication Status *">
              <select
                required
                value={form.status}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    status: e.target.value as "draft" | "published",
                  }))
                }
                className={inputClass}
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Now</option>
              </select>
            </Field>

            <Field label="Title *">
              <input
                required
                maxLength={200}
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((current) => ({
                    ...current,
                    title,
                    slug: editingId ? current.slug : slugify(title),
                  }));
                }}
                placeholder="e.g. A Guide to Personal Bible Study"
                className={inputClass}
              />
            </Field>

            <Field label="URL Slug *">
              <input
                required
                maxLength={200}
                value={form.slug}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    slug: slugify(e.target.value),
                  }))
                }
                placeholder="personal-bible-study"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-gray-500">
                Resource address: /resources/{form.slug || "your-resource"}
              </p>
            </Field>

            <Field label="Category *">
              <select
                required
                value={form.category}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    category: e.target.value,
                  }))
                }
                className={inputClass}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </Field>

            <Field label="Author Name">
              <input
                maxLength={150}
                value={form.author_name}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    author_name: e.target.value,
                  }))
                }
                placeholder="e.g. CABL Editorial Team"
                className={inputClass}
              />
            </Field>
          </div>

          {form.content_type === "pdf" && (
            <Field label={editingId ? "Replace PDF (optional)" : "PDF File *"}>
              <input
                type="file"
                accept="application/pdf,.pdf"
                required={!editingId}
                onChange={(e) =>
                  setSelectedPdf(e.target.files?.[0] ?? null)
                }
                className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-[#EAF1EC] file:px-3 file:py-2 file:font-semibold file:text-[#00552F]`}
              />
              <p className="mt-1 text-xs text-gray-500">
                PDF only, maximum 25 MB. Images inside the PDF are preserved.
                {editingId ? " Leave empty to keep the existing PDF." : ""}
              </p>
            </Field>
          )}

          <Field label="Short Description">
            <textarea
              rows={3}
              maxLength={500}
              value={form.excerpt}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  excerpt: e.target.value,
                }))
              }
              placeholder="Briefly describe what readers will learn..."
              className={inputClass}
            />
            <p className="mt-1 text-xs text-gray-500">
              Up to 500 characters.
            </p>
          </Field>

          {form.content_type === "article" && (
            <Field label="Full Article Content *">
              <textarea
                required
                rows={12}
                maxLength={100000}
                value={form.content}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    content: e.target.value,
                  }))
                }
                placeholder="Write the full article here. Separate paragraphs with blank lines."
                className={inputClass}
              />
            </Field>
          )}

          <Field label="Cover Image URL (optional)">
            <input
              type="url"
              value={form.cover_image_url}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  cover_image_url: e.target.value,
                }))
              }
              placeholder="https://example.com/cover.jpg"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-gray-500">
              This is a separate thumbnail image. Images already inside your
              PDF do not need to be uploaded again.
            </p>
          </Field>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#00552F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004323] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : form.status === "draft"
                  ? "Save Draft"
                  : editingId
                    ? "Update and Publish"
                    : "Publish Resource"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={startNewResource}
                className="rounded-lg border border-[#E8E1D3] px-5 py-3 text-sm font-semibold text-[#294638] hover:bg-[#F5F0E4]"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-[#E8E1D3] bg-[#FDFCF8] p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-[#294638]">
              Manage Resources
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {articles.length} {articles.length === 1 ? "resource" : "resources"} in total
            </p>
          </div>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            aria-label="Search resources"
            className={`${inputClass} sm:max-w-xs`}
          />
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-gray-500">
            Loading resources...
          </p>
        ) : visibleArticles.length === 0 ? (
          <div className="rounded-lg bg-[#F5F0E4] px-5 py-10 text-center">
            <h3 className="font-semibold text-[#294638]">
              {search ? "No matching resources" : "No resources yet"}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {search
                ? "Try another search term."
                : "Upload your first PDF using the form above."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleArticles.map((article) => (
              <article
                key={article.id}
                className="rounded-lg border border-[#E8E1D3] p-4 sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#EAF1EC] px-3 py-1 text-xs font-medium text-[#00552F]">
                        {article.category}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          article.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {article.status === "published" ? "Published" : "Draft"}
                      </span>

                      <span className="rounded-full bg-[#F5F0E4] px-3 py-1 text-xs text-[#294638]">
                        {article.content_type === "pdf" ? "PDF" : "Article"}
                      </span>

                      {article.is_featured && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-[#294638]">
                      {article.title}
                    </h3>

                    <p className="mt-1 break-all text-xs text-gray-500">
                      /resources/{article.slug}
                    </p>

                    {article.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                        {article.excerpt}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-gray-400">
                      {article.author_name || "CABL"} · Created{" "}
                      {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <button
                      type="button"
                      disabled={
                        busyId === article.id ||
                        article.is_featured ||
                        article.status !== "published"
                      }
                      onClick={() => void featureResource(article)}
                      className="rounded-lg border border-[#D7E4DA] px-3 py-2 text-xs font-semibold text-[#00552F] hover:bg-[#EAF1EC] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {article.is_featured ? "Featured" : "Feature"}
                    </button>

                    <button
                      type="button"
                      onClick={() => startEditing(article)}
                      className="rounded-lg border border-[#E8E1D3] px-3 py-2 text-xs font-semibold text-[#294638] hover:bg-[#F5F0E4]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={busyId === article.id}
                      onClick={() => void deleteResource(article)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#DCD5C7] bg-white px-3 py-3 text-sm text-[#294638] outline-none transition placeholder:text-gray-400 focus:border-[#00552F] focus:ring-2 focus:ring-[#00552F]/10";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#294638]">
        {label}
      </label>
      {children}
    </div>
  );
}
