export type PermittedLanguages = 'en' | 'ru';

export type PaginatedList<T> = {
  items: T[];
  total: number;
};

export type UserId = string;
