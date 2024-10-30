import 'global-jsdom/register';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import BookList from './BookList';
import BookStore from '../../store/BookStore';
import { Book } from '../../common/types/Book';

class IntersectionObserver {
  observe = jest.fn();

  disconnect = jest.fn();

  unobserve = jest.fn();
}

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

describe('BookList', () => {
  const books: Book[] = [
    { key: '1', title: 'Test 1', author_name: ['test1_1', 'test1_2'], first_publish_year: 2023 },
    { key: '2', title: 'Test 2', author_name: ['test2_1', 'test2_2'], first_publish_year: 2024 },
  ];

  beforeEach(() => {
    BookStore.books = books;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Корректный рендер', () => {
    render(<BookList />);
    expect(screen.getByText('Найти')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    BookStore.books.forEach((book) => {
      expect(screen.getByText(`${book.title} (${book.first_publish_year})`)).toBeInTheDocument();
      expect(screen.getByText(book.author_name.join(', '))).toBeInTheDocument();
    });
  });

  test('Удаление книги', async () => {
    render(<BookList />);
    expect(BookStore.books.length).toEqual(2);
    await userEvent.click(screen.getAllByTestId('delete-btn')[0]);
    expect(BookStore.books.length).toEqual(1);
  });

  test('Открытие окна с редактированием информации о книге', async () => {
    render(<BookList />);
    await userEvent.click(screen.getAllByTestId('edit-btn')[0]);
    expect(screen.getByText('Редактировать книгу')).toBeInTheDocument();
  });
});
