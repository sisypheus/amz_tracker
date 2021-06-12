import * as api from '../api';

export const getImageUrl = (link) => async (dispatch) => {
    try {
        const { data } = await api.getImageUrl(link);
        //dispatch({ SUCCESS,})
        return data;
    } catch (err) {
        console.log(err.message);
        //dispatch({ ERROR,})
        return err;
    }
}