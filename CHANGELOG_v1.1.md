# CHANGELOG v1.1

## Purpose

v1.0の要求分析・Benchmark・Source確認を維持しつつ、今回の成果物を「本番業務システムの試作」ではなく「完成度の高いHTML/CSS/JavaScript Design Mock」へ適正化した。

## Main Changes

### Scope

- 48独立画面 → 約26主要画面。
- Admin 16画面 → 6主要画面。
- Memberの変更/取消は多数の独立HTMLではなく、予約詳細内Stateでも実装可能。
- Password Reset / Email Verificationの本格Flowを必須から除外。

### Data / Backend Simulation

必須から除外:

- IndexedDB transaction完全実装
- Idempotency Key永続化
- Audit Log
- Admin多段Role Matrix
- Slot Template/Day Schedule業務機能

維持:

- Service / Repository boundary
- localStorage Mock
- BroadcastChannel
- storage event / focus refresh fallback
- 将来ApiRepositoryへ差替える設計

### Visual

v1.0よりDesign表現を強化。

- subtle Hero motion
- section reveal
- button/card micro interaction
- Editorial layout
- Mobile向けmanual Gallery/scroll-snap Carouselを1箇所程度許可
- TOP以外の下層にもVisual rhythmを要求

自動Hero carousel、背景動画、強いparallax等は不採用を維持。

### Images

- 支給画像優先。
- Medical/Patient画像は「診療イメージ」として適切なら利用可能。
- 新規生成画像も許可されているが、実スタッフ/建物/設備/実績の捏造は禁止。
- 新規画像なしでも完成できることを優先。

### Acceptance

- 58項目 + 重い同時実行検証 → 45項目 + E2E 5本へ整理。
- Design Mockとして重要なPublic、Responsive、Reservation、Member、Admin、same-browser realtime、Accessibilityを重点化。
