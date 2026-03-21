import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ROCKET_SKINS } from '../../src/data/skins';
import { useProgressStore } from '../../src/stores/progressStore';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { Button } from '../../src/components/ui/Button';
import { COLORS } from '../../src/constants/colors';

const RARITY_COLORS: Record<string, string> = {
  common: COLORS.rarityCommon,
  rare: COLORS.rarityRare,
  epic: COLORS.rarityEpic,
  legendary: COLORS.rarityLegendary,
};

export default function ShopScreen() {
  const router = useRouter();
  const coins = useProgressStore(s => s.coins);
  const unlockedSkins = useProgressStore(s => s.unlockedSkins);
  const equippedSkinId = useProgressStore(s => s.equippedSkinId);
  const spendCoins = useProgressStore(s => s.spendCoins);
  const unlockSkin = useProgressStore(s => s.unlockSkin);
  const equipSkin = useProgressStore(s => s.equipSkin);

  const handleBuy = (skinId: string, price: number) => {
    if (spendCoins(price)) {
      unlockSkin(skinId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🛒 ショップ</Text>
        <CoinDisplay amount={coins} />
      </View>

      <Text style={styles.sectionTitle}>ロケットスキン</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {ROCKET_SKINS.map(skin => {
          const owned = unlockedSkins.includes(skin.id);
          const equipped = equippedSkinId === skin.id;
          const canBuy = skin.unlockCondition === 'purchase' && !owned && coins >= skin.price;

          return (
            <View key={skin.id} style={[styles.skinCard, { borderColor: RARITY_COLORS[skin.rarity] }]}>
              <View style={[styles.trailPreview, { backgroundColor: skin.trailColor + '33' }]}>
                <View style={[styles.trailDot, { backgroundColor: skin.trailColor, width: skin.trailWidth * 3, height: skin.trailWidth * 3, borderRadius: skin.trailWidth * 1.5 }]} />
              </View>
              <Text style={styles.skinName}>{skin.name}</Text>
              <Text style={[styles.rarity, { color: RARITY_COLORS[skin.rarity] }]}>
                {skin.rarity.charAt(0).toUpperCase() + skin.rarity.slice(1)}
              </Text>
              {equipped ? (
                <Text style={styles.equippedBadge}>装備中</Text>
              ) : owned ? (
                <TouchableOpacity
                  style={styles.equipBtn}
                  onPress={() => equipSkin(skin.id)}
                >
                  <Text style={styles.equipText}>装備する</Text>
                </TouchableOpacity>
              ) : skin.unlockCondition === 'purchase' ? (
                <TouchableOpacity
                  style={[styles.buyBtn, { opacity: canBuy ? 1 : 0.5 }]}
                  onPress={() => canBuy && handleBuy(skin.id, skin.price)}
                  disabled={!canBuy}
                >
                  <Text style={styles.buyText}>💰 {skin.price}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.lockText}>🔒 {skin.unlockCondition === 'achievement' ? '実績で解放' : 'デイリーで解放'}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E27' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8,
  },
  back: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', paddingHorizontal: 16, marginTop: 12, marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8, paddingBottom: 40 },
  skinCard: {
    width: '47%', borderRadius: 12, borderWidth: 1.5, padding: 12,
    backgroundColor: COLORS.cardBg, alignItems: 'center', gap: 6,
  },
  trailPreview: {
    width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center',
  },
  trailDot: {},
  skinName: { color: COLORS.text, fontSize: 13, fontWeight: '700', textAlign: 'center' },
  rarity: { fontSize: 11, fontWeight: '600' },
  equippedBadge: { color: COLORS.success, fontSize: 12, fontWeight: '700' },
  equipBtn: { backgroundColor: COLORS.primary + '33', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  equipText: { color: COLORS.primary, fontSize: 12, fontWeight: '600' },
  buyBtn: { backgroundColor: COLORS.accent + '33', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  buyText: { color: COLORS.accent, fontSize: 12, fontWeight: '600' },
  lockText: { color: COLORS.locked, fontSize: 11 },
});
