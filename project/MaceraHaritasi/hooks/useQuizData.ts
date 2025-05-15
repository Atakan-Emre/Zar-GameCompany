import { useState, useEffect } from 'react';
import { quizData } from '@/data/quizData';
import { QuizQuestion } from '@/data/quizData';

export function useQuizData() {
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>(quizData);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuizData();
  }, []);

  const loadQuizData = async () => {
    try {
      // Gerçek bir uygulamada, bu veriler depolama veya API'den alınırdı
      const mockCompletedQuizzes = ['rome_1', 'paris_1'];
      setCompletedQuizzes(mockCompletedQuizzes);
    } catch (err) {
      setError('Quiz verileri yüklenirken hata oluştu: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getQuestionsByCity = (cityId: string) => {
    return allQuestions.filter((question) => question.cityId === cityId);
  };

  const getRandomQuestions = (count: number) => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const markQuizAsCompleted = (quizId: string) => {
    if (!completedQuizzes.includes(quizId)) {
      setCompletedQuizzes((prev) => [...prev, quizId]);
    }
  };

  const updateScore = (isCorrect: boolean) => {
    setCurrentScore((prev) => (isCorrect ? prev + 1 : prev));
  };

  const resetScore = () => {
    setCurrentScore(0);
  };

  return {
    allQuestions,
    completedQuizzes,
    currentScore,
    isLoading,
    error,
    getQuestionsByCity,
    getRandomQuestions,
    markQuizAsCompleted,
    updateScore,
    resetScore,
  };
} 