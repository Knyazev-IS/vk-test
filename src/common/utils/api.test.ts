import { getOpenlibraryUrl } from './api';

describe('getOpenlibraryUrl', () => {
  test('Корректное значение', () => {
    const query = 'qwerty';
    const sort = 'new';
    const page = 2;
    expect(getOpenlibraryUrl(query, sort, page)).toEqual(
      `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=10&fields=key,author_name,first_publish_year,title&sort=${sort}`,
    );
  });
});
