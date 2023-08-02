"use client";

import CardLineChart from "@/components/PieChart";
import GroupedFindingsTable from "@/components/GroupedFindingsTable";
import CardWithTitle from "@/components/common/CardWithTitle";
import Container from "@/components/common/Container";
import { useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useGroupedFindings } from "@/lib/hooks/useGroupedFindings";
import { GroupedFindingsResult } from "@/lib/hooks/useGroupedFindings";

export default function Home() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useGroupedFindings();
  const [expandedRow, setExpandedRow] = useState<number | undefined>(undefined);

  const chartLabels = ["low", "medium", "high", "critical"];

  const { low, medium, high, critical }: Record<string, number> =
    data?.reduce(
      (
        acc: Record<string, number>,
        groupedFindingResult: GroupedFindingsResult
      ) => {
        acc[groupedFindingResult.severity] =
          (acc[groupedFindingResult.severity] || 0) + 1;
        return acc;
      },
      {}
    ) || {};

  const chartDatasets = [
    {
      label: "Findings by Severity",
      data: [low, medium, high, critical],
      backgroundColor: [
        "rgb(230, 230, 236)",
        "rgb(235, 214, 0)",
        "rgb(230, 154, 33)",
        "rgb(226, 116, 114)",
      ],
      hoverOffset: 4,
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center bg-gray-100 py-16">
        <div className="space-y-6">
          <Container>
            <CardWithTitle title="Grouped Findings By Severity">
              <div className="max-w-xl">
                <CardLineChart
                  labels={chartLabels}
                  datasets={chartDatasets}
                ></CardLineChart>
              </div>
            </CardWithTitle>
          </Container>
          <Container>
            <CardWithTitle title="Group Findings">
              <div className="border rounded-md">
                {data && data?.length > 0 && (
                  <GroupedFindingsTable
                    groupedFindingsResults={data}
                    expandedRow={expandedRow}
                    setExpandedRow={setExpandedRow}
                  />
                )}
              </div>
            </CardWithTitle>
          </Container>
        </div>
      </main>
    </QueryClientProvider>
  );
}
