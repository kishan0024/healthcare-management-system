const express=require("express");
const DoctorLeave = require("../models/DoctorLeave");
const DiseaseSchema=require("../models/DoctorLeave");
const router=express.Router();




router.post("/MarkLeave",async(req,res)=>{
    const DoctorWorkId=req.body.DoctorWorkId;
    const Date=req.body.Date;
    const Duration=req.body.Duration;
    const Reason=req.body.Reason;

    const create_new_leave=new DoctorLeave({
        "DoctorWorkId":DoctorWorkId,
        "Date":Date,
        "Duration":Duration,    
        "Reason":Reason
    });

    create_new_leave.save(function(err,result){
        if(err){
            res.json({"Status":err});
        }
        else
        {
            res.json({"Status":"Successfully Addedd..."});
        }
    })
})

router.post("/FetchLeave",async(req,res)=>{
    const DoctorWorkId=req.body.DoctorWorkId;
    const data=await DiseaseSchema.findOne({DoctorWorkId});
    if(data!=null)
    res.json(data);
    else
    {
        res.json({Status:"404NotFound"});
    }

   
})



module.exports=router;