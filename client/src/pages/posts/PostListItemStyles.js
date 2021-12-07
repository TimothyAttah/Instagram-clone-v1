import styled from 'styled-components';
export const PostItems = styled.div`
	max-width: 35rem;
	width: 100%;
	box-shadow: var(--outer-shadow);
	padding: 1rem;
	margin: 2rem 0;
	margin-left: 2rem;
	p {
		font-size: 1.8rem;
		text-align: center;
		font-weight: 600;
		padding-bottom: 1rem;
	}
	@media screen and (max-width: 400px){
		max-width: 100%;
		margin-left: 0;
		padding: 2rem;
		p{
			font-size: 1.4rem;
		}
	}
`;

export const PostItemTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1rem;
	a {
		display: flex;
		align-items: center;
		.MuiAvatar-root {
			height: 7rem;
			width: 7rem;
		}
		span {
			margin-left: 1rem;
			font-size: 2rem;
		}
	}
	.MuiSvgIcon-root {
		font-size: 2rem;
		cursor: pointer;
	}
`;

export const PostItemCenter = styled.div`
	img {
		width: 20rem;
		vertical-align: middle;
		margin-bottom: 3rem;
	}
	h6 {
		font-size: 1.5rem;
		font-weight: 500;
	}
`;

export const PostItemCounter = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.8rem;
	.MuiSvgIcon-root {
		display: flex;
		align-items: center;
		font-size: 2rem;
		cursor: pointer;
		color: #1895e9;
		:first-child {
			color: red;
			margin-right: 0.8rem;
		}
	}
`;

export const PostItemBottom = styled.div`
	margin: 1rem 0;
	h6 {
		font-size: 1.5rem;
		font-weight: normal;
		a {
			font-weight: bold;
			margin-right: 1rem;
		}
	}
`;

export const PostCommentOptions = styled.div`
	h6 {
		font-size: 1.2rem;
	}
`;
export const PostCommentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 0;
	font-size: 1.2rem;
	div {
		display: flex;
		width: 100%;
		a {
			font-weight: bold;
			margin-right: 0.7rem;
		}
		div {
			display: inline-block;
			max-width: 22rem;
			width: 100%;
		}
	}
`;

export const PostCommentFormContainer = styled.div``;

export const Form = styled.form`
	margin: 2rem 0;
	input {
		border: none;
		border-bottom: 1px solid gray;
		width: 100%;
		padding: 1rem;
	}
`;
