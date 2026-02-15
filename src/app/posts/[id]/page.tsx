import { getDetail, getList } from "@/lib/microcms";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { SyntaxHighlighter } from "@/components/ui/SyntaxHighlighter";

export async function generateStaticParams() {
  const { contents } = await getList();
  return contents.map((post) => ({
    id: post.id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetail({ params }: Props) {
  const { id } = await params;
  let post: BlogPost;

  try {
    post = await getDetail(id);
  } catch (e) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in-up">
      <SyntaxHighlighter />
      <article>
        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                # {tag.name}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="text-gray-500">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        {/* Eyecatch Image */}
        {post.eyecatch && (
          <div className="mb-10 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={post.eyecatch.url}
              alt={post.title}
              width={post.eyecatch.width}
              height={post.eyecatch.height}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Back Button */}
      <div className="mt-16 pt-8 border-t border-gray-200">
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
          <span className="font-medium">一覧に戻る</span>
        </Link>
      </div>
    </main>
  );
}
