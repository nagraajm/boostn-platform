// Shared type definitions
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ShareData {
  title: string;
  text: string;
  url: string;
  hashtags?: string[];
}
