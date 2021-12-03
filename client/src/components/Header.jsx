import React from 'react';
import {Link} from 'react-router-dom'

export const Header = () => {
  return (
    <div>
      <h1>Header is here...</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  )
}
