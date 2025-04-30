import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, BookOpen, InfoIcon } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Map, Book, Trophy, Settings } from 'lucide-react-native';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>Dünya Şehirleri</Text>
            <Text style={styles.subtitle}>Şehirleri keşfet, quizleri çöz, başarılar kazan!</Text>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg' }} 
              style={styles.headerImage} 
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <TouchableOpacity 
              style={styles.mainButton}
              onPress={() => router.push('/learn')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[COLORS.secondary, COLORS.secondaryDark]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Map size={24} color={COLORS.primary} />
                <Text style={styles.buttonText}>Harita</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.row}>
            <TouchableOpacity 
              style={[styles.secondaryButton, styles.halfButton]}
              onPress={() => router.push('/quiz')}
              activeOpacity={0.8}
            >
              <Book size={20} color={COLORS.primary} />
              <Text style={styles.secondaryButtonText}>Quiz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.secondaryButton, styles.halfButton]}
              onPress={() => router.push('/achievements')}
              activeOpacity={0.8}
            >
              <Trophy size={20} color={COLORS.primary} />
              <Text style={styles.secondaryButtonText}>Başarılar</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500).duration(600)}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Nasıl Oynanır</Text>
              <Text style={styles.infoText}>
                Dünya şehirleri hakkında quiz sorularını yanıtlayın. Doğru cevaplar vererek ünlü yapıların 3D AR modellerini açın!
              </Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>Henüz aktivite yok</Text>
            <Text style={styles.activitySubtext}>Şehirleri keşfetmeye başla!</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: SPACING.large,
    paddingBottom: SPACING.extraLarge * 2,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  headerContent: {
    paddingHorizontal: SPACING.large,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.extraLarge,
    color: COLORS.white,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.large,
    color: COLORS.white,
    fontFamily: 'Nunito-SemiBold',
    opacity: 0.9,
    marginTop: SPACING.small,
    marginBottom: SPACING.large,
    textAlign: 'center',
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: SIZES.radius,
  },
  content: {
    marginTop: -SPACING.extraLarge,
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.extraLarge,
  },
  mainButton: {
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: SPACING.large,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.medium + 4,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginLeft: SPACING.small,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.large,
  },
  halfButton: {
    flex: 0.48,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.medium,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginLeft: SPACING.small,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  infoText: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 2,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
  section: {
    padding: SPACING.large,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  activitySubtext: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
});

export default HomeScreen;