import { combineReducers } from 'redux';
import posts from './posts';
import image from './image';


export default combineReducers({
    posts: posts,
    image: image,
});