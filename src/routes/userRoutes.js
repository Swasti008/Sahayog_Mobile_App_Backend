import express from 'express';
import { FeedSchemaValidation } from '../model/feed.js';
import { UserSchemaValidation } from '../model/user.js';
import { OtherDetailsSchemaValidation } from '../model/otherdetails.js';
import { z } from 'zod';
import { clientDb } from '../connection/db.js';
import { ObjectId } from 'mongodb'; 

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const db = clientDb.db("Sahayog_Application");
    const collection = db.collection("User");

    const validatedData = UserSchemaValidation.parse(req.body);
    const result = await collection.insertOne(validatedData);

    res.status(201).json({ message: "User added successfully", id: result.insertedId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(400).json({ error: error.message });
  }
});

router.post('/addDetails', async (req, res) => {
  try {
    const db = clientDb.db("Sahayog_Application");
    const collection = db.collection("OtherDetails");

    const validatedData = OtherDetailsSchemaValidation.parse(req.body);
    
    const result = await collection.insertOne(validatedData);

    res.status(201).json({ message: 'Details added successfully', id: result.insertedId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(400).json({ error: error.message });
  }
});

router.post('/addFeed', async (req, res) => {
  try {
    const db = clientDb.db("Sahayog_Application");
    const collection = db.collection("Feed");

    const validatedData = FeedSchemaValidation.parse(req.body);

    const result = await collection.insertOne(validatedData);

    res.status(201).json({ message: 'Feed added successfully', id: result.insertedId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(400).json({ error: error.message });
  }
});


router.get('/feeds', async (req, res) => {
  try {
    const db = clientDb.db("Sahayog_Application");
    const collection = db.collection("Feed");

    const feeds = await collection.find().toArray();
    res.status(200).json({ feeds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/getUser/:id', async (req, res) => {
  try {
    const db = clientDb.db("Sahayog_Application");
    const userCollection = db.collection("User");
    const user = await userCollection.findOne({ _id: new ObjectId(req.params.id) });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const otherDetailsCollection = db.collection("OtherDetails");
    const otherDetails = await otherDetailsCollection.findOne({ userId: user._id });

    res.status(200).json({ user, otherDetails });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
