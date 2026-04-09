import axios from "axios";
import { cache } from "../config/cache";
import { env } from "../config/env";
import type { WeatherData } from "../types/weather";

export async function getWatherByContry(country: string): Promise<WeatherData> {
  const cacheKey = country.toLowerCase();
  const cached = cache.get<WeatherData>(cacheKey);

  if (cached) return cached;

  try {
    const { data } = await axios.get(`${env.weatherApiBaseUrl}/current.json`, {
      params: { key: env.weatherApiKey, q: country },
    });

    const weather: WeatherData = {
      country: data.location.country,
      city: data.location.name,
      localtime: data.location.localtime,
      temperature_c: data.current.temp_c,
      temperature_f: data.current.temp_f,
      condition: data.current.condition.text,
      condition_icon: `https:${data.current.condition.icon}`,
      feels_like_c: data.current.feels_like_c,
      feels_like_f: data.current.feels_like_f,
    };

    cache.set(cacheKey, weather);
    return weather;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 400) {
      const notFound = new Error("COUNTRY_NOT_FOUND");
      notFound.name = "COUNTRY_NOT_FOUND";
      throw notFound;
    }
    throw new Error("WATHER_API_UNAVAILABLE");
  }
}
