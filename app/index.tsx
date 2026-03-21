import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../src/components/ui/Button';
import { CoinDisplay } from '../src/components/ui/CoinDisplay';
import { useProgressStore } from '../src/stores/progressStore';
import { COLORS } from '../src/constants/colors';

export default function TitleScreen() {
  const router = useRouter();
  const coins = useProgressStore(s => s.coins);
  const loaded = useProgressStore(s => s.loaded);
  const rotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotAnim, { toValue: 1, duration: 6000, easing: Easing.linear, useNativeDriver: true })
    ).start();
  }, []);

  const rotate = rotAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Star background */}
      <View style={StyleSheet.absoluteFill}>
        {Array.from({ length: 40 }).map((_, i) => {
          const seed = (i * 16807 + 1) % 2147483647;
          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: `${(seed % 100)}%` as unknown as number,
                top: `${((seed * 7 + 3) % 100)}%` as unknown as number,
                width: 2 + (seed % 2),
                height: 2 + (seed % 2),
                borderRadius: 2,
                backgroundColor: `rgba(255,255,255,${0.3 + (seed % 5) / 10})`,
              }}
            />
          );
        })}
      </View>

      <View style={styles.header}>
        <CoinDisplay amount={coins} />
      </View>

      <View style={styles.center}>
        <Animated.Text style={[styles.rocketIcon, { transform: [{ rotate }] }]}>
          🚀
        </Animated.Text>
        <Text style={styles.title}>ぶっ飛びロケット</Text>
        <Text style={styles.subtitle}>Rocket Fling</Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title="はじめる"
          onPress={() => router.push('/stages')}
          size="large"
          icon="▶"
          style={styles.mainButton}
        />

        <Button
          title="デイリーチャレンジ"
          onPress={() => router.push('/daily')}
          variant="secondary"
          icon="🏆"
          style={styles.dailyButton}
        />

        <View style={styles.bottomRow}>
          <Button
            title="設定"
            onPress={() => router.push('/settings')}
            variant="secondary"
            size="small"
            icon="⚙"
          />
          <Button
            title="実績"
            onPress={() => router.push('/achievements')}
            variant="secondary"
            size="small"
            icon="🏅"
          />
          <Button
            title="ショップ"
            onPress={() => router.push('/shop')}
            variant="secondary"
            size="small"
            icon="🛒"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  loading: {
    color: COLORS.text,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rocketIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '600',
    letterSpacing: 3,
  },
  buttons: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    gap: 12,
  },
  mainButton: {
    width: '100%',
  },
  dailyButton: {
    width: '100%',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});
