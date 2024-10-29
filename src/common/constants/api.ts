import Sort from '../types/Sort';

export const OPENLIBRARY_URL = 'https://openlibrary.org/search.json';

export const getOpenlibraryUrl = (query: string, sort: Sort = 'best', page: number = 1) => {
  return `${OPENLIBRARY_URL}?q=${query}&page=${page}&limit=10&fields=key,author_name,first_publish_year,title${sort !== 'best' ? `&sort=${sort}` : ''}`;
};
