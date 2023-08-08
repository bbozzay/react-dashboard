"use client";

import CardLineChart from "@/components/PieChart";
import GroupedFindingsTable from "@/components/GroupedFindingsTable";
import CardWithTitle from "@/components/common/CardWithTitle";
import Container from "@/components/common/Container";
import { useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import {
  GroupedFindingsResult,
  useGroupedFindings,
} from "@/lib/hooks/useGroupedFindings";
import { Pagination } from "@/components/Pagination";

const getSkeletonData = (limit: number): GroupedFindingsResult[] =>
  Array.from({
    length: limit,
  }).map((_, index) => ({
    id: index,
    grouping_type: "",
    grouping_key: "",
    severity: "",
    grouped_finding_created: "",
    sla: "",
    description: "",
    security_analyst: "",
    owner: "",
    workflow: "",
    status: "in_progress",
    progress: index,
  }));

export default function Home() {
  const queryClient = useQueryClient();
  const limit = 25;
  const [skip, setSkip] = useState(0);
  const [expandedRow, setExpandedRow] = useState<number | undefined>(undefined);

  const {
    data = [],
    error,
    isLoading,
  } = useGroupedFindings({
    skip: skip,
    limit: limit,
  });
  const estimateSkeletons = getSkeletonData(limit);

  const handlePageChange = (previous: boolean) => {
    setExpandedRow(undefined);
    if (previous) {
      setSkip((oldSkip) => oldSkip - limit);
      return;
    }
    setSkip((oldSkip) => oldSkip + limit);
  };

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
                <GroupedFindingsTable
                  loading={isLoading}
                  groupedFindingsResults={isLoading ? estimateSkeletons : data}
                  expandedRow={expandedRow}
                  setExpandedRow={setExpandedRow}
                />
                <Pagination
                  showNext={data && data?.length === limit}
                  showPrevious={skip > 0}
                  onPrevious={() => handlePageChange(true)}
                  onNext={() => handlePageChange(false)}
                />
              </div>
            </CardWithTitle>
          </Container>
        </div>
      </main>
    </QueryClientProvider>
  );
}
