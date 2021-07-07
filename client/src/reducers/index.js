import { combineReducers } from 'redux';
import posts from './posts';
import image from './image';
import { auth, authLoading } from './auth';
import { loadingPosts, formUpdate } from './loading';

export default combineReducers({
    posts: posts,
    image: image,
    auth: auth,
    loading: loadingPosts,
    formState: formUpdate,
    registerLoading: authLoading,
});