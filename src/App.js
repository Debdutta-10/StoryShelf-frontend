import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddBook from './components/AddBook';
import AddBookId from './components/AddBookId';
import AddMovie from './components/AddMovie';
import AddMovieId from './components/AddMovieId';
import EditBook from './components/EditBook'
import EditMovie from './components/EditMovie';
import UserProfile from './components/UserProfile'
import UserById from './components/UserById';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>

        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>

        <Route path='/add-book' element={<AddBook></AddBook>}></Route>
        <Route path='/add-book/:id' element={<AddBookId></AddBookId>}></Route>
        <Route path='/edit-book/:id' element= {<EditBook></EditBook>}></Route>

        <Route path='/add-movie' element={<AddMovie></AddMovie>}></Route>
        <Route path='/add-movie/:id' element={<AddMovieId></AddMovieId>}></Route>
        <Route path='/edit-movie/:id' element={<EditMovie></EditMovie>}></Route>

        <Route path='/user-profile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/user/:id' element={<UserById></UserById>}></Route>

      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
