import { useEffect } from 'react';
import type { WeatherData } from '@/types/weather';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { getCountryFlagUrl } from '@/utils/flags';
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
  const flagUrl = getCountryFlagUrl(country);

  let formattedTime = weather?.localtime || '';
  if (weather?.localtime) {
    const parts = weather.localtime.split(' ');
    if (parts.length === 2) {
      const [year, month, day] = parts[0].split('-');
      if (year && month && day) {
        formattedTime = `${day}/${month}/${year} - ${parts[1]}`;
      }
    }
  }

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
        
        <div className={styles.headerArea}>
           <div className={styles.topIconBox}>
             {flagUrl ? (
                 <img src={flagUrl} alt={`${country} flag`} className={styles.topImage} />
             ) : (
                 <span className={styles.topIconFallback}>🏳️</span>
             )}
           </div>
           
           <button className={styles.closeX} onClick={onClose} aria-label="Close">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

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
          <>
            <div className={styles.titleArea}>
              <h2 className={styles.title}>{country}</h2>
              <p className={styles.subtitle}>
                {weather.city}<br />
                {formattedTime}
              </p>
            </div>

            <div className={styles.cardArea}>
               <div className={styles.cardMainInfo}>
                 <span className={styles.tempMain}>{weather.temperature_c}°</span>
                 <span className={styles.tempLabel}>Celsius</span>
               </div>
               
               <div className={styles.cardDivider}></div>
               
               <div className={styles.cardMainInfo}>
                 <span className={styles.tempSecondary}>{weather.temperature_f}°</span>
                 <span className={styles.tempLabel}>Fahrenheit</span>
               </div>
            </div>

            <h3 className={styles.sectionTitle}>Current Conditions</h3>
            
            <div className={styles.listArea}>
               {/* Item 1: Condition */}
               <div className={styles.listItem}>
                 <div className={styles.itemLeft}>
                    {weather.condition_icon ? (
                       <img src={weather.condition_icon} alt={weather.condition} className={styles.itemAvatar} />
                    ) : (
                       <div className={styles.itemAvatarFallback}>☁️</div>
                    )}
                    <div className={styles.itemDetails}>
                       <span className={styles.itemName}>Situation</span>
                       <span className={styles.itemDesc}>{weather.condition}</span>
                    </div>
                 </div>
                 <div className={styles.itemRight}>
                    <div className={styles.badge}>Live</div>
                 </div>
               </div>

               {/* Item 2: Feels Like */}
               <div className={styles.listItem}>
                 <div className={styles.itemLeft}>
                    <div className={styles.itemAvatarFallback}>🌡️</div>
                    <div className={styles.itemDetails}>
                       <span className={styles.itemName}>Feels Like</span>
                       <span className={styles.itemDesc}>Human perception</span>
                    </div>
                 </div>
                 <div className={styles.itemRight}>
                    <div className={styles.dualBadge}>
                       <span>{weather.feels_like_c}°C</span>
                       <span className={styles.dualDivider}>|</span>
                       <span>{weather.feels_like_f}°F</span>
                    </div>
                 </div>
               </div>
            </div>

            <div className={styles.footerArea}>
              <div className={styles.footerLeft}>
                <button className={styles.secondaryBtn} onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  Back
                </button>
              </div>
              <button className={styles.primaryBtn} onClick={onClose}>
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
