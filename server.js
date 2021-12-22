import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { connectDB } from './config/db.js';
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/user.js';
import { postRouter } from './routes/post.js';

const app = express();
connectDB();

app.use( express.json() );
app.use( cors() );
app.use( express.json( { limit: '50mb' } ) );
app.use( express.urlencoded( { limit: '50mb', extended: true } ) );
app.use( fileUpload() );


app.get( '/', ( req, res ) => {
  res.send({hello: 'world. This is a test!!!!'})
} )

app.use( '/api/auth', authRouter )
app.use( '/api/users', userRouter );
app.use( '/api/posts', postRouter );


app.post('/api/upload', (req, res) => {
	if (req.files === null) {
		res.status(200).json({ msg: 'No file uploaded' });
	}
	const file = req.files.file;
	const newFile = `${Date.now()}_${file.name}`;

	// file.mv(`${__dirname}/frontend/src/uploads/${newFile}`, err => {
	// 		if (err) {
	// 			console.error(err);
	// 			return res.status(500).send(err);
	// 		}
	// 		res.json({ fileName: newFile, filePath: `/uploads/${newFile}` });
	// 	});

	file.mv(`${__dirname}/client/public/uploads/${newFile}`, err => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}

		res.json({ fileName: newFile, filePath: `/uploads/${newFile}` });
	});
});



if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) );

  app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) );
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port: ${PORT}`))
