import { AppBar, Button, TextField, Toolbar, FormControl, MenuItem, Select } from '@mui/material';
import { RefObject } from 'react';
import Sort from '../../types/Sort';
import styles from './Header.module.scss';

interface HeaderProps {
  inputRef: RefObject<HTMLInputElement>;
  onSearch: () => void;
  sort: Sort;
  setSort: (sort: Sort) => void;
}

function Header({ inputRef, onSearch, sort, setSort }: HeaderProps) {
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
        <Button className={styles.button} variant="contained" onClick={onSearch} type="submit">
          Найти
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
