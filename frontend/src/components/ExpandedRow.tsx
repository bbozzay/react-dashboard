import { GroupedFindingsResult } from "@/lib/hooks/useGroupedFindings";
import { RawFindingsResult, useRawFindings } from "@/lib/hooks/useRawFindings";
import clsx from "clsx";
import { TimeWithTooltip } from "./TimeWithTooltip";

type ExpandedRowProps = {
  groupedFindingId: GroupedFindingsResult["id"];
};
export const ExpandedRow = (props: ExpandedRowProps) => {
  const { groupedFindingId } = props;
  const { status, data, error, isError, isLoading } =
    useRawFindings(groupedFindingId);

  const expandedTableData = (rawFinding: RawFindingsResult) => {
    return {
      severity: rawFinding.severity,
      security_tool_name: rawFinding.source_security_tool_name,
      source_collaboration_tool_name: rawFinding.source_collaboration_tool_name,
      finding_created: (
        <TimeWithTooltip isoTimeStamp={rawFinding.finding_created} />
      ),
      ticket_created: (
        <TimeWithTooltip isoTimeStamp={rawFinding.ticket_created} />
      ),
      description: rawFinding.description,
      asset: rawFinding.asset,
      status: rawFinding.status,
      remediation: (
        <a href={rawFinding.remediation_url}>{rawFinding.remediation_text}</a>
      ),
    };
  };
  const expandedRowData = data ? expandedTableData(data) : undefined;
  const headings = [
    { name: "Severity" },
    { name: "Security Tool" },
    { name: "Collaboration Tool" },
    { name: "Created" },
    { name: "Description" },
    { name: "Asset" },
    { name: "Status" },
    { name: "Remediation" },
  ];

  const getCellContent = (index: number) => {
    if (!expandedRowData) return "";
    const keys = Object.keys(expandedRowData) as Array<
      keyof typeof expandedRowData
    >;
    const targetKeyName = keys[index];
    return expandedRowData[targetKeyName];
  };

  return (
    <tr>
      {!expandedRowData || status === "loading" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <td colSpan={10} className="py-8 px-4 bg-gray-50">
          <div className="pb-2">
            <h5 className="font-bold">Raw Finding</h5>
          </div>
          <table className={clsx({ "animate-pulse": isLoading }, "border")}>
            <thead>
              <tr className="table-row"></tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-xs">
              {headings.map((heading, index) => (
                <tr key={heading.name}>
                  <td
                    scope="col"
                    className="whitespace-nowrap font-semibold py-2 px-2"
                  >
                    <div>{heading.name}</div>
                  </td>

                  <td scope="col" className="whitespace-wrap py-2 px-2">
                    <div>{getCellContent(index)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      )}
    </tr>
  );
};
