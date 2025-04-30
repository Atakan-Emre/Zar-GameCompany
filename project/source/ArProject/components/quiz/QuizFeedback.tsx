import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { Star } from 'lucide-react-native';

interface QuizFeedbackProps {
  score: number;
  totalQuestions: number;
  onFinish: () => void;
}

export default function QuizFeedback({ 
  score, 
  totalQuestions,
  onFinish 
}: QuizFeedbackProps) {
  const percentage = (score / totalQuestions) * 100;
  
  const getFeedbackMessage = () => {
    if (percentage === 100) return "Perfect Score! You're Amazing! 🎉";
    if (percentage >= 80) return "Fantastic Job! Keep it up! 🌟";
    if (percentage >= 60) return "Good Work! You're Learning! 👍";
    return "Keep Practicing! You'll Get Better! 💪";
  };

  const getStars = () => {
    if (percentage === 100) return 5;
    if (percentage >= 80) return 4;
    if (percentage >= 60) return 3;
    if (percentage >= 40) return 2;
    return 1;
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSequence(
          withSpring(1.1),
          withSpring(1)
        ),
      },
    ],
  }));

  React.useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.overlay]}
    >
      <Animated.View style={[styles.container, containerStyle]}>
        <Text style={styles.scoreText}>
          {score} / {totalQuestions}
        </Text>
        
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={32}
              color={index < getStars() ? COLORS.secondary : COLORS.lightGray}
              fill={index < getStars() ? COLORS.secondary : 'transparent'}
            />
          ))}
        </View>
        
        <Text style={styles.message}>{getFeedbackMessage()}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{percentage}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{score * 10}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.large,
    alignItems: 'center',
    width: '90%',
    maxWidth: 360,
  },
  scoreText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.extraLarge * 1.5,
    color: COLORS.primary,
    marginBottom: SPACING.medium,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: SPACING.small,
    marginBottom: SPACING.medium,
  },
  message: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: SPACING.large,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: SPACING.medium,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.dark,
  },
  statLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.lightGray,
  },
});