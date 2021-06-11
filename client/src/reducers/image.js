const imageReducer = (image = [], action) => {
    switch (action.type) {
        case 'IMAGE':
            return [...image, action.payload];
        default:
            return image;
    }
};

export default imageReducer;