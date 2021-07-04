import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    id: { type: String },
    google: { type: Boolean},
    items: { type: Array},
});

export default mongoose.model('User', userSchema);