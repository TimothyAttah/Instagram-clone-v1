import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Header />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
