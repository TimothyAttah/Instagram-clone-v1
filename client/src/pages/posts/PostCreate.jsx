import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { createPost } from '../../redux/actions/posts';
import { API } from '../../redux/apis';

export const PostCreate = () => {
  const dispatch = useDispatch();
  const [ body, setBody ] = useState( '' );
const [file, setFile] = useState('');
const [uploadedFile, setUploadedFile] = useState({});

const onChange = (e) => {
	setFile(e.target.files[0]);
};

  const handleSubmit = async ( e ) => {
    e.preventDefault();

const formData = new FormData();
formData.append('file', file);

try {
			const res = await API.post('/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const { fileName, filePath } = res.data;

			setUploadedFile({ fileName, filePath });

			const newPost = {
				// userId: user?._id,
				body,
				photo: fileName,
			};
			dispatch(createPost(newPost));
			setBody('');
			// setFile(null);
			setFile('');
		} catch (err) {
			if (err.response.status === 500) {
				console.log('There was a problem with the server');
			} else {
				console.log(err.response.data.msg);
			}
		}
    
  }
  return (
		<div>
			<h1>Post create</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='body'
					value={body}
					onChange={e => setBody(e.target.value)}
				/>
				<input
					type='file'
					id='file'
					accept='.png, .jpg, .jpeg'
					// value={file}
					onChange={onChange}
				/>
				<button type='submit'>Create Post</button>
			</form>
		</div>
	);
}
