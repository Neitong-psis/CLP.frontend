export interface ApiSuccessResponse<TData> {
  readonly success: true;
  readonly data: TData;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly error: string;
  readonly code?: string;
}

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;
