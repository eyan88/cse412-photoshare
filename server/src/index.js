const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const friendRouter = require('./routes/friendRouter');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/friends', friendRouter);

app.get('/',(req, res) => {
    res.send("Hello world");
})

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});