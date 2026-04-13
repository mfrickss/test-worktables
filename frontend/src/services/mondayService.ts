import mondaySdk from 'monday-sdk-js';
import type { CountryItem } from '@/types/monday';

const monday = mondaySdk();

export async function fetchBoardItems(): Promise<CountryItem[]> {
  const res = await monday.api(`
    query {
      boards(limit: 1) {
        items_page(limit: 100) {
          items {
            id
            name
            column_values {
              id
              text
            }
          }
        }
      }
    }
  `);

  return res.data.boards[0].items_page.items as CountryItem[];
}
