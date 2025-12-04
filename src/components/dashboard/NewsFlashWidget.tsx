"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const NEWS = [
  {
    id: 1,
    tag: "MERCADO",
    title: "Ibovespa fecha em alta impulsionado por Vale e Petrobras",
    time: "10:30",
  },
  {
    id: 2,
    tag: "FIIS",
    title: "MXRF11 anuncia novos dividendos recordes para o mês",
    time: "09:15",
  },
  {
    id: 3,
    tag: "CRIPTO",
    title: "Bitcoin atinge nova máxima histórica em dólares",
    time: "08:00",
  },
];

export function NewsFlashWidget() {
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
          <span className="text-[10px] text-gray-400 font-mono">HOJE</span>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-4">
            {NEWS.map((item, i) => (
              <motion.div
                key={item.id}
                className="group cursor-pointer border-l-2 border-transparent hover:border-blue-500 pl-3 transition-all"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </div>
                <h4 className="text-sm font-medium text-gray-700 leading-snug group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  {item.title}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
