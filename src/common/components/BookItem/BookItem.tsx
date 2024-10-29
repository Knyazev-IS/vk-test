import { IconButton, ListItem, ListItemText } from '@mui/material';
import { forwardRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Book } from '../../types/Book';

interface BookItemProps {
  book: Book;
  onRemove: (key: string) => void;
  onEdit: () => void;
}

const BookItem = forwardRef<HTMLLIElement, BookItemProps>(({ book, onRemove, onEdit }, ref) => (
  <ListItem ref={ref}>
    <ListItemText
      primary={`${book.title} (${book.first_publish_year})`}
      secondary={`${book.author_name && book.author_name.join(', ')}`}
    />
    <IconButton onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <IconButton onClick={() => onRemove(book.key)}>
      <DeleteIcon />
    </IconButton>
  </ListItem>
));

BookItem.displayName = 'BookItem';

export default BookItem;
