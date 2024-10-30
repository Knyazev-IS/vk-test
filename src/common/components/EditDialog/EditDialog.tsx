import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormikProps } from 'formik';
import { BookFields } from '../../validations/bookValidationSchema';

interface EditBookDialogProps {
  open: boolean;
  onClose: () => void;
  formik: FormikProps<BookFields>;
}

function EditDialog({ open, onClose, formik }: EditBookDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать книгу</DialogTitle>
      <DialogContent>
        <form data-testid="dialog-form" id="subtype-form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Название"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.title)}
            helperText={formik.errors.title}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Авторы"
            name="author_name"
            value={formik.values.author_name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.author_name)}
            helperText={formik.errors.author_name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Год публикации"
            name="first_publish_year"
            value={formik.values.first_publish_year}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.first_publish_year)}
            helperText={formik.errors.first_publish_year}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
        <Button type="submit" form="subtype-form" color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
