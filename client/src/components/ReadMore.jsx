import React, { useState } from 'react';
import styled from 'styled-components';

const ReadMoreContainer = styled.div`
  span{
    cursor: pointer;
    font-weight: bold;
    font-style: italic;
    color: var(--gray);
  }
`;


export const ReadMore = ({children}) => {
  const text = children;
  const [ isReadMore, setIsReadMore ] = useState( true );
  const result = isReadMore ? text.slice( 0, 150 ) : text;
  const toggleReadMore = () => {
    setIsReadMore( !isReadMore );
  }
  return (
    <ReadMoreContainer>
      { result }
      <span onClick={ toggleReadMore }>
        {isReadMore ? '...read more' : '...show less'}
      </span>
    </ReadMoreContainer>
  )
}
