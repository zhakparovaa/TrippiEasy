const express = require('express');
const router = express.Router();
const User = require('../models/User');

async function getDemoUser() {
  let user = await User.findOne();
  if (!user) {
    user = await User.create({
      name: 'Nadiya',
      email: 'nadiya@example.com',
      avatar: '',
      placesVisited: [],
    });
  }
  return user;
}

router.get('/', async (req, res) => {
  const user = await getDemoUser();
  res.json({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    placesVisited: user.placesVisited,
  });
});

router.patch('/', async (req, res) => {
  const user = await getDemoUser();
  const { name, avatar, placesVisited } = req.body;
  if (name !== undefined) user.name = name;
  if (avatar !== undefined) user.avatar = avatar;
  if (placesVisited !== undefined) user.placesVisited = placesVisited;
  await user.save();
  res.json({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    placesVisited: user.placesVisited,
  });
});

module.exports = router;