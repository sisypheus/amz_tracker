import PostMessage from '../models/postMessage.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const user = req.query.user;
        const existingUser = await User.findOne({email: user});
        const postMessages = existingUser.items;

        res.status(200).json(postMessages);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
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
    const { post, user } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(JSON.stringify(id, null, 2))
        return res.status(404).send('No post with that id.');
    }
    try {
        const existingUser = await User.findOne({ email: user});
        const objIndex = existingUser.items.findIndex(item => item._id == id);
        if (typeof(objIndex) !== 'number')
            return;
        existingUser.items.splice(objIndex, 1, post);
        existingUser.save();
        res.json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const { user } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(JSON.stringify(id, null, 2))
        return res.status(404).send('No post with that id.');
    }
    const existingUser = await User.findOne({ email: user});
    const objIndex = existingUser.items.findIndex(item => item._id == id);
    if (typeof(objIndex) !== 'number')
        return;
    existingUser.items.splice(objIndex, 1);
    existingUser.save();
    res.json({ message: 'Post deleted successfully'});
}