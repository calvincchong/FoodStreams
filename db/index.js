const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:9000/foodstreams';

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(error => {
    console.log(`There was a problem connecting to mongo at ${mongoURI}`)
    console.log(err);
    return new Error(err);
  });