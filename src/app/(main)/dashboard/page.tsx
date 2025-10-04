"use client";

import React from "react";
import { DashboardWithPieChart } from "@/components/DashboardComponents";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardWithPieChart />
    </div>
  );
}
