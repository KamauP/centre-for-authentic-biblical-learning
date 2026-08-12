import {
  FaCross,
  FaPeopleGroup,
  FaCrown,
  FaHandsPraying,
  FaShieldHeart,
  FaLeaf,
  FaBookBible,
  FaScroll,
  FaHeart,
} from "react-icons/fa6";

const themes = [
  { name: "Faith", icon: FaCross },
  { name: "Discipleship", icon: FaPeopleGroup },
  { name: "Leadership", icon: FaCrown },
  { name: "Prayer", icon: FaHandsPraying },
  { name: "The Kingdom of God", icon: FaShieldHeart },
  { name: "Creation", icon: FaLeaf },
  { name: "Parables", icon: FaBookBible },
  { name: "Old Testament", icon: FaScroll },
  { name: "New Testament", icon: FaScroll },
  { name: "Christian Living", icon: FaHeart },
];

export default function BrowseByTheme() {
  return (
    <section className="bg-[#F5F0E4] py-5">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-4 text-center">
          <h2 className="font-serif text-lg font-bold text-[#294638]">
            Browse by Theme
          </h2>
        </div>

        {/* Themes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10">
          {themes.map((theme) => {
            const Icon = theme.icon;

            return (
              <button
                key={theme.name}
                type="button"
                className="group flex min-h-[105px] flex-col items-center justify-center border border-[#E4DDCF] bg-[#FDFCF8] px-2 text-center transition hover:bg-[#EAF1EC]"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#00552F] text-white transition group-hover:bg-[#C58B12]">
                  <Icon className="text-sm" />
                </div>

                <span className="text-[10px] font-semibold leading-4 text-[#294638]">
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}