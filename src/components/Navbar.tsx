import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

type Props = { onSearch?: (q: string) => void };

export default function Navbar({ onSearch }: Props) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex flex-wrap items-center justify-between h-auto px-4 sm:px-6 lg:px-10 py-3 gap-4">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group transition-all duration-300"
        >
          <div className="w-10 h-10 bg-yellow-400 group-hover:bg-yellow-500 rounded-lg flex items-center justify-center font-bold text-black shadow-md transition">
            BI
          </div>
          <span className="font-semibold text-lg sm:text-xl text-slate-800 tracking-tight">
            Book<span className="text-yellow-500">It</span>
          </span>
        </Link>

        {/* Center: Search bar only on Home page */}
        {isHomePage && (
          <div className="flex-1 max-w-md mx-auto w-full">
            <SearchBar onSearch={onSearch} />
          </div>
        )}

        {/* Right Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          {!isHomePage && (
            <Link
              to="/"
              className="hover:text-yellow-500 transition-colors duration-200"
            >
              Home
            </Link>
          )}

          {/*  Changed About to React Router link */}
          <Link
            to="/about"
            className="hover:text-yellow-500 transition-colors duration-200"
          >
            About
          </Link>

          <Link
            to="/bookings"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded-md shadow-sm transition"
          >
            My Bookings
          </Link>
        </nav>
      </div>
    </header>
  );
}
