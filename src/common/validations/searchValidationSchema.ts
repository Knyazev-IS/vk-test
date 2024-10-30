import * as Yup from 'yup';

const MAX_QUERY_LENGTH = 256;

export const queryValidationSchema = Yup.string()
  .required('Мне нечего искать...')
  .max(MAX_QUERY_LENGTH, `Максимальное число символов - ${MAX_QUERY_LENGTH}`);
