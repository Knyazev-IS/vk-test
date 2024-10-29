import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { FormikProps } from 'formik';
import { BookFields } from '../../validations/bookValidationSchema';

interface EditBookDialogProps {
  open: boolean;
  onClose: () => void;
  formik: FormikProps<BookFields>;
}

function EditBookDialog({ open, onClose, formik }: EditBookDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать книгу</DialogTitle>
      <DialogContent>
        <form id="subtype-form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Название"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Авторы"
            name="author_name"
            value={formik.values.author_name}
            onChange={formik.handleChange}
            error={formik.touched.author_name && Boolean(formik.errors.author_name)}
            helperText={formik.touched.author_name && formik.errors.author_name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Год публикации"
            name="first_publish_year"
            value={formik.values.first_publish_year}
            onChange={formik.handleChange}
            error={formik.touched.first_publish_year && Boolean(formik.errors.first_publish_year)}
            helperText={formik.touched.first_publish_year && formik.errors.first_publish_year}
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

export default EditBookDialog;
