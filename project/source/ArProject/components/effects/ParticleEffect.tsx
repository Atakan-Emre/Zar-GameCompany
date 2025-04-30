import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { Star } from 'lucide-react-native';

interface ParticleTrailProps {
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  delay: number;
  duration: number;
  color: string;
}

function ParticleTrail({ startPosition, endPosition, delay, duration, color }: ParticleTrailProps) {
  const trailStyle = useAnimatedStyle(() => ({
    opacity: withDelay(
      delay,
      withSequence(
        withTiming(0.6, { duration: duration * 0.2 }),
        withTiming(0, { duration: duration * 0.8 })
      )
    ),
    transform: [
      {
        translateX: startPosition.x,
      },
      {
        translateY: startPosition.y,
      },
      {
        scale: withDelay(
          delay,
          withSequence(
            withTiming(Math.random() * 0.5 + 0.5, { duration: duration * 0.2 }),
            withTiming(0.2, { duration: duration * 0.8 })
          )
        ),
      },
    ],
  }));

  return (
    <Animated.View 
      style={[
        styles.trail, 
        trailStyle,
        { backgroundColor: color }
      ]} 
    />
  );
}

interface ParticleProps {
  delay: number;
  startPosition: { x: number; y: number };
  color: string;
}

function Particle({ delay, startPosition, color }: ParticleProps) {
  const angle = Math.random() * Math.PI * 2;
  const distance = 80 + Math.random() * 120;
  const duration = 800 + Math.random() * 1200;

  const endPosition = {
    x: startPosition.x + Math.cos(angle) * distance,
    y: startPosition.y + Math.sin(angle) * distance,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withDelay(
          delay,
          withSequence(
            withSpring(startPosition.x, { damping: 12 }),
            withTiming(endPosition.x, {
              duration,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
          )
        ),
      },
      {
        translateY: withDelay(
          delay,
          withSequence(
            withSpring(startPosition.y, { damping: 12 }),
            withTiming(endPosition.y, {
              duration,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
          )
        ),
      },
      {
        scale: withDelay(
          delay,
          withSequence(
            withSpring(1.2, { damping: 10 }),
            withTiming(0, { duration })
          )
        ),
      },
      {
        rotate: withRepeat(
          withTiming('360deg', { duration: duration * 0.8 }),
          -1
        ),
      },
    ],
    opacity: withDelay(
      delay,
      withSequence(
        withSpring(1),
        withTiming(0, { duration })
      )
    ),
  }));

  return (
    <>
      <ParticleTrail
        startPosition={startPosition}
        endPosition={endPosition}
        delay={delay}
        duration={duration}
        color={color}
      />
      <Animated.View style={[styles.particle, animatedStyle]}>
        <Star size={16} color={color} fill={color} />
      </Animated.View>
    </>
  );
}

interface ParticleEffectProps {
  count?: number;
  origin: { x: number; y: number };
  colors?: string[];
}

export default function ParticleEffect({ 
  count = 12, 
  origin,
  colors = [COLORS.primary, COLORS.secondary]
}: ParticleEffectProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Particle
          key={index}
          delay={index * (Math.random() * 30 + 30)}
          startPosition={origin}
          color={colors[index % colors.length]}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: 16,
    height: 16,
  },
  trail: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.6,
  },
});