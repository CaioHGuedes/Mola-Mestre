"use client";

import { motion } from "framer-motion";
import { Clock, Tag, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsItem } from "@/types/news";

interface FeaturedNewsProps {
  news: NewsItem;
  onClick: (news: NewsItem) => void;
}

export function FeaturedNews({ news, onClick }: FeaturedNewsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onClick(news)}
    >
      <Card className="border-none shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer group bg-white relative">
        <div className="flex flex-col md:flex-row min-h-[320px]">
          <div className="w-full md:w-5/12 bg-gradient-to-br from-[#014635] to-[#026e57] p-8 flex flex-col justify-end relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />

            <div className="absolute top-6 left-6 flex gap-2">
              <Badge className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-none">
                PRINCIPAL
              </Badge>
              {news.sentiment === "positive" && (
                <Badge className="bg-emerald-500/80 text-white border-none flex gap-1">
                  <TrendingUp className="w-3 h-3" /> OTIMISTA
                </Badge>
              )}
            </div>

            <div className="relative z-10 mt-auto">
              <Tag className="w-8 h-8 text-white/20 mb-4" />
              <h2 className="text-3xl font-bold text-white leading-tight mb-2">
                {news.title}
              </h2>
            </div>
          </div>

          <div className="w-full md:w-7/12 p-8 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
              <span className="bg-emerald-50 text-[#014635] px-2 py-1 rounded font-bold border border-emerald-100">
                {news.tag}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {news.readTime} leitura
              </span>
              <span>{news.time}</span>
            </div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {news.excerpt}
            </p>

            <div className="mt-auto">
              <Button className="bg-[#014635] hover:bg-[#013528] text-white px-6">
                Ler Análise Completa
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
