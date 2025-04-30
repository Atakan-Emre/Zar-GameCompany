import { useState, useEffect } from 'react';
import { Book, Map, Star, Trophy } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: LucideIcon;
  progress: number;
  total: number;
}

interface Stats {
  totalAchievements: number;
  perfectScores: number;
  currentStreak: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  streak: number;
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'quiz_master',
      title: 'Quiz Ustası',
      description: '10 quizi başarıyla tamamla',
      unlocked: false,
      icon: Book,
      progress: 7,
      total: 10
    },
    {
      id: 'world_explorer',
      title: 'Dünya Kaşifi',
      description: '5 farklı şehirde quiz tamamla',
      unlocked: false,
      icon: Map,
      progress: 3,
      total: 5
    },
    {
      id: 'perfect_score',
      title: 'Mükemmel Skor',
      description: 'Bir quizde tüm soruları doğru cevapla',
      unlocked: true,
      icon: Star,
      progress: 1,
      total: 1
    },
    {
      id: 'streak_master',
      title: 'Seri Ustası',
      description: '5 gün üst üste quiz çöz',
      unlocked: false,
      icon: Trophy,
      progress: 3,
      total: 5
    },
  ]);

  const [stats, setStats] = useState<Stats>({
    totalAchievements: 15,
    perfectScores: 8,
    currentStreak: 3,
  });

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'bronze_badge',
      name: 'Bronz Rozet',
      description: 'İlk quizini tamamla',
      unlocked: true,
      streak: 3
    },
    {
      id: 'silver_badge',
      name: 'Gümüş Rozet',
      description: '5 quizi başarıyla tamamla',
      unlocked: true,
      streak: 5
    },
    {
      id: 'gold_badge',
      name: 'Altın Rozet',
      description: '10 quizi başarıyla tamamla',
      unlocked: false,
      streak: 10
    },
  ]);

  useEffect(() => {
    // Örnek veri - gerçek bir uygulamada bu veriler kalıcı olarak saklanırdı
    const mockStats: Stats = {
      totalAchievements: 15,
      perfectScores: 8,
      currentStreak: 3,
    };
    setStats(mockStats);
  }, []);

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, unlocked: true }
          : achievement
      )
    );
  };

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((badge) =>
        badge.id === badgeId ? { ...badge, unlocked: true } : badge
      )
    );
  };

  return {
    achievements,
    stats,
    badges,
    unlockAchievement,
    unlockBadge,
  };
}