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

const registerReducer = (state = 0, action) => {
  switch (action.type) {
    case 'REGISTER_PENDING':
      state = 1;
      return state;
    case 'REGISTER_SUCCEEDED':
      state = 2;
      return state;
    case 'REGISTER_FAILED':
      state = -1;
    default:
      return state;
  }
}

export { authReducer as auth, registerReducer as authLoading };