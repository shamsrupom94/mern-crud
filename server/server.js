const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(expressSession);
const mongoose = require('mongoose');
const { dbConnections } = require('./config/db');

const userRouter = require('./config/routes/user');
const taskRouter = require('./config/routes/task');


app.use(bodyParser.json());

// initialize express-session to allow us track the logged-in user across sessions.
const redisPort = 6379;
const redisHost = 'localhost';
app.use(expressSession({
  secret: 'shamsibnenoor',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    host: redisHost,
    port: redisPort,
    client: redis.createClient(redisPort, redisHost)
    // ttl: 260
  }),
  cookie: { maxAge: (1000 * 60 * 60 * 24 * 30) },
}));

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(PORT, () => {
  console.log("server is running on port", PORT);

  //DB connection
  mongoose.connect(dbConnections.local, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb')
  })
  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongodb', err)
  });

  //initialize models
  require('./models');
});

module.exports = app;