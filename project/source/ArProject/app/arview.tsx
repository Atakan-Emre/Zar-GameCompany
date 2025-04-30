import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Info } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ARModelView from '@/components/ar/ARModelView';
import FactCard from '@/components/ar/FactCard';
import { Ionicons } from '@expo/vector-icons';
import { cities, City } from '@/data/cities';
import { useCityData } from '@/hooks/useCityData';

// Ekran boyutlarını al
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type ModelSettings = {
  scale: [number, number, number];
  position: [number, number, number];
};

// Model dosya adları
const MODEL_FILES: Record<string, string> = {
  istanbul: 'project_07__turkiye.glb',
  kahire: 'the_great_pyramid_of_giza.glb',
  sydney: 'sydney_opera_house_sydney_australia.glb',
  tokyo: 'tokyo_skytree.glb',
  pekin: 'great_wall_survey.glb',
  cape_town: 'cape_town_-_table_mountain_south_africa.glb',
  singapur: 'gardens_by_the_bay_test.glb',
  moskova: 'saint_basils_cathedral.glb',
  rio: 'christ_the_redeemer.glb',
  new_york: 'statue_of_liberty.glb',
  paris: 'free__la_tour_eiffel.glb',
  roma: 'colosseum_rome_italy.glb',
};

// Model ölçeklendirme ve konum ayarları
const MODEL_SETTINGS: Record<string, ModelSettings> = {
  istanbul: { scale: [0.5, 0.5, 0.5], position: [0, 0, -2] },
  kahire: { scale: [0.3, 0.3, 0.3], position: [0, 0, -2] },
  sydney: { scale: [0.2, 0.2, 0.2], position: [0, 0, -2] },
  tokyo: { scale: [0.3, 0.3, 0.3], position: [0, 0, -2] },
  pekin: { scale: [0.2, 0.2, 0.2], position: [0, 0, -2] },
  cape_town: { scale: [0.3, 0.3, 0.3], position: [0, 0, -2] },
  singapur: { scale: [0.4, 0.4, 0.4], position: [0, 0, -2] },
  moskova: { scale: [0.4, 0.4, 0.4], position: [0, 0, -2] },
  rio: { scale: [0.5, 0.5, 0.5], position: [0, 0, -2] },
  new_york: { scale: [0.4, 0.4, 0.4], position: [0, 0, -2] },
  paris: { scale: [0.3, 0.3, 0.3], position: [0, 0, -2] },
  roma: { scale: [0.2, 0.2, 0.2], position: [0, 0, -2] },
};

// Ana AR Görüntüleme Bileşeni
function ARViewScreen() {
  const { cityId } = useLocalSearchParams<{ cityId: string }>();
  const router = useRouter();
  const { getCityById } = useCityData();
  const [showFacts, setShowFacts] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const city = getCityById(cityId);
  
  if (!city) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Şehir bulunamadı!</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const settings = city ? MODEL_SETTINGS[city.id] : MODEL_SETTINGS.istanbul;
  const modelFileName = MODEL_FILES[city.id] || 'project_07__turkiye.glb';
  const modelUrl = `models/${modelFileName}`;
  
  useEffect(() => {
    if (!city) {
      setError('Şehir bulunamadı');
      setIsLoading(false);
    }
  }, [city]);

  const handleBack = () => {
    router.back();
  };

  const handleToggleFacts = () => {
    setShowFacts(!showFacts);
  };

  const handleNextFact = () => {
    if (city && currentFactIndex < city.landmark.facts.length - 1) {
      setCurrentFactIndex(currentFactIndex + 1);
    } else {
      setCurrentFactIndex(0);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Model yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft size={24} color={COLORS.primary} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.cityName}>{city.name}</Text>
          <Text style={styles.landmarkName}>{city.landmark.name}</Text>
        </View>
      </View>

      {/* AR View */}
      <View style={styles.arContainer}>
        <ARModelView
          modelUrl={modelUrl}
          scale={settings.scale}
          position={settings.position}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>

      {/* Overlay UI */}
      <SafeAreaView style={styles.overlay} edges={['top']}>
        <View style={styles.overlayHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <ArrowLeft size={24} color={COLORS.primary} />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.landmarkName}>{city.landmark.name}</Text>
            <Text style={styles.cityName}>{city.name}, {city.country}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.infoButton}
            onPress={handleToggleFacts}
          >
            <Info size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
      {/* Facts Card */}
      {showFacts && city.landmark.facts && (
        <FactCard
          title={`${city.landmark.name} Hakkında`}
          facts={city.landmark.facts}
          currentIndex={currentFactIndex}
          onNext={handleNextFact}
          onPrevious={() => setCurrentFactIndex((prev) => (prev - 1 + city.landmark.facts.length) % city.landmark.facts.length)}
        />
      )}
      
      {/* Web Platform Notice */}
      {Platform.OS === 'web' && (
        <View style={styles.webNotice}>
          <Text style={styles.webNoticeText}>
            AR görüntüleme web platformunda kullanılamaz. Bu özellik mobil cihazlarda {city.landmark.name} 3D modelini gösterecektir.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// Dosyadan dışa aktarılan bileşen
export default ARViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.dark,
    marginBottom: SPACING.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.large,
    backgroundColor: COLORS.dark,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.medium,
  },
  titleContainer: {
    flex: 1,
  },
  cityName: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  landmarkName: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small,
    color: COLORS.lightGray,
  },
  arContainer: {
    flex: 1,
    backgroundColor: COLORS.dark,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginTop: SPACING.medium,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  overlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.medium,
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small + 2,
    color: COLORS.white,
  },
  webNotice: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: SPACING.medium,
  },
  webNoticeText: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 2,
    color: COLORS.white,
    textAlign: 'center',
  },
});