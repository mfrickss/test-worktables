'use client';

import { useEffect, useState } from 'react';
import { fetchBoardItems } from '@/services/mondayService';
import type { CountryItem } from '@/types/monday';

export function useMondayData() {
  const [items, setItems] = useState<CountryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBoardItems()
      .then(setItems)
      .catch(() => setError('Failed to load board data.'))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading, error };
}