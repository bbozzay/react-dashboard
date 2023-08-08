"use client";

import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useGroupedFindingsStats } from "@/lib/hooks/useGroupedFindingsStats";

type DataSet = {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset: number;
};
export default function CardLineChart() {
  const { data } = useGroupedFindingsStats();

  const chartLabels = data?.map((item) => item.severity) || [];
  const chartData = data?.map((item) => item.count) || [];
  const chartColors =
    data?.map((item) => {
      switch (item.severity) {
        case "low":
          return "rgb(230, 230, 236)";
        case "medium":
          return "rgb(235, 214, 0)";
        case "high":
          return "rgb(230, 154, 33)";
        case "critical":
          return "rgb(226, 116, 114)";
        default:
          return "rgb(230, 230, 236)";
      }
    }) || [];

  const chartDatasets: DataSet[] = [
    {
      label: "Findings by Severity",
      data: chartData,
      backgroundColor: chartColors,
      hoverOffset: 4,
    },
  ];

  const pieData = {
    labels: chartLabels,
    datasets: chartDatasets,
  };
  return (
    <>
      <Pie data={pieData} />
    </>
  );
}
