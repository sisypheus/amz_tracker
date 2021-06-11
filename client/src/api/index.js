import axios from 'axios';

const url = 'http://localhost:5000/posts';
const url2 = 'http://localhost:5000/image';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const getImageUrl = (link) => {
    let encode = encodeURI(link);
    return axios.get(url2, { params: {encode}});
};