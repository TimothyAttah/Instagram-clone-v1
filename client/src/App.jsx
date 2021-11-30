import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';

export const App = () => {
  return (
    <BrowserRouter>
      
        <Route exact path='/'>
          <Header />
        </Route>
    
    </BrowserRouter>
  )
}
