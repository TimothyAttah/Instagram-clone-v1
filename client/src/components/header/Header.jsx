import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderLists } from './HeaderLists';

export const Container = styled.nav`
  
`;
export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
  height: 10vh;
	> a {
		font-size: 3.5rem;
		font-family: 'Grand Hotel', cursive;
	}
`;
export const HeaderLinkLists = styled.div`
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
	}
  .MuiSvgIcon-root{
    font-size: 2rem;
  }
`;

export const Header = () => {

  const user = true;
  
  return (
    <Container>
      <HeaderContainer>
        <Link to={user ? '/' : 'signin'}>
          Instagram
        </Link>
        <>
          <HeaderLists />
        </>
      </HeaderContainer>
    </Container>
  )
}
