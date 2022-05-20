const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get all users
usersRouter.get('/', async (request, response) => {
  const result = await User.find({});
  response.json(result);
});

// Get single user
usersRouter.get('/:id', async (request, response) => {
  const result = await User.findById(request.params.id);
  response.json(result);
});

// Create new user
usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body;

  const existingUser = await User.findOne({ username });
  if(existingUser) {
    return response.status(400).json({ error: 'Username already exists' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userObject = new User({
    username,
    name,
    passwordHash,
    admin: false
  });

  const result = await userObject.save();
  response.status(201).json(result);
});

// Update user
usersRouter.put('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);

  const userObject = {
    username: user.username,
    name: user.name,
    passwordHash: user.passwordHash,
    admin: !user.admin
  };

  const result = await User.findByIdAndUpdate(request.params.id, userObject, { new: true });
  response.json(result);
});

// Delete user
usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
})

module.exports = usersRouter;