import { createClient } from "@/utils/supabase/server";

export default async function TestSupabase() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("test")
    .select("*");

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">
        Supabase Connection Test
      </h1>

      {error ? (
        <p className="mt-4 text-red-600">
          Error: {error.message}
        </p>
      ) : (
        <div className="mt-4">
          <p className="text-green-600">
            Successfully connected to Supabase!
          </p>

          <pre className="mt-4">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}