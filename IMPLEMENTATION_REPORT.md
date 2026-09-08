# 佐藤医院 Frontend Design Mock v1.1 実装・検証報告

検証日：2026-09-08。判定は実施した検証に基づく `PASS / FAIL / NOT RUN`。

最終確認：2026-09-09。中断前の検証結果を再確認し、最後のTablet Hero調整後の320／768／1024pxブラウザ画像を目視確認。見出し・予約導線・人物写真の重なりなし。必須の残作業なし。

## 完成物

`src/` にv1.1指定の26主要HTMLを実装。Public 8、Reservation 5、Auth 4、Member 3、Admin 6。画面一覧は [src/content/routes.json](src/content/routes.json)。Privacy／利用条件は共通Footerの開閉セクションに実装。

起動：`node scripts/serve.cjs` → http://127.0.0.1:4173/

会員デモは `demo@example.com`、管理者デモは `admin@example.com`。パスワード例はともに `demo1234`。新規登録も可能。パスワードは保存しない。詳しい起動・再生成・検証・初期化手順は [README.md](README.md)。

## Sourceと設計判断

- 指定の4文書を順番に確認後、Source ZIPを展開。SHA-256は `8b629122cff4bf56ae13498cd0f26941da59bae48c3515410c080bf756302206` と一致。
- ZIP、展開した原本、v1.1設計資料を保持。制作依頼書・掲載原稿それぞれのDOCXテキストと同梱HTMLの一致も確認。
- 支給HTMLから `src/content/source.json` を抽出し、共通テンプレートで静的Public HTMLを生成。院名・住所・連絡先・診療／受付時間・休診・診療科目・院長挨拶・7診療内容・スタッフ4名の経歴／コメント・11FAQ・初期5記事を保持。
- 初期お知らせ本文の年月日・曜日を現在の暦へ書き換えず、支給原稿である旨を詳細に付記。投稿日時が未支給の初期記事には日時を創作していない。
- Warm White／Sage／濃緑、OSフォント、余白と罫線を基準とした共通Design System。TOPを1440px／390pxで先に目視し、下層へ展開。
- Desktopの写真＋本文の非対称構成に対し、Mobileは読み順・診療時間表・管理リストを再構成。日時選択では選択日時と次の操作を画面下に表示。
- 地図は支給画像を使った明示的な参考Map。架空住所への外部地図リクエストは行わない。
- 支給の診療対話・人物・診療イメージ写真を使用。病院外観を実設備として掲載せず、医療事務の役職を誤認させる写真も使用していない。新規画像生成なし。
- 細かい確認・変更・取消・News編集は同じ画面内の状態やdialogを使用。48画面、IndexedDB transaction、監査ログ、MFA等は追加していない。

## Mock機能と境界

実装：空き／残少／満枠／停止／受付終了、日時選択、予約入力→確認→完了、会員登録→確認→完了、Demo Login／Logout、Memberの今後の予約／履歴／詳細／変更／取消、Adminの集計／予約状態／枠の開放・停止・定員／Newsの下書き・公開／会員検索・状態変更。

`Page Controller → Service → LocalStorageMockRepository` に分離。予約・枠・News・会員を一つのMock Repositoryで管理し、`BroadcastChannel` と `storage` イベントで別タブへ更新を反映。BroadcastChannelが保存反映より先に届くケースに備え、通知を50msまとめてから読み直す。保存直前には枠の最新状態を再確認し、満枠・停止時は成功扱いにせず入力を保持する。

## 受入判定

必須ゲートに未解消のFAILなし。以下のPASSはWindows上のインストール済みChromeで実施した検証の範囲を示す。実機・全ブラウザ・正式な規格認証までを意味しない。

| ID | 判定 | 確認内容・証跡 |
|---|---|---|
| AC01 | PASS | 26HTMLをブラウザで開き、致命的404・asset切れなし。`static-browser.json` |
| AC02 | PASS | Sourceの本文／基本情報と照合。DOCX／HTMLも照合。`accessibility-results.json`, `edge-results.json` |
| AC03 | PASS | TOPの8本文セクションとFooterの順序をDOM・目視確認 |
| AC04 | PASS | 6記事公開時にTOPは5件、一覧は6件。E2E-03 |
| AC05 | PASS | TOPに原稿1〜4、診療内容ページに1〜7。本文の自動照合 |
| AC06 | PASS | 当院全文・スタッフ4名の原稿／役職／経歴を保持。写真Crop目視 |
| AC07 | PASS | TOP／Access双方の参考Map・住所・駅・駐車場を確認 |
| AC08 | PASS | 支給素材、WebP quality 90、原本保持、写真用途を目視 |
| AC09 | PASS | TOP／Public下層／予約／Member／Adminの共通配色・写真・余白・文字組みを目視 |
| AC10 | PASS | Hero初回アニメーション、IntersectionObserverのsection reveal、操作feedback。元内容は静的HTML |
| AC11 | PASS | reduced-motionでanimationなし・smooth scrollなしをブラウザcomputed styleで確認 |
| AC12 | PASS | 26画面（入力／確認状態を含む）×320/375/390/430/768/1024/1280/1440pxで全体横scrollなし。主要12画面をDesktop／Mobile目視 |
| AC13 | PASS | Body 18px、input/select/textarea 16px以上を計測。主操作48px以上、Mobile目視 |
| AC14 | PASS | Public下固定導線、予約枠専用の下部操作、フォーム／Adminとの区別を目視・E2E確認 |
| AC15 | PASS | 全8Public系をJavaScript無効で開き、基本情報とFooter navigationを確認 |
| AC16 | PASS | Skip／Menu／FAQ／予約日時／Login／Form／Admin保存をKeyboardで操作。dialogはnative動作 |
| AC17 | PASS | focus-visible outline、Skip先、Menu Escape後のfocus復帰、sticky領域とscroll marginを確認 |
| AC18 | PASS | lang=ja、main/H1各1、ID重複なし、入力のlabelを26画面で確認。fieldset/legend・native dialog使用 |
| AC19 | PASS | Mobile MenuのEnter／Tab／Escape／focus復帰。JS無効時はFooterに全Public導線 |
| AC20 | PASS | 支給11FAQ＋追加FAQをKeyboardで開閉。JS無効でも動作 |
| AC21 | PASS | 必須入力・メール形式・電話桁数・同意・パスワード長。エラー概要と入力保持。E2E／Keyboard検証 |
| AC22 | PASS | 読込／保存中、空結果、保存破損エラー、入力エラー、登録・予約成功を区別 |
| AC23 | PASS | 未ログインで空き閲覧。Open／Low／Full／Closed／Pastを文字と操作状態で区別 |
| AC24 | PASS | E2E-01：TOP→診療／時間→予約→Login→入力→確認→完了→Member |
| AC25 | PASS | 選択日時・患者情報を確認後、同じ予約IDでMemberに反映 |
| AC26 | PASS | 確認画面表示後に別タブで枠停止→確定失敗→入力画面で値を回復 |
| AC27 | PASS | Mobile新規登録→確認→完了→予約継続。実メールなしの表示 |
| AC28 | PASS | Demo Login／Logout、会員停止、localStorage/sessionStorageに入力passwordなし |
| AC29 | PASS | seedの過去来院履歴と取消履歴。医療情報の生成なし |
| AC30 | PASS | Member詳細で変更・取消。再読込／Admin側との状態一致 |
| AC31 | PASS | D01〜D06の表示・共通Design System・主要操作 |
| AC32 | PASS | E2E-04：Admin予約状態変更→Member／詳細へ反映 |
| AC33 | PASS | 枠の開放・停止・定員変更。予約済み人数未満への減員を拒否 |
| AC34 | PASS | E2E-02＋BroadcastChannel単独＋storage fallback単独の別タブ検証 |
| AC35 | PASS | E2E-03：作成→下書き非表示→公開反映。支給5記事は複製編集のみ |
| AC36 | PASS | 会員検索、Active／Suspended更新。利用停止後のMember表示を確認 |
| AC37 | PASS | 予約・取消・News・会員状態のlocalStorage保存と再読込 |
| AC38 | PASS | 開発用初期化手順をREADMEに用意。患者向け画面にreset操作を追加していない |
| AC39 | PASS | 新規installなし。既存Playwright／sharpのみを検証・変換に使用。サイト依存／CDNなし |
| AC40 | PASS | 主要E2Eでpageerror／重大console error 0。全JSのsyntax check |
| AC41 | PASS | 全26HTMLのinternal link／asset存在、Publicのページ内anchorを確認。切れ0 |
| AC42 | PASS | `/mock/hp/sato/`でTOP→予約→枠、assetとmodule由来のリンクを検証 |
| AC43 | PASS | Controller／Service／Repository分離。Repository内にDOM操作なし |
| AC44 | PASS | Hero 800/1600px srcset、eager/fetchpriority、下部lazy、寸法／aspect-ratio、画像decodeを確認 |
| AC45 | PASS | 本報告・README・検証JSON・ブラウザ画像を保存 |

## E2E結果と証跡

E2E-01〜05：すべてPASS。実ブラウザで実際のDOM操作を実行。フォーム値／同意／状態選択／保存ボタンを通し、内部Serviceの直接呼出しで主要Flowを代替していない。

- [E2E結果](output/playwright/e2e-results.json)：主要Flow、競合、登録、変更／取消、保存、fallback。重大JS error 0。
- [26画面の機械検証](output/playwright/static-browser.json)：internal link切れ0、全体横scroll 0、console error 0。
- [入力状態を含む最終検証](output/playwright/final-results.json)：26×8幅、ラベル・ID・文字サイズ・画像decode。
- [Accessibility・Source検証](output/playwright/accessibility-results.json)：Keyboard、JS無効、reduced-motion、200%テキスト、subpath、原稿照合。
- [境界条件検証](output/playwright/edge-results.json)：BroadcastChannel単独、容量制約、seed保護、破損データ、DOCX照合。

ブラウザ目視は1440px／390pxで、TOP、診療内容、当院について、Access、予約枠、予約Form、Login、Member、Admin Dashboard、予約管理、予約枠管理、News管理の12画面を実施。さらにTOP下部、診療詳細、スタッフ、予約操作部分、Admin入力部分を確認。`output/playwright/review-*.png` が比較用画像、各画面の全体画像も同フォルダに保存。

追加でTOP／予約枠／Admin枠管理を320px／768px／1024pxでも目視。768pxのHeroは見出しと人物が近づくため、Tabletでも見出しと写真を上下に分けて再確認。比較画像は `review-widths-*.png`。

## WebP結果

既存sharpによりquality 90で派生生成。Heroは元JPEG 582,874 bytesに対し、1600px版87,268 bytes、800px版32,590 bytes。使用画像はすべてローカル配信。ロゴは支給PNGを保持。元ZIP・展開JPEG／PNGは未改変。

## 既知制限・本番との差

- Frontend Design Mock。Backend／API／DB、実メール、本物の認証、複数端末同期、本番公開は実装していない。
- localStorageはユーザーが変更できる。Demoのログイン状態・管理者状態はセキュリティ境界ではない。実際の個人情報を保存する用途には使えない。
- 保存直前の再確認は簡易Mock。複数タブの完全同時書込みに対するtransactionや厳密な冪等性は提供しない。
- 予約枠は初回生成日から約28日分。長期間経過後はREADMEの初期化を行う。固定の祝日休診ルールを追加していない。
- 標準のブラウザ保存が使用できない／壊れた場合は明示的なエラー。自動的に元データを破壊してresetしない。
- Mapは支給画像の参考表示。実所在地や経路の保証・外部Google Maps埋込みではない。
- JS無効時は支給原稿を閲覧可能。Mock予約操作やAdmin作成記事の動的反映にはJSが必要。
- OSフォントを使用するため、OS間で字形・改行に差が生じる。
- HTMLは標準Nodeによる生成。外部HTML validator／正式なWCAG適合認証を受けたとの主張はしない。

## NOT RUN

| 項目 | 理由 |
|---|---|
| 実機iPhone／Android、Safari／Firefox、VoiceOver等のスクリーンリーダー | 今回はWindows ChromeのViewport／Keyboard／DOM検証。実機・他エンジンの環境検証は未実施 |
| Lighthouseスコア、回線制限下の本番Core Web Vitals | 本番環境がなく、追加installは行わない。静的画像最適化と実ブラウザ読込まで確認 |
| 本番Backend／メール／認証／複数端末Realtime／医療広告の法的最終適合性 | v1.1の実装Scope外 |

未解消の必須FAIL：なし。上記NOT RUNをPASSとして扱っていない。
