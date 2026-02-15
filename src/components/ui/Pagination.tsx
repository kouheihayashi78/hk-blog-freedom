import Link from "next/link";

type Props = {
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

  // 表示するページ番号の範囲を計算
  // ここではシンプルに「最大5ページ分」を表示するロジックにする
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* 前へボタン */}
      {currentPage > 1 ? (
        <Link
          href={`${path}?page=${currentPage - 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          前へ
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
          前へ
        </span>
      )}

      {/* ページ番号（簡易実装：全ページ表示または一部表示） */}
      {/* シンプルに全ページ表示するが、ページ数が多い場合は省略記法(...)が必要になる */}
      {range(1, totalPages).map((number) => (
        <Link
          key={number}
          href={`${path}?page=${number}`}
          className={`px-4 py-2 text-sm font-medium border rounded-md ${
            currentPage === number
              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          }`}
        >
          {number}
        </Link>
      ))}

      {/* 次へボタン */}
      {currentPage < totalPages ? (
        <Link
          href={`${path}?page=${currentPage + 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
