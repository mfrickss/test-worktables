'use client';

import { useState, useMemo } from 'react';
import { useMondayData } from '@/hooks/useMondayData';
import { useWeather } from '@/hooks/useWeather';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { CountryList } from '@/components/CountryList/CountryList';
import { WeatherModal } from '@/components/WeatherModal/WeatherModal';
import styles from './page.module.css';

export default function Home() {
  const { items, loading: loadingBoard, error: boardError } = useMondayData();
  const {
    weather,
    loading: loadingWeather,
    error: weatherError,
    loadWeather,
    clearWeather,
  } = useWeather();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery]
  );

  async function handleSelect(country: string) {
    setSelectedCountry(country);
    await loadWeather(country);
  }

  function handleCloseModal() {
    setSelectedCountry(null);
    clearWeather();
  }

  if (boardError) {
    return (
      <main className={styles.main}>
        <div className={styles.errorContainer}>
          <h2>Failed to Sync Data</h2>
          <p>{boardError}</p>
        </div>
      </main>
    );
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

        {loadingBoard ? (
          <div className={styles.loadingState}>
            <div className={styles.pulse}></div>
            <p>Syncing with monday.com...</p>
          </div>
        ) : (
          <SearchBar 
            items={items} 
            onSelect={handleSelect} 
            onSearchChange={setSearchQuery} 
          />
        )}
        
        {/* Restoring the normal display of countries with the new small cards */}
        {!loadingBoard && items.length > 0 && (
          <CountryList items={filteredItems} onSelect={handleSelect} />
        )}

        {selectedCountry && (
          <WeatherModal
            country={selectedCountry}
            weather={weather}
            loading={loadingWeather}
            error={weatherError}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </main>
  );
}
