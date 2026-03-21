import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

export function Button({ title, onPress, variant = 'primary', size = 'medium', disabled, style, textStyle, icon }: ButtonProps) {
  const bgColor = variant === 'primary' ? COLORS.primary : variant === 'danger' ? COLORS.danger : 'transparent';
  const borderColor = variant === 'secondary' ? COLORS.primary : 'transparent';
  const height = size === 'small' ? 36 : size === 'large' ? 56 : 46;
  const fontSize = size === 'small' ? 14 : size === 'large' ? 20 : 16;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? COLORS.locked : bgColor,
          borderColor,
          borderWidth: variant === 'secondary' ? 1.5 : 0,
          height,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { fontSize }, textStyle]}>
        {icon ? `${icon} ` : ''}{title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  text: {
    color: COLORS.text,
    fontWeight: '700',
  },
});
