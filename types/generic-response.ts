export interface ResponseInterface<T> {
  data: T[];
  count: number;
  next?: string;
  previous?: string;
}

export interface SearchResponseInterface<T> extends Omit<ResponseInterface<T>, 'next' | 'previous'> {
  next: SearchPaginationParams;
  previous: SearchPaginationParams;
}

export interface SearchPaginationParams {
  offset: number;
  limit: number;
}
