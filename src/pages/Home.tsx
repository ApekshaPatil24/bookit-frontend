// src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react";
import ExperienceCard from "../components/ExperienceCard";
import { fetchExperiences } from "../services/experienceService";
import type { Experience } from "../services/experienceService";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


type Props = { searchQuery?: string };

export default function Home({ searchQuery = "" }: Props) {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    let canceled = false;
    setLoading(true);
    fetchExperiences()
      .then((data) => {
        if (!canceled) {
          setItems(data);
          setError(null);
        }
      })
      .catch(() => {
        if (!canceled) setError("Unable to load experiences");
      })
      .finally(() => !canceled && setLoading(false));
    return () => {
      canceled = true;
    };
  }, []);

  // Filter experiences by search query
  const filtered = useMemo(() => {
    if (!searchQuery) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        (i.location || "").toLowerCase().includes(q) ||
        (i.shortDesc || "").toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 overflow-hidden">
      {/* Background decorative pattern */}
      <div className="absolute inset-0 bg-[url('/assets/bg-pattern.svg')] opacity-10"></div>

      {/* Main content */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="relative text-center mb-16">
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="flex items-center gap-3 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600">
                Discover Unique Experiences
              </span>

              <DotLottieReact
                src="https://lottie.host/add2e715-57ac-4271-b790-63ef59798616/thfLGopblX.lottie"
                loop
                autoplay
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
              />
            </h1>

            <p className="mt-4 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
              Explore immersive adventures, cultural escapes, and extraordinary
              moments designed to inspire your next journey.
            </p>
          </div>
          {/* Thin accent line */}
            <div className="mt-8 flex justify-center">
              <div className="h-[3px] w-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>
            </div>
        </section>

        {/* Loading / Error / Empty */}
        {loading && (
          <div className="text-center py-20 text-lg text-gray-500 animate-pulse">
            Loading experiences...
          </div>
        )}
        {error && <div className="text-center py-20 text-red-500">{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            No experiences found for “{searchQuery}”.
          </div>
        )}

        {/* Experience Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="transform hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 ease-out"
                >
                  <ExperienceCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[60px]"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.99,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-yellow-100"
          ></path>
        </svg>
      </div>
    </div>
  );
}


