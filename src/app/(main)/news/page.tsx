"use client";

import React, { useState, useMemo } from "react";
import { ALL_NEWS, NewsItem } from "@/data/news-data";
import { NewsHeader } from "@/components/news/news-header";
import { FeaturedNews } from "@/components/news/featured-news";
import { NewsGrid } from "@/components/news/news-grid";
import { NewsModal } from "@/components/news/news-modal";

const CATEGORIES = ["TODAS", "MERCADO", "FIIS", "CRIPTO", "MACRO", "AÇÕES"];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODAS");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return ALL_NEWS.filter((news) => {
      const matchesSearch =
        news.title.toLowerCase().includes(query) ||
        news.tag.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "TODAS" || news.tag === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const isSearchingOrFiltering =
    searchQuery.length > 0 || selectedCategory !== "TODAS";

  const featuredNews = isSearchingOrFiltering ? null : filteredNews[0];
  const regularNews = isSearchingOrFiltering
    ? filteredNews
    : filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <div className="w-full p-6 space-y-8 mx-auto">
        <NewsHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={CATEGORIES}
        />

        <div className="space-y-8">
          {featuredNews && (
            <FeaturedNews news={featuredNews} onClick={setSelectedNews} />
          )}

          <NewsGrid
            newsList={regularNews}
            onNewsClick={setSelectedNews}
            showTitle={!featuredNews && filteredNews.length > 0}
          />
        </div>
      </div>

      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  );
}
