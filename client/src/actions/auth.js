import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: 'AUTH', data});
    history.push('/');
  } catch (err) {
    console.log(err);
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: 'AUTH', data});
    history.push('/');
  } catch (err) {
    console.log(err);
  }
}

export const googleSignup = (result) => async (dispatch) => {
  try {
    await api.googleSignup(result);
    dispatch({type: 'REGISTER_SUCCEEDED'});
    //console.log(data);
  } catch (err) {
    console.log(err);
    dispatch({type: 'REGISTER_FAILED'});
  }
}