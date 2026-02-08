import Link from "next/link";
import { BlogPost } from "@/types/blog";
import Image from "next/image";

type Props = {
  post: BlogPost;
};

export const PostCard = ({ post }: Props) => {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group block p-4 bg-white rounded-lg border border-gray-200 transition-colors"
    >
      <div className="flex flex-col h-full">
        {post.eyecatch && (
            <div className="mb-4 overflow-hidden rounded-md aspect-video relative">
                <Image
                    src={post.eyecatch.url}
                    alt={post.title}
                    width={post.eyecatch.width}
                    height={post.eyecatch.height}
                    priority={true}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
            </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded"
              >
                # {tag.name}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {post.title}
          </h2>
          <div className="text-sm text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
          </div>
        </div>
      </div>
    </Link>
  );
};
