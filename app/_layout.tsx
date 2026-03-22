import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useProgressStore } from '../src/stores/progressStore';
import { useSettingsStore } from '../src/stores/settingsStore';

export default function RootLayout() {
  const loadProgress = useProgressStore(s => s.load);
  const loadSettings = useSettingsStore(s => s.load);

  useEffect(() => {
    loadProgress();
    loadSettings();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <Head>
        <title>ぶっ飛びロケット - 燃料を残して宇宙を制覇する物理パズル</title>
        <meta name="description" content="重力・ブラックホール・ワームホールを使ってロケットをゴールに導く無料物理パズルゲーム。デイリーチャレンジで毎日遊べる！" />
        <meta property="og:title" content="ぶっ飛びロケット" />
        <meta property="og:description" content="燃料を残してゴールを目指す宇宙物理パズル" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ぶっ飛びロケット 🚀" />
        <meta name="twitter:description" content="燃料を残してゴールを目指す宇宙物理パズル。星3クリアに挑戦！" />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0E27' },
          animation: 'fade',
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
});
