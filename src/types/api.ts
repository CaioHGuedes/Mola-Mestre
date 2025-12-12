export interface ApiError {
  erro: string;
}

export interface ApiResponse<T> {
  msg?: string;
  data?: T;
}
