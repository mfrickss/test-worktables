'use client';

import { useState } from 'react';
import { fetchWeather } from '@/services/weatherApi';
import type { WeatherData } from '@/types/weather';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadWeather(country: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(country);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function clearWeather() {
    setWeather(null);
    setError(null);
  }

  return { weather, loading, error, loadWeather, clearWeather };
}