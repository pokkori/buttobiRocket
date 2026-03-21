import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface StarRatingProps {
  stars: 0 | 1 | 2 | 3;
  size?: number;
}

export function StarRating({ stars, size = 20 }: StarRatingProps) {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map(i => (
        <Text key={i} style={[styles.star, { fontSize: size, color: i <= stars ? COLORS.star : COLORS.starEmpty }]}>
          {i <= stars ? '\u2605' : '\u2606'}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    textAlign: 'center',
  },
});
