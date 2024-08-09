export interface AppError extends Error {
  code: string;
  message: string;
}

export interface ApiError extends AppError {}

export interface UiError extends AppError {}
