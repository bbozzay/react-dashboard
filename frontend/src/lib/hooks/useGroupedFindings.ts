import { useQuery } from "@tanstack/react-query";

export type GroupedFindingsResult = {
  id: number;
  grouping_type: string;
  grouping_key: string;
  severity: string;
  grouped_finding_created: string;
  sla: string;
  description: string;
  security_analyst: string;
  owner: string;
  workflow: string;
  status: "in_progress" | "open" | "closed";
  progress: number;
};

type UseGroupedFindingsParams = {
  limit?: number;
  skip?: number;
};
export function useGroupedFindings(params: UseGroupedFindingsParams = {}) {
  const { limit = 25, skip = 0 } = params;
  const query = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });
  return useQuery<GroupedFindingsResult[], Error>({
    queryKey: ["grouped", skip],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/api/v1/grouped-findings?${query.toString()}`
      );
      return res.json();
    },
    keepPreviousData: true,
  });
}
