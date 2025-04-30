import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import Animated, { useAnimatedStyle, withTiming, withSequence, withDelay } from 'react-native-reanimated';

interface QuizOptionProps {
  option: string;
  index: number;
  selected: boolean;
  correct?: boolean;
  onSelect: () => void;
}

export default function QuizOption({ 
  option, 
  index, 
  selected, 
  correct, 
  onSelect 
}: QuizOptionProps) {
  // Animation for selection and feedback
  const animatedStyle = useAnimatedStyle(() => {
    // When selected and we have feedback about correctness
    if (selected && correct !== undefined) {
      // Correctness animations
      if (correct) {
        // Correct answer animation
        return {
          transform: [
            { 
              scale: withSequence(
                withTiming(1.1, { duration: 200 }),
                withTiming(1, { duration: 200 })
              ) 
            }
          ],
          backgroundColor: withTiming(COLORS.success),
          borderColor: withTiming(COLORS.success),
        };
      } else {
        // Incorrect answer animation
        return {
          transform: [
            { 
              translateX: withSequence(
                withTiming(-5, { duration: 50 }),
                withTiming(5, { duration: 50 }),
                withTiming(-5, { duration: 50 }),
                withTiming(5, { duration: 50 }),
                withTiming(0, { duration: 50 })
              ) 
            }
          ],
          backgroundColor: withTiming(COLORS.error),
          borderColor: withTiming(COLORS.error),
        };
      }
    }
    
    // When option is the correct one but not selected
    if (!selected && correct === true) {
      return {
        backgroundColor: withDelay(300, withTiming(COLORS.success, { duration: 500 })),
        borderColor: withDelay(300, withTiming(COLORS.success, { duration: 500 })),
      };
    }
    
    // Just selected without feedback yet
    if (selected) {
      return {
        backgroundColor: withTiming(COLORS.primary),
        borderColor: withTiming(COLORS.primary),
      };
    }
    
    // Default state
    return {
      backgroundColor: withTiming(COLORS.white),
      borderColor: withTiming(COLORS.lightGray),
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      disabled={correct !== undefined} // Disable after answer is revealed
    >
      <Animated.View 
        style={[
          styles.optionContainer,
          animatedStyle
        ]}
      >
        <View style={styles.optionIndex}>
          <Text style={[
            styles.optionIndexText,
            (selected || correct === true) && styles.selectedIndexText
          ]}>
            {String.fromCharCode(65 + index)}
          </Text>
        </View>
        
        <Text style={[
          styles.optionText,
          (selected || correct === true) && styles.selectedOptionText
        ]}>
          {option}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.medium,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }
    })
  },
  optionIndex: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.medium,
  },
  optionIndexText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  selectedIndexText: {
    color: COLORS.white,
  },
  optionText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small + 2,
    color: COLORS.dark,
    flex: 1,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
});