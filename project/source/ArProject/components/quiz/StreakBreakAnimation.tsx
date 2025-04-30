import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
  withDelay,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { AlertTriangle, RefreshCcw } from 'lucide-react-native';

interface StreakBreakAnimationProps {
  streak: number;
  onComplete: () => void;
  onRetry: () => void;
}

export default function StreakBreakAnimation({ streak, onComplete, onRetry }: StreakBreakAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSequence(
          withSpring(-20, { damping: 8 }),
          withSpring(0, { damping: 5 })
        ),
      },
    ],
  }));

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.container}
    >
      <Animated.View style={[styles.content, bounceStyle]}>
        <View style={styles.iconContainer}>
          <AlertTriangle size={48} color={COLORS.white} />
        </View>
        <Text style={styles.streakCount}>Streak: {streak}</Text>
        <Text style={styles.text}>Oops! Streak Lost</Text>
        <Text style={styles.encouragement}>Don't worry, you're learning! 💪</Text>
        
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={onRetry}
        >
          <RefreshCcw size={20} color={COLORS.white} />
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </Animated.View>
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
  content: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.large,
    borderRadius: SIZES.radius,
    width: '80%',
    maxWidth: 300,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  streakCount: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SPACING.small,
  },
  text: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  encouragement: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SPACING.large,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: SIZES.radius,
  },
  retryText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small + 2,
    color: COLORS.white,
    marginLeft: SPACING.small,
  },
});