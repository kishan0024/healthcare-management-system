const express=require("express");
const router=express.Router();
const BillSchema=require("../models/BillSchema");
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;


router.post("/SaveBill",async(req,res)=>{
    try{
       
        const PatientUniqueId=req.body.PatientUniqueId;
        const DoctorWorkId=req.body.DoctorWorkId;
        const URL=req.body.URL;

        // res.json(result);    

        let create_new_bill=new BillSchema({
            "patientUniqueId":PatientUniqueId,
            "DoctorWorkId":DoctorWorkId,
            "Date":today,
            "URL":URL,
            // "CloudinaryId":result.public_id
        })

        create_new_bill.save();
        res.json({Status:"Successfully saved"});
    }
    catch(err){
        res.json({Status:("An Error Occured:"+err)});
    }

})






router.post("/ShowBill",async (req,res)=>{

    const patientUniqueId=req.body.patientUniqueId;

    const data=await BillSchema.find({patientUniqueId});

    if(data.length>0)
    res.json(data);
    else
    {
        res.json({Status:"404NotFound"});
    }

});


module.exports=router;