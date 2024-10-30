import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { RefObject } from 'react';
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';
import Sort from '../../types/Sort';
import styles from './Header.module.scss';
import { queryValidationSchema } from '../../validations/searchValidationSchema';

interface HeaderProps {
  inputRef: RefObject<HTMLInputElement>;
  setQuery: (query: string) => void;
  sort: Sort;
  setSort: (sort: Sort) => void;
}

function Header({ inputRef, setQuery, sort, setSort }: HeaderProps) {
  const search = async () => {
    try {
      const value = inputRef.current?.value || '';
      await queryValidationSchema.validate(value);
      setQuery(value);
    } catch (e) {
      if (e instanceof ValidationError) {
        toast(e.message);
      } else {
        toast('Непредвиденная ошибка');
      }
    }
  };

  return (
    <AppBar className={styles.header}>
      <Toolbar className={styles.toolbar}>
        <FormControl>
          <Select className={styles.select} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <MenuItem value="best" className="select-option">
              Лучшее совпадение
            </MenuItem>
            <MenuItem value="new" className="select-option">
              Сначала новее
            </MenuItem>
            <MenuItem value="old" className="select-option">
              Сначала старее
            </MenuItem>
            <MenuItem value="title" className="select-option">
              По названию
            </MenuItem>
          </Select>
        </FormControl>
        <TextField inputRef={inputRef} defaultValue="" />
        <Button className={styles.button} variant="contained" onClick={search} type="submit">
          Найти
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
