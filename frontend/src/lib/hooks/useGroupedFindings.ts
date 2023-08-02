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

export function useGroupedFindings() {
  return useQuery<GroupedFindingsResult[], Error>({
    queryKey: ["grouped"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/v1/grouped-findings");
      return res.json();
    },
  });
}
