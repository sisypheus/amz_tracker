import PostMessage from '../models/postMessage.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { post, user } = req.body;
    const newPost = new PostMessage(post);

    try {
        let existingUser = await User.findOne({ email: user});
        existingUser.items.push(newPost);
        existingUser.save();
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const  updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(JSON.stringify(id, null, 2))
        return res.status(404).send('No post with that id.');
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(JSON.stringify(id, null, 2))
        return res.status(404).send('No post with that id.');
    }
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully '});
}