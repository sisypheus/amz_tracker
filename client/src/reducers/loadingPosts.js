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

export default loadingPosts;