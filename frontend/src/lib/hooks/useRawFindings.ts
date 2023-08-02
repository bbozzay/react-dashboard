import { useQuery } from "@tanstack/react-query";

export type RawFindingsResult = {
  id: number;
  source_security_tool_name: string;
  source_security_tool_id: string;
  source_collaboration_tool_name: string;
  source_collaboration_tool_id: string;
  severity: string;
  finding_created: string;
  ticket_created: string;
  description: string;
  asset: string;
  status: string;
  remediation_url: string;
  remediation_text: string;
  group_finding_id: number;
};
export type RawFindingsParams = {
  grouped_finding_id: number;
};

export const getRawFinding = async (
  params: RawFindingsParams
): Promise<RawFindingsResult> => {
  const { grouped_finding_id } = params;
  const res = await fetch(
    `http://localhost:8000/api/v1/raw-findings/${grouped_finding_id}`
  );
  const data = await res.json();
  return data;
};

export function useRawFindings(id: number) {
  return useQuery<RawFindingsResult, Error>({
    queryKey: ["raw_findings"],
    queryFn: () => getRawFinding({ grouped_finding_id: id }),
    enabled: !!id,
  });
}
