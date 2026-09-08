# 佐藤医院 Acceptance Criteria v1.1

目的: HTML/CSS/JavaScript Design Mockとして、要件・デザイン・操作・Responsive・Mock連携が成立していることを確認する。

判定は `PASS / FAIL / NOT RUN`。未確認をPASSにしない。

## 1. 必須ゲート

以下のいずれかがFAILなら完成扱いにしない。

- 元要件のPublicページ/原稿/基本情報
- TOP基本順序
- Reservation/Auth/Member/Adminの主要Flow
- Internal link
- Mobile重大崩れ
- JavaScript runtime error
- Formの重大操作不能
- 予約枠変更のMock反映
- keyboardで主要操作不能

## 2. Public / Design / Responsive

|ID|検証|PASS条件|
|---|---|---|
|AC01|主要26画面を列挙して開く|全主要HTMLが存在し、致命的404/asset切れなし|
|AC02|制作依頼書・掲載原稿とPublicを照合|医院名、人物、住所、電話、診療/受付、FAQ、診療内容、お知らせ等に意図しない改変なし|
|AC03|TOP可視順|Hero→診療時間→お知らせ→院長挨拶→診療内容→当院について→スタッフ→アクセス→Footer|
|AC04|TOP News|Publishedを最大5件表示。6件目以降は一覧へ|
|AC05|診療内容|TOPは原稿1〜4、P04は1〜7|
|AC06|当院/スタッフ|P05に必要な確定原稿。役職・氏名の誤認なし|
|AC07|Map/Access|TOP/P06双方に地図または明示的な参考Map UI。住所/駅/駐車場は常時読める|
|AC08|画像|支給画像優先、WebP派生が可能なら品質90基準。実設備/実人物と誤認させる使い方なし|
|AC09|Visual Direction|白/淡緑を中心に統一。写真・余白・Typography・Editorial layoutで現代的な表現|
|AC10|Motion|Hero subtle motion、section reveal等が機能。重要情報は初期状態から取得可能|
|AC11|Reduced Motion|`prefers-reduced-motion`で移動/拡縮/smooth scroll停止。機能欠落なし|
|AC12|Responsive|320/375/390/430/768/1024/1280/1440で主要画面に重なり・切断・通常ページ全体横scrollなし|
|AC13|Typography/Touch|本文約18px、input16px以上、主要操作48x48px目安|
|AC14|Mobile Actions|Publicの電話/診療時間/Web予約導線が見つけやすい。フォームやAdminで邪魔しない|
|AC15|JS Off/Failure|Publicの基本原稿・診療時間・住所等は閲覧可能|

## 3. Interaction / Accessibility

|ID|検証|PASS条件|
|---|---|---|
|AC16|Keyboard|Header/Nav/FAQ/Form/Modal/予約枠/主要Admin操作をkeyboardで到達・操作可能|
|AC17|Focus|`:focus-visible`が可視。Sticky UIにfocusが隠れない|
|AC18|Semantics|`lang=ja`、main、H1、label、fieldset/legend等が概ね適切|
|AC19|Mobile Menu|開閉、Escape、focus復帰。JS失敗時にもPublic navigationへ到達可能|
|AC20|FAQ|native details/summary等で全FAQを操作可能|
|AC21|Form Validation|不足/不正が具体的に表示され、入力値を失わず修正できる|
|AC22|State UI|Loading/Empty/Error/Successが「空データ」と「失敗」を混同しない|

## 4. Reservation / Auth / Member

|ID|検証|PASS条件|
|---|---|---|
|AC23|空き確認|未ログインでもR02で空き/残少/満枠/停止等を区別できる|
|AC24|予約E2E|R01→R02→Login/Register→R03→R04→R05→M01が連続操作できる|
|AC25|予約確定|選択日時・患者/予約者が確認でき、確定後に同じ予約がMemberへ反映|
|AC26|競合簡易Mock|保存直前に枠を再確認し、満枠/停止なら成功扱いせず入力を回復できる|
|AC27|会員登録|A01→A02→A03が機能。実メール送信や本物認証と誤認させない|
|AC28|Login|Demo login/logoutが機能し、passwordをlocalStorage等へ平文永続保存しない|
|AC29|History|M02に過去予約/利用履歴。診断・処方・検査結果等を捏造しない|
|AC30|Reservation Detail|M03で予約内容が確認でき、Demo取消/変更を行う場合は状態が他画面と一致|

## 5. Admin / Mock Data / 疑似リアルタイム

|ID|検証|PASS条件|
|---|---|---|
|AC31|Admin pages|D01〜D06が同一Design Systemで操作可能|
|AC32|Reservation Admin|D03で状態変更するとMember側表示に反映|
|AC33|Slot Admin|D04でOpen/Closed/capacity等を変更するとR02へ反映|
|AC34|Same-browser realtime|同一originの別タブで`BroadcastChannel`通知により更新を検知。fallbackとしてstorage eventまたはfocus時再読込|
|AC35|News Admin|D05でDraft/Publishedを切替。PublishedのみP01/P02へ反映、TOP最大5件|
|AC36|Member Admin|D06で会員を検索/状態表示できる。架空の医療情報を追加しない|
|AC37|Persistence|再読込後もDemo予約・News・会員状態がlocalStorageから復元|
|AC38|Demo reset|必要なら開発用reset手段を用意。患者向けUIに内部実装情報を露出しない|

## 6. Technical / Delivery

|ID|検証|PASS条件|
|---|---|---|
|AC39|Dependency|新規package/dependency installなし。不要CDNなし|
|AC40|Console|主要Flowで未処理例外・重大console errorなし|
|AC41|Internal Links|主要導線リンク切れ0|
|AC42|Subpath|`/mock/hp/sato/`相当のsubpathでasset/internal linkが壊れない|
|AC43|Service Boundary|Page Controller→Service→Repositoryの責務が概ね分離。Storage処理が各画面へ散在しすぎない|
|AC44|Image Delivery|Heroに適切なsize、下部lazy、width/heightまたはaspect-ratio|
|AC45|Final Report|実装内容、検証PASS/FAIL/NOT RUN、既知制限、本番との差を簡潔に報告|

## 7. End-to-End必須シナリオ

最低限以下を連続操作する。

### E2E-01 Public → Reservation

TOP → 診療内容/診療時間確認 → Web予約 → 空き選択 → LoginまたはRegister → Form → Confirm → Complete → Member。

### E2E-02 Admin Slot → Patient Tab

患者側R02を開いたまま、別タブD04でslot状態を変更 → 患者側に更新通知/再取得 → 表示が一致。

### E2E-03 News Publish

D05で新規News作成 → DraftではPublic非表示 → Published → TOP/一覧反映 → TOPは最大5件。

### E2E-04 Reservation Status

D03で予約状態を変更 → M01/M03を再確認 → 同一予約の状態が一致。

### E2E-05 Mobile

390px前後でTOP → Reservation → Login/Register → Memberの主要Flowを操作。固定UIによる隠れ・誤操作なし。

## 8. Browser目視対象

最低限:

- P01 TOP
- P04 診療内容
- P05 当院について
- P06 診療時間・所在地
- R02 予約枠
- R03 Form
- A04 Login
- M01 Member
- D02 Admin Dashboard
- D03 Reservations
- D04 Slots
- D05 News

DesktopとMobile双方を見る。

## 9. 終了判定

以下を満たして実装完了とする。

- 必須ゲートにFAILなし。
- E2E-01〜05がPASS、または環境上実行不能ならNOT RUN理由を具体化。
- 見た目だけでなく、予約/会員/Admin/疑似リアルタイムが操作できる。
- 元原稿・医院事実を壊していない。
- Design DirectionがTOPだけでなく下層/業務画面まで一貫している。
- 未実装項目を隠して全面PASSと報告しない。
