import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = dispatch();
    history.push('/');
  } catch (err) {
    console.log(err);
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    history.push('/');
  } catch (err) {
    console.log(err);
  }
}