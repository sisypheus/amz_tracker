import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchPosts = () => axios.get(url + '/posts');
export const createPost = (newPost) => axios.post(url + '/posts', newPost);
export const getImageUrl = (link) => axios.get(url + '/image', { params: {link}});
export const getTitle = (link) => axios.get(url + '/title', { params: {link}});
export const updatePost = (id, postData) => axios.patch(`${url}/posts/${id}`, postData);