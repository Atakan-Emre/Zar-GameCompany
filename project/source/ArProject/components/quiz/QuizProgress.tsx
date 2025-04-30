import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '@/constants/theme';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface QuizProgressProps {
  progress: number;
}

export default function QuizProgress({ progress }: QuizProgressProps) {
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[styles.progressBar, animatedProgressStyle]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    width: '0%',
  },
});