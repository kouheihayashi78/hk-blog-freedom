"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tag } from "@/types/blog";

export const Header = ({ tags }: { tags: Tag[] }) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 検索バー押下時、フォーカスが当たる
  // フォーカルを当てるのは再レンダリング必要なくuseStateを使う必要がないのでuseRef
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="mb-12 text-center relative">
      <h1 className="text-3xl font-bold mb-4">HK Blog</h1>
      <p className="text-gray-600 mb-6">
        なんでも書きます、個人のブログです。
      </p>

      <div className="absolute top-0 right-0">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="検索"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <div className="max-w-xl mx-auto">
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchOpen ? "max-h-16 opacity-100 mb-4" : "max-h-0 opacity-0"
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="relative flex items-center rounded-full border border-gray-300 shadow-sm py-1 px-4">
            <label htmlFor="search" aria-label="検索" className="pr-2.5 text-main-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 sm:w-5"><path d="M21.64,20.36l-3.75-3.74a8.81,8.81,0,0,0,2-5.62A8.9,8.9,0,1,0,11,19.9a8.81,8.81,0,0,0,5.62-2l3.74,3.75a.92.92,0,0,0,1.28,0A.91.91,0,0,0,21.64,20.36ZM3.9,11A7.1,7.1,0,1,1,16,16h0v0A7.1,7.1,0,0,1,3.9,11Z"></path></svg>
            </label>
            <input
              ref={inputRef}
              type="text"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キーワードを入力..."
              className="w-full py-2 text-sm focus:outline-none"
            />
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <Link
                key={tag.id}
                href={`/search?tag=${tag.id}`}
                className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              # {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

