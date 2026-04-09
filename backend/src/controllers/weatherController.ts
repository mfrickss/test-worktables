import type { NextFunction, Request, Response } from 'express';
import { getWeatherByCountry } from '../services/weatherService';
import type { ApiResponse, WeatherData } from '../types/weather';

export async function weatherController(
  req: Request<{ country: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { country } = req.params;

  if (!country?.trim()) {
    const body: ApiResponse<never> = {
      success: false,
      code: 'INVALID_PARAM',
      message: 'Country name is required',
    };
    res.status(400).json(body);
    return;
  }

  try {
    const data = await getWeatherByCountry(country);
    const body: ApiResponse<WeatherData> = { success: true, data };
    res.status(200).json(body);
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'COUNTRY_NOT_FOUND') {
      const body: ApiResponse<never> = {
        success: false,
        code: 'COUNTRY_NOT_FOUND',
        message: `No weather data found for "${country}".`,
      };
      res.status(404).json(body);
      return;
    }

    if (err instanceof Error && err.name === 'WEATHER_API_UNAVAILABLE') {
      const body: ApiResponse<never> = {
        success: false,
        code: 'WEATHER_API_UNAVAILABLE',
        message: 'Oops! Weather service is temporarily unavailable.',
      };
      res.status(503).json(body);
      return;
    }

    next(err);
  }
}
