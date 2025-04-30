import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withDelay,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { Trophy } from 'lucide-react-native';

interface AchievementPopupProps {
  title: string;
  description: string;
  onClose: () => void;
}

export default function AchievementPopup({
  title,
  description,
  onClose,
}: AchievementPopupProps) {
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSequence(
          withSpring(1.2),
          withDelay(500, withSpring(1)),
          withDelay(2000, withSpring(0.8))
        ),
      },
    ],
  }));

  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.overlay]}
    >
      <Animated.View style={[styles.container, containerStyle]}>
        <View style={styles.iconContainer}>
          <Trophy size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Yeni Başarı!</Text>
        <Text style={styles.achievementTitle}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Harika!</Text>
        </TouchableOpacity>
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
    width: '80%',
    maxWidth: 320,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  achievementTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  description: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 2,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: SPACING.medium,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: SIZES.radius,
    marginTop: SPACING.medium,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small,
    color: COLORS.white,
    textAlign: 'center',
  },
  achievementImage: {
    width: '100%',
    height: 120,
    borderRadius: SIZES.radius,
  },
});