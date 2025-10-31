import { Link } from "react-router-dom";
import type { Experience } from "../services/experienceService";

type Props = {
  item: Experience;
};

export default function ExperienceCard({ item }: Props) {
  return (
    <div className="group relative cursor-default bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 ease-out w-full">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={item.coverImage || "/assets/placeholder.jpg"}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Location Tag */}
        {item.location && (
          <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-800 text-[11px] font-medium px-2.5 py-1 rounded-md shadow-sm border border-gray-200">
             {item.location}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col justify-between h-[160px]">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-yellow-600 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
            {item.shortDesc || "Unforgettable experiences curated for you."}
          </p>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="text-xs text-gray-400 uppercase">From</span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{item.basePrice}
            </span>
          </div>

          <Link
            to={`/experience/${item.id}`}
            className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-200 text-gray-900 text-sm font-semibold rounded-md shadow hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
