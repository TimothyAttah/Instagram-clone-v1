import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
	max-width: 70rem;
	margin: 4rem auto;
	display: grid;
	grid-gap: 1em;
	grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
	grid-auto-rows: 30rem;
`;
const GalleryItems = styled.div`
  /* max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-auto-rows: 30rem; */

  img {
    /* width: 30rem; */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


export const PostGallery = ({post}) => {
  console.log('Post gallery', post.photo);
  return (
		<GalleryContainer>
			<GalleryItems>
				<img src={`/uploads/${post.photo}`} alt='' />
			</GalleryItems>
		</GalleryContainer>
	);
}
