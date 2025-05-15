import { useState, useEffect } from 'react';
import { cities } from '@/data/cityData';
import { City } from '@/data/cityData';

export function useCityData() {
  const [allCities, setAllCities] = useState<City[]>(cities);
  const [visitedCities, setVisitedCities] = useState<string[]>([]);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCityData();
  }, []);

  const loadCityData = async () => {
    try {
      // Gerçek bir uygulamada, bu veriler depolama veya API'den alınırdı
      const mockVisitedCities = ['rome', 'paris'];
      const mockFavoriteCities = ['rome'];
      setVisitedCities(mockVisitedCities);
      setFavoriteCities(mockFavoriteCities);
    } catch (err) {
      setError('Şehir verileri yüklenirken hata oluştu: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCityById = (cityId: string) => {
    return allCities.find((city) => city.id === cityId);
  };

  const markCityAsVisited = (cityId: string) => {
    if (!visitedCities.includes(cityId)) {
      setVisitedCities((prev) => [...prev, cityId]);
    }
  };

  const toggleFavorite = (cityId: string) => {
    setFavoriteCities((prev) =>
      prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId]
    );
  };

  const getVisitedCities = () => {
    return allCities.filter((city) => visitedCities.includes(city.id));
  };

  const getFavoriteCities = () => {
    return allCities.filter((city) => favoriteCities.includes(city.id));
  };

  return {
    allCities,
    visitedCities,
    favoriteCities,
    isLoading,
    error,
    getCityById,
    markCityAsVisited,
    toggleFavorite,
    getVisitedCities,
    getFavoriteCities,
  };
} 