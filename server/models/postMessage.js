import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    //url: String,
    //title: String
    //current: String,
    //target: String
    title: String,
    description: String,
    tags: [String],
    selectedFile: String,
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;