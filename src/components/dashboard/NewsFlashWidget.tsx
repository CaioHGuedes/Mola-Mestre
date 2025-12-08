"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ALL_NEWS, NewsItem } from "@/data/news-data";

export function NewsFlashWidget() {
  const router = useRouter();
  const [randomNews, setRandomNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const shuffled = [...ALL_NEWS].sort(() => 0.5 - Math.random());
    setRandomNews(shuffled.slice(0, 3));
  }, []);

  const handleNavigate = () => {
    router.push("/news");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="h-full"
    >
      <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Flash News
          </CardTitle>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
            className="text-[10px] text-gray-400 font-mono hover:text-[#014635] hover:underline cursor-pointer transition-colors"
          >
            VER TODAS
          </button>
        </CardHeader>

        <CardContent className="px-5 pb-5">
          <div className="space-y-4">
            {randomNews.length === 0 ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-gray-100 rounded" />
                ))}
              </div>
            ) : (
              randomNews.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="group cursor-pointer border-l-2 border-transparent hover:border-[#014635] pl-3 transition-all"
                  onClick={handleNavigate}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded group-hover:bg-emerald-50 group-hover:text-[#014635] transition-colors">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {item.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 leading-snug group-hover:text-[#014635] transition-colors flex items-center gap-1">
                    {item.title}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
