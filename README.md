# SF6_CR_teaminfo

好きなプロゲーマーを紹介するWebサイトです。
Next.js (App Router) を使い、データはmicroCMSで管理しています。

##  機能仕様

このアプリには以下の機能・ページがあります。

###  ページ構成（ルーティング）
- **トップページ** (`/`)
  - サイトの入り口です。メンバーのピックアップ表示などを行います。
- **チーム詳細ページ** (`/about`)
  - CRとSF6の関わりと歴史を書いています。
- **メンバー詳細ページ** (`/member/[id]`)
  - 所属プロゲーマー個人の詳細情報を表示するページです。
  - ダイナミックルーティングを使用しており、内容が切り替わります。

###  データ管理・表示
- **コンテンツ管理 (microCMS)**
  - メンバーの名前、写真、プロフィールなどの情報はすべてmicroCMSからAPI経由で取得して表示します。


## 🛠 使用技術

- **Framework**: Next.js (App Router / TypeScript / ESLint)
- **Style**: globals.css / CSS Modules
- **CMS**: microCMS
- **Deploy**: Vercel
- **Repository**: GitHub
