import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { quizData } from '@/data/quizData';
import QuizOption from '@/components/quiz/QuizOption';
import QuizProgress from '@/components/quiz/QuizProgress';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import AchievementPopup from '@/components/quiz/AchievementPopup';
import FactPopup from '@/components/quiz/FactPopup';
import StreakAnimation from '@/components/quiz/StreakAnimation';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { Camera, Check, X, ArrowLeft, Trophy, Star } from 'lucide-react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [showFact, setShowFact] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const router = useRouter();

  const currentQuestion = quizData[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizData.length) * 100;

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (correct: boolean) => {
    if (Platform.OS === 'web') return;
    
    const { sound } = await Audio.Sound.createAsync(
      correct 
        ? require('@/assets/sounds/correct.mp3') 
        : require('@/assets/sounds/incorrect.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  };

  const triggerHapticFeedback = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleSelectOption = async (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(score + 1);
      playSound(true);
      await triggerHapticFeedback();
      
      if (newStreak > 0 && newStreak % 3 === 0) {
        setShowStreak(true);
      } else {
        setShowFact(true);
      }
    } else {
      setStreak(0);
      playSound(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(null);
      setShowFact(false);
      setShowStreak(false);
    } else {
      setShowQuizFeedback(true);
      
      if (score === quizData.length) {
        setTimeout(() => {
          setShowAchievement(true);
        }, 1000);
      }
    }
  };

  const handleQuizComplete = () => {
    setShowQuizFeedback(false);
    router.push('/achievements');
  };

  if (showQuizFeedback) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />
        <View style={styles.resultContainer}>
          <Trophy size={64} color={COLORS.primary} />
          <Text style={styles.resultTitle}>Quiz Tamamlandı!</Text>
          <Text style={styles.resultScore}>
            {score} / {quizData.length} doğru
          </Text>
          <Text style={styles.resultMessage}>
            {score === quizData.length
              ? 'Harika! Tüm soruları doğru bildin!'
              : score >= quizData.length / 2
              ? 'İyi iş! Daha fazla pratik yaparak daha iyi olabilirsin.'
              : 'Biraz daha çalışmaya ihtiyacın var. Tekrar dene!'}
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={handleQuizComplete}>
            <Text style={styles.restartButtonText}>Quiz'i Bitir</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.progress}>
          Soru {currentQuestionIndex + 1} / {quizData.length}
        </Text>
        <View style={styles.scoreContainer}>
          <Star size={20} color={COLORS.primary} />
          <Text style={styles.score}>{score}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          key={currentQuestionIndex}
          entering={SlideInRight}
          exiting={SlideOutLeft}
          style={styles.questionCard}
        >
          <Text style={styles.questionNumber}>
            Soru {currentQuestionIndex + 1}/{quizData.length}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                selected={selectedOption === index}
                correct={isAnswered ? index === currentQuestion.correctAnswer : undefined}
                onSelect={() => handleSelectOption(index)}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {isAnswered && (
        <Animated.View 
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.feedbackContainer}
        >
          <View style={[
            styles.feedbackCard,
            isCorrect ? styles.correctFeedback : styles.incorrectFeedback
          ]}>
            <View style={styles.feedbackIconContainer}>
              {isCorrect ? (
                <Check size={24} color={COLORS.white} />
              ) : (
                <X size={24} color={COLORS.white} />
              )}
            </View>
            <Text style={styles.feedbackText}>
              {isCorrect 
                ? "Harika! Doğru cevap!" 
                : `Yanlış! Doğru cevap: ${currentQuestion.options[currentQuestion.correctAnswer]}`
              }
            </Text>
          </View>

          <View style={styles.buttonRow}>
            {isCorrect && (
              <TouchableOpacity
                style={[styles.button, styles.arButton]}
                onPress={() => router.push({
                  pathname: '/arview',
                  params: { cityId: currentQuestion.cityId }
                })}
              >
                <Camera size={20} color={COLORS.white} />
                <Text style={styles.buttonText}>AR'da Görüntüle</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[styles.button, styles.nextButton]}
              onPress={handleNextQuestion}
            >
              <Text style={styles.buttonText}>
                {currentQuestionIndex < quizData.length - 1 ? "Sonraki Soru" : "Quiz'i Bitir"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {showFact && (
        <FactPopup
          fact="Biliyor muydunuz? Farklı şehirler hakkında öğrenmek, çeşitli kültürleri ve tarihleri anlamamıza yardımcı olur!"
          onClose={() => setShowFact(false)}
        />
      )}

      {showAchievement && (
        <AchievementPopup
          title="Mükemmel Skor!"
          description="Tüm soruları doğru cevapladın. Sen gerçek bir Dünya Kaşifisin!"
          onClose={() => setShowAchievement(false)}
        />
      )}

      {showStreak && (
        <StreakAnimation
          streak={streak}
          onComplete={() => {
            setShowStreak(false);
            setShowFact(true);
          }}
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
  header: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.medium,
    paddingBottom: SPACING.medium,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: 'Nunito-Bold',
    color: COLORS.dark,
    marginBottom: SPACING.small,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.extraLarge,
  },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.large,
    marginVertical: SPACING.medium,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionNumber: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small,
    color: COLORS.primary,
    marginBottom: SPACING.small,
  },
  questionText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.medium + 2,
    color: COLORS.dark,
    marginBottom: SPACING.medium,
  },
  optionsContainer: {
    marginTop: SPACING.small,
  },
  feedbackContainer: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
  },
  feedbackCard: {
    borderRadius: SIZES.radius,
    padding: SPACING.medium,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  correctFeedback: {
    backgroundColor: COLORS.success,
  },
  incorrectFeedback: {
    backgroundColor: COLORS.error,
  },
  feedbackIconContainer: {
    marginRight: SPACING.small,
  },
  feedbackText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: SIZES.small + 2,
    color: COLORS.white,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: SIZES.radius,
    padding: SPACING.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arButton: {
    backgroundColor: COLORS.primary,
    flex: 0.48,
  },
  nextButton: {
    backgroundColor: COLORS.secondary,
    flex: 0.48,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small + 2,
    color: COLORS.white,
    marginLeft: SPACING.small,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: SIZES.large,
    fontFamily: 'Nunito-Bold',
    color: COLORS.dark,
    marginBottom: SPACING.medium,
  },
  resultScore: {
    fontSize: SIZES.large,
    fontFamily: 'Nunito-Bold',
    color: COLORS.primary,
    marginBottom: SPACING.medium,
  },
  resultMessage: {
    fontSize: SIZES.medium,
    fontFamily: 'Nunito-Regular',
    color: COLORS.dark,
    marginBottom: SPACING.extraLarge,
    textAlign: 'center',
  },
  restartButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: SIZES.radius,
  },
  restartButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small + 2,
    color: COLORS.white,
  },
  progress: {
    fontSize: SIZES.medium,
    fontFamily: 'Nunito-Bold',
    color: COLORS.dark,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: SIZES.medium,
    fontFamily: 'Nunito-Bold',
    color: COLORS.primary,
    marginLeft: SPACING.small,
  },
});