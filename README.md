# ミクロ・ナース・トリートメント

**Micro Nurse Treatment**

人体内部へ侵入したミクロナースを操作し、患者ごとに異なる器官ルートを進みながら感染源や異常を治療する、Canvasベースの2D横スクロールSTGです。

患者ごとに「侵入ルート」と「身体状態」が異なり、背景だけでなく、スクロール、空間の動き、敵、環境音、イベント、ボスまで変化します。

## 起動方法

ビルド工程や外部ライブラリはありません。`index.html`、`style.css`、`game.js`、`assets/`を同じ構成でWebサーバーから配信します。

このプロジェクトではApache配下から以下へアクセスできます。

```text
http://localhost/MN/
```

画像やFullscreen APIを安定して利用するため、ローカルファイルとして直接開くよりHTTP経由を推奨します。

## 基本仕様

- 描画: HTML Canvas 2D
- 基準解像度: 960 x 540（16:9）
- 更新: 固定60fps、アキュムレータ方式
- PC操作とスマートフォン操作に対応
- ゲーム開始操作時に全画面化と横向き固定を試行
- ルート、患者状態、イベント、ボスをデータ中心で管理
- 背景画像が読み込めない場合はCanvas描画へフォールバック

スマートフォンの横向き固定は `Fullscreen API` と `Screen Orientation API` を利用します。OSやブラウザがAPIを拒否した場合は、CSSによる全画面相当のレイアウトへフォールバックします。

## 画面遷移

```text
title
  -> patientSelect
  -> briefing
  -> injection
  -> playing
  -> boss defeat
  -> extraction
  -> result
```

プレイヤーの残機がなくなった場合は `gameover` へ遷移します。

- `title`: タイトル画面
- `patientSelect`: 症例と患者の選択
- `briefing`: 症状、任務、ENTRY ROUTEの確認
- `injection`: 体内への投入演出
- `playing`: 通常エリア、ルートイベント、ボス戦
- `extraction`: 治療完了、体内正常化、主人公回収
- `result`: 治療結果と学習内容の表示

## 操作

### PC

| 操作 | キー |
|---|---|
| 移動 | 矢印キー / WASD |
| 決定・画面送り | Enter / Space |
| ボム | Shift |
| 症例変更 | 左右キー / A・D |

通常射撃は自動です。

### スマートフォン

- 左側の仮想スティックで移動
- 右側に攻撃、ボムボタンを表示
- タップで決定、画面送り
- 症例選択では左右領域または矢印で患者変更
- ゲーム開始時に全画面、横向き固定を要求

## 患者データ

患者は `game.js` の `PATIENTS` で管理します。

| 症例 | 診断 | routeType | route | condition |
|---|---|---|---|---|
| Patient 01 | 風邪ウイルス感染 | 呼吸器 | mouth -> throat -> lung | fever |
| Patient 02 | 食中毒による胃腸障害 | 消化器 | mouth -> esophagus -> stomach -> intestine | gastritis |
| Patient 03 | 心拍リズム異常 | 循環器 | vessel -> heart | smoker |
| Patient 04 | 神経信号異常 | 神経系 | brain | fever |
| Patient 05 | 末梢神経炎 | 神経 | nerve | dehydration |

主な患者プロパティ:

```js
{
  id,
  name,
  age,
  diagnosis,
  symptoms,
  mission,
  treatmentGoal,
  difficulty,
  routeType,
  route,
  condition,
  unlocked,
  learningSummary,
  areaDuration,
  stageModifier
}
```

`route` がステージの主ゲーム性を決め、`condition` は軽い補正として加算されます。

## エリアとルート

### AREAS

`AREAS` はすべての器官に共通する基礎データです。

- 表示名、医学メモ
- 基本色
- 基本敵
- gimmick
- scrollStyle
- ambience

実装済みエリア:

`mouth` / `throat` / `lung` / `esophagus` / `stomach` / `intestine` / `heart` / `vessel` / `brain` / `nerve` / `nest`

`nest` はルート外参照時のフォールバック用感染巣です。ボス戦では患者ルートの最終器官を維持します。

### ROUTES

`ROUTES` は器官固有のゲーム性を定義します。

```js
ROUTES = {
  heart: {
    background,
    ambient,
    particles,
    enemyPool,
    bossType,
    tint,
    bossHp,
    gimmickUpdate,
    events,
    briefingText
  }
}
```

固有設定を持つルートは `lung`、`stomach`、`heart`、`vessel`、`brain`、`nerve` です。それ以外は `AREAS` の値を利用するフォールバック構造です。

### 器官ごとのプレイ感

| route | 主な特徴 |
|---|---|
| mouth | 口内細菌、唾液・泡の表現 |
| throat | 嚥下による壁の圧迫、咳ギミック、下方向への軽い流れ |
| lung | 呼吸スケール、空気粒子、浮遊感、低重力 |
| esophagus | 蠕動する管状空間、縦方向の流れ、速めのスクロール |
| stomach | 胃酸波、泡、液体揺れ、微小な傾き |
| intestine | 狭い通路、壁接近、カーブ感 |
| vessel | 高速血流、狭い通路、横方向への軽い流し |
| heart | 心拍パルス、空間収縮、血流拍動 |
| brain | 神経発火、背景ノイズ、偽警告、軽いUIグリッチ |
| nerve | 電流ライン、通電パルス、レーザー障害物 |

brainルートの左右入力反転は操作ストレスが大きいため削除済みです。

## Route Event

route固有イベントは `ROUTE_EVENTS` で管理し、`ROUTES[route].events` から参照します。

- 低頻度で発生
- 1プレイ中に最大2回
- 数秒で終了
- 通常戦闘は継続
- 難易度上昇よりルートの記憶性を優先

| route | event |
|---|---|
| heart | heartbeatOverdrive / bloodRush |
| vessel | narrowFlow / clotRain |
| brain | hallucinationBurst |
| nerve | electricStorm / synapseFreeze |

処理は `startRouteEvent(eventId)` と `updateRouteEvent()` に分離されています。

## Patient Condition

身体状態は `CONDITION_MODIFIERS` で管理します。

実装済み:

- `healthy`
- `fever`
- `smoker`
- `gastritis`
- `dehydration`

conditionは以下へ軽く影響します。

- 背景tint
- 追加粒子
- 敵追加率
- 敵速度
- ボスHP
- ambient音
- HUD warning
- 胃炎時の胃酸表現

routeが主ゲーム性、conditionが軽いmodifierという優先順位を維持します。

## ボス

ルート終端の `bossType` から `BOSS_TYPES` を参照し、画像、登場通知、オーラ、粒子色、弾色を切り替えます。

| 最終route | bossType | 画像 |
|---|---|---|
| lung | viralCore | boss_cold_virus.png |
| stomach | toxinMass | boss_cold_virus.png |
| heart | giantClot | boss_blood_clot.png |
| vessel | vesselBlockage | boss_vessel_core.png |
| brain | brainTumor | boss_brain_tumor.png |
| nerve | electricParasite | boss_electric_parasite.png |

画像が使用できない場合は既存のCanvasボス描画へフォールバックします。ボス画像は円形クリップと色別の輪郭で描画します。

ボス撃破後は直接resultへ移らず、`extraction` で以下を実行します。

1. BIO SIGNAL STABILIZED
2. route異常演出の減衰
3. プレイヤー回収
4. MISSION COMPLETE
5. resultへ遷移

## パワーアップ

カプセル取得ごとに以下の順番で強化されます。

```text
SPEED -> NEEDLE -> CAPSULE -> SPRAY -> SHIELD -> HELPER
```

- SPEED: 移動速度上昇
- NEEDLE: 通常弾強化
- CAPSULE: 高威力弾追加
- SPRAY: 拡散弾追加
- SHIELD: 1回分の防御
- HELPER: 白血球ヘルパー追加

## HUD

- スコア、残機、ボム
- 現在エリア
- ECG表示
- condition warning
- route mapと現在位置
- パワーアップゲージ
- ボスHPバー
- route event warning
- スマートフォン操作UI

## 画像アセット

画像パスは `ASSET_PATHS` で一元管理します。

```text
assets/
  player_nurse.png
  helper_white_blood_cell.png
  patient_cold.png
  patient_food_poisoning.png
  bg_mouth.png
  bg_throat.png
  bg_lung.png
  bg_esophagus.png
  bg_stomach.png
  bg_intestine.png
  bg_vessel.png
  bg_heart.png
  bg_brain.png
  bg_nerve.png
  boss_cold_virus.png
  boss_blood_clot.png
  boss_vessel_core.png
  boss_brain_tumor.png
  boss_electric_parasite.png
```

`bg_nest.png` は `ASSET_PATHS` に予約されていますが、現在の `assets/` にはありません。そのため感染巣背景はCanvas描画へフォールバックします。

## サウンド

Web Audio APIによる軽量な環境音を使用します。

- 呼吸、気流
- 胃液、泡
- 心拍、血流
- 神経ノイズ、電流
- condition別の補助音
- route event用の短いSE hook

`currentBgm` は `normal`、`warning`、`boss`、`extraction` などの状態を保持します。将来的なroute別BGM分岐用のhookを残しています。

## パフォーマンス方針

スマートフォンでの60fps維持を優先します。

- Canvas filterやblurを背景に使用しない
- パーティクル総数を制限
- プレイヤー弾、敵弾の総数を制限
- ボス戦中はパーティクル上限を110へ抑制
- ボス戦中は多数の弾に対する `shadowBlur` を無効化
- ボス命中ヒットストップは12フレーム間隔で最大2フレーム
- 1発の弾は最初に衝突した対象のみ処理
- 過剰な画面揺れ、拡大、暗転を避ける

固定更新ループは `STEP_MS = 1000 / 60`、1描画あたりの最大更新回数は5です。

## 拡張方法

### 患者を追加する

1. `PATIENTS` に患者データを追加
2. `route` に `AREAS` 登録済みの器官IDを指定
3. `condition` に `CONDITION_MODIFIERS` のキーを指定
4. `learningSummary` と `result` を追加
5. 必要なら `stageModifier.areaDurationByArea` を調整

### 器官を追加する

1. `AREAS` に基礎データを追加
2. `ROUTE_LABELS` と `ROUTE_ICONS` に表示情報を追加
3. `ASSET_PATHS` と `drawAreaBackgroundAsset()` に背景を追加
4. 固有ゲーム性が必要なら `ROUTES` に設定を追加
5. 必要なら軽量な `gimmickUpdate` と背景描画を追加

### Route Eventを追加する

1. `ROUTE_EVENTS` にイベント設定を追加
2. 対象の `ROUTES[route].events` にIDを追加
3. 汎用modifierで表現できない場合だけ `updateRouteEvent()` を小さく拡張

### ボスを追加する

1. 画像を `assets/` に追加
2. `ASSET_PATHS` にキーを追加
3. `BOSS_TYPES` に画像、通知、色を追加
4. 対象routeの `bossType` を変更

大規模なswitch分岐は避け、`PATIENTS`、`AREAS`、`ROUTES`、`ROUTE_EVENTS`、`CONDITION_MODIFIERS`、`BOSS_TYPES` のデータ追加を優先します。

## ファイル構成

```text
MN/
  index.html   エントリーポイント
  style.css    レスポンシブ・全画面レイアウト
  game.js      ゲームデータ、更新、描画、入力、音声
  assets/      背景、キャラクター、患者、ボス画像
  README.md    本ドキュメント
```

## 今後の拡張候補

- allergy / pneumonia / cavity / stress / parasiteなどの症例
- 心臓、脳、血管、神経ルートの追加イベント
- route別ボスBGM
- Sランク、ノーダメージ、早期撃破
- patient survival bonus
- 患者別の追加画像とボスAI差分

拡張時も「routeが冒険先と主ゲーム性を決め、conditionが身体状態の軽い差を加える」という設計を維持します。

## 患者治療レイヤ

通常のSTG進行に、患者を治療している目的感を加える軽量レイヤです。vitalsが悪化しても即ゲームオーバーにはならず、警告表示と最終評価へ影響します。

### Patient Vitals

`state.vitals` は以下の4項目を0〜100で管理します。

- `infection`: 低いほど良い
- `inflammation`: 低いほど良い
- `oxygen`: 高いほど良い
- `stability`: 高いほど良い

`initVitals()` が `routeType` と `patient.condition` から初期値を決めます。時間経過、敵の通過、被弾、route eventで少し悪化し、敵撃破、カプセル、ボム、治療対象の処置、ボス撃破で改善します。

主な関数:

```text
initVitals()
updateVitals()
improveVitals()
worsenVitals()
calculateTreatmentRank()
```

### 治療対象

`ROUTE_TREATMENT_PROFILES` が器官ごとの治療対象、治療目標、HP、スコア、vitals変化を管理します。

| route | treatment target | 治療目的 |
|---|---|---|
| mouth | biofilmPatch | 口内細菌の増殖を抑える |
| throat | inflamedTissue | 喉の炎症反応を抑える |
| lung | infectedAlveoli | 肺胞を守り酸素低下を防ぐ |
| esophagus | mucosaLesion | 粘膜を守り安全に通過する |
| stomach | toxinPatch | 胃酸と毒素による炎症を抑える |
| intestine | toxinPocket | 毒素吸収を防ぐ |
| vessel | clotBlock | 血流の詰まりを防ぐ |
| heart | unstablePulseNode | 心拍の安定を維持する |
| brain | noisyNeuron | 神経ノイズを抑える |
| nerve | shortedSynapse | 通電異常を抑える |

治療対象は各エリアに少数だけ出現し、ショットを数発当てると処置完了になります。処置完了時はスコアとvitalsが改善し、画面外へ流れた場合は軽く悪化します。

### Nurse Communication

`showNurseMessage()` と `drawNurseMessage()` が短い通信を表示します。

- route開始
- route event開始
- 治療対象出現・処置完了
- vitals危険域
- ボス警告
- ボムによる緊急安定化

通信は1〜2秒程度で消え、操作や戦闘を停止しません。

### Treatment Result

result画面には既存の症例結果とlearningSummaryに加え、以下を表示します。

- 最終vitalsと状態判定
- 処置完了数と未処置数
- 初期値から改善した項目
- S / A / B / Cの治療評価

評価はvitalsを中心とし、処置完了、未処置、敵の通過を小さく加減算します。

## 治療フィードバック

患者治療レイヤの状態変化をプレイ中に伝えるため、短時間・少数描画のフィードバックを追加しています。

### 治療対象表示

- 医療リング、十字、走査線を全routeで共通表示
- 未処置時は `SHOT TO TREAT`、処置開始後は `TREATING` を表示
- 残りHPに応じて進行リングが収縮
- routeごとに患部の中心形状を変更
  - mouth: 白いバイオフィルム
  - throat: 赤い炎症部位
  - lung: 汚染された肺胞群
  - stomach / intestine: 毒素パッチ、毒素ポケット
  - vessel: 血栓ブロック
  - heart: 脈動ノード
  - brain: ノイズを持つニューロン
  - nerve: 短絡したシナプス

### 処置フィードバック

- 初弾命中時に処置開始cueと通信
- 命中中は白・シアンの少数particleとリング反応
- 完了時は `STABILIZED`、収束リング、短い回復発光を表示
- 完了時にvitals改善ポップアップを表示
- 低確率でshieldまたはbombを補助報酬として付与
- 未処置時は `MISSED TREATMENT`、赤いHUD点滅、vitals悪化ポップアップを表示

敵撃破の爆散と治療完了の浄化演出は別処理です。

### Vitals Warning

- infection / inflammation危険域: 赤い画面端と警告ライン
- oxygen危険域: 青白い画面端と軽い暗部
- stability危険域: ECG風ラインとvitals HUDの微小な揺れ

危険演出は危険域へ入った時と一定間隔だけ発生します。常時強いオーバーレイやゲームオーバー判定には使用しません。

### 通信優先度

`showNurseMessage()` はpriority、key、cooldownを受け取り、重要通信が軽微な通信に上書きされないよう管理します。

優先度が高いもの:

- vitals危険
- 処置完了、処置漏れ
- route event
- ボス警告、ボス撃破

### Treatment Cue

`playTreatmentCue()` がWeb Audio APIの短いOscillator cueを再生します。

- start
- complete
- miss
- danger
- rankS

音声ファイルや常駐ノードを増やさない軽量構成です。
