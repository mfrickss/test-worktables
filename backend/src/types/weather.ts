export interface WeatherData {
  country: string;
  city: string;
  localtime: string;
  temperature_c: number;
  temperature_f: number;
  condition: string;
  condition_icon: string;
  feels_like_c: number;
  feels_like_f: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  code: string;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
