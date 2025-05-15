import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUDIO_PREFERENCES_KEY = '@audio_preferences';

interface AudioPreferences {
  isMuted: boolean;
  volume: number;
  narrationEnabled: boolean;
  soundEffectsEnabled: boolean;
}

const DEFAULT_PREFERENCES: AudioPreferences = {
  isMuted: false,
  volume: 0.8,
  narrationEnabled: true,
  soundEffectsEnabled: true,
};

export function useAudioPreferences() {
  const [preferences, setPreferences] = useState<AudioPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const storedPreferences = await AsyncStorage.getItem(
        AUDIO_PREFERENCES_KEY
      );
      if (storedPreferences) {
        setPreferences(JSON.parse(storedPreferences));
      }
    } catch (err) {
      setError('Tercihler yüklenirken hata oluştu: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async (newPreferences: AudioPreferences) => {
    try {
      await AsyncStorage.setItem(
        AUDIO_PREFERENCES_KEY,
        JSON.stringify(newPreferences)
      );
      setPreferences(newPreferences);
    } catch (err) {
      setError('Tercihler kaydedilirken hata oluştu: ' + (err as Error).message);
    }
  };

  const toggleMute = () => {
    const newPreferences = {
      ...preferences,
      isMuted: !preferences.isMuted,
    };
    savePreferences(newPreferences);
  };

  const setVolume = (volume: number) => {
    const newPreferences = {
      ...preferences,
      volume: Math.max(0, Math.min(1, volume)),
    };
    savePreferences(newPreferences);
  };

  const toggleNarration = () => {
    const newPreferences = {
      ...preferences,
      narrationEnabled: !preferences.narrationEnabled,
    };
    savePreferences(newPreferences);
  };

  const toggleSoundEffects = () => {
    const newPreferences = {
      ...preferences,
      soundEffectsEnabled: !preferences.soundEffectsEnabled,
    };
    savePreferences(newPreferences);
  };

  return {
    ...preferences,
    isLoading,
    error,
    toggleMute,
    setVolume,
    toggleNarration,
    toggleSoundEffects,
  };
}