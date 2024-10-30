import { render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { useFormik } from 'formik';
import EditDialog from './EditDialog';
import { BookFields, bookValidationSchema } from '../../validations/bookValidationSchema';

describe('EditBookDialog', () => {
  const open = true;
  let onClose: jest.Mock;
  const initialValues: BookFields = {
    title: 'Test',
    author_name: 'test1, test2',
    first_publish_year: 2024,
  };
  const getFormik = (values: BookFields = initialValues) => {
    const { result } = renderHook(() =>
      useFormik<BookFields>({
        initialValues: values,
        validationSchema: bookValidationSchema,
        onSubmit: jest.fn(),
      }),
    );
    return result.current;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Корректный рендер', () => {
    const formik = getFormik();
    render(<EditDialog open={open} onClose={onClose} formik={formik} />);

    expect(screen.getByLabelText('Название')).toHaveValue(initialValues.title);
    expect(screen.getByLabelText('Авторы')).toHaveValue(initialValues.author_name);
    expect(screen.getByLabelText('Год публикации')).toHaveValue(initialValues.first_publish_year.toString());
    expect(screen.getByText('Закрыть')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
  });

  test('Корректная обработка нажатия на кнопку "Закрыть"', async () => {
    const formik = getFormik();
    onClose = jest.fn();
    render(<EditDialog open={open} onClose={onClose} formik={formik} />);

    await userEvent.click(screen.getByText('Закрыть'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
