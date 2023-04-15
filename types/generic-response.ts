export interface ResponseInterface<T> {
  data: T[];
  count: number;
  next?: string;
  previous?: string;
}

export interface SearchResponseInterface<T> extends Omit<ResponseInterface<T>, 'next' | 'previous'> {
  next: {
    offset: number;
    limit: number;
  };

  previous: {
    offset: number;
    limit: number;
  };
}
