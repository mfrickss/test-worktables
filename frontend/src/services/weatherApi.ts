import type { ApiResponse, WeatherData } from '@/types/weather';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWeather(country: string): Promise<WeatherData> {
  const res = await fetch(`${BASE_URL}/weather/${encodeURIComponent(country)}`);
  const json: ApiResponse<WeatherData> = await res.json();

  if (!json.success) {
    throw new Error(json.message);
  }

  return json.data;
}
