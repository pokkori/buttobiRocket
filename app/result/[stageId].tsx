import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Easing, Share, Platform, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { Fireworks } from '../../src/components/ui/Fireworks';
import { useProgressStore } from '../../src/stores/progressStore';
import { useGameStore } from '../../src/stores/gameStore';
import { getStageById } from '../../src/data/stages';
import { getWorldForStage } from '../../src/data/worlds';
import { COLORS } from '../../src/constants/colors';
import { generateShareCard } from '../../src/utils/shareCard';

export default function ResultScreen() {
  const router = useRouter();
  const { stageId, stars: starsParam, fuel: fuelParam, dailyMode } = useLocalSearchParams<{ stageId: string; stars: string; fuel: string; dailyMode?: string }>();
  const sId = parseInt(stageId ?? '1', 10);
  const stars = parseInt(starsParam ?? '1', 10) as 1 | 2 | 3;
  const fuel = parseFloat(fuelParam ?? '0');
  const stage = getStageById(sId);
  const world = getWorldForStage(sId);
  const clearStage = useProgressStore(s => s.clearStage);
  const coins = useProgressStore(s => s.coins);
  const clearedStages = useProgressStore(s => s.clearedStages);
  const streak = useProgressStore(s => s.dailyChallenge.streak);

  // Check if this is a new record (better stars than previous)
  const prevResult = clearedStages[sId];
  const isNewRecord = !prevResult || stars > (prevResult.stars || 0);

  const isDaily = dailyMode === 'true';
  const totalCleared = Object.keys(clearedStages).length;
  const perfectCount = Object.values(clearedStages).filter(s => s.stars >= 3).length;

  const finalTrail = useGameStore(s => s.finalTrail);

  // Trajectory preview state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Star animations
  const starAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  // Score countup animation
  const fuelCountAnim = useRef(new Animated.Value(0)).current;
  const [displayFuel, setDisplayFuel] = useState(0);

  // New record flash
  const recordFlash = useRef(new Animated.Value(0)).current;
  const recordScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (stage) {
      clearStage(sId, stars, fuel, null);
    }

    // Animate stars appearing
    starAnims.forEach((anim, i) => {
      if (i < stars) {
        Animated.timing(anim, {
          toValue: 1,
          delay: i * 300,
          duration: 400,
          easing: Easing.out(Easing.back(2)),
          useNativeDriver: true,
        }).start();
      }
    });

    // Fuel countup
    const fuelPercent = Math.round(fuel * 100);
    fuelCountAnim.addListener(({ value }) => {
      setDisplayFuel(Math.round(value));
    });
    Animated.timing(fuelCountAnim, {
      toValue: fuelPercent,
      duration: 800,
      delay: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // New record animation
    if (isNewRecord) {
      Animated.sequence([
        Animated.delay(stars * 300 + 400),
        Animated.parallel([
          Animated.timing(recordFlash, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.spring(recordScale, {
            toValue: 1,
            friction: 4,
            tension: 80,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }

    // Generate trajectory preview image (web only)
    if (Platform.OS === 'web' && stage && world && finalTrail.length > 1) {
      generateShareCard({
        trail: finalTrail,
        stage,
        stars,
        worldId: world.id,
        stageInWorld: stage.id - world.stageIds[0] + 1,
        perfectCount,
        totalCleared,
        streak,
      }).then(blob => {
        if (blob) {
          setPreviewUrl(URL.createObjectURL(blob));
        }
      });
    }

    return () => {
      fuelCountAnim.removeAllListeners();
    };
  }, []);

  if (!stage || !world) return null;

  const stageInWorld = stage.id - world.stageIds[0] + 1;
  const coinReward = stars === 3 ? 30 : stars === 2 ? 20 : 10;
  const nextStageId = sId + 1;
  const hasNext = nextStageId <= 100;

  const TROPHY = String.fromCodePoint(0x1F3C6);
  const ROCKET = String.fromCodePoint(0x1F680);
  const SHARE_ICON = String.fromCodePoint(0x1F4E4);
  const RETRY_ICON = String.fromCodePoint(0x1F504);
  const HOME_ICON = String.fromCodePoint(0x1F3E0);
  const STAR_EMOJI = String.fromCodePoint(0x2B50);

  const starEmojis = Array(stars).fill(STAR_EMOJI).join('');

  const handleShare = async () => {
    const streakText = streak >= 3 ? ` ${streak}\u65E5\u9023\u7D9A\uD83D\uDD25` : '';
    const text = `${ROCKET} \u3076\u3063\u98DB\u3073\u30ED\u30B1\u30C3\u30C8 Stage ${world.id}-${stageInWorld}${streakText} ${starEmojis}\u30AF\u30EA\u30A2\uFF01 #\u3076\u3063\u98DB\u3073\u30ED\u30B1\u30C3\u30C8 #\u30D1\u30BA\u30EB\u30B2\u30FC\u30E0`;

    try {
      if (Platform.OS === 'web') {
        // Try to generate share card image
        let shareBlob: Blob | null = null;
        if (finalTrail.length > 1) {
          shareBlob = await generateShareCard({
            trail: finalTrail,
            stage,
            stars,
            worldId: world.id,
            stageInWorld,
            perfectCount,
            totalCleared,
            streak,
          });
        }

        if (typeof navigator !== 'undefined' && navigator.share && shareBlob) {
          const file = new File([shareBlob], 'rocket-fling-clear.png', { type: 'image/png' });
          await navigator.share({ text, files: [file] });
        } else if (typeof navigator !== 'undefined' && navigator.share) {
          await navigator.share({ text });
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        }
      } else {
        await Share.share({ message: text });
      }
    } catch {
      // User cancelled
    }
  };

  // Clear text and fireworks config based on star count
  const clearLabel = stars === 3 ? '\u2728 PERFECT! \u2728' : stars === 2 ? '\u2728 GREAT! \u2728' : '\u2728 CLEAR! \u2728';
  const fireworksBurstCount = stars === 3 ? 5 : stars === 2 ? 2 : 0;

  // Scale animation for 1-star clear text
  const clearTextScale = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    if (stars === 1) {
      Animated.spring(clearTextScale, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }).start();
    } else {
      clearTextScale.setValue(1);
    }
  }, [stars]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Fireworks: 2 stars = 2 bursts, 3 stars = 5 bursts */}
      <Fireworks active={stars >= 2} burstCount={fireworksBurstCount} />

      <View style={styles.header}>
        <CoinDisplay amount={coins} />
      </View>

      {/* Daily streak banner */}
      {isDaily && streak >= 2 && (
        <View style={styles.streakBanner}>
          <Text style={styles.streakText}>{`\uD83D\uDD25 ${streak}\u65E5\u9023\u7D9A\u30AF\u30EA\u30A2\uFF01`}</Text>
        </View>
      )}

      <View style={styles.center}>
        <Animated.Text style={[styles.clearText, stars === 1 && { transform: [{ scale: clearTextScale }] }]}>
          {clearLabel}
        </Animated.Text>
        <Text style={styles.stageName}>
          {'Stage ' + world.id + '-' + stageInWorld + '\u300C' + stage.name + '\u300D'}
        </Text>

        <View style={styles.starsRow}>
          {[0, 1, 2].map(i => (
            <Animated.Text
              key={i}
              style={[
                styles.starText,
                {
                  opacity: starAnims[i],
                  transform: [
                    { scale: starAnims[i].interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) },
                    { rotate: starAnims[i].interpolate({ inputRange: [0, 1], outputRange: ['180deg', '0deg'] }) },
                  ],
                  color: i < stars ? COLORS.star : COLORS.starEmpty,
                },
              ]}
            >
              {i < stars ? '\u2605' : '\u2606'}
            </Animated.Text>
          ))}
        </View>

        {/* New Record badge */}
        {isNewRecord && (
          <Animated.View
            style={[
              styles.newRecordBadge,
              {
                opacity: recordFlash,
                transform: [{ scale: recordScale }],
              },
            ]}
          >
            <Text style={styles.newRecordText}>{TROPHY + ' NEW RECORD!'}</Text>
          </Animated.View>
        )}

        <View style={styles.stats}>
          <Text style={styles.statText}>{'\u6B8B\u308A\u71C3\u6599: ' + displayFuel + '%'}</Text>
          <Text style={styles.statText}>{'\u7372\u5F97\u30B3\u30A4\u30F3: +' + coinReward}</Text>
          <Text style={styles.statText}>{'\u30AF\u30EA\u30A2\u6E08: ' + totalCleared + '\u30B9\u30C6\u30FC\u30B8 / \u2B50\uFF13: ' + perfectCount + '\u30B9\u30C6\u30FC\u30B8'}</Text>
        </View>

        {/* Trajectory preview thumbnail (web only) */}
        {Platform.OS === 'web' && previewUrl && (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: previewUrl }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
        )}
      </View>

      <View style={styles.buttons}>
        {/* Share button */}
        <Button
          title={'\u30B7\u30A7\u30A2'}
          onPress={handleShare}
          variant="secondary"
          icon={SHARE_ICON}
          style={styles.shareBtn}
        />

        {hasNext && (
          <Button
            title={'\u6B21\u306E\u30B9\u30C6\u30FC\u30B8'}
            onPress={() => router.replace(`/game/${nextStageId}`)}
            size="large"
            icon={'\u25B6'}
            style={styles.nextBtn}
          />
        )}
        <View style={styles.bottomBtns}>
          <Button
            title={'\u30EA\u30C8\u30E9\u30A4'}
            onPress={() => router.replace(`/game/${sId}`)}
            variant="secondary"
            icon={RETRY_ICON}
          />
          <Button
            title={'\u30B9\u30C6\u30FC\u30B8\u9078\u629E'}
            onPress={() => router.replace(`/stages/${world.id}`)}
            variant="secondary"
            icon={HOME_ICON}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E27' },
  header: {
    flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingVertical: 8,
  },
  streakBanner: {
    backgroundColor: 'rgba(255,140,0,0.2)',
    borderWidth: 1.5,
    borderColor: '#FF8C00',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginHorizontal: 32,
    marginTop: 8,
    alignItems: 'center',
  },
  streakText: {
    color: '#FF8C00',
    fontSize: 16,
    fontWeight: '800',
  },
  previewContainer: {
    marginTop: 16,
    width: '90%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,191,255,0.3)',
  },
  previewImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  clearText: { fontSize: 28, fontWeight: '900', color: COLORS.accent, marginBottom: 12 },
  stageName: { fontSize: 16, color: COLORS.text, fontWeight: '600', marginBottom: 24 },
  starsRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  starText: { fontSize: 48 },
  newRecordBadge: {
    backgroundColor: 'rgba(255,215,0,0.15)',
    borderWidth: 1.5,
    borderColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 16,
  },
  newRecordText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },
  stats: { gap: 8 },
  statText: { color: COLORS.textSecondary, fontSize: 16, textAlign: 'center' },
  buttons: { paddingHorizontal: 32, paddingBottom: 40, gap: 12 },
  shareBtn: { width: '100%' },
  nextBtn: { width: '100%' },
  bottomBtns: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
});
