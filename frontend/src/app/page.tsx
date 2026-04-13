'use client';

import { useState, useMemo } from 'react';
import { useMondayData } from '@/hooks/useMondayData';
import { useWeather } from '@/hooks/useWeather';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { CountryList } from '@/components/CountryList/CountryList';
import { WeatherModal } from '@/components/WeatherModal/WeatherModal';
import styles from './page.module.css';

export default function Home() {
  const { items, loading: loadingBoard } = useMondayData();
  const {
    weather,
    loading: loadingWeather,
    error,
    loadWeather,
    clearWeather,
  } = useWeather();
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [items, search],
  );

  async function handleSelect(country: string) {
    setSelectedCountry(country);
    await loadWeather(country);
  }

  function handleClose() {
    setSelectedCountry(null);
    clearWeather();
  }

  return (
    <main className={styles.main}>
      <div className={styles.heroGlow}></div>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Global Weather</h1>
          <p className={styles.subtitle}>
            Select a country from your monday.com board
          </p>
        </header>

        <SearchBar onSearch={setSearch} />

        {loadingBoard ? (
          <div className={styles.loadingState}>
            <div className={styles.pulse}></div>
            <p>Syncing with monday.com...</p>
          </div>
        ) : (
          <CountryList items={filtered} onSelect={handleSelect} />
        )}

        {selectedCountry && (
          <WeatherModal
            country={selectedCountry}
            weather={weather}
            loading={loadingWeather}
            error={error}
            onClose={handleClose}
          />
        )}
      </div>
    </main>
  );
}
