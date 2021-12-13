import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/actions/auth';
import {
  Container,
  FileWrapper,
  Form,
  PasswordContainer
} from './Styles';

export const SignUp = () => {
	const dispatch = useDispatch();
  const [ showPassword, setShowPassword ] = useState( false );
  const [ userData, setUserData ] = useState( {
    username: '',
    name: '',
    email: '',
    password: ''
  } )
  
  const handleShowPassword = () => {
    setShowPassword( !showPassword );
  }

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = ( e ) => {
		e.preventDefault();
		dispatch( signupUser( userData ) );
    console.log('User data>>>>>', userData);
  }
  return (
		<Container>
			<h1>Instagram</h1>
			<Form onSubmit={handleOnSubmit}>
				<input
					type='text'
					placeholder='Enter a username'
					name='username'
					value={userData.username}
					onChange={handleOnChange}
				/>
				<input
					type='text'
					placeholder='Your Name'
					name='name'
					value={userData.name}
					onChange={handleOnChange}
				/>
				<input
					type='email'
					placeholder='Your Email'
					name='email'
					value={userData.email}
					onChange={handleOnChange}
				/>
				<PasswordContainer>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder='Your Password'
						name='password'
						value={userData.password}
						onChange={handleOnChange}
					/>
					<span onClick={handleShowPassword}>
						{showPassword ? 'Hide password' : 'Show Password'}
					</span>
				</PasswordContainer>
				<FileWrapper>
					<label htmlFor='file'>Profile pic</label>
					<span>Optional</span>
					<input type='file' id='file' />
				</FileWrapper>
				<button type='submit'>Sign Up</button>
			</Form>
			<p>
				Already have an account?
				<Link to='/signin'>Sign in here</Link>
			</p>
		</Container>
	);
}
