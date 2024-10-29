import * as Yup from 'yup';

const MAX_QUERY_LENGTH = 256;

export const queryValidationSchema = Yup.string()
  .required('Обязательное поле')
  .max(MAX_QUERY_LENGTH, `Максимальное число символов - ${MAX_QUERY_LENGTH}`);
