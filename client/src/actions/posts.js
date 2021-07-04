import * as api from '../api';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('profile')).result.email;
        const { data } = await api.createPost(post, user);
        dispatch({ type: 'CREATE', payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (err) {
        console.log(err);
    }
}

export const deletePost = (id, post) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: 'DELETE', payload: id});
    } catch (err) {
        console.log(err);
    }
}