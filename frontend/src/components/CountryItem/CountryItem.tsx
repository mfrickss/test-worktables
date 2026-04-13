import type { CountryItem as CountryItemType } from '@/types/monday';
import styles from './CountryItem.module.css';

interface CountryItemProps {
  country: CountryItemType;
  onClick: (countryName: string) => void;
}

export function CountryItem({ country, onClick }: CountryItemProps) {
  return (
    <div
      className={styles.itemCard}
      onClick={() => onClick(country.name)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(country.name);
        }
      }}
    >
      <div className={styles.content}>
        <span className={styles.name}>{country.name}</span>
        <svg
          className={styles.arrow}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}
