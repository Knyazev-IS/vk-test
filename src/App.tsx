import { ToastContainer } from 'react-toastify';
import BookList from './common/components/BookList/BookList';

function App() {
  return (
    <>
      <BookList />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
