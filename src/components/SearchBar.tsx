// src/components/SearchBar.tsx
import { useState } from "react";

type Props = { onSearch?: (query: string) => void };

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2 items-center bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-yellow-300"
    >
      <input
        type="text"
        placeholder="Search experiences..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch?.(e.target.value);
        }}
        className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none"
      />
      
      <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm px-4 py-1.5 rounded-full transition-all duration-300"
        >
          Go
        </button>
    </form>
  );
}
