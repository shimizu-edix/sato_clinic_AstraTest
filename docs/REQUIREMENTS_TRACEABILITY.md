# 佐藤医院 Requirements Traceability v1.1

凡例:

- `SOURCE`: 元の制作依頼書/掲載原稿
- `USER`: ユーザー追加または上書き指示
- `DESIGN`: v1.1で採用した設計判断
- `DEMO`: HTML Mock用の仮設定。本番医院ルールではない

|ID|種別|Requirement|主な実装先|Validation|
|---|---|---|---|---|
|R01|SOURCE|Public必須6系統|P01〜P07|各ページ存在・リンク切れなし|
|R02|SOURCE|お知らせ一覧・詳細|P02/P03|初期5記事表示、詳細遷移|
|R03|SOURCE|TOP順序|P01|DOM/可視順を確認|
|R04|SOURCE|TOP News最大5件|P01|Publishedが6件以上でも5件|
|R05|SOURCE|TOP診療内容1〜4|P01/P04|TOPは1〜4、詳細は1〜7|
|R06|SOURCE|当院について概要と全文|P01/P05|原稿欠落なし|
|R07|SOURCE|診療時間・受付時間・休診|P01/P06/Footer|Sourceと一致|
|R08|SOURCE|MapをTOP/P06へ|P01/P06|両方に地図/代替表示|
|R09|SOURCE|公共交通・駐車場|P06/P01|JR上野駅徒歩5分・10台|
|R10|SOURCE|お知らせを医院側で更新|D05→P01/P02|Published反映|
|R11|SOURCE|Responsive|全画面|320〜1440px確認|
|R12|SOURCE|白 + 淡Green/Blue|Design System|tokenと代表画面|
|R13|SOURCE|高齢者への可読性|全画面|本文18px目安、48px操作域|
|R14|SOURCE|モットーを目立たせる|P01 Hero|H1表示|
|R15|SOURCE|支給写真を活用|Public|Image Strategyと目視|
|R16|SOURCE|原稿を原則改変しない|Public content|Source差分確認|
|R17|USER|ユーザー指示を元要件より優先|全体|競合時のDecision確認|
|R18|USER|新規機能に必要な文章生成可|Reservation/Auth/Member/Admin|事実捏造なし|
|R19|USER|必要なら新規画像生成可|任意|実スタッフ/設備の捏造なし|
|R20|USER|TOP/下層へ現代的な表現追加可|Public|Motion/Editorial layout確認|
|R21|USER|Web予約必須|R01〜R05|E2E予約|
|R22|USER|予約空き状況|R02|Open/Low/Full/Closed等|
|R23|USER|予約Form→確認→完了|R03〜R05|入力保持・完了表示|
|R24|USER|会員登録|A01〜A03|登録→完了|
|R25|USER|ログイン|A04|Demo login|
|R26|USER|会員マイページ|M01|次回/今後の予約|
|R27|USER|利用履歴|M02|過去履歴表示|
|R28|USER|管理者ページ|D01〜D06|全画面存在|
|R29|USER|予約管理|D03|状態変更→Member反映|
|R30|USER|予約枠管理|D04|枠変更→R02反映|
|R31|USER|お知らせ管理|D05|Draft/Publish→Public反映|
|R32|USER|会員管理|D06|検索/状態表示|
|R33|USER|適切なJS|全体|Menu/Accordion/Reveal/Form/Slot等|
|R34|USER|HTML/CSS/JS主体|全体|Framework installなし|
|R35|USER|新規install禁止|全体|package追加なし|
|R36|USER|CDNは必要な場合のみ|全体|不要CDNなし|
|R37|USER|WebP quality90基準|assets|変換可否と生成物確認|
|R38|DESIGN|Heroは自動carouselなし|P01|時間で重要情報が消えない|
|R39|DESIGN|subtle Hero motion|P01|reduced-motionで停止|
|R40|DESIGN|Section reveal|Public|JSなしでも内容可視|
|R41|DESIGN|Mobile固定Action|Public Mobile|フォームでは邪魔しない|
|R42|DESIGN|診療イメージGallery/Carouselは1箇所程度|P04/P05/P08いずれか|manual / scroll-snap、autoなし|
|R43|DESIGN|Service/Repository分離|JS|DOMとStorage責務分離|
|R44|DESIGN|localStorage Mock|Reservation/Auth/Member/Admin|再読込後もDemo状態保持|
|R45|DESIGN|BroadcastChannel疑似リアルタイム|R02/D04等|同一origin別タブ反映|
|R46|DESIGN|storage event fallback|同上|BroadcastChannelなしでも更新|
|R47|DESIGN|PublicはJS障害でも基本情報閲覧可|Public|JS off確認|
|R48|DESIGN|Adminの過剰業務機能を実装しない|Admin|監査ログ/MFA/複雑権限なし|
|R49|DESIGN|約26主要画面にScope縮小|全体|Page Matrixと一致|
|R50|DESIGN|相対Path/Subpath対応|全体|`/mock/hp/sato/`相当で確認|
|R51|DESIGN|Accessibility|全体|keyboard/focus/label/reduced motion|
|R52|DESIGN|Backend境界は設計のみ保持|JS docs|ApiRepository差替え可能構造|
|R53|DEMO|予約期間/間隔/定員等は仮値|Mock config|Public原稿に医院ルールとして混ぜない|
|R54|DEMO|本物の認証/メール/DBではない|Auth/Admin UI|デモ表記|
|R55|DEMO|同一ブラウザ疑似リアルタイム|Reservation/Admin|別端末同期と誤認させない|

## Scope Reduction from v1.0

以下はv1.0では詳細設計されていたが、v1.1の必須実装から外す。

- 48独立URL
- IndexedDB transactionの完全実装
- Idempotency Key永続化
- Audit Log画面
- Admin 3段階Roleの厳密権限Matrix
- Admin Demo管理画面
- Password Reset一式
- Email Verification一式
- Member変更/取消の複数独立HTML
- Slot Template一括運用画面
- Day Schedule業務画面
- 本番同時実行制御の再現

これらは将来Backendを実装する際のArchitecture Considerationとしてv1.0を参照可能だが、今回のDesign Mockの完成条件には含めない。
