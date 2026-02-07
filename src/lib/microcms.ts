import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type {
  BlogPost,
  Tag,
} from "@/types/blog";

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ブログ記事一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<BlogPost>({
	endpoint: "posts",
	queries,
  });
  return listData;
};

// ブログ記事詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<BlogPost>({
	endpoint: "posts",
	contentId,
	queries,
  });
  return detailData;
};

// タグ一覧を取得
export const getTagList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Tag>({
	endpoint: "tags",
	queries,
  });
  return listData;
};