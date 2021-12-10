// const express = require( 'express' );
// const cors = require( 'cors' );
// const path = require( 'path' );

import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import { authRouter } from './routes/auth.js';

const app = express();
connectDB();

app.use( express.json() );
app.use( cors() );

app.get( '/', ( req, res ) => {
  res.send({hello: 'world. This is a test!!!!'})
} )

app.use('/api/auth', authRouter)


if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) );

  app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) );
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port: ${PORT}`))
