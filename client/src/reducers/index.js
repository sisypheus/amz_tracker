import { combineReducers } from 'redux';
import posts from './posts';
import image from './image';
import auth from './auth';
import loadingPosts from './loadingPosts';


export default combineReducers({
    posts: posts,
    image: image,
    auth: auth,
    loading: loadingPosts,
});