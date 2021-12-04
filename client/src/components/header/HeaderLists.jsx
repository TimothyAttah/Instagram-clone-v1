import React from 'react'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Close, Camera, Home, People } from '@material-ui/icons';


export const HeaderListsContainer = styled.div`
	width: 50%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-left: auto;
	height: 100%;
	font-size: 2.5rem;
  ${props => props.primary && css`
		width: 10% !important;
	` }

	span {
		font-style: italic;
		font-size: 2.5rem;
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
		font-size: 1rem;
		:hover {
			background-color: #a54040;
		}
	}
`;

export const HeaderListsContainerPrimary = styled.div`
	width: 22%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 10vh;
	div {
		height: 10vh;
		width: 8rem;

		a {
			height: 100%;
			font-size: 2rem;
			color: var(--text-black);
			display: block;
			padding: 0 15px;
			cursor: pointer;
			display: flex;
			/* transition: background-color 0.3s; */
			transition: all 1s ease;
			justify-content: center;
			align-items: center;
			:hover {
				background-color: rgba(0, 0, 0, 0.1);
			}
		}
	}
`;

export const HeaderLists = () => {
  const user = false;

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
					<button onClick={() => localStorage.clear()}>Logout</button>
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
