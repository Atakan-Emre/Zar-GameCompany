import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  withDelay,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { Star } from 'lucide-react-native';

interface StreakAnimationProps {
  streak: number;
  onComplete: () => void;
}

export default function StreakAnimation({ streak, onComplete }: StreakAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const stars = Array(3).fill(0);
  
  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.container}
    >
      <View style={styles.starsContainer}>
        {stars.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              {
                scale: withSequence(
                  withDelay(
                    index * 200,
                    withSpring(1.5)
                  ),
                  withTiming(1)
                ),
              },
              {
                rotate: withSequence(
                  withDelay(
                    index * 200,
                    withTiming('45deg')
                  ),
                  withTiming('0deg')
                ),
              },
            ],
            opacity: withDelay(
              index * 200,
              withSequence(
                withTiming(1),
                withDelay(500, withTiming(0.8))
              )
            ),
          }));

          return (
            <Animated.View key={index} style={[styles.star, animatedStyle]}>
              <Star size={40} color={COLORS.secondary} fill={COLORS.secondary} />
            </Animated.View>
          );
        })}
      </View>
      <Animated.Text 
        style={[
          styles.streakText,
          useAnimatedStyle(() => ({
            transform: [{ scale: withSpring(1.2) }],
          }))
        ]}
      >
        {streak} Streak! 🔥
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  star: {
    opacity: 0,
  },
  streakText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: COLORS.white,
    marginTop: 20,
  },
});