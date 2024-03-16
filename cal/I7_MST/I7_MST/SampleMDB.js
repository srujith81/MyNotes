const express=require("express");
const mongoose=require("mongoose");
const app=express();
mongoose.connect("mongodb://127.0.0.1:27017/sasi",{
    useNewUrlParser:true,useUnifiedTopology:true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log('Error connecting to MongoDB', err);
});
