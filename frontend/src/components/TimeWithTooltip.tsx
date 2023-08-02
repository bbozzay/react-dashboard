const timeAgo = (isoTimeStamp: string) => {
  const date = new Date(isoTimeStamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else {
    return `${weeks} wks ago`;
  }
};

type TimeWithTooltipProps = {
  isoTimeStamp: string;
};
export const TimeWithTooltip = (props: TimeWithTooltipProps) => {
  const { isoTimeStamp } = props;
  // date formatted like July 23, 2023 5:28PM UTC
  const fullDate = new Date(isoTimeStamp).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });

  return (
    <div className="relative group overflow-visible">
      <time
        dateTime={isoTimeStamp}
        aria-describedby="tooltip"
        className="text-gray-400"
      >
        {timeAgo(isoTimeStamp)}
      </time>
      <div className="hidden group-hover:block absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-100 p-2 rounded-md shadow-md w-60 text-center">
        <span className="text-gray-400">{fullDate}</span>
      </div>
    </div>
  );
};
