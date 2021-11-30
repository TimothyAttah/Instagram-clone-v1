const express = require( 'express' );
const cors = require( 'cors' );

const app = express();

app.use( express.json() );
app.use( cors() );

app.get( '/', ( req, res ) => {
  res.send({hello: 'world. This is a test!!!!'})
})

const PORT = process.env.PORT || 5000;

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) );
  const path = require( 'path' );

  app.get( '*', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, ()=> console.log(`Server started on port: ${PORT}`))
