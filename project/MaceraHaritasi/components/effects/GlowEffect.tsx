import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface GlowEffectProps {
  color?: string;
  size?: number;
  intensity?: number;
  delay?: number;
}

export default function GlowEffect({ 
  color = COLORS.primary,
  size = 120,
  intensity = 0.5,
  delay = 300
}: GlowEffectProps) {
  const glowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withDelay(
          delay,
          withRepeat(
            withSequence(
              withTiming(1.2, {
                duration: 1500,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
              }),
              withTiming(1, {
                duration: 1500,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
              })
            ),
            -1
          )
        ),
      },
    ],
    opacity: withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(intensity, {
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          withTiming(intensity * 0.5, {
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          })
        ),
        -1
      )
    ),
  }));

  return (
    <Animated.View
      style={[
        styles.glow,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: 0, // Start invisible
        },
        glowStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    zIndex: -1,
  },
});