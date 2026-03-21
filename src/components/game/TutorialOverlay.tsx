import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';

interface TutorialStep {
  text: string;
  icon: string;
}

interface TutorialOverlayProps {
  stageId: number;
  hint?: string;
  onDismiss: () => void;
}

const TUTORIAL_STEPS: Record<number, TutorialStep[]> = {
  1: [
    { text: '引っ張って離そう！', icon: '👆' },
    { text: '点線は予測軌道だよ', icon: '📍' },
    { text: '星に到達すればクリア！', icon: '⭐' },
  ],
};

export function TutorialOverlay({ stageId, hint, onDismiss }: TutorialOverlayProps) {
  const [step, setStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const steps = TUTORIAL_STEPS[stageId];
  const isFullTutorial = !!steps;
  const currentSteps = steps || (hint ? [{ text: hint, icon: '💡' }] : []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 400, useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 400, easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  if (currentSteps.length === 0) return null;

  const currentItem = currentSteps[step];

  const handleTap = () => {
    if (step < currentSteps.length - 1) {
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
      setStep(step + 1);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0, duration: 200, useNativeDriver: true,
      }).start(() => onDismiss());
    }
  };

  return (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={handleTap}
    >
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.icon}>{currentItem.icon}</Text>
        <Text style={styles.text}>{currentItem.text}</Text>
        {isFullTutorial && (
          <View style={styles.dots}>
            {currentSteps.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === step && styles.dotActive]}
              />
            ))}
          </View>
        )}
        <Text style={styles.tapHint}>タップで{step < currentSteps.length - 1 ? '次へ' : '閉じる'}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: 'rgba(20,25,60,0.95)',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(0,191,255,0.4)',
    paddingHorizontal: 32,
    paddingVertical: 28,
    alignItems: 'center',
    maxWidth: 300,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 26,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    backgroundColor: '#00BFFF',
  },
  tapHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 12,
  },
});
