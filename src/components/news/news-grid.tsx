"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NewsItem } from "@/data/news-data";

interface NewsGridProps {
  newsList: NewsItem[];
  onNewsClick: (news: NewsItem) => void;
  showTitle?: boolean;
}

const SentimentIcon = ({ type }: { type: string }) => {
  if (type === "positive")
    return <TrendingUp className="w-4 h-4 text-emerald-500" />;
  if (type === "negative")
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
};

export function NewsGrid({
  newsList,
  onNewsClick,
  showTitle = true,
}: NewsGridProps) {
  if (newsList.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
        <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Nenhum resultado</h3>
        <p className="text-gray-500">Tente ajustar seus filtros.</p>
      </div>
    );
  }

  return (
    <div>
      {showTitle && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Notícias Recentes
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">
            {newsList.length}
          </span>
        </h3>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsList.map((news, i) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => onNewsClick(news)}
          >
            <Card className="h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-gray-200 cursor-pointer group hover:border-[#014635]/30 bg-white">
              <CardHeader className="pt-5 pb-2">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-[#014635] bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                    {news.tag}
                  </span>
                  <div
                    className="flex items-center gap-2"
                    title={`Sentimento: ${news.sentiment}`}
                  >
                    <SentimentIcon type={news.sentiment} />
                    <span className="text-xs text-gray-400">{news.time}</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-gray-800 leading-snug group-hover:text-[#014635] transition-colors">
                  {news.title}
                </h4>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {news.excerpt}
                </p>
              </CardContent>
              <CardFooter className="pb-5 border-t border-gray-50 mt-auto pt-4">
                <div className="flex items-center justify-between w-full text-xs text-gray-500">
                  <span>{news.readTime} leitura</span>
                  <span className="font-medium text-[#014635] group-hover:underline flex items-center gap-1">
                    Ler mais{" "}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
