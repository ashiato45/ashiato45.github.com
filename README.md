# 足跡45のサイト

GitHub Pagesで公開する静的サイトです。Jekyllで共通レイアウトを適用し、GitHub Actionsでビルド・公開します。

## ページの更新

既存のページはリポジトリ直下のHTMLファイルを編集します。新しいページは、リポジトリ直下にMarkdownファイルを作成します。

```markdown
---
layout: default
title: ページのタイトル
permalink: /ページ名.html
---

# 見出し

本文をMarkdownで書きます。
```

`permalink`を指定すると公開URLを決められます。既存ページのURLは変更しないでください。ナビゲーションは `_data/navigation.yml`、共通レイアウトは `_layouts/default.html` で管理します。画像やゲームなどの既存ファイルは、これまでどおり各フォルダで管理します。

古いページ生成用ファイルは `edit/` に残していますが、Jekyllでは公開対象から除外しています。

## GitHub Pagesの設定

リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定してください。その後 `master` ブランチにpushすると、`.github/workflows/pages.yml` がJekyllでビルドして公開します。
