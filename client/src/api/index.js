import axios from 'axios';

const LOCAL = 'http://localhost:5000';
const PROD = 'https://amz-price-checker.herokuapp.com/';
const API = axios.create({ baseURL: PROD})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile'))
    req.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('profile')).token;
  return req;
});

export const fetchPosts = (user) => API.get('/posts', {params: {user}});
export const createPost = (newPost, user) => API.post('/posts', { post: newPost, user: user });
export const getImageUrl = (link) => API.get('/image', { params: {link}});
export const getTitle = (link) => API.get('/title', { params: {link}});
export const getPrice = (link) => API.get('/price', { params: {link}});
export const updatePost = (id, postData, user) => API.patch(`/posts/${id}`, {post: postData, user: user});
export const deletePost = (id, user) => API.delete(`/posts/${id}`, {params: {user}});;

//auth
export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);
export const googleSignup = (result) => API.post('/user/googlesignup', result);
