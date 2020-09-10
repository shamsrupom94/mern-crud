const User = require('./user.js'),
  bcrypt = require('bcrypt');

function signUp(req, res) {
  const { email, password, name } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("Please provide all the information");
  }

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return res.status(400).send('Failed to fetch user'); }
    if (existingUser) {
      return res.status(200).send('User with this email already exist');
    }

    bcrypt.hash(req.body.password, 9, (err, hash) => {
      if (err) { return res.status(400).send('Failed to create hash'); }
      let user = {
        name: name,
        email: email,
        password: hash,
        theme: 'light'
      };

      User.create(user, (err, newUser) => {
        if (err) { return res.status(400).send('Failed to create user'); }
        return res.status(201).send("User created successfully");
      })
    })
  });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please provide all the information");
  }
  User.findOne({ email: email }, (err, user) => {
    if (err) { return res.status(400).send('Failed to fetch user'); }
    if (!user) { return res.status(400).send(`User doesn't exist!`); }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        req.session.user = user;
        return res.status(200).send(user);
      } else {
        return res.status(400).send(`Invalid information`);
      }
    })
  })
}

function logout(req, res) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Failed to logout');
      } else {
        res.status(200).send('Successfully logged out.');
      }
    });
  } else {
    res.status(400).send('Invalid request');
  }
}

function getUserList(req, res) {
  User.find({}, (err, user) => {
    if (err) { return res.status(400).send('Failed to fetch user list'); }
    return res.status(200).send(user);
  });
}

function getCurrentUser(req, res) {
  User.findById(req.params.id, (err, currentUser) => {
    if (err) { return res.status(400).send('Failed to fetch user list'); }
    currentUser.password = undefined
    return res.status(200).send(currentUser);
  })
}

module.exports = {
  signUp,
  login,
  getUserList,
  getCurrentUser,
  logout
}