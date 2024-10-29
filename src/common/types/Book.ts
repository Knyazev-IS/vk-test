export type BooksResponse = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
  num_found: number;
  q: string;
  offset: null | number;
};

export type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
};
