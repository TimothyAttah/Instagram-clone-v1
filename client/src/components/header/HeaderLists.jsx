import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { user } from '../user';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/actions/auth';

import { Camera, Home, People } from '@material-ui/icons';


export const HeaderListsContainer = styled.div`
	width: 50%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-left: auto;
	height: 100%;
	font-size: 2.5rem;
	span {
		font-style: italic;
		font-size: 2.5rem;
		cursor: pointer;
	}
	.MuiSvgIcon-root {
		font-size: 2rem;
	}
	button {
		box-shadow: var(--outer-shadow);
		border-radius: 2px;
		height: 3.6rem;
		line-height: 3.6rem;
		padding: 0 1.6rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		background-color: #c62828;
		color: var(--text-white);
		transition: background-color 0.2s ease-out;
		vertical-align: middle;
		-webkit-tap-highlight-color: transparent;
		font-size: 1.2rem;
		:hover {
			background-color: #a54040;
		}
	}
	@media screen and (max-width: 500px) {
		margin-left: 0;
		width: 80%;
	}
	@media screen and (max-width: 350px) {
		span {
			font-size: 1.8rem;
		}
		.MuiSvgIcon-root {
			font-size: 1.5rem;
		}
		button {
			padding: 0 1rem;
			font-size: 1rem;
			height: 2.7rem;
			line-height: 2.7rem;
			letter-spacing: 0.2rem;
		}
	}
`;

export const HeaderListsContainerPrimary = styled.div`
	width: 25%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	div {
		height: 64px;
		width: 9.5rem;
		a {
			height: 100%;
			width: 100%;
			font-size: 1.5rem;
			color: var(--text-black);
			display: block;
			cursor: pointer;
			display: flex;
			transition: all 0.5s ease;
			justify-content: center;
			align-items: center;
			:hover {
				background-color: rgba(0, 0, 0, 0.1);
			}
		}
	}
	@media screen and (max-width: 500px) {
		width: 50%;
		div {
			height: 60px;
			width: 12rem;
		}
	}
`;

export const HeaderLists = () => {
	const dispatch = useDispatch();

	const handleUserSignOut = () => {
		dispatch( signOutUser() );
	}
 if (user) {
		return (
			<HeaderListsContainer>
				<li>
					<span>search</span>
				</li>
				<li>
					<Link to={user ? '/' : 'signin'}>
						<Home />
					</Link>
				</li>
				<li>
					<Link to='/profile'>
						<People />
					</Link>
				</li>
				<li>
					<Link to='/create'>
						<Camera />
					</Link>
				</li>
				<li>
					<button onClick={handleUserSignOut}>Logout</button>
				</li>
			</HeaderListsContainer>
		);
 } else {
		return (
			<HeaderListsContainerPrimary>
				<div>
					<Link to='/signin'>SignIn</Link>
				</div>
				<div>
					<Link to='/signup'>SignUp</Link>
				</div>
			</HeaderListsContainerPrimary>
		);
 }
}
