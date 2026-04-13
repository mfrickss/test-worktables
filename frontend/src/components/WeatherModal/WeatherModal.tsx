import { useEffect } from 'react';
import type { WeatherData } from '@/types/weather';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import styles from './WeatherModal.module.css';

interface WeatherModalProps {
  country: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

export function WeatherModal({
  country,
  weather,
  loading,
  error,
  onClose,
}: WeatherModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className={styles.title}>Weather in {country}</h2>

        {loading && (
          <div className={styles.stateContainer}>
            <LoadingSpinner />
            <p className={styles.stateText}>Fetching latest weather data...</p>
          </div>
        )}

        {error && (
          <div className={styles.stateContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        {weather && !loading && !error && (
          <div className={styles.weatherContent}>
            <div className={styles.header}>
              <div className={styles.location}>
                <h3>{weather.city}</h3>
                <p className={styles.time}>{weather.localtime}</p>
              </div>
              <div className={styles.conditionBox}>
                {weather.condition_icon && (
                  <img
                    src={weather.condition_icon}
                    alt={weather.condition}
                    className={styles.icon}
                  />
                )}
                <span className={styles.conditionText}>
                  {weather.condition}
                </span>
              </div>
            </div>

            <div className={styles.tempMain}>
              <div className={styles.tempGroup}>
                <span className={styles.temp}>{weather.temperature_c}°C</span>
                <span className={styles.feelsLike}>
                  Feels like {weather.feels_like_c}°C
                </span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.tempGroup}>
                <span className={styles.tempF}>{weather.temperature_f}°F</span>
                <span className={styles.feelsLike}>
                  Feels like {weather.feels_like_f}°F
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
