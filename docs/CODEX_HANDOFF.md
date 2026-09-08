# 佐藤医院 Codex Implementation Handoff v1.1

このファイルはCodex実装フェーズの開始点。

## 1. Source of Truth

読む順番:

1. Project/Userの最新指示
2. `docs/MASTER_SPEC.md`
3. `docs/REQUIREMENTS_TRACEABILITY.md`
4. `docs/ACCEPTANCE_CRITERIA.md`
5. `source/sato-clinic-reqkit.zip` 内の制作依頼書・掲載原稿・画像

元Source ZIP SHA-256:

`8b629122cff4bf56ae13498cd0f26941da59bae48c3515410c080bf756302206`

v1.0は設計検討履歴として有用だが、実装Scopeはv1.1が優先。v1.0の48画面/IndexedDB/監査ログ等を復活させない。

## 2. Goal

HTML/CSS/Vanilla JavaScriptを中心に、佐藤医院のFrontend Design Mockを完成させる。

完成物は以下を含む。

- 元要件のPublicサイト
- 現代的でデザイン性のあるResponsive UI
- Web予約
- 予約空き状況
- 会員登録/Login
- Member Dashboard / History
- Admin Dashboard
- Reservation / Slot / News / Member管理
- localStorageによるMock persistence
- BroadcastChannel等による同一ブラウザ疑似リアルタイム
- 将来APIへ差替えやすいService/Repository境界

## 3. Non-goals

以下を本番相当へ作り込まない。

- 本物のBackend/API/DB
- 本物のauthentication
- 実メール送信
- 本物の複数端末Realtime
- IndexedDB transactionの完全業務再現
- Idempotency/Audit/MFA/細かなRole Matrix
- Payment/EHR/medical diagnosis

## 4. Important Rules

- ユーザーの最新指示が元制作依頼書より優先。
- Sourceの医院固有事実は勝手に変更しない。
- Sourceの確定原稿は原則維持。
- 元資料にないUI copyは作成可能。
- 新規画像も許可されているが、生成できなくても完成を止めない。支給素材だけで成立させる。
- 実在スタッフ/建物/設備/治療実績を新規画像で捏造しない。
- 新規dependency/package install禁止。
- Font/Icon/Slider libraryのためだけのCDN導入は避ける。
- 相対Pathでsubpath hostingに耐える。
- PublicはJSが失敗しても重要情報を読める。
- `prefers-reduced-motion`対応。
- 予約/会員/Adminは明確にDemoであり本番システムではない。

## 5. Autonomous Execution Policy

以下は確認を求めず自己判断して進めてよい。

- spacingの微調整
- breakpointの数px程度の調整
- object-position
- grid/flexの具体値
- hover/focus/micro motionの細部
- iconをCSS/SVGで作る判断
- component/file分割
- Demo seed dataの表示用ID
- Form error copy
- localStorage key naming
- Browser検証で見つかった軽微な修正

以下の場合だけ作業を止める、または進められる範囲を完了して明示する。

- Source同士に解釈不能な重大矛盾
- Source ZIP/必要ファイルが実際に読めず、正確な原稿再現が不可能
- installなしでは必須機能を実装不能
- ユーザーData/外部サービスへの実送信が必要
- 既存の重要成果物を破壊する必要がある

軽微な曖昧さは合理的なDesign Decisionを行い、最終報告へ記録する。

## 6. Implementation Order

### Step 0: Inspect

- Source ZIP展開/確認。
- v1.1 docs確認。
- 現在のWorkspace/既存成果物を確認。
- installはしない。

### Step 1: Foundation

- directory作成。
- CSS tokens/base/layout/components。
- content master。
- Header/Footer/Breadcrumb/Button/Card/Form等。
- Responsive shell。
- accessibility foundation。

### Step 2: TOP First

TOPを最初のvisual benchmarkとする。

実装後に少なくとも390pxと1440pxでBrowser目視し、以下を確定する。

- Typography
- spacing
- color
- Hero composition
- photo crop
- card/section rhythm
- Sticky Header
- Mobile fixed actions
- subtle motion

TOPが古臭い、テンプレート的、Cardの羅列に見える場合は、下層量産前に改善する。

### Step 3: Public Pages

P02〜P08を展開。

- 原稿保全。
- About/Medicalは長文をEditorialに整理。
- FAQはAccordion。
- 診療イメージGallery/Carouselを使う場合は1箇所程度、manual/scroll-snap中心。
- Map fallbackを用意。

### Step 4: Mock Architecture

- `mock-data.js`
- Repository interface
- `LocalStorageMockRepository`
- `ReservationService`
- `AuthService`
- `MemberService`
- `NewsService`
- `AdminService`
- update event channel

Storeは単純で理解できるschemaを優先する。

### Step 5: Reservation/Auth/Member

R01〜R05、A01〜A04、M01〜M03。

- 未ログイン空き閲覧。
- 予約確定前にLogin/Register。
- Form validation。
- Confirm/Complete。
- Memberへ反映。
- History。
- Demo取消/変更はM03内Stateでも可。

### Step 6: Admin

D01〜D06。

- Patient siteと同じtoken。
- 情報密度だけ上げる。
- Reservations/Slots/News/Membersを実操作可能にする。
- Slot変更とNews PublishをPublic/Memberへ反映。

### Step 7: Same-browser Realtime

- `BroadcastChannel`を利用可能なら使用。
- update後はChannelで「変更があった」ことだけ通知し、受信側はRepositoryから再読込。
- fallbackとして`storage` eventまたはwindow focus時refresh。
- 「リアルタイム予約システム」とは称さず、「同一ブラウザ内Demo」とする。

### Step 8: Images

- 既存環境に変換手段があるか確認。
- ある場合: JPEG→WebP quality 90基準、複数size生成。
- ない場合: 新規installしない。元画像を利用し、未変換を最終報告へ記録。
- Image qualityのために作業全体を停止しない。

### Step 9: Verification

`ACCEPTANCE_CRITERIA.md`に従う。

最低限:

- HTML/JS/CSS static checks
- console errors
- internal links
- main E2E
- 320/390/768/1024/1440
- keyboard
- reduced-motion
- same-browser realtime
- subpath
- Desktop/Mobile browser visual QA

具体的なFAILを修正して再確認する。

## 7. Visual Quality Bar

「要件を満たしただけの教材サイト」にしない。

求める状態:

- Heroを見た時点で地域密着型クリニックとして安心感がある。
- TOPは写真・余白・Typographyにリズムがある。
- 下層も単なる白背景+Cardの連打ではない。
- 予約UIは医療サイトというより、分かりやすいModern Web Appの品質。
- Adminは別製品に見えず、同じDesign Systemの業務UI。
- Motionは「気づかせる/反応を返す」ために使い、見せびらかさない。
- MobileはDesktopの縮小版ではなく、読順と操作が再構成されている。

## 8. Technical Quality Bar

- Vanilla JSのglobal汚染を避ける。
- `type="module"`を利用可能。
- Storage accessを画面ごとに直接乱立させない。
- user-facing dataとDemo configを分離。
- Source textと追加UI copyを分離できる構造が望ましい。
- `innerHTML`の乱用を避ける。User入力はtextとして扱う。
- asset pathは相対化。
- no unnecessary external dependencies。

## 9. Deliverables

最低限:

- 完成したサイト一式
- docs v1.1
- source ZIPまたはSource参照
- 必要なら簡潔な`README.md`
- 検証結果`IMPLEMENTATION_REPORT.md`

`IMPLEMENTATION_REPORT.md`には以下を書く。

- 実装した範囲
- 主要Design Decision
- AC PASS/FAIL/NOT RUN概要
- Browser visual QA対象
- WebP変換結果
- Known limitations
- 本番Backendとの差

## 10. Done

以下の状態で終了。

- AC必須ゲートFAILなし。
- 主要E2E完了。
- TOP/主要下層/Reservation/AdminをDesktop/Mobileで目視済み。
- Source原稿・基本情報を壊していない。
- 予約/Admin/MemberがMockとして相互に連動する。
- Consoleに重大errorなし。
- 未確認をPASS扱いしていない。

完了報告は端的に、実際に確認した事実を中心に行う。
