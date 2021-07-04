import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile'))
    req.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('profile')).token;
  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost, user) => API.post('/posts', { post: newPost, user: user });
export const getImageUrl = (link) => API.get('/image', { params: {link}});
export const getTitle = (link) => API.get('/title', { params: {link}});
export const getPrice = (link) => API.get('/price', { params: {link}});
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);

//auth
export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);
export const googleSignup = (result) => API.post('/user/googlesignup', result);
