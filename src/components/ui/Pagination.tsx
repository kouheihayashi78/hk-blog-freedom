import Link from "next/link";

export type Props = {
  totalCount: number;
  perPage: number;
  currentPage: number;
  path?: string;
};

export const Pagination = ({ totalCount, perPage, currentPage, path = "/" }: Props) => {
  const totalPages = Math.ceil(totalCount / perPage);

  // ページが1つしかない場合は何も表示しない
  if (totalPages <= 1) {
    return null;
  }

  // ページネーションの表示ロジック
  const generatePagination = (current: number, total: number) => {
    // 表示するページ数が少ない場合は全ページ表示
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // 現在のページの前後のページを表示
    const pages: (number | string)[] = [];
    const showEllipsisStart = current > 4;
    const showEllipsisEnd = current < total - 3;

    if (showEllipsisStart && showEllipsisEnd) {
      pages.push(1);
      pages.push("...");
      pages.push(current - 1);
      pages.push(current);
      pages.push(current + 1);
      pages.push("...");
      pages.push(total);
    } else if (!showEllipsisStart && showEllipsisEnd) {
      // 最初の数ページを表示
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    } else if (showEllipsisStart && !showEllipsisEnd) {
      // 最後の数ページを表示
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center gap-2 mt-12" aria-label="Pagination">
      {/* 前へボタン */}
      {currentPage > 1 ? (
        <Link
          href={`${path}?page=${currentPage - 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          aria-label="前へ"
        >
          前へ
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
          前へ
        </span>
      )}

      {/* ページ番号 */}
      <div className="flex gap-1">
        {pages.map((page, index) => (
          typeof page === "number" ? (
            <Link
              key={page}
              href={`${path}?page=${page}`}
              className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors ${
                currentPage === page
                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Link>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="px-4 py-2 text-sm font-medium text-gray-500 border border-transparent"
            >
              ...
            </span>
          )
        ))}
      </div>

      {/* 次へボタン */}
      {currentPage < totalPages ? (
        <Link
          href={`${path}?page=${currentPage + 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          aria-label="次へ"
        >
          次へ
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
          次へ
        </span>
      )}
    </div>
  );
};
