#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const distIndexPath = path.join(__dirname, '..', 'dist', 'index.html');

if (!fs.existsSync(distIndexPath)) {
  console.log('dist/index.html not found. Skipping OGP injection.');
  process.exit(0);
}

let html = fs.readFileSync(distIndexPath, 'utf-8');

// 既に注入済みかチェック
if (html.includes('og:image')) {
  console.log('OGP tags already present. Skipping injection.');
  process.exit(0);
}

// og-image.pngをdistにコピー
const srcOgImage = path.join(__dirname, '..', 'public', 'og-image.png');
const destOgImage = path.join(__dirname, '..', 'dist', 'og-image.png');
if (fs.existsSync(srcOgImage) && !fs.existsSync(destOgImage)) {
  fs.copyFileSync(srcOgImage, destOgImage);
  console.log('Copied og-image.png to dist/');
}

const ogpTags = `
  <title>ぶっ飛びロケット - 燃料を残して宇宙を制覇する物理パズル</title>
  <meta name="description" content="燃料を残してゴールを目指す宇宙物理パズル。9種スキン・100ステージ・デイリーチャレンジで遊び放題！">
  <meta property="og:title" content="ぶっ飛びロケット 🚀">
  <meta property="og:description" content="燃料を残してゴールを目指す宇宙物理パズル。9種スキン・100ステージ！">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://rocket-fling.vercel.app">
  <meta property="og:image" content="https://rocket-fling.vercel.app/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="ぶっ飛びロケット 🚀">
  <meta name="twitter:description" content="燃料を残してゴールを目指す宇宙物理パズル">
  <meta name="twitter:image" content="https://rocket-fling.vercel.app/og-image.png">
  <link rel="canonical" href="https://rocket-fling.vercel.app">`;

html = html.replace('</head>', ogpTags + '\n</head>');
fs.writeFileSync(distIndexPath, html, 'utf-8');
console.log('OGP tags injected into dist/index.html successfully.');
