export interface ResponseInterface<T> {
  data: T[];
  count: number;
  next?: string;
  previous?: string;
}
