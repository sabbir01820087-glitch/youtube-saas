require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const Keyword = require('./models/Keyword');
const ChannelAnalytics = require('./models/ChannelAnalytics');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend')); // serve frontend

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.log(err));

// WebSocket
const server = http.createServer(app);
const io = socketIo(server, { cors:{ origin:"*" } });

// Dummy generate SEO content endpoint
app.post('/generate', async (req,res)=>{
  const { title, language="en" } = req.body;
  const generatedKeywords = ["Demo keyword 1","Demo keyword 2","Demo keyword 3"];
  const doc = new Keyword({ title, generatedKeywords, language });
  await doc.save();
  res.json({ seoContent: `Description for ${title}\nHashtags: #demo #test\nSearch queries: ${generatedKeywords.join(', ')}`, id: doc._id });
});

// Dummy rank history endpoint
app.get('/rank/:id', async (req,res)=>{
  const doc = await Keyword.findById(req.params.id);
  if(!doc) return res.status(404).send("Not found");
  // dummy rank data
  const rankHistory = doc.generatedKeywords.map(k=>({rank: Math.floor(Math.random()*10)+1, date: new Date()}));
  res.json(rankHistory);
});

// Channel analytics endpoint (dummy)
app.post('/channel', async (req,res)=>{
  const { channelId } = req.body;
  const doc = new ChannelAnalytics({ channelId, title:"Demo Channel", analyticsHistory:[{subscribers:1000,views:5000,videos:10,date:new Date()}] });
  await doc.save();
  res.json(doc);
});

// Start server
server.listen(3000, ()=>console.log("Server running on 3000"));
