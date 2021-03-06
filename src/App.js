import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import AddEditBlog from './pages/AddEditBlog';
import NotFound from './components/NotFound';
import Blog from './components/Blog/Blog';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import About from './components/About/About';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
       <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/addBlog" element={<AddEditBlog />} />
          <Route path="/editBlog/:id" element={<AddEditBlog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
