import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useFormik } from 'formik';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import BookStore from '../../store/BookStore';
import Sort from '../../common/types/Sort';
import { BookFields, bookInitialValues, bookValidationSchema } from '../../common/validations/bookValidationSchema';
import { Book } from '../../common/types/Book';
import Header from '../../common/components/Header/Header';
import BookItem from '../../common/components/BookItem/BookItem';
import EditDialog from '../../common/components/EditDialog/EditDialog';
import styles from './BookList.module.scss';

const BookList = observer(() => {
  const { books, isLoading, getBooks, removeBook, editBook } = BookStore;
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

  useEffect(() => {
    if (query) getBooks(query, sort, page, true);
  }, [query, sort]);

  useEffect(() => {
    if (query) getBooks(query, sort, page);
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <>
      <Header inputRef={input} setQuery={setQuery} sort={sort} setSort={setSort} />
      <Box className={styles.box}>
        {books && books.length !== 0 && (
          <>
            <List className={styles.list}>
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
            <EditDialog open={open} onClose={() => setOpen(false)} formik={formik} />
          </>
        )}
        {isLoading && <CircularProgress />}
      </Box>
    </>
  );
});

export default BookList;
