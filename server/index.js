import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import imageRoutes from './routes/images.js';
import titleRoutes from './routes/title.js';
import priceRoutes from './routes/price.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/image', imageRoutes);
app.use('/title', titleRoutes);
app.use('/price', priceRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Backend API of amazon price tracker application.');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);