import express from 'express';
import User from '../model/user.js';
import OtherDetails from '../model/otherdetails.js';
import Feed from '../model/feed.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, mobile, password, belongsToOrganization, organizationSector } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      mobile,
      password,
      belongsToOrganization,
      organizationSector: belongsToOrganization ? organizationSector : null,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/addDetails', async (req, res) => {
  const { userId, liveLocation, posts } = req.body;

  try {
    const details = new OtherDetails({
      userId,
      liveLocation,
      posts,
    });

    await details.save();
    res.status(201).json({ message: 'Details added successfully', details });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/addFeed', async (req, res) => {
  const { userName, time, title, description } = req.body;

  try {
    const feed = new Feed({
      userName,
      time,
      title,
      description,
    });

    await feed.save();
    res.status(201).json({ message: 'Feed added successfully', feed });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/feeds', async (req, res) => {
  try {
    const feeds = await Feed.find();
    res.status(200).json({ feeds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('otherDetails');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
