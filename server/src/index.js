const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const friendRouter = require('./routes/friendRouter');
const albumRouter = require('./routes/albumRouter');
const commentRouter = require('./routes/commentRouter');
const tagRouter = require('./routes/tagRouter');
const likeRouter = require('./routes/likeRouter');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/friends', friendRouter);
app.use('/api/albums', albumRouter);
app.use('/api/comments', commentRouter);
app.use('/api/tags', tagRouter);
app.use('/api/likes', likeRouter);

app.get('/',(req, res) => {
    res.send("API");
})

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});