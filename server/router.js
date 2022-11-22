const express=require("express");
const router=new express.Router();
const conn=require("./db_conn");



router.get("/createsd",(req,res)=>{

    mysql.query("select* from accountdetails",(err,rows,fields)=>{
        if(!err)
        {
            console.log(rows[0]);
        }
        else{
            console.log(err);
        }
    });
});


module.exports=router;