# Three.js Lab

短いプログレッシブデモで **vanilla Three.js** を学ぶ教材サイトです。  
React / R3F は使いません。UI と説明は日本語です。

## 学べること

- Scene / Camera / Renderer
- Mesh / Geometry / Material
- Light（Ambient・Directional）
- アニメーションループ（`requestAnimationFrame` + `Clock`）
- OrbitControls
- Group・複数オブジェクト
- テクスチャ（キャンバス生成・オフライン可）
- シャドウ（castShadow / receiveShadow / shadowMap）
- レイキャスター（NDC・intersectObjects）
- フォグ（Fog / FogExp2）
- パーティクル（Points / BufferGeometry）

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで表示された URL（通常 `http://localhost:5173/`）を開きます。

本番ビルド:

```bash
npm run build
npm run preview
```

## 学習の順番

ホームの一覧どおり、**01 → 10** の順がおすすめです。

| # | レッスン | ポイント |
|---|----------|----------|
| 01 | Hello Cube | Scene・Camera・Renderer・MeshBasicMaterial（一度描画） |
| 02 | ライトとマテリアル | Ambient + Directional + MeshStandardMaterial |
| 03 | アニメーション | rAF・回転・Clock |
| 04 | OrbitControls | ドラッグで周回・ズーム |
| 05 | 複数オブジェクト | Group と色違いメッシュ |
| 06 | テクスチャ | CanvasTexture（CDN 不要） |
| 07 | シャドウ | DirectionalLight.castShadow・Plane 地面 |
| 08 | レイキャスター | NDC・Raycaster・クリック選択 |
| 09 | フォグ | Fog / FogExp2 とスライダー |
| 10 | パーティクル | Points + BufferGeometry アニメーション |

各ページに「前へ / 次へ」リンクがあります。

## ファイル構成

```
threejs-lab/
├── index.html                 # ホーム（レッスン一覧）
├── lessons/
│   ├── 01-hello-cube/
│   ├── 02-lights-materials/
│   ├── 03-animation/
│   ├── 04-orbit-controls/
│   ├── 05-multiple-objects/
│   ├── 06-textures/
│   ├── 07-shadows/
│   ├── 08-raycaster/
│   ├── 09-fog/
│   └── 10-particles/
├── src/
│   ├── lessons/               # 各レッスンの TypeScript
│   └── shared/
│       ├── setup.ts           # Scene / Camera / Renderer 共通初期化
│       └── styles.css         # 共通スタイル
├── vite.config.ts             # Vite MPA（複数 HTML エントリ）
├── package.json
└── README.md
```

## 技術スタック

- Vite + TypeScript
- `three` + `@types/three`
- OrbitControls は `three/addons/controls/OrbitControls.js`

## ライセンス

教材用のサンプルコードです。自由に改変・学習に使ってください。
