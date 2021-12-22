import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');

   :root{
    --text-black: #000000;
    --text-white: #ffffff;
    --bg-black: #000000;
    --bg-white: #ffffff;
    --sky-blue: #1e88e5;
    --light-ash: #9e9e9e;
    --outer-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);

  }

  *,
  *::before,
  *::after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html{
    font-size: 10px;
  }

   body{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  /* font-family: 'Roboto', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  border: 2px solid red;
  }

  a {
    text-decoration: none;
    color: var(--text-black);
  }

  img{
    vertical-align: middle;
    width: 100%;
  }

  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li{
    list-style: none;
  }

  button{
    outline: none;
    cursor: pointer;
    border: none;
  }

  input{
    outline: none;
  }
`;