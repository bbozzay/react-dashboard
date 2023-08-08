import { useQuery } from "@tanstack/react-query";

export type GroupedFindingsStatsResult = {
  severity: string;
  count: number;
};

export function useGroupedFindingsStats() {
  return useQuery<GroupedFindingsStatsResult[], Error>({
    queryKey: ["grouped-severity-stats"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:8000/api/v1/grouped-findings/severity-stats"
      );
      return res.json();
    },
  });
}
