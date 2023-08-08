"use client";

import CardLineChart from "@/components/PieChart";
import GroupedFindingsTable from "@/components/GroupedFindingsTable";
import CardWithTitle from "@/components/common/CardWithTitle";
import Container from "@/components/common/Container";
import { useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useGroupedFindings } from "@/lib/hooks/useGroupedFindings";

export default function Home() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useGroupedFindings();
  const [expandedRow, setExpandedRow] = useState<number | undefined>(undefined);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center bg-gray-100 py-16">
        <div className="space-y-6">
          <Container>
            <CardWithTitle title="Grouped Findings By Severity">
              <div className="max-w-xl">
                <CardLineChart></CardLineChart>
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
