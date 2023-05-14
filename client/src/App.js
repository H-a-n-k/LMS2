import './App.scss';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/PageLayout'
import Home from './pages/home';
import CategoryPage from './pages/category';
import BookPage from './pages/book';
import BookDetailPage from './pages/book-detail';
import PutBookPage from './pages/put-book';
import AboutPage from './pages/about';
import StaffPage from './pages/staff';
import LibCard from './pages/LibCard';
import LibCardDetail from './pages/libcard-detail';
import PutCardPage from './pages/put-card';
import BorrowPage from './pages/borrow';
import FinePage from './pages/fine';
import PutStaffPage from './pages/put-staff';

function App() {
  return <GlobalContextProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/BLibrary' element={<Home />} />
          <Route path='/BLibrary' element={<Home />} />
          <Route path='/BLibrary/Category' element={<CategoryPage />} />
          <Route path='/BLibrary/Book' element={<BookPage />} />
          <Route path='/BLibrary/Book/:id' element={<BookDetailPage />} />
          <Route path='/BLibrary/AddBook' element={<PutBookPage />} />
          <Route path='/BLibrary/UpdateBook/:id' element={<PutBookPage />} />
          <Route path='/BLibrary/About/' element={<AboutPage />} />
          <Route path='/BLibrary/Staff/' element={<StaffPage />} />
          <Route path='/BLibrary/LibCard/' element={<LibCard />} />
          <Route path='/BLibrary/LibCard/:id' element={<LibCardDetail />} />
          <Route path='/BLibrary/AddCard/' element={<PutCardPage />} />
          <Route path='/BLibrary/UpdateCard/:id' element={<PutCardPage />} />
          <Route path='/BLibrary/Borrow/' element={<BorrowPage />} />
          <Route path='/BLibrary/Fine/' element={<FinePage />} />
          <Route path='/BLibrary/AddEmp/' element={<PutStaffPage />} />
          <Route path='/BLibrary/UpdateEmp/:id' element={<PutStaffPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </GlobalContextProvider>
}

export default App;

//TODO
