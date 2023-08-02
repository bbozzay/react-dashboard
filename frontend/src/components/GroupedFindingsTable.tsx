"use client";

import clsx from "clsx";
import { Dispatch, Fragment, SetStateAction } from "react";
import { ExpandedRow } from "./ExpandedRow";
import { GroupedFindingsResult } from "@/lib/hooks/useGroupedFindings";
import { TimeWithTooltip } from "./TimeWithTooltip";

const Severity = ({ level }: { level: string }) => (
  <span
    className={clsx(
      {
        "bg-gray-200": level === "low",
        "bg-yellow-400": level === "medium",
        "bg-orange-400": level === "high",
        "bg-red-400": level === "critical",
      },
      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
    )}
  >
    {level}
  </span>
);
type Props = {
  groupedFindingsResults: GroupedFindingsResult[];
  // const [expandedRow, setExpandedRow] = useState<number | undefined>(undefined);
  expandedRow?: number;
  setExpandedRow: Dispatch<SetStateAction<number | undefined>>;
};
export default function GroupedFindingsTable(props: Props) {
  const { groupedFindingsResults, expandedRow, setExpandedRow } = props;

  const isAnyRowExpanded = typeof expandedRow !== "undefined";

  const isRowExpanded = (index: number) =>
    isAnyRowExpanded && expandedRow === index;

  const tableContent =
    groupedFindingsResults?.map((groupedFindingResult) => {
      return {
        severity: <Severity level={groupedFindingResult.severity} />,
        // convert timestamp like 2022-03-05 15:25:23.341094 to local time like 3/5/23
        created: (
          <TimeWithTooltip
            isoTimeStamp={groupedFindingResult.grouped_finding_created}
          />
        ),
        sla: <TimeWithTooltip isoTimeStamp={groupedFindingResult.sla} />,
        description: (
          <div
            className="truncate max-w-xs"
            title={groupedFindingResult.description}
          >
            {groupedFindingResult.description}
          </div>
        ),
        security_analyst: groupedFindingResult.security_analyst,
        owner: groupedFindingResult.owner,
        workflow: groupedFindingResult.workflow,
        status: groupedFindingResult.status,
        progress: groupedFindingResult.progress,
      };
    }) ?? [];
  const headings = [
    { name: "Severity" },
    { name: "Created" },
    { name: "SLA" },
    { name: "Description" },
    { name: "Analyst" },
    { name: "Owner" },
    { name: "Workflow" },
    { name: "Status" },
    { name: "Progress" },
  ];

  return (
    <div className="text-gray-900 overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            {headings.map((heading) => (
              <th
                key={heading.name}
                scope="col"
                className="py-3.5 px-3 font-semibold whitespace-nowrap"
              >
                {heading.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {tableContent?.map((result, index) => (
            <Fragment key={crypto.randomUUID()}>
              <tr
                className={clsx(
                  { active: isRowExpanded(index) },
                  "cursor-pointer"
                )}
                onClick={() => setExpandedRow(index)}
              >
                {Object.values(result).map((cellContent, index) => (
                  <td key={crypto.randomUUID()} className="py-3.5 px-3">
                    <div className="">
                      <div className="whitespace-nowrap text-sm font-medium leading-6">
                        {cellContent}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
              {isRowExpanded(index) && (
                <ExpandedRow
                  groupedFindingId={groupedFindingsResults[index].id}
                />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
