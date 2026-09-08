# Codex Start Prompt

このWorkspaceにある佐藤医院Webサイト制作資料をSource of Truthとして、Frontend Design Mockの実装・検証まで自律的に完了してください。

最初に以下を順番に読み、内容を把握してください。

1. `docs/MASTER_SPEC.md`
2. `docs/REQUIREMENTS_TRACEABILITY.md`
3. `docs/ACCEPTANCE_CRITERIA.md`
4. `docs/CODEX_HANDOFF.md`
5. `source/sato-clinic-reqkit.zip`

元Source ZIPのSHA-256は以下です。

`8b629122cff4bf56ae13498cd0f26941da59bae48c3515410c080bf756302206`

## 実装方針

- v1.1設計を今回の実装Scopeの正本としてください。
- v1.0に存在した48画面、IndexedDB transaction、監査Log、MFA、厳密な冪等制御等の過剰Scopeを復活させないでください。
- HTML / CSS / Vanilla JavaScriptを基本としてください。
- 新規package/dependencyのinstallは禁止です。
- 不要なCDNも追加しないでください。
- 元の制作依頼書・掲載原稿の医院固有事実と確定原稿は、ユーザーの明示的な上書きがない限り改変しないでください。
- 元資料で想定されていない予約・会員・Admin等のUI copyは、全体の世界観を守って新規作成して構いません。
- 支給画像を優先し、必要な場合のみ追加画像を検討してください。実スタッフ、実建物、実設備、治療実績を捏造する画像は作らないでください。

## 品質目標

単に要件を満たした教材サイトではなく、地域密着型クリニックとしての安心感・信頼感を保ちながら、2026年時点で見ても古く感じないデザイン品質にしてください。

特に以下を重視してください。

- 写真、余白、Typography、Editorial layout
- TOPだけでなく下層まで一貫したDesign System
- ReservationはModern Web Appとして分かりやすいUI
- MobileをDesktopの縮小版にしない
- Sticky Header、subtle Hero motion、section reveal、button feedback、FAQ Accordion、Form state等の意味のあるInteraction
- `prefers-reduced-motion`
- Accessibility
- Responsive

## Mock機能

以下は実際に操作できる状態まで作ってください。

- 予約空き状況
- 日時選択
- 予約Form → 確認 → 完了
- 会員登録 → 確認 → 完了
- Demo Login
- Member Dashboard
- 過去の予約・利用履歴
- Admin Dashboard
- 予約管理
- 予約枠管理
- News管理
- 会員管理
- localStorageによるMock persistence
- BroadcastChannel等による同一ブラウザ内の疑似リアルタイム反映

本物のBackend/API/DB、実メール、本物の認証、複数端末Realtimeを実装したとは扱わないでください。

## 進め方

`docs/CODEX_HANDOFF.md`のStep 0〜9に沿って進めてください。

TOPを最初のVisual Benchmarkとして実装し、Desktop/Mobileのブラウザ目視でDesign Directionを固めてから下層へ展開してください。

軽微なUI・CSS・Component分割等について、都度ユーザー確認を求めず自己判断して進めてください。

実装後は`docs/ACCEPTANCE_CRITERIA.md`に従い、機械検証とブラウザ目視を行ってください。FAILがあれば修正して再検証してください。

未確認項目をPASSとして扱わないでください。

## 終了条件

- 必須要件を実装済み
- 主要E2Eが動作
- Desktop/Mobileの主要画面を目視済み
- Internal link切れなし
- 重大なJavaScript errorなし
- 予約/Admin/MemberのMockデータが相互連動
- 疑似リアルタイム反映を確認
- 元原稿・基本情報を保持
- `IMPLEMENTATION_REPORT.md`にPASS/FAIL/NOT RUN、既知制限、本番との差を記録

ここまで自律的に実装・修正・検証を完了してください。
