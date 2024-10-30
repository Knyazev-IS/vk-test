import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Book, BooksResponse } from '../common/types/Book';
import Sort from '../common/types/Sort';
import { getOpenlibraryUrl } from '../common/utils/api';

class BookStore {
  books: Book[] = [];

  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getBooks = async (query: string, sort: Sort = 'best', page: number = 1, isNewQuery = false) => {
    try {
      this.isLoading = true;
      const res: BooksResponse = (
        await axios.get<BooksResponse, AxiosResponse<BooksResponse>>(getOpenlibraryUrl(query, sort, page))
      ).data;
      runInAction(() => {
        if (isNewQuery) {
          this.books = res.docs;
        } else {
          this.books.push(...res.docs);
        }
        this.isLoading = false;
      });
    } catch (error) {
      toast('Ошибка при загрузке списка!');
      this.isLoading = false;
    }
  };

  removeBook = (key: string) => {
    this.books = this.books.filter((el) => el.key !== key);
  };

  editBook = (book: Book) => {
    this.books = this.books.map((el) => (el.key === book.key ? book : el));
  };
}

export default new BookStore();
