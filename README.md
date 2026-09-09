# 佐藤医院 Master Design v1.1

Codex実装用パッケージ。

## Files

- `docs/MASTER_SPEC.md`: 実装Scope・Design/Architecture正本
- `docs/REQUIREMENTS_TRACEABILITY.md`: 要求追跡
- `docs/ACCEPTANCE_CRITERIA.md`: 実装後の受入条件
- `docs/CODEX_HANDOFF.md`: Codex実装手順
- `CODEX_START_PROMPT.md`: Codexへ最初に渡すPrompt
- `CHANGELOG_v1.1.md`: v1.0からのScope変更
- `source/sato-clinic-reqkit.zip`: 元制作資料

## Source Verification

`sato-clinic-reqkit.zip`

SHA-256:

`8b629122cff4bf56ae13498cd0f26941da59bae48c3515410c080bf756302206`

## Start

Workspaceをこの構成で開き、`CODEX_START_PROMPT.md`の本文をCodexへ渡す。

## 実装済みサイトの起動

Node.jsの標準機能だけで起動できます。installは不要です。

```powershell
node scripts/serve.cjs
```

ブラウザで http://127.0.0.1:4173/ を開いてください。配信成果物は `src/` です。ES Modulesとブラウザ保存を使用するため、HTMLファイルの直接ダブルクリックではなくHTTPで閲覧してください。

- 会員デモ：`demo@example.com` / `demo1234`
- 管理者デモ：`admin@example.com` / `demo1234`
- 新規登録も操作できます。パスワードは保持せず、登録済みメールと任意の8文字以上でデモログインします。
- 同じブラウザの別タブで予約枠画面と管理画面を開くと、更新が反映されます。
- サブパス確認用： http://127.0.0.1:4173/mock/hp/sato/

## GitHub Pagesへの公開

`.github/workflows/pages.yml` が、コミット済みの `src/` の内容だけを公開します。公開先のルートは `src/index.html` となり、URLに `/src/` は付きません。GitHub上でのビルド・package install・ローカルサーバー起動は不要です。

初回は、Workflowのコミット・push後に次の設定を行ってください。

1. [リポジトリのPages設定](https://github.com/shimizu-edix/sato_clinic_AstraTest/settings/pages)を開く（リポジトリの **Settings → Pages**）。
2. **Build and deployment → Source** を **GitHub Actions** にする。Workflowは用意済みなので、別のテンプレートは作成しない。
3. [Actions画面](https://github.com/shimizu-edix/sato_clinic_AstraTest/actions/workflows/pages.yml)で **Deploy to GitHub Pages** を選択し、**Run workflow → Branch: main → Run workflow** を実行する。設定前のpushで初回実行が失敗していても、設定後の再実行で確認できる。
4. 実行結果が緑のチェックになり、`deploy` の公開URLが表示されたらサイトを開く。

公開予定URL（独自ドメイン未設定の場合）：

https://shimizu-edix.github.io/sato_clinic_AstraTest/

会員ログインは上記URLに `auth/login/index.html`、管理者ログインは `admin/login/index.html` を付けたURLです。公開後はTOPから予約、会員ログイン、管理者ログインまで確認してください。

以後、`main` に `src/` またはWorkflowの変更をpushすると自動公開されます。README・設計資料だけの変更では公開を再実行しません。原稿・テンプレートを編集した際は、ローカルで `node scripts/build.cjs` を実行して、生成された `src/` の変更もコミットしてください。

通常は個人用トークンやSecretsの登録は不要です。Workflow内で必要な `contents: read`、`pages: write`、`id-token: write` を指定し、GitHubが発行する一時トークンを使います。リポジトリのポリシーでActionsが無効なら、管理者が **Settings → Actions → General** で公式 `actions/*` の実行を許可する必要があります。

失敗した場合は、Actionsの該当実行 → `deploy` → 赤くなったステップのログを確認してください。`Configure GitHub Pages` でPages未設定のエラーが出た場合は、上記Source設定を確認して再実行します。環境の承認待ちが出た場合は、既存の `github-pages` 環境ルールに従って承認します。

GitHub FreeのPagesは公開リポジトリが対象です。Privateの場合は対応プランを確認してください。Pagesの配信対象は `src/` のみですが、Publicリポジトリでは `source/` 等もGitHub上で閲覧できます。

公開後もFrontend Mockとして動作し、入力データは各訪問者のブラウザ内に保存されます。今回の公開対応で保存期限や認証仕様は変更していません。

参考：[GitHub Pagesの公開元設定](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[カスタムWorkflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## ファイルと再生成

- `src/content/source.json`：支給HTMLから抽出した確定原稿マスタ。
- `scripts/build.cjs`：共通Shellと原稿マスタから26の静的HTMLを生成。
- `src/assets/js/pages/app.js`：予約・会員・Adminの画面Controller。
- `src/assets/js/services/index.js`：業務操作の境界。
- `src/assets/js/repositories/local-storage.js`：ブラウザ保存と更新通知。将来のAPI接続時の置換箇所。
- `src/assets/js/mock-data.js`：医院の確定運用と区別したDemo設定・seed。
- `IMPLEMENTATION_REPORT.md`：受入判定と既知制限。
- `output/playwright/`：検証結果JSONとDesktop／Mobileブラウザ画像。

原稿マスタ／テンプレート更新後は `node scripts/build.cjs` を実行してください。生成HTMLを直接編集すると再生成時に上書きされます。

支給画像の再変換は `node scripts/prepare.cjs`。現在の環境に既存のsharpを使用し、WebP quality 90で生成します。元ZIPと展開した原本は保持しています。

## 検証の再実行

ローカルサーバーを起動した状態で実行します。

```powershell
node scripts/check.cjs
node scripts/e2e.cjs
node scripts/accessibility.cjs
node scripts/edge-checks.cjs
node scripts/qa.cjs
node scripts/lower-visual.cjs
```

検証スクリプトはこの環境に既存のPlaywright／sharpとインストール済みChromeを参照します。サイト自体にはこれらの依存はありません。別環境では `scripts/env.cjs` と各スクリプトのChromeパスを既存ツールに合わせてください。新規installは行いません。

## 開発用デモ初期化

ブラウザ開発者ツールのConsoleで、当サイトを開いた状態で以下を実行できます。**このoriginに保存された佐藤医院デモの予約・会員・作成したNewsを消して初期状態に戻します。** 実行後は他のデモタブも再読み込みしてください。

```javascript
localStorage.removeItem('sato-clinic.v1.1');
Object.keys(sessionStorage).filter(k => k.startsWith('sato.')).forEach(k => sessionStorage.removeItem(k));
location.reload();
```

予約枠は初回起動日から約28日分を生成します。検証日が大きく変わった場合にも初期化してください。

このサイトは教材用Frontend Mockです。本番の予約・認証・メール・Backend・複数端末同期は実装していません。実際の個人情報やパスワードを入力しないでください。
