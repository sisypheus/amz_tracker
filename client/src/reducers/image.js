const imageReducer = (state = '', action) => {
    switch (action.type) {
        case 'IMAGE':
            return action.payload;
        default:
            return state;
    }
};

export default imageReducer;