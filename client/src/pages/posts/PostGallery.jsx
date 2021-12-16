import React from 'react';
import styled from 'styled-components';

// const GalleryContainer = styled.div`
// 	/* max-width: 70rem;
//   width: 100%;
// 	margin: 4rem auto;
//   display: flex;
//   justify-content: space-between;
//   border: 2px solid red; */
// `;

const GalleryItems = styled.div`
  width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
	box-shadow: var(--outer-shadow);
  margin: 2rem 1rem 0 0;
  padding: 1rem;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
    display: flex;
	}
`;


export const PostGallery = ({post}) => {
  return (
		<>
			<GalleryItems>
				<img src={`/uploads/${post.photo}`} alt='' />
			</GalleryItems>
		</>
	);
}
