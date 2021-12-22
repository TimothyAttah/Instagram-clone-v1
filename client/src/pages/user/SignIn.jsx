import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinUser } from '../../redux/actions/auth';
import { Container, Form, PasswordContainer } from './Styles';

export const SignIn = () => {
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleOnChange = e => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		dispatch( signinUser( userData ) );
		console.log('User data>>>>>', userData);
	};
	return (
		<Container>
			<h1>Instagram</h1>
			<Form onSubmit={handleOnSubmit}>
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
				<button type='submit'>Sign In</button>
			</Form>
			<p>
				Don't have an account?
				<Link to='/signup'>Sign up here</Link>
			</p>
		</Container>
	);
};
