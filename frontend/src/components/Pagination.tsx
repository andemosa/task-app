import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";

export function PaginationComp({
  total,
  page,
  limit,
  setPage,
}: {
  total: number;
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const nPages = Math.ceil(total / limit);
  return (
    <Pagination>
      {nPages <= 1 ? null : (
        <PaginationContent className="flex items-center gap-2 flex-1">
          <div className="min-w-[90px]">
            {page === 1 ? (
              <>&nbsp;</>
            ) : (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setPage((prev) => +prev - 1)}
              >
                <span>
                  <ArrowLeftIcon />
                </span>
                <span>Previous</span>
              </div>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center gap-1">
            {Array.from({ length: nPages }).map((_item, idx) => (
              <PaginationItem
                key={idx}
                onClick={() => setPage(idx + 1)}
                className="cursor-pointer"
              >
                <PaginationLink isActive={page === idx + 1}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </div>
          <div className="min-w-[90px]">
            {page === nPages ? (
              <>&nbsp;</>
            ) : (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setPage((prev) => +prev + 1)}
              >
                <span>Next</span>
                <span>
                  <ArrowRightIcon />
                </span>
              </div>
            )}
          </div>
        </PaginationContent>
      )}
    </Pagination>
  );
}
