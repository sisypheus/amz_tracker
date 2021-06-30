import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    url: String,
    title: String,
    image: String,
    targetPrice: Number,
    price: Number,
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;