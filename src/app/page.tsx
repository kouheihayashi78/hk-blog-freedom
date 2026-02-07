import { getList } from "@/lib/microcms";
import { PostCard } from "@/components/model/PostCard";

export default async function Home() {
  const { contents: posts } = await getList({ limit: 10 });

  // ピン留めされた記事とそれ以外を分ける
  // （今回は簡易的にフロントでフィルタリングも可能だが、本来はクエリで分けるか、全件取得して分ける。ここでは単純にリスト表示する）
  // 要件にある「ピン留め」を優先表示するロジックは、別途API側で制御するか、
  // ここで isPinnedプロパティを見て並び替えるなどが考えられる
  // 今回はまず単純な一覧表示を実装

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">HK Blog</h1>
        <p className="text-gray-600">
          なんでも書きます、個人の技術ブログです。
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
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