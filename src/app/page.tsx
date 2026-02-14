import { getList, getTagList } from "@/lib/microcms";
import { PostCard } from "@/components/model/PostCard";
import { Header } from "@/components/layout/Header";

export default async function Home() {
  const { contents: posts } = await getList(
    { 
      limit: 10,
      orders: '-isPinned, -publishedAt' // ピン留め、最新の公開日
    }
  );
  const { contents: tags } = await getTagList({ limit: 10 });

  // ピン留めされた記事とそれ以外を分ける
  // （今回は簡易的にフロントでフィルタリングも可能だが、本来はクエリで分けるか、全件取得して分ける。ここでは単純にリスト表示する）
  // 要件にある「ピン留め」を優先表示するロジックは、別途API側で制御するか、
  // ここで isPinnedプロパティを見て並び替えるなどが考えられる
  // 今回はまず単純な一覧表示を実装

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Header tags={tags} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
      
      {posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          記事がまだありません。
        </p>
      )}
    </main>
  );
}