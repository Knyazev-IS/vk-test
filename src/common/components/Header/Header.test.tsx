import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createRef } from 'react';
import { userEvent } from '@testing-library/user-event';
import { toast } from 'react-toastify';
import Sort from '../../types/Sort';
import Header from './Header';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('Header', () => {
  const inputRef = createRef<HTMLInputElement>();
  let setQuery: jest.Mock;
  let setSort: jest.Mock;
  const sort: Sort = 'best';
  const validQuery = 'test';
  const bigQuery = 'a'.repeat(257);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Корректный рендер', () => {
    render(<Header inputRef={inputRef} setQuery={setQuery} sort={sort} setSort={setSort} />);

    expect(screen.getByText('Найти')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeEmptyDOMElement();
    expect(screen.getByRole('combobox')).toHaveTextContent('Лучшее совпадение');
    expect(toast).not.toHaveBeenCalled();
  });

  test('Корректный ввод', async () => {
    setQuery = jest.fn();
    render(<Header inputRef={inputRef} setQuery={setQuery} sort={sort} setSort={setSort} />);

    await userEvent.type(screen.getByRole('textbox'), validQuery);
    expect(screen.getByRole('textbox')).toHaveValue(validQuery);

    await userEvent.click(screen.getByText('Найти'));
    await waitFor(() => {
      expect(setQuery).toHaveBeenCalledTimes(1);
    });
    expect(setQuery).toHaveBeenCalledWith(validQuery);
  });

  test.each([
    { query: '', error: 'Мне нечего искать...' },
    { query: bigQuery, error: 'Максимальное число символов - 256' },
  ])('Некорректный ввод', async ({ query, error }) => {
    setQuery = jest.fn();
    render(<Header inputRef={inputRef} setQuery={setQuery} sort={sort} setSort={setSort} />);

    if (query) await userEvent.type(screen.getByRole('textbox'), query);
    expect(screen.getByRole('textbox')).toHaveValue(query);

    await userEvent.click(screen.getByText('Найти'));
    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });
    expect(toast).toHaveBeenCalledWith(error);
    expect(setQuery).not.toHaveBeenCalled();
  });

  test.each([
    { sortType: 'old', sortName: 'Сначала старее' },
    { sortType: 'new', sortName: 'Сначала новее' },
    { sortType: 'title', sortName: 'По названию' },
  ])('Корректное изменение вида сортировки', async ({ sortType, sortName }) => {
    setSort = jest.fn();
    render(<Header inputRef={inputRef} setQuery={setQuery} sort={sort} setSort={setSort} />);

    expect(screen.getByRole('combobox')).toHaveTextContent('Лучшее совпадение');
    expect(screen.queryByText(sortName)).toBeNull();

    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: sortName })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: sortName }));

    expect(setSort).toHaveBeenCalledTimes(1);
    expect(setSort).toHaveBeenCalledWith(sortType);
    expect(screen.getByText(sortName)).toBeInTheDocument();
  });
});
