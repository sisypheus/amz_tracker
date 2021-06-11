import * as api from '../api';

export const getImageUrl = (link) => async (dispatch) => {
    try {
        const { data } = await api.getImageUrl(link);
        //dispatch({ type: 'IMAGE', payload: data});
        return data;
    } catch (err) {
        console.log(err.message);
    }
}