import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { Header } from './components/Header';
// import { history } from './history';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />} />
    </Routes>
    </BrowserRouter>
  )
}
