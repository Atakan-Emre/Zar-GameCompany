import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Globe, Building, Info, Camera, Trophy } from 'lucide-react-native';
import { getCityById } from '@/data/cityData';
import { Ionicons } from '@expo/vector-icons';

const CityDetailScreen: React.FC = () => {
  const { cityId } = useLocalSearchParams<{ cityId: string }>();
  const router = useRouter();
  
  const city = getCityById(cityId as string);
  
  if (!city) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Şehir bulunamadı!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Geri Dön</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: city.imageUrl }} 
            style={styles.cityImage} 
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.cityName}>{city.name}</Text>
              <Text style={styles.countryName}>{city.country}</Text>
            </View>
          </View>
          
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <Globe size={20} color={COLORS.primary} />
              <Text style={styles.infoTitle}>Kıta</Text>
              <Text style={styles.infoValue}>{city.continent}</Text>
            </View>
            
            <View style={styles.infoCard}>
              <Building size={20} color={COLORS.primary} />
              <Text style={styles.infoTitle}>Nüfus</Text>
              <Text style={styles.infoValue}>{city.population}</Text>
            </View>
            
            <View style={styles.infoCard}>
              <Info size={20} color={COLORS.primary} />
              <Text style={styles.infoTitle}>Dil</Text>
              <Text style={styles.infoValue}>{city.language}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{city.name} Hakkında</Text>
            <Text style={styles.descriptionText}>{city.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ünlü Yapı</Text>
            <Image 
              source={{ uri: city.landmark.imageUrl }} 
              style={styles.landmarkImage} 
            />
            <Text style={styles.landmarkName}>{city.landmark.name}</Text>
            <Text style={styles.descriptionText}>{city.landmark.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>İlginç Bilgiler</Text>
            {city.landmark.facts.map((fact, index) => (
              <View key={index} style={styles.factItem}>
                <View style={styles.factNumber}>
                  <Text style={styles.factNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push(`/arview?id=${city.id}`)}
            >
              <Camera size={24} color={COLORS.white} />
              <Text style={styles.actionButtonText}>AR ile Keşfet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push(`/quiz?city=${city.id}`)}
            >
              <Trophy size={24} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Quiz'i Başlat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.large,
  },
  errorText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.dark,
    marginBottom: SPACING.medium,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  cityImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: SPACING.medium,
    left: SPACING.medium,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    backgroundColor: COLORS.background,
    marginTop: -20,
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
    paddingBottom: SPACING.extraLarge,
  },
  header: {
    marginBottom: SPACING.large,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityName: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.extraLarge,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  countryName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginLeft: SPACING.small,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.large,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.medium,
    alignItems: 'center',
    width: '30%',
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginTop: SPACING.small,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small + 1,
    color: COLORS.dark,
  },
  section: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: SPACING.medium,
  },
  descriptionText: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 2,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  landmarkImage: {
    width: '100%',
    height: 180,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.medium,
  },
  landmarkName: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  factItem: {
    flexDirection: 'row',
    marginBottom: SPACING.medium,
  },
  factNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.small,
    marginTop: 2,
  },
  factNumberText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  factText: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 2,
    color: COLORS.darkGray,
    flex: 1,
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.medium,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: SIZES.radius,
    elevation: 3,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginLeft: SPACING.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});

export default CityDetailScreen;