const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();
const path = require('path')
const {db} = require('./db');

db.sync().then(() => console.log('Database is synced'));

const server = app.listen(PORT, () => {
    console.log(`Now connected on port ${PORT}`)
});
const io = require('socket.io')(server);

// handle sockets
require('./socket')(io);

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', require('./api'))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

module.exports = app;
