import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutDown
} from 'react-native-reanimated';
import { Lightbulb, X, Volume2, VolumeX, Info } from 'lucide-react-native';
import { useAudioNarration } from '@/hooks/useAudioNarration';

interface FactPopupProps {
  fact: string;
  audioUrl?: string;
  onClose: () => void;
}

export default function FactPopup({ fact, audioUrl, onClose }: FactPopupProps) {
  const { playNarration, stopNarration, isPlaying, isMuted, toggleMute } = useAudioNarration();

  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => {
      clearTimeout(timer);
      stopNarration();
    };
  }, [onClose, stopNarration]);

  useEffect(() => {
    if (audioUrl && !isMuted) {
      playNarration(audioUrl);
    }
  }, [audioUrl, isMuted, playNarration]);

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.overlay}
    >
      <Animated.View 
        entering={SlideInUp}
        exiting={SlideOutDown}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.audioButton}
            onPress={toggleMute}
          >
            {isMuted ? (
              <VolumeX size={20} color={COLORS.darkGray} />
            ) : (
              <Volume2 size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <X size={20} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Info size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>İlginç Bilgi!</Text>
          <Text style={styles.factText}>{fact}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Devam Et</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.large,
    width: '90%',
    maxWidth: 340,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.medium,
  },
  audioButton: {
    padding: SPACING.small,
  },
  closeButton: {
    padding: SPACING.small,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  factText: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 2,
    color: COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: SIZES.radius,
    marginTop: SPACING.medium,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});