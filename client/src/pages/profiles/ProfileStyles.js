import styled, { css } from 'styled-components';
export const ProfileContainer = styled.div`
	max-width: 60rem;
	width: 100%;
	margin: 0 auto;
`;

export const ProfileTop = styled.div`
	width: 100%;
	margin: 3rem auto 1rem;
	display: flex;
	justify-content: space-around;
  @media screen and (max-width: 500px){
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ProfileTopLeft = styled.div`
	width: 15rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.MuiAvatar-root {
		width: 13rem;
		height: 13rem;
	}
	form {
		width: 80%;
		margin: 1rem 0;
		margin-top: 5rem;
		label {
			font-size: 1.8rem;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 600;
			cursor: pointer;
			border-bottom: 1px solid var(--gray);
		}
	}
	${props =>
		props.primary &&
		css`
			display: block;
		`}
	@media screen and (max-width:500px) {
		margin-bottom: 1.5rem;
		.MuiAvatar-root {
			width: 11rem;
			height: 11rem;
      text-align: center;
      margin: 0 auto;
		}
	}
`;

export const ProfileTopRight = styled.div`
	width: 35rem;
	text-align: center;
`;
export const ProfileTopNameWrapper = styled.div`
	margin: 0 0 1rem;
	h4 {
		font-size: 2.5rem;
		padding-bottom: 1rem;
	}
	h2 {
		font-size: 3rem;
		padding-bottom: 1rem;
	}
`;
export const ProfileTopButtonWrapper = styled.div`
	width: 80%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 0 auto;
	margin-bottom: 2rem;
	button {
		padding: 1rem;
		background-color: #127cff;
		color: var(--text-white);
		border-radius: 0.5rem;
		box-shadow: var(--outer-shadow);
	}
	${props =>
		props.primary &&
		css`
			button {
				width: 12rem;
        margin-top: 3rem;
        font-size: 1.6rem;
        letter-spacing: 0.1rem;
			}
		`}
`;

export const ProfileTopInfoWrapper = styled.div`
	max-width: 32rem;
  width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
  flex-wrap: wrap;

	div {
		width: 10rem;
		position: relative;
		font-size: 1.5rem;
		color: var(--gray);
		margin-top: 2rem;
		padding-bottom: 1rem;
		span {
			margin-right: 1rem;
			font-weight: 700;
			color: var(--text-black);
		}
	}
  @media screen and (max-width: 360px){
    max-width: 25rem;
    div{
      display: flex;
      flex-direction: column;
      width: 7rem;
    }
  }
`;

export const ProfileBottomContainer = styled.div`
	margin-top: 2rem;
	width: 100%;
`;
export const ProfileBottomButtonWrapper = styled.div`
	width: 20rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 3rem;
	margin-left: 3rem;
	button {
		padding: 1rem;
		width: 9rem;
		background-color: transparent;
		font-size: 1.5rem;
	}
`;


export const GalleryContainer = styled.div`
	/* max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-auto-rows: 30rem; */

	max-width: 70rem;
  width: 100%;
	margin: 4rem auto;
  display: flex;
  justify-content: space-around;
	flex-wrap: wrap;
`;
// export const ProfileBottomContainer = styled.div`

// `;
// export const ProfileBottomContainer = styled.div`

// `;
