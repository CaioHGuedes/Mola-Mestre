"use client";

import { Search, Newspaper } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewsHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
}

export function NewsHeader({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: NewsHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="w-8 h-8 text-[#014635]" />
            Inteligência de Mercado
          </h1>
          <p className="text-gray-500 mt-1">
            Análises, tendências e fatos relevantes para sua carteira.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar notícias..."
            className="pl-10 bg-white border-gray-200 focus-visible:ring-[#014635]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-4 py-1.5 rounded-full cursor-pointer text-xs font-bold transition-all border
              ${
                selectedCategory === cat
                  ? "bg-[#014635] text-white border-[#014635] shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#014635]/50 hover:bg-emerald-50"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
