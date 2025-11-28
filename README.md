# Crazy Raccoon SF6 Division Introduction

私が応援しているプロゲーミングチーム「Crazy Raccoon」のストリートファイター6（SF6）部門を紹介するWebアプリケーションです。

## 概要

このアプリケーションは、Crazy Raccoon SF6部門の軌跡や、所属メンバーの魅力を伝えるための紹介サイトです。チーム全体の歴史を知ることができるページや、microCMSで管理されたデータをもとにしたメンバー個別の詳細ページを閲覧することができます。学校の課題として、最新のフロントエンド技術とHeadless CMSを組み合わせた開発フローを学ぶために制作しました。

### デモサイト

以下のリンクから実際にWebサイトを閲覧できます。

**[https://your-site-url.vercel.app/](https://front-kadai.vercel.app/)**

## 主な機能

- **ホーム**: SF6部門のトップページおよび、ゲームの紹介をまとめたページです。
- **チーム紹介**: 今までのチームとしての大会結果や、CR CUPと呼ばれるCR主催の大会についての紹介をしているページです。
- **メンバー詳細表示（ダイナミックルーティング）**: microCMSから取得したデータを利用し、各選手のプロフィールページを動的に生成しています。
- **最新情報の更新**: CMSを利用しているため、メンバーの追加や情報の更新をコードを修正せずに行うことができます。

## 制作背景

本プロジェクトは、学校の課題として個人で制作しました。
Next.js (App Router) とHeadless CMS (microCMS) を連携させたJamstackなサイト構築、およびVercelへのデプロイまでの包括的な開発ワークフローの習得を目的としています。

### 工夫した点（AI活用）
開発プロセスにおいて、GeminiなどのAIツールを積極的に活用しました。
- **デザイン構築**: チームのイメージに合う配色やレイアウトのアイディア出しに利用。
- **エラー解決**: 実装時に遭遇したTypeScriptの型エラーやビルドエラーの原因特定・解決に活用し、開発効率を高めました。

## 使用技術

- **Framework**: Next.js (App Router / TypeScript / ESLint)
- **Style**: globals.css / CSS Modules
- **CMS**: microCMS
- **Deploy**: Vercel
- **Repository**: GitHub

