# 佐藤医院 Master Design / Architecture Specification v1.1

更新日: 2026-09-08  
用途: HTML/CSS/JavaScriptによるFrontend Design Mockの実装正本  
前版: sato-clinic-master-design-v1.0

## 0. v1.1の目的

v1.0は要求分析とArchitectureとして有効だが、48画面、IndexedDB transaction、監査ログ、冪等制御、詳細な権限管理までを実装必須としており、今回の「訓練用HTML Design Mock」には過剰だった。

v1.1では以下へ再定義する。

- 元の制作依頼書・掲載原稿・画像の事実と必須要件は維持する。
- ユーザーの追加・上書き指示を元資料より優先する。
- HTML/CSS/Vanilla JavaScriptで、Public + Reservation + Auth + Member + Adminを一貫した世界観で実装する。
- Backend/API/DBを考慮した構造は残すが、本番Backendの複雑性をブラウザ内に過剰再現しない。
- 見た目だけの静的ページではなく、予約、会員、履歴、管理、疑似リアルタイム、状態変化を操作できるDesign Mockとする。
- 医療サイトとしての信頼感を守りつつ、2026年時点で古く見えない、写真・余白・タイポグラフィ・Micro Interactionを活かした現代的な表現とする。

## 1. 指示の優先順位

競合時は以下を優先する。

1. 現在の会話でのユーザーの最新指示
2. Project Instructions
3. `sato-clinic-reqkit.zip` 内の制作依頼書・掲載原稿・支給画像
4. 本v1.1設計資料
5. 外部Benchmark / 一般的なBest Practice
6. AI独自判断

### 1.1 事実情報

以下はユーザーの変更指示がない限りSourceを維持する。

- 医院名: 佐藤医院
- 院長: 佐藤 太郎
- 住所: 〒123-4567 東京都台東区上野0-0-0
- 電話: 00-0000-0000
- FAX: 00-0000-0000
- メール: info@sato-clinic-test.jp
- 最寄駅: JR上野駅より徒歩5分
- 駐車場: 当院専用 無料駐車場10台分
- 診療時間・受付時間・休診日
- 診療科目
- 掲載原稿内の人物・経歴・コメント・FAQ・お知らせ等

教材用の架空設定であることを忘れず、実在医院の事実として扱わない。

### 1.2 原稿と追加コピー

確定原稿は原則改変しない。ただし元資料で想定されなかったページ・機能については、世界観を守り以下を新規作成してよい。

- CTA
- UI label
- Form説明
- Validation / Error / Success message
- Step案内
- 予約・会員・管理画面の補足文
- セクション見出し
- Navigation / Breadcrumb
- デモであることを伝える説明

医院固有の実績、治療効果、設備、資格、住所、スタッフ等の未知の事実を追加しない。

## 2. Original Requirements

元の制作依頼書由来の必須事項。

- Public必須6系統: TOP、お知らせ、診療内容、当院について、診療時間・所在地、FAQ。
- お知らせは一覧・詳細を持つ。
- TOP基本順序:
  1. ファーストビュー
  2. 診療時間
  3. お知らせ
  4. 院長挨拶
  5. 診療内容
  6. 当院について
  7. スタッフ紹介
  8. アクセス
  9. フッター
- TOPのお知らせは最大5件。
- TOPの診療内容は掲載原稿1〜4を表示し、5〜7は詳細ページへ。
- Google Map相当の地図表示をTOPと診療時間・所在地に配置する。
- お知らせを医院側で更新できる管理UIを持つ。
- Responsive対応。
- 写真を活用する。
- 白基調 + 淡いGreen / Blue。
- 高齢者も読みやすい可読性。
- モットー「地域に根ざした医療」を目立たせる。
- 必要以上に派手にしない。

## 3. User Added / Overridden Requirements

元資料にない、または元資料より優先する追加要件。

- Web予約を必須化。
- 空き状況を視覚的に確認できる。
- 予約フォーム → 確認 → 完了まで作る。
- 会員登録 → 確認 → 完了を作る。
- ログインを作る。
- 会員マイページと過去の予約・利用履歴を作る。
- 管理者ページを作る。
- Adminから予約、予約枠、お知らせ、会員を操作できる。
- JSによる適切なMotion、Accordion、Menu、Form feedback、予約操作等を実装する。
- 元資料にないページの文章・画像は、全体世界観と事実性を守れば新規追加可能。
- TOP・下層とも、UX向上につながる現代的な表現・機能を追加可能。
- HTML/CSS/JavaScriptを基本とする。
- dependency/packageの新規installは禁止。
- 一般的なCDNは必要性が明確な場合のみ可。原則Vanilla JSを優先。
- 写真は原則WebP quality 90程度。原本は保持する。

## 4. Design Direction

### 4.1 Concept

**地域に根ざした医療を、安心して「見る・相談する・予約する」体験へ。**

Brand axis:

- Trust: 医療サイトとしての信頼
- Warmth: 地域・家族・人への親しみ
- Clarity: 中高年・高齢者にも分かりやすい
- Modernity: 予約や会員機能は現代的なDigital Product UX

### 4.2 Visual Tone

- Warm Whiteを広く使い、淡いSage/Mintでセクションを分ける。
- Primary actionは濃いGreen。
- 補助色として落ち着いたBlue-Greenを許可する。
- 大きな余白、読みやすい文字、写真と文章の非対称レイアウトを適度に使う。
- 角丸Cardの大量陳列だけにせず、写真、罫線、余白、Typographyでリズムを作る。
- 写真上に長文を重ねない。
- 美容クリニック的な過剰なLuxury表現、大病院的な重厚表現を避ける。

### 4.3 Modern Expression

以下は積極採用する。ただし重要情報をMotion依存にしない。

- Sticky Header + scroll時のsubtle shadow/border変化
- Hero画像の初回のみのごく軽いscale/opacity transition
- IntersectionObserverによるsection reveal
- Buttonのarrow / press / hover feedback
- Card hover/focus elevation
- FAQ accordion
- Mobile menu dialog
- Reservation slotの即時状態feedback
- Form validation / success / loading state
- Adminのfilter / selection / status update
- Mobileでの横スクロール可能な「診療イメージ」GalleryまたはCarouselを1箇所程度
- CSS scroll-snapを優先し、JSがなくても閲覧可能にする

不採用:

- 自動再生Hero carousel
- 背景動画
- 強いparallax
- split-text animation
- custom cursor
- 長時間のloading演出
- 数値実績の捏造を伴うcounter
- 診断AI chat

`prefers-reduced-motion: reduce`では移動・拡縮・smooth scrollを停止し、全内容を通常表示する。

## 5. Site Map / Implementation Scope

v1.1では独立HTMLを約26画面に縮小する。細かな確認・編集状態は同一ページ内Stateとして表現してよい。

### 5.1 Public: 8画面

|ID|Path|役割|
|---|---|---|
|P01|`/index.html`|TOP|
|P02|`/news/index.html`|お知らせ一覧|
|P03|`/news/detail.html?id=`|お知らせ詳細|
|P04|`/medical/index.html`|診療内容7項目|
|P05|`/about/index.html`|当院について・理念・スタッフ|
|P06|`/access/index.html`|診療時間・所在地・問い合わせ|
|P07|`/faq/index.html`|FAQ + Web予約補足FAQ|
|P08|`/first-visit/index.html`|初診・受診前案内|

Privacy / Terms / 404は必要最小限の共通ページまたはdialog/sectionとして実装してよいが、v1.1の主要画面数には含めない。

### 5.2 Reservation: 5画面

|ID|Path|役割|
|---|---|---|
|R01|`/reservation/index.html`|Web予約案内・注意・空き確認入口|
|R02|`/reservation/slots/index.html`|日付・時間枠・空き状況|
|R03|`/reservation/form/index.html`|予約者/患者情報入力|
|R04|`/reservation/confirm/index.html`|入力確認|
|R05|`/reservation/complete/index.html`|予約完了|

### 5.3 Authentication: 4画面

|ID|Path|役割|
|---|---|---|
|A01|`/auth/register/index.html`|会員登録入力|
|A02|`/auth/register/confirm.html`|登録確認|
|A03|`/auth/register/complete.html`|登録完了|
|A04|`/auth/login/index.html`|ログイン|

Password resetや実メール確認は本番設計対象として残すが、今回の必須Mockから外す。

### 5.4 Member: 3画面

|ID|Path|役割|
|---|---|---|
|M01|`/member/index.html`|マイページ、次回予約、今後の予約|
|M02|`/member/history/index.html`|過去の予約・利用履歴|
|M03|`/member/reservation-detail/index.html?id=`|予約詳細。取消/変更は同ページ内のDemo操作でも可|

### 5.5 Admin: 6画面

|ID|Path|役割|
|---|---|---|
|D01|`/admin/login/index.html`|管理者ログインDemo|
|D02|`/admin/index.html`|Dashboard|
|D03|`/admin/reservations/index.html`|予約一覧・状態管理|
|D04|`/admin/slots/index.html`|予約枠管理|
|D05|`/admin/news/index.html`|News一覧 + 作成/編集UI|
|D06|`/admin/members/index.html`|会員一覧・状態確認|

Adminの詳細編集はdialog、drawer、同一ページ詳細panelを利用してよい。別HTMLを増殖させない。

## 6. TOP Page Specification

元の順序を維持する。

1. **Hero**
   - H1: 「地域に根ざした医療」
   - 支給`firstView.jpg`を主役にする。
   - CTA: 「Web予約」「診療時間を見る」。
   - 予約優先制であることを必要に応じて短く補足。
   - 初回表示のみsubtle motion。自動carouselにしない。

2. **診療時間**
   - 診療時間・受付時間・休診日を同時に理解できる。
   - Mobileでは横幅に無理やり7列を押し込まず、読みやすい代替表現を使う。

3. **お知らせ**
   - 最大5件。
   - タイトル・カテゴリ・日付等のmeta。
   - 詳細へ遷移。

4. **院長挨拶**
   - 原稿を保持。
   - 院長写真と読み幅を制限した本文。

5. **診療内容**
   - 原稿1〜4。
   - Desktop 2x2など。Mobile 1列。
   - 5〜7は詳細ページへの入口。

6. **当院について**
   - 概要 + 人物/診療イメージ写真。
   - 詳細ページへ。

7. **スタッフ紹介**
   - 4名全員の氏名・役職を表示。
   - 写真が役職と矛盾する場合は無理に写真を使わない。

8. **アクセス**
   - 本文セクションとして最後。
   - 住所、駅、駐車場、参考Map、詳細リンク。

9. **Footer**

Mobileでは必要に応じて画面下部に「電話 / 診療時間 / Web予約」の固定Actionを置く。フォーム画面・Member・Adminでは非表示または領域に合う操作へ置換する。

## 7. 下層ページの追加表現

- Public下層はHero/Lead + Breadcrumb + content sectionsを基本とする。
- `medical`では7診療内容を単なるCard一覧だけにせず、章番号、余白、関連イメージ等でEditorialに構成する。
- `about`では理念・方針・人物を長文の壁にせず、section rhythmを付ける。
- `faq`はnative `details/summary`を基本とする。
- `first-visit`は予約、持参物、発熱時案内、FAQへの導線を統合する。
- 「診療イメージ」GalleryはPublic下層に1箇所だけ配置可能。支給写真を使い、実設備/実スタッフの証明に見せない。

## 8. Design System

### 8.1 CSS Token Baseline

```css
:root {
  --color-bg: #fafcf9;
  --color-surface: #ffffff;
  --color-surface-soft: #edf5ef;
  --color-text: #213a32;
  --color-muted: #52665d;
  --color-brand: #246b4f;
  --color-brand-hover: #1b573f;
  --color-accent: #2e7d73;
  --color-link: #1d5b83;
  --color-border: #cad8cf;
  --color-focus: #125faa;
  --color-error: #a12e36;
  --color-success: #246b4f;
  --color-warning: #785315;

  --font-sans: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif;
  --text-body: 1.125rem;
  --text-sm: 1rem;
  --text-xs: .875rem;
  --text-h3: clamp(1.25rem, 1.15rem + .5vw, 1.5rem);
  --text-h2: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);
  --text-h1: clamp(2rem, 1.5rem + 2.4vw, 3.75rem);

  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  --container-public: 75rem;
  --container-reading: 44rem;
  --container-form: 46rem;
  --container-admin: 90rem;
  --gutter: clamp(1rem, 3vw, 2.5rem);
  --section-gap: clamp(3.5rem, 2.5rem + 4vw, 7rem);

  --radius-control: .625rem;
  --radius-card: 1.25rem;
  --radius-photo: 1.75rem;
  --shadow-card: 0 8px 30px rgb(33 58 50 / .08);
  --target-min: 3rem;
  --motion-fast: 120ms;
  --motion-normal: 220ms;
  --motion-slow: 600ms;
  --ease-standard: cubic-bezier(.2, 0, .2, 1);
}
```

Noto Sans JPを外部fontとして必須にしない。OS fontで成立させる。

### 8.2 Core Components

- Header / Mobile Nav
- Footer
- Button / Link Button
- Card
- Section Heading
- Breadcrumb
- Announcement / Alert
- Accordion
- Form Field / Radio / Checkbox / Select
- Stepper
- Reservation Date Selector
- Reservation Slot Selector
- Reservation Summary
- Modal / Dialog
- Status Badge
- Empty / Loading / Error / Success State
- Admin Table / Mobile Card List
- Pagination

すべてhoverだけに依存せず、keyboard focusを持つ。

## 9. Responsive Policy

Mobile-first。

|幅|設計|
|---|---|
|320〜389|1列、左右16px、48px操作域、Mobile Nav|
|390〜599|1列、左右20px、画像/カードに余裕|
|600〜899|Tablet、必要時2列|
|900〜1199|Desktop構造開始|
|1200+|最大幅を固定し余白を伸ばす|

検証幅: 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440px。

要件:

- 本文標準18px程度。
- Inputは16px以上。
- 主要操作48x48px以上。
- 200% text、320px reflowで主要情報・操作を失わない。
- 通常ページで全体横scrollを発生させない。
- Mobile固定CTAがfocusやFooterを覆わない。
- Reservation/Adminの複雑表はMobileでCard/Listへ変換する。

## 10. Image Strategy

### 10.1 原則

- 支給素材を優先。
- JPEG写真はWebP quality 90程度を基準に派生生成。
- 元画像は保持。
- Heroには複数sizeを用意し`srcset/sizes`を使用。
- LCP Heroはlazy loadingしない。
- 下部画像は`loading="lazy"`。
- width/heightまたはaspect-ratioを指定する。

### 10.2 画像の事実性

支給写真でも、実在する佐藤医院の建物・設備・スタッフを証明するものとは限らない。以下を守る。

- `firstView.jpg`は診療対話イメージとして使用可能。
- 佐藤太郎、鈴木真理、高橋由美の明確な支給人物写真は人物紹介へ使用可能。
- 医療事務 山本花の写真は聴診器があり役職誤認の懸念があるため、人物紹介ではテキスト主体または慎重なCropと「医療事務」明示とする。無理に使わなくてよい。
- 病室、大規模病院外観、大規模病棟に見える写真は「佐藤医院の設備」として使わない。
- Medical / Patient系写真は「診療イメージ」として適切なページに利用可能。
- 新規画像生成は許可するが、実スタッフ、実建物、実設備、治療実績を示す画像として生成しない。抽象的なHealthcare sceneや装飾用途に限定し、生成なしでも完成できる設計にする。

## 11. Reservation Mock Architecture

### 11.1 目的

本物の予約Backendではなく、Frontend Design Mockとして以下を体験できること。

- 未ログインでも空き状況を見る。
- 日付と時間を選ぶ。
- 会員登録/ログイン後に予約情報を入力する。
- 確認して完了する。
- マイページへ予約が反映される。
- Adminから枠を停止/開放/残数変更すると、同一ブラウザ内の別タブへ反映される。

### 11.2 Demo Data

本番要件と誤認しないよう、以下は`DEMO_CONFIG`としてコード上で分離する。

- 予約可能期間: 28日程度
- Slot間隔: 15分程度
- 1slot capacity: 2程度
- Web予約対象: 一般診療Demo

数値は医院の確定運用ルールとしてPublic原稿に書き足さない。

### 11.3 Persistence

実装必須:

- `localStorage`を基本としたMock Repository
- `BroadcastChannel`で同一origin別タブへ更新通知
- `storage` eventをfallbackとして利用

IndexedDB transaction、監査Log、冪等Keyの厳密再現は今回の必須実装から外す。

同時確定競合は「保存直前に最新枠を再確認し、満枠なら失敗表示」とする簡易Mockで十分。

### 11.4 Service Boundary

```text
UI / Page Controller
        ↓
ReservationService / AuthService / MemberService / NewsService / AdminService
        ↓
Repository Interface
        ↓
LocalStorageMockRepository

将来:
Repository Interface
        ↓
ApiRepository
        ↓
REST API / Backend / DB
```

DOM操作をRepositoryへ混ぜない。

## 12. Auth / Member Mock

### Auth

- メール + password形式のDemo login。
- passwordを永続保存しない。
- Mockであり本物の認証ではない旨を明示する。
- 会員登録は入力 → 確認 → 完了。
- 実メール送信はしない。

### Member

- 次回予約。
- 今後の予約。
- 過去の予約・利用履歴。
- 予約詳細。
- 取消/変更はM03内のDemo UIとして実装してよい。

診断、処方、検査結果など支給されていない医療情報を生成しない。

## 13. Admin Mock

Adminは患者向けPublicと同じDesign Tokenを使いつつ、情報密度を少し上げる。

### Dashboard

- 今日/選択日の予約数
- 要確認状態
- 主要管理画面への入口
- 未公開News数などDemo dataに基づく値

売上、満足度、実績等の架空KPIは表示しない。

### Reservations

- 日付、状態、患者名でfilter。
- 予約状態変更Demo。
- Member側の予約へ反映。

### Slots

- 各slotのOpen / Closed / capacity / booked count。
- 変更時に患者画面へ疑似リアルタイム反映。

### News

- 一覧。
- 新規作成/編集。
- Draft / Published。
- Public TOPはPublishedを最大5件。
- Sourceの初期5件は保護seedとして扱い、直接破壊せず複製編集でもよい。

### Members

- 会員一覧。
- 検索。
- Active / Suspended等のDemo状態。
- 患者の医療情報は作らない。

## 14. Accessibility / Performance

必須:

- Semantic HTML
- `lang="ja"`
- 1ページ1つのmainと原則1つのH1
- Skip link
- Keyboard操作
- `:focus-visible`
- Form label / fieldset / legend
- Error summary
- `aria-live`は必要な状態更新だけ
- `prefers-reduced-motion`
- 十分なcontrast
- Responsive images
- Lazy loading
- CLS抑制
- JSが失敗してもPublicの基本情報は読める

Performance目標は厳密な本番SLAではなく、Design Mockの品質目安とする。

## 15. Proposed Directory Structure

```text
sato-clinic/
├─ docs/
├─ source/
│  └─ sato-clinic-reqkit.zip
├─ src/
│  ├─ index.html
│  ├─ news/
│  ├─ medical/
│  ├─ about/
│  ├─ access/
│  ├─ faq/
│  ├─ first-visit/
│  ├─ reservation/
│  ├─ auth/
│  ├─ member/
│  ├─ admin/
│  ├─ assets/
│  │  ├─ css/
│  │  │  ├─ tokens.css
│  │  │  ├─ base.css
│  │  │  ├─ layout.css
│  │  │  ├─ components.css
│  │  │  └─ pages.css
│  │  ├─ js/
│  │  │  ├─ main.js
│  │  │  ├─ content.js
│  │  │  ├─ mock-data.js
│  │  │  ├─ repositories/
│  │  │  ├─ services/
│  │  │  └─ pages/
│  │  └─ images/
│  └─ content/
│     ├─ clinic.js
│     ├─ news.js
│     └─ assets.js
├─ dist/
└─ tests/ or scripts/
```

build toolのinstallは禁止。`dist/`を作る場合は既存環境の標準機能/利用可能ツールだけで生成する。単純な静的構成なら`src/`を配信成果物としてもよい。

## 16. Implementation Principles

- 共通情報を各HTMLへ手入力で重複させない。
- 相対Pathで、`/mock/hp/sato/`等のsubpath配置にも対応させる。
- 元原稿と追加コピーをデータ上で区別できると望ましい。
- 内部リンク切れを残さない。
- query stringのIDはDemoの表示選択にのみ使い、個人情報をURLへ入れない。
- 外部送信しない。
- installしない。
- CDNは必要性が明確な場合のみ。今回Font/Icon/Carousel libraryのためだけには使わない。

## 17. Out of Scope

今回の完成条件ではない。

- 本物のBackend/API/DB
- 本物の複数端末リアルタイム同期
- 実メール送信
- MFA
- 本番用password recovery
- 本番用個人情報管理
- 電子カルテ
- 決済
- 診断支援
- 実際の待ち時間予測
- 本番公開・DNS・Server設定
- 医療広告法令の最終適法性保証

## 18. Implementation Completion Definition

Codexは以下まで自律的に実施して終了する。

1. Sourceと本v1.1設計を確認。
2. Design Systemと共通Shellを実装。
3. TOPをDesktop/Mobileで完成させ、Design Directionを確定。
4. Public下層を展開。
5. Reservation/Auth/Memberを実装。
6. Adminを実装。
7. Mock data / localStorage / BroadcastChannelを接続。
8. WebP変換は既存環境で可能なら実施。新規installはしない。
9. Internal link / HTML / JS / CSSの機械検証。
10. 320/390/768/1024/1440pxを中心にBrowser目視。
11. Keyboard / reduced-motion / Form状態 / 予約更新反映を確認。
12. `ACCEPTANCE_CRITERIA.md`の必須項目をPASSするまで修正。
13. 実際に確認できた結果だけを最終報告する。

Codexは、設計済みの軽微なUI判断を毎回ユーザーへ問い直さず自己判断してよい。
