import * as Yup from 'yup';

const MAX_LENGTH = 256;
const MIN_LENGTH = 2;
const MAX_YEAR = new Date().getFullYear();
const MIN_YEAR = 1;

export type BookFields = {
  title: string;
  author_name: string;
  first_publish_year: number;
};

export const bookInitialValues: BookFields = {
  title: '',
  author_name: '',
  first_publish_year: 0,
};

export const bookValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Поле не должно быть пустым')
    .min(MIN_LENGTH, `Минимальное число символов - ${MIN_LENGTH}`)
    .max(MAX_LENGTH, `Максимальное число символов - ${MAX_LENGTH}`),
  author_name: Yup.string()
    .required('Поле не должно быть пустым')
    .min(MIN_LENGTH, `Минимальное число символов - ${MIN_LENGTH}`)
    .max(MAX_LENGTH, `Максимальное число символов - ${MAX_LENGTH}`),
  first_publish_year: Yup.number()
    .required('Поле не должно быть пустым')
    .min(MIN_YEAR, `Минимальный год - ${MIN_YEAR}`)
    .max(MAX_YEAR, `Максимальный год - ${MAX_YEAR}`),
});
