import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface FactCardProps {
  title: string;
  facts: string[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function FactCard({ title, facts, currentIndex, onNext, onPrevious }: FactCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.factContainer}>
        <Text style={styles.factText}>{facts[currentIndex]}</Text>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={onPrevious}>
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1} / {facts.length}
        </Text>

        <TouchableOpacity style={styles.navButton} onPress={onNext}>
          <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SPACING.large,
    left: SPACING.large,
    right: SPACING.large,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: SIZES.radius,
    padding: SPACING.large,
  },
  title: {
    color: COLORS.white,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SPACING.medium,
  },
  factContainer: {
    marginBottom: SPACING.medium,
  },
  factText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    lineHeight: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    color: COLORS.white,
    fontSize: SIZES.body,
  },
});