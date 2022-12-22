const express=require("express");
const OtherSchema=require("../models/OtherData");
const router=express.Router();


router.post("/AddHW",async(req,res)=>{
    const patientUniqueId=req.body.patientUniqueId;
    // const Date
    const Height=req.body.Height;
    const Weight=req.body.Weight;
    const BloodPressure=req.body.BloodPressure;

    const create_new_data=new OtherSchema({
        patientUniqueId,
        Height,
        Weight,
        BloodPressure
    });

    create_new_data.save(); 
    res.json({"Status":"Added..."});

})
router.post("/FetchHW",async(req,res)=>{
    const patientUniqueId=req.body.patientUniqueId;

    const data=await OtherSchema.find({patientUniqueId});
    if(data.length>0)
    res.json(data);
    else
    {
        res.json({Status:"404NotFound"});
    }



})



module.exports=router;