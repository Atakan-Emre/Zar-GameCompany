import { useState, useEffect } from 'react';
import { cities } from '@/data/cityData';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
}

interface QuizStats {
  totalScore: number;
  citiesExplored: number;
  quizCompleted: number;
}

// Örnek veri - gerçek bir uygulamada bu veriler kalıcı olarak saklanırdı
const mockProgress = cities.map(city => ({
  id: city.id,
  name: city.name,
  country: city.country,
  discovered: Math.random() > 0.5, // Demo için rastgele
  imageUrl: city.imageUrl
}));

const mockAchievements = [
  {
    id: 'achievement1',
    title: 'Quiz Ustası',
    description: '10 quizi başarıyla tamamla',
    unlocked: true,
    progress: 100
  },
  {
    id: 'achievement2',
    title: 'Dünya Kaşifi',
    description: 'Tüm kıtalardan simgeleri keşfet',
    unlocked: false,
    progress: 60
  },
  {
    id: 'achievement3',
    title: 'Mükemmel Skor',
    description: 'Bir quizdeki tüm soruları doğru cevapla',
    unlocked: true,
    progress: 100
  },
  {
    id: 'achievement4',
    title: 'Tarih Tutkunu',
    description: '20 tarihi simge hakkında bilgi edin',
    unlocked: false,
    progress: 35
  },
  {
    id: 'achievement5',
    title: 'Dünya Gezgini',
    description: 'Uygulamadaki tüm simgeleri keşfet',
    unlocked: false,
    progress: 50
  }
];

const mockStats = {
  totalScore: 750,
  citiesExplored: 3,
  quizCompleted: 5
};

export function useQuizProgress() {
  const [progress, setProgress] = useState(mockProgress);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [stats, setStats] = useState<QuizStats>(mockStats);

  const updateProgress = (isCorrect: boolean) => {
    // İlerleme güncellemesi için örnek bir fonksiyon
    setStats((prev) => ({
      ...prev,
      totalScore: prev.totalScore + (isCorrect ? 10 : 0),
      quizCompleted: prev.quizCompleted + 1,
    }));
  };

  return {
    progress,
    achievements,
    stats,
    updateProgress,
  };
}