const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require("dotenv").config();
let logg=0;
let bookday="0"
let tomail="";
let attacmail="abcd";

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'flavourfest';
const collectionName = 'user';

async function insertUser(name, email, password) {
    // Create a new MongoClient
    const client = new MongoClient(url, { useUnifiedTopology: true });
  
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      // Get the database object
      const db = client.db(dbName);
  
      // Get the users collection
      const collection = db.collection(collectionName);
  
      // Create a new user document
      const user = { name: name, email: email, password: password };
  
      // Insert the user document into the users collection
      const result = await collection.insertOne(user);
  
      console.log(`New user inserted with id: ${result.insertedId}`);
  
      return result.insertedId;
    } 
    catch (err) {
      console.error(err);
    } 
    finally {
      // Close the client
      await client.close();
    }
  }


// Handle the signup
app.post("/signup", (req,res)=>{
    //console.log(req.body.name);
    //console.log(req.body.password);
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;

    var mod = 1e9 + 7;
    var base = 11;
    var cur = 1, hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash + cur * password.charCodeAt(i));
        //console.log(hash);
        cur = (cur * base) % mod;
    }
    const hashh=hash
    
    insertUser(name, email, hashh)
    .then((userId) => {
      console.log(`New user inserted with id: ${userId}`);
      res.send({ message: '1' });
    })
    .catch((err) => {
      console.error(err);
      res.send({ message: err });
    });
    
});

// Function to find a user by name and password
async function findUser(name, password) {
    // Create a new MongoClient
    const client = new MongoClient(url, { useUnifiedTopology: true });
  
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      // Get the database object
      const db = client.db(dbName);
  
      // Get the users collection
      const collection = db.collection(collectionName);
  
      // Find the user document with the given name and password
      const user = await collection.findOne({ name: name, password: password });
  
      console.log(`User found: ${user}`);
  
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      // Close the client
      await client.close();
    }
  }

// Handle the login 
app.post("/login", (req,res)=>{
    //console.log(req.body.name);
    //console.log(req.body.password);
    const name= req.body.name;
    const password= req.body.password;
    
    var mod = 1e9 + 7;
    var base = 11;
    var cur = 1, hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash + cur * password.charCodeAt(i));
        //console.log(hash);
        cur = (cur * base) % mod;
    }
    const hashh=hash;

    findUser(name, hashh)
    .then((user) => {
      if (user) {
        console.log('User found');
        res.send({ message: '1' });
      } else {
        console.log('User not found');
        res.send({ message: '0' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({ message: err });
    });
});


app.listen(3001,()=>{
    console.log("server is running ");
})