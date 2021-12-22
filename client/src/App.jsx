import React, { useEffect } from 'react';

import {Switch, Route, Router, Redirect } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Posts } from './pages/posts/Posts';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { PostCreate } from './pages/posts/PostCreate';
import { Profile } from './pages/profiles/Profile';
import { UserProfile } from './pages/profiles/UserProfile';
import { SignUp } from './pages/user/SignUp';
import { SignIn } from './pages/user/SignIn';
import { user } from './components/user';
import { getAllUsers } from './redux/actions/user';
import { history } from './history';

export const App = () => {
  toast.configure();
  const dispatch = useDispatch();

  useEffect(() => {
		if (user) {
			dispatch(getAllUsers());
		} else {
      history.push( '/signin' );
		}
	}, [dispatch]);
  return (
		<Router history={history}>
			<Header />
			<Switch>
				<Route path='/' exact>
					{user ? <Posts /> : <Redirect to='/signin' />}
        </Route>
        <Route path='/create'>
          <PostCreate />
        </Route>
        <Route path='/users/profile' exact>
          <Profile />
        </Route>
        <Route path='/users/profile/:userId'>
          <UserProfile />
        </Route>
				<Route path='/signup'>{user ? <Redirect to='/' /> : <SignUp />}</Route>
				<Route path='/signin'>{user ? <Redirect to='/' /> : <SignIn />}</Route>
			</Switch>
		</Router>
	);
}
