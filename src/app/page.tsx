import { getList, getTagList } from "@/lib/microcms";
import { PostCard } from "@/components/model/PostCard";
import { Header } from "@/components/layout/Header";
import { Pagination } from "@/components/ui/Pagination";

const PER_PAGE = 6;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const { contents: posts, totalCount } = await getList({
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    orders: "-isPinned,-publishedAt", // ピン留め、最新の公開日
  });
  
  const { contents: tags } = await getTagList({ limit: 10 });

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Header tags={tags} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {posts.length > 0 ? (
        <Pagination
          totalCount={totalCount}
          perPage={PER_PAGE}
          currentPage={page}
        />
      ) : (
        <p className="text-center text-gray-500 mt-10">
          記事がまだありません。
        </p>
      )}
    </main>
  );
}