import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { useAudioPreferences } from './useAudioPreferences';

export function useAudioNarration() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isMuted, toggleMute } = useAudioPreferences();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playShimmerSound = async () => {
    if (Platform.OS === 'web' || isMuted) return;

    try {
      const { sound: shimmerSound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/shimmer.mp3'),
        { volume: 0.3 }
      );
      await shimmerSound.playAsync();
      shimmerSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying) {
          shimmerSound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Parlama sesi çalınırken hata oluştu:', error);
    }
  };

  const playNarration = async (text: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      setIsPlaying(true);
      setError(null);
      // Gerçek bir uygulamada, burada bir metin-ses API'si kullanılırdı
      // Şimdilik örnek bir ses dosyası kullanıyoruz
      console.log('Sesli anlatım başlatılıyor:', text);
    } catch (err) {
      setError('Sesli anlatım başlatılırken hata oluştu: ' + (err as Error).message);
      setIsPlaying(false);
    }
  };

  const stopNarration = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
      }
      setIsPlaying(false);
      setError(null);
      // Gerçek bir uygulamada, burada ses çalma durdurulurdu
      console.log('Sesli anlatım durduruldu');
    } catch (err) {
      setError('Sesli anlatım durdurulurken hata oluştu: ' + (err as Error).message);
    }
  };

  const toggleNarration = async (text: string) => {
    if (isPlaying) {
      await stopNarration();
    } else {
      await playNarration(text);
    }
  };

  return {
    isPlaying,
    error,
    playNarration,
    stopNarration,
    toggleNarration,
    isMuted,
    toggleMute,
  };
}