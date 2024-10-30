import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Book } from '../../types/Book';
import BookItem from './BookItem';

describe('BookItem', () => {
  const book: Book = {
    key: 'test-key',
    title: 'Test title',
    first_publish_year: 2024,
    author_name: ['Test author 1', 'Test author 2'],
  };

  let onRemove: jest.Mock;
  let onEdit: jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Корректный рендер', () => {
    render(<BookItem book={book} onRemove={onRemove} onEdit={onEdit} />);

    expect(screen.getByText(`${book.title} (${book.first_publish_year})`)).toBeInTheDocument();
    expect(screen.getByText(book.author_name.join(', '))).toBeInTheDocument();
    expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
  });

  test('Корректная обработка нажатия на кнопку "Удалить"', () => {
    onRemove = jest.fn();
    render(<BookItem book={book} onRemove={onRemove} onEdit={onEdit} />);

    fireEvent.click(screen.getByTestId('delete-btn'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test('Корректная обработка нажатия на кнопку "Редактировать"', () => {
    onEdit = jest.fn();
    render(<BookItem book={book} onRemove={onRemove} onEdit={onEdit} />);

    fireEvent.click(screen.getByTestId('edit-btn'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
