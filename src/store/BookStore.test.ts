import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import BookStore from './BookStore';
import { Book, BooksResponse } from '../common/types/Book';
import { getOpenlibraryUrl } from '../common/utils/api';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('BookStore', () => {
  let mock: MockAdapter;
  const books: Book[] = [
    { key: 'test1', title: 'Test 1', author_name: ['test1_1', 'test1_2'], first_publish_year: 2023 },
    { key: 'test2', title: 'Test 2', author_name: ['test2_1', 'test2_2'], first_publish_year: 2024 },
  ];
  const editedBook: Book = { ...books[0], title: 'Edited Book 1' };
  const res: BooksResponse = {
    docs: books,
    numFound: books.length,
    start: 0,
    numFoundExact: true,
    num_found: books.length,
    q: 'test',
    offset: null,
  };

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  test('Корректное обновление стора при изменении query', async () => {
    mock.onGet(getOpenlibraryUrl('test', 'best', 1)).reply(200, res);
    await BookStore.getBooks('test', 'best', 1, true);
    expect(BookStore.books).toEqual([...books]);
    expect(BookStore.isLoading).toBe(false);
  });

  test('Корректное обновление стора при том же query', async () => {
    mock.onGet(getOpenlibraryUrl('test', 'best', 1)).reply(200, res);
    await BookStore.getBooks('test', 'best', 1, false);
    expect(BookStore.books).toEqual([...books, ...books]);
    expect(BookStore.isLoading).toBe(false);
  });

  test('Обработка ошибки при получении данных с сервера', async () => {
    mock.onGet(getOpenlibraryUrl('test', 'best', 1)).reply(500);
    await BookStore.getBooks('test', 'best', 1, false);
    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });
    expect(toast).toHaveBeenCalledWith('Ошибка при загрузке списка!');
  });

  test('Корректное удаление книги', () => {
    BookStore.books = books;
    BookStore.removeBook(books[0].key);
    expect(BookStore.books).toEqual([books[1]]);
  });

  test('Корректное редактирование книги', () => {
    BookStore.books = books;
    BookStore.editBook(editedBook);
    expect(BookStore.books).toEqual([editedBook, books[1]]);
  });
});
