const initialState = JSON.parse(localStorage.getItem('profile'));

const authReducer = (state = {authData: initialState}, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return {...state, authData: action?.data};
    case 'LOGOUT':
      localStorage.clear();
      return {...state, authData: null};
    default:
      return state;
  }
};

export default authReducer;