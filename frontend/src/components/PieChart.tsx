"use client";

import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

type DataSet = {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset: number;
};
type CardLineChartProps = {
  labels: string[];
  datasets: DataSet[];
};
export default function CardLineChart(props: CardLineChartProps) {
  const { labels, datasets } = props;
  const data = {
    labels: labels,
    datasets: datasets,
  };
  return (
    <>
      <Pie data={data} />
    </>
  );
}
