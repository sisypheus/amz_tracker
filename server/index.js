import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import imageRoutes from './routes/images.js';
import titleRoutes from './routes/title.js';
import priceRoutes from './routes/price.js';

const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/image', imageRoutes);
app.use('/title', titleRoutes);
app.use('/price', priceRoutes);
const CONNECTION_URL = "mongodb+srv://theo:9876@cluster0.slmdk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);