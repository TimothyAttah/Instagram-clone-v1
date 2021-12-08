import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
	max-width: 50rem;
	width: 100%;
	margin: 5rem auto;
	box-shadow: var(--outer-shadow);
	padding: 2rem;
	h1 {
		font-size: 3rem;
		font-family: 'Grand Hotel', cursive;
    text-align: center;
    margin-bottom: 2rem;
	}
  p{
    margin-top: 2rem;
    text-align: center;
    font-size: 1.4rem;
    a{
      padding-left: 1rem;
      font-style: italic;
      color: var(--sky-blue);
      font-weight: bold;
    }
  }
  @media screen and (max-width: 320px){
    p{
     font-size: 1.2rem;
    }
  }
`;

export const Form = styled.form`
	width: 100%;
	input {
		display: block;
		width: 100%;
		padding: 1rem;
		margin-bottom: 1.5rem;
		border: none;
		border-bottom: 2px solid var(--gray);
		:active {
			border-bottom: 2px solid red;
		}
		::placeholder {
			color: var(--light-ash);
		}
	}
	button {
		background-color: var(--sky-blue);
		width: 50%;
		padding: 1.5rem;
		margin: 0 auto;
		text-align: center;
		display: block;
		margin-top: 5rem;
		border-radius: 0.4rem;
    font-size: 1.5rem;
	}
`;

export const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  input{
    width: 60%;
    margin: 0;
  }
  span{
    width: 30%;
    background-color: var(--sky-blue);
    display: block;
    padding: 1rem;
    font-size: 1.4rem;
    font-weight: bold;
    box-shadow: var(--outer-shadow);
    cursor: pointer;
    text-align: center;
    border-radius: 0.4rem;
  }
  @media screen and (max-width: 500px){
    flex-direction: column;
    input, span{
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;

export const FileWrapper = styled.div`
	margin: 2rem 0;
	input {
		display: none;
	}
	label {
		width: 40%;
		display: inline-block;
		text-align: center;
		font-size: 2rem;
		background-color: #298ddf;
		padding: 0.5rem 0;
		box-shadow: var(--outer-shadow);
		border-radius: 0.4rem;
    cursor: pointer;
	}
	span {
		font-size: 1.3rem;
		margin-left: 2rem;
		font-weight: bold;
		font-style: italic;
	}
  @media screen and (max-width: 500px){
    label{
      width: 60%;
    }
  }
`;

export const SignUp = () => {
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
