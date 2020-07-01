const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const app = express();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dhrowvziz',
    api_key: '574268577399774',
    api_secret: 'kVM_RV4IPwIhz0yxgr5A4UvUS40'
});

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect('mongodb://user:password123@ds125574.mlab.com:25574/merge_attempt_one', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err))

// * Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// * Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const bookingRoutes = require('./routes/booking');
const chatRoutes = require('./routes/chat');

// * Route middleware
app.use('/api', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', bookingRoutes);
app.use('/api', chatRoutes);


io.on('connection', socket => {

    socket.on('join room', e => {
        socket.join(e);
    })

    socket.on('msg', e => {
        io.to(e.roomName).emit('message', e.message)
    })

});

const PORT = process.env.PORT || 8000;
server.listen(PORT, console.log('started listening'));