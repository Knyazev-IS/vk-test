import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';
import { useFormik } from 'formik';
import { List } from '@mui/material';
import BookStore from '../../../store/BookStore';
import Sort from '../../types/Sort';
import { queryValidationSchema } from '../../validations/searchValidationSchema';
import { BookFields, bookInitialValues, bookValidationSchema } from '../../validations/bookValidationSchema';
import { Book } from '../../types/Book';
import Header from '../Header/Header';
import BookItem from '../BookItem/BookItem';
import EditBookDialog from '../EditDialog/EditDialog';

const BookList = observer(() => {
  const { getBooks, books, removeBook, editBook } = BookStore;
  const [sort, setSort] = useState<Sort>('best');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');
  const input = useRef<HTMLInputElement | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const onSubmit = async (values: BookFields) => {
    const book: Book = { ...values, author_name: values.author_name.split(', '), key };
    editBook(book);
  };

  const formik = useFormik({
    initialValues: bookInitialValues,
    onSubmit,
    validationSchema: bookValidationSchema,
  });

  const search = async () => {
    try {
      const value = input.current?.value || '';
      await queryValidationSchema.validate(value);
      setQuery(value);
    } catch (e) {
      toast(e);
    }
  };

  useEffect(() => {
    getBooks(query, sort, page, true);
  }, [query, sort]);

  useEffect(() => {
    getBooks(query, sort, page);
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <>
      <Header inputRef={input} onSearch={search} sort={sort} setSort={setSort} />
      {books && books.length !== 0 && (
        <List>
          {books.map((book, index) => (
            <BookItem
              key={book.key}
              book={book}
              ref={(node) => {
                if (node && index === books.length - 1) ref(node);
              }}
              onRemove={removeBook}
              onEdit={() => {
                formik.setValues({
                  title: book.title,
                  author_name: book.author_name.join(', '),
                  first_publish_year: book.first_publish_year,
                });
                setKey(book.key);
                setOpen(true);
              }}
            />
          ))}
        </List>
      )}
      <EditBookDialog open={open} onClose={() => setOpen(false)} formik={formik} />
    </>
  );
});

export default BookList;
