const imageReducer = (state = null, action) => {
    switch (action.type) {
        case 'IMAGE':
            return action.payload;
        default:
            return state;
    }
};

export default imageReducer;