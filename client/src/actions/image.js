import * as api from '../api';

export const getImageUrl = (link) => async (dispatch) => {
    try {
        const { data } = await api.getImageUrl(link);
        return data;
    } catch (err) {
        console.log(err.message);
        return err;
    }
}

export const getTitle = (link) => async (dispatch) => {
    try {
        const { data } = await api.getTitle(link);
        return data;
    } catch (err) {
        console.log(err.message);
        return err;
    }
}

export const getPrice = (link) => async (dispatch) => {
    try {
        const { data } = await api.getPrice(link);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}