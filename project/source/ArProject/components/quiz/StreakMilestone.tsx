import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  withTiming,
  FadeIn,
  FadeOut,
  SlideInUp,
} from 'react-native-reanimated';
import { Trophy, Star, Volume2, VolumeX, ChevronRight, Flame } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import ParticleEffect from '@/components/effects/ParticleEffect';
import GlowEffect from '@/components/effects/GlowEffect';
import { Audio } from 'expo-av';

interface StreakMilestoneProps {
  streak: number;
  onComplete: () => void;
}

interface CityFact {
  type: 'historical' | 'cultural' | 'wow';
  text: string;
  imageUrl?: string;
  translations?: {
    [key: string]: {
      text: string;
      audioUrl?: string;
    };
  };
}

const funFactsBank = {
  cities: {
    paris: [
      { type: 'historical', text: "Eyfel Kulesi geçici olarak tasarlanmıştı - 1889 Dünya Fuarı için inşa edilmişti!", imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg' },
      { type: 'cultural', text: "Paris'te şehir genelinde 450'den fazla park ve bahçe vardır!" },
      { type: 'wow', text: "Louvre o kadar büyük ki, her sanat eserini 30 saniye görmek için 100 gün gerekir!" },
    ],
    rome: [
      { type: 'historical', text: "Antik Romalılar su altında bile sertleşebilen betonu icat ettiler!", imageUrl: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg' },
      { type: 'cultural', text: "Romalılar Trevi Çeşmesi'ne her gün yaklaşık 3.000 Euro atıyorlar!" },
      { type: 'wow', text: "Kolezyum 50.000-80.000 seyirci alabiliyordu - modern bir stadyum gibi!" },
    ],
    tokyo: [
      { type: 'cultural', text: "Tokyo'da sıcak yemeklerden canlı yengeçlere kadar her şeyi satan otomat makineleri vardır!", imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg' },
      { type: 'wow', text: "Tokyo Skytree dünyanın en yüksek kulesidir - üst üste dizilmiş 2.000 zürafadan daha yüksek!" },
      { type: 'historical', text: "Tokyo bir zamanlar Edo olarak adlandırılıyordu ve sadece küçük bir balıkçı köyüydü!" },
    ],
    istanbul: [
      { type: 'historical', text: "İstanbul, iki kıtada yer alan dünyadaki tek şehirdir - Avrupa ve Asya!", imageUrl: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg' },
      { type: 'cultural', text: "Kapalı Çarşı'da 4.000'den fazla dükkan vardır ve dünyanın en eski kapalı çarşılarından biridir!" },
      { type: 'wow', text: "Şehrin altında 1.500 yıldan daha eski gizli yeraltı tünelleri vardır!" },
    ],
    dubai: [
      { type: 'wow', text: "Burç Halife o kadar yüksektir ki, bir günde oradan iki kere gün batımı izleyebilirsiniz!", imageUrl: 'https://images.pexels.com/photos/1707310/pexels-photo-1707310.jpeg' },
      { type: 'cultural', text: "Dubai'de Ferrari ve Lamborghini gibi süper arabalar kullanan bir polis gücü vardır!" },
      { type: 'historical', text: "Dubai sadece 60 yıl önce küçük bir balıkçı köyüydü!" },
    ],
    rio: [
      { type: 'wow', text: "Kurtarıcı İsa heykeline yılda yaklaşık 6 kez yıldırım düşer!", imageUrl: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg' },
      { type: 'cultural', text: "Rio'daki Karnaval günde 2 milyon kişiyle dünyanın en büyük karnavalıdır!" },
      { type: 'historical', text: "Ünlü Copacabana plajı kaldırım deseni Portekiz dalgalarından esinlenmiştir!" },
    ],
    cairo: [
      { type: 'historical', text: "Giza'nın Büyük Piramidi 2,3 milyon taş blok kullanılarak 20 yılda inşa edildi!", imageUrl: 'https://images.pexels.com/photos/3689859/pexels-photo-3689859.jpeg' },
      { type: 'cultural', text: "Kahire'de insanların çöplerinin %80'ini geri dönüştürdüğü 'Çöp Şehri' adında bir mahalle vardır!" },
      { type: 'wow', text: "Piramitler bir zamanlar onları elmas gibi parlatan beyaz kireçtaşı ile kaplıydı!" },
    ],
    moscow: [
      { type: 'wow', text: "Aziz Vasil Katedrali'nin renkleri İncil'deki cennet tasvirinden esinlenmiştir!", imageUrl: 'https://images.pexels.com/photos/236294/pexels-photo-236294.jpeg' },
      { type: 'cultural', text: "Moskova Metrosu avizeler ve sanat eserleriyle yeraltında bir müze gibidir!" },
      { type: 'historical', text: "Moskova Kremlin'i hala kullanılan en büyük ortaçağ kalesidir!" },
    ],
    singapore: [
      { type: 'wow', text: "Gardens by the Bay'de yağmur suyu ve güneş enerjisi toplayan 'süper ağaçlar' vardır!", imageUrl: 'https://images.pexels.com/photos/1123972/pexels-photo-1123972.jpeg' },
      { type: 'cultural', text: "Singapur'da bir gece safarisi vardır - dünyanın ilk gece hayvanat bahçesi!" },
      { type: 'historical', text: "Singapur bir zamanlar Cava dilinde 'deniz kasabası' anlamına gelen 'Temasek' olarak biliniyordu!" },
    ],
    capetown: [
      { type: 'wow', text: "Masa Dağı, tüm Birleşik Krallık'tan daha fazla bitki türüne sahiptir!", imageUrl: 'https://images.pexels.com/photos/1434580/pexels-photo-1434580.jpeg' },
      { type: 'cultural', text: "Cape Town'da penguenlerle yüzebileceğiniz bir plaj vardır!" },
      { type: 'historical', text: "Good Hope Kalesi Güney Afrika'nın en eski binasıdır!" },
    ],
  },
  beginner: [
    { type: 'educational', text: "Biliyor musun? Kısa süreli öğrenmeler beyninin daha iyi hatırlamasına yardımcı olur!" },
    { type: 'motivational', text: "Yeni bir şey öğrendiğinde beynin yeni bağlantılar oluşturur!" },
    { type: 'tip', text: "Sorular arasında mola vermek odaklanmanı artırabilir!" },
    { type: 'wow', text: "Beynin bir süper bilgisayardan daha hızlı bilgi işleyebilir!" },
    { type: 'fun', text: "Yeni şeyler öğrenmek beynini gerçekten daha büyük yapar!" },
  ],
  intermediate: [
    { type: 'educational', text: "İnanılmaz bilgi: 'Aralıklı tekrar' sayesinde serilerle daha iyi öğrenirsin!" },
    { type: 'motivational', text: "Düzenli pratik kalıcı bilgi oluşturmaya yardımcı olur!" },
    { type: 'tip', text: "Eğlendiğinde beynin bilgiyi daha iyi işler!" },
    { type: 'wow', text: "Diğer oyuncuların %75'inden daha hızlı öğreniyorsun!" },
    { type: 'fun', text: "Beynin şu anda binlerce yeni bağlantı kuruyor!" },
  ],
  expert: [
    { type: 'achievement', text: "İnanılmaz! Öğrenenlerin en iyi %5'i içindesin!" },
    { type: 'educational', text: "Tutarlı öğrenme, hafızayı %40'a kadar geliştirebilir!" },
    { type: 'motivational', text: "Özverin daha güçlü sinir yolları oluşturuyor!" },
    { type: 'wow', text: "Oyuncuların %95'inden daha fazla bilgi öğrendin!" },
    { type: 'fun', text: "Beynin artık bir coğrafya süper bilgisayarı!" },
  ],
};

export default function StreakMilestone({ streak, onComplete }: StreakMilestoneProps) {
  const router = useRouter();
  const badgeRef = useRef<View>(null);
  const [badgePosition, setBadgePosition] = useState({ x: 0, y: 0 });
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [showFact, setShowFact] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [backgroundSound, setBackgroundSound] = useState<Audio.Sound | null>(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const getFacts = () => {
    if (streak >= 10) return funFactsBank.expert;
    if (streak >= 5) return funFactsBank.intermediate;
    return funFactsBank.beginner;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFact(true);
      setTimeout(() => setShowLearnMore(true), 1000);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    playBackgroundSwell();
    setOverlayOpacity(0.7);

    return () => {
      if (backgroundSound) {
        backgroundSound.unloadAsync();
      }
    };
  }, []);

  const playBackgroundSwell = async () => {
    if (Platform.OS === 'web' || isMuted) return;

    try {
      let soundAsset;
      try {
        soundAsset = require('@/assets/sounds/achievement-swell.mp3');
      } catch (err) {
        console.warn('Achievement sound file not found, using fallback');
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        soundAsset,
        { 
          volume: 0.3,
          shouldPlay: true,
        }
      );
      setBackgroundSound(sound);
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.isPlaying === false && status.positionMillis > 0 && status.durationMillis === status.positionMillis) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing background swell:', error);
    }
  };

  const playStreakSound = async () => {
    if (Platform.OS === 'web' || isMuted) return;

    try {
      let soundAsset;
      try {
        soundAsset = streak >= 10 
          ? require('@/assets/sounds/streak-epic.mp3')
          : streak >= 5
          ? require('@/assets/sounds/streak-great.mp3')
          : require('@/assets/sounds/streak-good.mp3');
      } catch (err) {
        console.warn('Streak sound file not found, using fallback');
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        soundAsset,
        { 
          volume: 0.7,
          rate: 1 + (Math.random() * 0.2 - 0.1),
        }
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.isPlaying === false && status.positionMillis > 0 && status.durationMillis === status.positionMillis) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing streak sound:', error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (backgroundSound) {
      if (isMuted) {
        backgroundSound.setVolumeAsync(0.3);
      } else {
        backgroundSound.setVolumeAsync(0);
      }
    }
  };

  const handleReplayFact = () => {
    setShowFact(false);
    setShowLearnMore(false);
    const facts = getFacts();
    setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    setTimeout(() => {
      setShowFact(true);
      setTimeout(() => setShowLearnMore(true), 1000);
    }, 100);
  };

  const handleLearnMore = () => {
    onComplete();
    router.push('/learn');
  };

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSequence(
          withSpring(1.2, { damping: 12 }),
          withSpring(1, { damping: 10 }),
          withDelay(300, withSpring(1.15, { damping: 8 })),
          withSpring(1, { damping: 6 })
        ),
      },
    ],
  }));

  const hintPulseStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1, { duration: 1000 }),
            withTiming(1.1, { duration: 1000 }),
            withTiming(1, { duration: 1000 })
          ),
          -1,
          true
        ),
      },
    ],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
        withTiming(0.7, { duration: 1000 })
      ),
      -1,
      true
    ),
  }));

  const getMessage = () => {
    if (streak >= 10) return "İnanılmaz! Durdurulamazsın! 🌟";
    if (streak >= 5) return "Harika Seri! Devam Et! 🔥";
    return "Muhteşem Seri! Yanıyorsun! ⭐";
  };

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.container, { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }]}
    >
      <TouchableOpacity 
        style={styles.muteButton}
        onPress={toggleMute}
      >
        {isMuted ? (
          <VolumeX size={24} color={COLORS.white} />
        ) : (
          <Volume2 size={24} color={COLORS.white} />
        )}
      </TouchableOpacity>

      <Animated.View 
        style={[styles.content, badgeStyle]}
        onLayout={() => {
          badgeRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setBadgePosition({
              x: pageX + width / 2,
              y: pageY + height / 2,
            });
          });
        }}
      >
        <View ref={badgeRef} style={styles.badge}>
          <GlowEffect 
            color={COLORS.primary}
            size={140}
            intensity={0.4}
            delay={300}
          />
          <Trophy size={32} color={COLORS.white} />
          <View style={styles.starContainer}>
            <Star size={24} color={COLORS.secondary} fill={COLORS.secondary} />
          </View>
          <Text style={styles.streakNumber}>{streak}</Text>
        </View>
        
        <Text style={styles.text}>
          {streak} Soru Serisi!
        </Text>
        <Text style={styles.subtext}>
          {getMessage()}
        </Text>
        
        {showFact && (
          <Animated.View 
            entering={SlideInUp.delay(600)}
            style={styles.factContainer}
          >
            <TouchableOpacity
              onPress={handleReplayFact}
              style={styles.factButton}
            >
              <Text style={styles.factText}>
                {getFacts()[currentFactIndex].text}
              </Text>
              <Animated.View style={opacityStyle}>
                <Animated.Text style={[styles.tapHint, hintPulseStyle]}>
                  Başka bir bilgi için dokun
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>

            {showLearnMore && (
              <Animated.View 
                entering={FadeIn.delay(400)}
                style={styles.learnMoreContainer}
              >
                <TouchableOpacity
                  style={styles.learnMoreButton}
                  onPress={handleLearnMore}
                >
                  <Text style={styles.learnMoreText}>Daha Fazla Öğren</Text>
                  <ChevronRight size={16} color={COLORS.white} />
                </TouchableOpacity>
              </Animated.View>
            )}
          </Animated.View>
        )}
      </Animated.View>

      {badgePosition.x > 0 && (
        <ParticleEffect
          count={streak >= 10 ? 24 : streak >= 5 ? 16 : 12}
          origin={badgePosition}
          colors={[COLORS.primary, COLORS.secondary, COLORS.accent]}
        />
      )}
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
    zIndex: 1000,
  },
  muteButton: {
    position: 'absolute',
    top: SPACING.large,
    right: SPACING.large,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.large,
    borderRadius: SIZES.radius,
    width: '80%',
    maxWidth: 300,
  },
  badge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  starContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 4,
  },
  streakNumber: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: COLORS.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.white,
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
  },
  text: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  subtext: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  factContainer: {
    marginTop: SPACING.medium,
    alignItems: 'center',
  },
  factButton: {
    alignItems: 'center',
    padding: SPACING.small,
  },
  factText: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 1,
    color: COLORS.primary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  tapHint: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small - 1,
    color: COLORS.darkGray,
    marginTop: 4,
  },
  learnMoreContainer: {
    marginTop: SPACING.medium,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: SIZES.radius,
    gap: 4,
  },
  learnMoreText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});