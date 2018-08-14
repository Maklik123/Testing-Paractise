const express = require('express');
const mongoose = require('mongoose')


// DB Config
const db = require('./config/keys').mongoURI;

const user = require('./routes/user');

const app = express();


// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use('/api/users',user);


app.get('/api/current',(req,res)=>{
    res.json({hi:'there'});
})

app.get('/api/user',(req,res)=>{
    res.json({hi:'there'});
})


app.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;

    console.log(`Server connected to http://localhost:3000`);
})

module.exports = app;