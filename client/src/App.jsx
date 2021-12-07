import React from 'react'
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Posts } from './pages/posts/Posts';
import { toast } from 'react-toastify';
import { PostCreate } from './pages/posts/PostCreate';
import { Profile } from './pages/profiles/Profile';
import { UserProfile } from './pages/profiles/UserProfile';

export const App = () => {
  toast.configure();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={ <Posts /> } />
        <Route path='/create' element={ <PostCreate /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/profile/:userId' element={ <UserProfile /> } />
    </Routes>
    </BrowserRouter>
  )
}
