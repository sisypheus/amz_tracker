const loadingPosts = (state = 0, action) => {
  switch (action.type) {
    case 'PENDING':
      state = 1;
      return state;
    case 'SUCCEEDED':
      state = 2;
      return state;
    case 'FAILED':
      state = -1;
    default:
      return state;
  }
}

const formUpdate = (state = 0, action) => {
  switch (action.type) {
    case 'FORM_PENDING':
      state = 1;
      return state;
    case 'FORM_SUCCEEDED':
      state = 2;
      return state;
    case 'FORM_FAILED':
      state = -1;
    default:
      return state;
  }
}

export { formUpdate, loadingPosts };