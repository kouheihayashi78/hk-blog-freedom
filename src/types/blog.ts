import type { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

export type Tag = {
  id: string;
  name: string;
} & MicroCMSDate;

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  tags: Tag[];
  isPinned: boolean;
  publishedAt: string;
  revisedAt: string;
  createdAt: string;
  updatedAt: string;
} & MicroCMSDate;

export type BlogPostListResponse = {
  contents: BlogPost[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type TagListResponse = {
  contents: Tag[];
  totalCount: number;
  offset: number;
  limit: number;
};