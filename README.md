# HK Blog Freedom

Next.js (App Router)、Tailwind CSS、microCMS を使用して構築された個人の技術ブログ兼ポートフォリオです。
シンプルなUIで記事の内容が見やすくなるように設計しています。

## 技術スタック

- **フレームワーク:** Next.js 16(App Router)
- **言語:** TypeScript
- **スタイリング:** Tailwind CSS v4
- **CMS:** microCMS (HeadlessCMS)
- **デプロイ:** Vercel
- **CI/CD:** GitHub Actions

## 機能

- **記事一覧:** 記事のピン留め、検索機能、ページネーション。
- **記事詳細:** リッチテキストコンテンツ、シンタックスハイライト、著者プロフィール。
- **検索:** キーワードとタグによるフィルタリング。
- **パフォーマンス:** 静的生成 (SSG) による高速な読み込み。

## 始め方

### 前提条件

- Node.js (最新のLTS推奨)
- microCMSのアカウントとプロジェクト

### インストール手順

1. リポジトリをクローンします:
   ```bash
   git clone <repository-url>
   cd hk-blog-freedom
   ```

2. 依存関係をインストールします:
   ```bash
   npm install
   ```

3. 環境変数を設定します:
   ルートディレクトリに `.env.local` ファイルを作成し、microCMSの認証情報を追加してください:
   ```env
   MICROCMS_SERVICE_DOMAIN=your-service-domain
   MICROCMS_API_KEY=your-api-key
   ```

4. 開発サーバーを起動します:
   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## プロジェクト構造

```text
src/
├── app/                # App Router (ページ & レイアウト)
├── components/         # React コンポーネント
│   ├── ui/             # 汎用 UI (ボタンなど)
│   ├── model/          # ドメイン固有コンポーネント (PostCard など)
│   └── layout/         # レイアウトコンポーネント (ヘッダー、フッター)
├── lib/                # API クライアント (microCMS)
├── types/              # TypeScript インターフェース
└── utils/              # ユーティリティ関数
```

## スクリプト

- `npm run dev`: 開発サーバーを起動
- `npm run build`: 本番用にビルド
- `npm run lint`: ESLint を実行
