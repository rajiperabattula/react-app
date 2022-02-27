import './App.css';
import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Blog from './pages/Blog';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
