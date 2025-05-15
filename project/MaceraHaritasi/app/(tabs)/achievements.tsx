import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import { Trophy, Star, MapPin, Target, Crown, Play, Map, Book } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAchievements } from '@/hooks/useAchievements';
import StreakMilestone from '@/components/quiz/StreakMilestone';
import { StatusBar } from 'expo-status-bar';

const achievements = [
  {
    id: 'quiz_master',
    title: 'Quiz Ustası',
    description: '10 quizi başarıyla tamamla',
    icon: Book,
    progress: 7,
    total: 10,
    unlocked: false,
  },
  {
    id: 'world_explorer',
    title: 'Dünya Kaşifi',
    description: 'Tüm şehirleri keşfet',
    icon: Map,
    progress: 5,
    total: 10,
    unlocked: false,
  },
  {
    id: 'perfect_score',
    title: 'Mükemmel Skor',
    description: 'Bir quizde tüm soruları doğru cevapla',
    icon: Star,
    progress: 1,
    total: 1,
    unlocked: true,
  },
  {
    id: 'streak_master',
    title: 'Seri Ustası',
    description: '5 gün üst üste quiz çöz',
    icon: Trophy,
    progress: 3,
    total: 5,
    unlocked: false,
  },
];

export default function AchievementsScreen() {
  const { achievements: apiAchievements, stats, badges } = useAchievements();
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [showMilestone, setShowMilestone] = useState(false);

  const handleBadgePress = (streak: number) => {
    setSelectedBadge(streak);
    setShowMilestone(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Başarılar</Text>
        <Text style={styles.subtitle}>Kazanılan rozetler ve ilerleme</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Trophy size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{stats.totalAchievements}</Text>
            <Text style={styles.statLabel}>Başarılar</Text>
          </View>
          
          <View style={styles.statCard}>
            <Star size={24} color={COLORS.secondary} />
            <Text style={styles.statValue}>{stats.perfectScores}</Text>
            <Text style={styles.statLabel}>Tam Skor</Text>
          </View>
          
          <View style={styles.statCard}>
            <Target size={24} color={COLORS.accent} />
            <Text style={styles.statValue}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Günlük Seri</Text>
          </View>
        </View>

        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>Rozet Koleksiyonu</Text>
          <Text style={styles.sectionSubtitle}>Kutlamayı tekrar izlemek için rozete dokun!</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesContainer}
          >
            {badges.map((badge, index) => (
              <Animated.View 
                key={badge.streak}
                entering={FadeInUp.delay(index * 100)}
              >
                <TouchableOpacity
                  style={[
                    styles.badgeCard,
                    !badge.unlocked && styles.lockedBadge
                  ]}
                  onPress={() => badge.unlocked && handleBadgePress(badge.streak)}
                  disabled={!badge.unlocked}
                >
                  <LinearGradient
                    colors={badge.unlocked ? [COLORS.primary, COLORS.primaryDark] : ['#ccc', '#999']}
                    style={styles.badgeIcon}
                  >
                    <Trophy size={32} color={COLORS.white} />
                    <Text style={styles.streakNumber}>{badge.streak}</Text>
                  </LinearGradient>
                  
                  <View style={styles.badgeInfo}>
                    <Text style={styles.badgeName}>
                      {badge.unlocked ? badge.name : '???'}
                    </Text>
                    {badge.unlocked && (
                      <View style={styles.replayButton}>
                        <Play size={12} color={COLORS.primary} />
                        <Text style={styles.replayText}>Replay</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.achievementsGrid}>
          <Text style={styles.sectionTitle}>All Achievements</Text>
          {apiAchievements.map((achievement, index) => (
            <Animated.View 
              key={achievement.id}
              entering={FadeInUp.delay(index * 100)}
              style={[
                styles.achievementContainer
              ]}
            >
              <View style={[
                styles.achievementCard,
                !achievement.unlocked && styles.lockedAchievement
              ]}>
                <LinearGradient
                  colors={achievement.unlocked ? [COLORS.primary, COLORS.primaryDark] : ['#ccc', '#999']}
                  style={styles.achievementIcon}
                >
                  <achievement.icon
                    size={24}
                    color={achievement.unlocked ? COLORS.primary : COLORS.gray}
                  />
                </LinearGradient>
                
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  
                  {!achievement.unlocked && (
                    <View style={styles.progressContainer}>
                      <View 
                        style={[
                          styles.progressBar,
                          { width: `${achievement.progress}%` }
                        ]}
                      />
                      <Text style={styles.progressText}>{achievement.progress}%</Text>
                    </View>
                  )}
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {showMilestone && selectedBadge && (
        <StreakMilestone
          streak={selectedBadge}
          onComplete={() => setShowMilestone(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.large,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: 'Nunito-Bold',
    color: COLORS.dark,
    marginBottom: SPACING.large,
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 1,
    color: COLORS.darkGray,
    marginBottom: SPACING.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.large,
  },
  statCard: {
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
  statValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.large,
    color: COLORS.dark,
    marginVertical: SPACING.small,
  },
  statLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  badgesSection: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  sectionSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 1,
    color: COLORS.darkGray,
    marginBottom: SPACING.medium,
  },
  badgesContainer: {
    paddingVertical: SPACING.small,
    gap: SPACING.medium,
  },
  badgeCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.medium,
    alignItems: 'center',
    width: 120,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedBadge: {
    opacity: 0.7,
  },
  badgeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  streakNumber: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.secondary,
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.white,
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small,
  },
  badgeInfo: {
    alignItems: 'center',
  },
  badgeName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small + 1,
    color: COLORS.dark,
    marginBottom: 4,
    textAlign: 'center',
  },
  replayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SPACING.small,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  replayText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small - 1,
    color: COLORS.primary,
  },
  achievementsGrid: {
    gap: SPACING.medium,
  },
  achievementContainer: {
    marginBottom: SPACING.medium,
  },
  achievementCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedAchievement: {
    opacity: 0.7,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.medium,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginBottom: 4,
  },
  achievementDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 1,
    color: COLORS.darkGray,
    marginBottom: SPACING.small,
  },
  progressContainer: {
    height: 4,
    backgroundColor: COLORS.lightGray,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: SPACING.small,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small - 1,
    color: COLORS.darkGray,
    position: 'absolute',
    right: 0,
    top: 6,
  },
});