"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

// highlight.jsはDOM操作する関数なので、Node環境だとdocumentなどのオブジェクトがないためエラーが起こるためクライアントコンポーネントにする
// レンダリング完了後に初回だけ実行
export const SyntaxHighlighter = () => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;
};
