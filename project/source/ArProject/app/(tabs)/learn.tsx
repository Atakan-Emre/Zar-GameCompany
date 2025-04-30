import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { cities } from '@/data/cityData';
import { Search, ChevronRight, MapPin } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function LearnScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Şehirleri Keşfet</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Şehir veya ülke ara..."
            placeholderTextColor={COLORS.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContent}
          >
            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.categoryText}>Avrupa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: COLORS.secondary }]}>
              <Text style={styles.categoryText}>Asya</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: COLORS.accent }]}>
              <Text style={styles.categoryText}>Amerika</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: COLORS.success }]}>
              <Text style={styles.categoryText}>Afrika</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: COLORS.warning }]}>
              <Text style={styles.categoryText}>Okyanusya</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.citiesContainer}>
          <Text style={styles.sectionTitle}>Popüler Şehirler</Text>
          
          {filteredCities.map((city, index) => (
            <Animated.View 
              key={city.id}
              entering={FadeInDown.delay(index * 100).duration(400)}
              style={styles.cityCardContainer}
            >
              <TouchableOpacity 
                style={styles.cityCard}
                onPress={() => router.push({
                  pathname: '/citydetail',
                  params: { cityId: city.id }
                })}
              >
                <Image 
                  source={{ uri: city.imageUrl }} 
                  style={styles.cityImage} 
                />
                <View style={styles.cityContent}>
                  <View>
                    <Text style={styles.cityName}>{city.name}</Text>
                    <View style={styles.cityLocationRow}>
                      <MapPin size={14} color={COLORS.primary} />
                      <Text style={styles.cityCountry}>{city.country}</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color={COLORS.primary} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
          
          {filteredCities.length === 0 && (
            <View style={styles.emptyResultContainer}>
              <Text style={styles.emptyResultText}>Aramanızla eşleşen şehir bulunamadı.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.large,
    paddingBottom: SPACING.medium,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: 'Nunito-Bold',
    color: COLORS.dark,
    marginBottom: SPACING.medium,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: SPACING.small,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 2,
    color: COLORS.dark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.extraLarge,
  },
  categoriesContainer: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  categoriesScrollContent: {
    paddingRight: SPACING.large,
  },
  categoryCard: {
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    marginRight: SPACING.small,
  },
  categoryText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  citiesContainer: {
    marginBottom: SPACING.large,
  },
  cityCardContainer: {
    marginBottom: SPACING.medium,
  },
  cityCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cityImage: {
    width: '100%',
    height: 120,
  },
  cityContent: {
    padding: SPACING.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: 4,
  },
  cityLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityCountry: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginLeft: 4,
  },
  emptyResultContainer: {
    padding: SPACING.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyResultText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small + 2,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
});