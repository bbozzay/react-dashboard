type PaginationProps = {
  onPrevious: () => void;
  onNext: () => void;
  showNext?: boolean;
  showPrevious?: boolean;
};
export const Pagination = (props: PaginationProps) => {
  const { onPrevious, onNext, showNext = true, showPrevious = false } = props;
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="flex flex-1 justify-between">
        {showPrevious && (
          <button
            onClick={onPrevious}
            className="relative mr-auto inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Previous
          </button>
        )}
        {showNext && (
          <button
            onClick={onNext}
            className="relative ml-auto inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Next
          </button>
        )}
      </div>
    </nav>
  );
};
