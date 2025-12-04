"use client";

import React from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { InfiniteStockTicker } from "@/components/dashboard/InfiniteStockTicker";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full border-b border-gray-200 bg-white">
        <InfiniteStockTicker />
      </div>

      <div className="w-full p-6 space-y-6">
        <DashboardOverview />
      </div>
    </div>
  );
}
