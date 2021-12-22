const express = require('express');
const cors = require( 'cors' );
const fileUpload = require( 'express-fileupload' );
const path = require('path');

const { connectDB } = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(fileUpload());

app.post('/api/upload', (req, res) => {
	if (req.files === null) {
		res.status(200).json({ msg: 'No file uploaded' });
	}

	const file = req.files.file;
	const newFile = `${Date.now()}_${file.name}`;

	file.mv(`${__dirname}/client/public/uploads/${newFile}`, err => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}

		res.json({ fileName: newFile, filePath: `/uploads/${newFile}` });
	});
} );

// app.post( '/api/upload', ( req, res ) => {
// 	let sampleFile, uploadPath;

// 	if (!req.files || Object.keys(req.files).length === 0) {
// 	return	res.status(400).json({ msg: 'No files were uploaded' });
// 	}

// 	sampleFile = req.files.sampleFile;
// 	const newFile = `${ Date.now() }_${ sampleFile.name }`;
	
// 	uploadPath = `${__dirname}/client/public/uploads/${newFile}`;
	
// 	sampleFile.mv(uploadPath)
// })

app.get('/', (req, res) => {
	res.send({ hello: 'world. This is a test!!!!' });
} );


app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use( '/api/posts', require( './routes/post' ) );

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}



app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
