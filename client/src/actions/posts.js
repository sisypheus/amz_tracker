import * as api from '../api';

export const getPosts = () => async (dispatch) => {
    dispatch({type: 'PENDING'});
    try {
        const user = JSON.parse(localStorage.getItem('profile'))?.result?.email;
        const { data } = await api.fetchPosts(user);
        dispatch({type: 'SUCCEEDED'});
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (err) {
        dispatch({ type: 'FAILED'});
        console.log(err);
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
        const user = JSON.parse(localStorage.getItem('profile')).result.email;
        const { data } = await api.updatePost(id, post, user);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (err) {
        console.log(err);
    }
}

export const deletePost = (id, post) => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('profile')).result.email;
        await api.deletePost(id, user);
        dispatch({ type: 'DELETE', payload: id});
    } catch (err) {
        console.log(err);
    }
}