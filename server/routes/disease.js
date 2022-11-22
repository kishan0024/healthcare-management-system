const express=require("express");
const DiseaseSchema=require("../models/DiseaseSchema");
const router=express.Router();


//add Disease API

router.post("/AddDisease",async (req,res)=>{
   const patientUniqueId=req.body.patientUniqueId;
   const DiseaseName=req.body.DiseaseName;
//    const date=req.body.date;
   const description=req.body.description;

   if(patientUniqueId=="" || DiseaseName=="" || description=="")
   {
    res.json({"Status":"FieldsNotFiiled"});
   }
   else{
    console.log("Sd");
    const create_new_Disease=new DiseaseSchema({
        "patientUniqueId":patientUniqueId,
        "DiseaseName":DiseaseName,
        "description":description
    });
    create_new_Disease.save();
    res.json({"Status":"Successfully Added"});
   }
});


//to fetch all the Disease of user

router.post("/FetchAllDisease",async (req,res)=>{
    const patientUniqueId=req.body.patientUniqueId;

    const data=await DiseaseSchema.find({patientUniqueId});
    if(data.length>0)
    res.json(data);
    else
    {
        res.json({Status:"404NotFound"});
    }


});


module.exports=router;