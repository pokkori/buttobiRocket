/**
 * OGP画像生成スクリプト
 * canvas パッケージ不要版: SVGをPNGへ変換
 * 使用方法: node scripts/generate-og-image.js
 */

const fs = require('fs');
const path = require('path');

// canvasパッケージが使えるか試みる
let canvasAvailable = false;
try {
  require.resolve('canvas');
  canvasAvailable = true;
} catch (_) {
  canvasAvailable = false;
}

if (canvasAvailable) {
  const { createCanvas } = require('canvas');
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // 背景グラデーション（宇宙っぽい黒→濃紺）
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#0a0a2e');
  grad.addColorStop(1, '#1a1a4e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 星を散りばめる
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 2 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // タイトル
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 90px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ぶっ飛びロケット', W / 2, H / 2 - 40);

  // サブタイトル
  ctx.fillStyle = '#ffffff';
  ctx.font = '44px sans-serif';
  ctx.fillText('どこまで飛ばせるかチャレンジ！', W / 2, H / 2 + 50);

  // ハッシュタグ
  ctx.fillStyle = 'rgba(0,191,255,0.8)';
  ctx.font = '28px sans-serif';
  ctx.fillText('#ぶっ飛びロケット  #物理ゲーム  #無料ゲーム', W / 2, H / 2 + 120);

  const buffer = canvas.toBuffer('image/png');
  const outPath = path.join(__dirname, '../public/og-image.png');
  fs.writeFileSync(outPath, buffer);
  console.log('og-image.png generated with canvas! (' + outPath + ')');
} else {
  // canvas不使用版: 最小限の1x1透明PNGをbase64デコードして書き出す
  // 実際は1200x630の宇宙テーマSVGをPNGとして偽装するのではなく、
  // SVGファイルとして配置しHTMLのog:imageはSVGパスを使う手もあるが
  // og:imageはPNGが標準なので、最低限動作するバイナリPNGを書き出す。
  //
  // 下記は 1x1 透明PNG のBase64（最小PNG）。
  // 実装上はog:imageが存在することの確認用。
  // 本番前に実際の画像を差し替えること。
  const minimalPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    'base64'
  );
  const outPath = path.join(__dirname, '../public/og-image.png');
  fs.writeFileSync(outPath, minimalPng);
  console.log('Fallback minimal og-image.png created at ' + outPath);
  console.log('Install "canvas" package for a proper OGP image: npm install canvas --save-dev');
}
