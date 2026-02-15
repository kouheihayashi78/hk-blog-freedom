import { getList, getTag } from "@/lib/microcms";
import { PostCard } from "@/components/model/PostCard";
import Link from "next/link";
import { MicroCMSQueries } from "microcms-js-sdk";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : undefined;
  const tagId = typeof resolvedSearchParams.tag === "string" ? resolvedSearchParams.tag : undefined;

  const queries: MicroCMSQueries = {
    limit: 100,
  };

  if (q) {
    queries.q = q;
  }

  if (tagId) {
    queries.filters = `tags[contains]${tagId}`;
  }

  const { contents: posts, totalCount } = await getList(queries);

  let tagName = "";
  if (tagId) {
    try {
      const tag = await getTag(tagId);
      tagName = tag.name;
    } catch (e) {
      console.error("Failed to fetch tag", e);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in-up">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span className="font-medium">ホームに戻る</span>
        </Link>
      </div>

      <header className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {q ? (
            <>
              「<span className="text-blue-600">{q}</span>」の検索結果
            </>
          ) : tagId ? (
            <>
              タグ「<span className="text-blue-600">#{tagName}</span>」の記事
            </>
          ) : (
            "すべての記事"
          )}
        </h1>
        <p className="text-gray-500">
          {totalCount} 件見つかりました
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            条件に一致する記事は見つかりませんでした。
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
