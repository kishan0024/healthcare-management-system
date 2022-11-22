const express=require("express");
const AllergySchema=require("../models/AllergySchema");
const router=express.Router();


//add allergy API

router.post("/AddAllergy",async (req,res)=>{
   const patientUniqueId=req.body.patientUniqueId;
   const DrugName=req.body.DrugName;
//    const date=req.body.date;
   const description=req.body.description;

   if(patientUniqueId=="" || DrugName=="" || description=="")
   {
    res.json({"Status":"FieldsNotFiiled"});
   }
   else{
    const create_new_allergy=new AllergySchema({
        "patientUniqueId":patientUniqueId,
        "DrugName":DrugName,
        "description":description
    });
    create_new_allergy.save();
    res.json({Status:"successfully addedd..."});
   }
});


//to fetch all the allergy of user

router.post("/FetchAllAllergy",async (req,res)=>{
    const patientUniqueId=req.body.patientUniqueId;

    const data=await AllergySchema.find({patientUniqueId});
    if(data.length>0)
    res.json(data);
    else
    {
        res.json({Status:"404NotFound"});
    }


});


module.exports=router;