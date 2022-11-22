const express=require("express");
const mongo=require("mongoose");

const data="mongodb://localhost:27017";

const connection=()=>{
    mongo.connect(data,()=>{
        console.log("connected");
    });
}


module.exports=connection
