const express=require("express");
const UserSchema=require("../models/UserSchema");
const PatientSchema=require("../models/patientSchema");
const AppointmentSchema=require("../models/AppointmentDataSchema");
const AppointmentDataSchema = require("../models/AppointmentDataSchema");
const router=express.Router();


router.post('/Alldata',async(req,res)=>
{
    const total_patient=(await PatientSchema.count());
    const total_doctors=(await UserSchema.find({Usertype:"Doctor"}));
    const total_pharmacist=(await UserSchema.find({Usertype:"Pharmacist"}));

    // const app_total=
    // // const bifurcated_disease=await 
// console.log(app_total);
    const d=new Date(); 
    const date_today=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    // console.log(date_today);
    const total_app_today=await (await AppointmentDataSchema.find({"Date":date_today})).length;
        const data={
        "patients":total_patient,
        "doctors":total_doctors.length,
        "pharmacist":total_pharmacist.length,
        "total_app_today":total_app_today
    }

    res.send(data);

});


router.post("/AllDataDoc",async(req,res)=>
{   
    const DoctorWorkId=req.body.DoctorWorkId;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const Status1="Pending";
    today = dd + '/' + mm + '/' + yyyy;
    const doc_total_patient=await AppointmentDataSchema.count({DoctorWorkId});
    const total_app_today=await AppointmentDataSchema.count({DoctorWorkId,Date:today});
    const pending_app_today=await AppointmentDataSchema.count({DoctorWorkId,Date:today,Status1:"Attended"});

    const all_doc_data={
        "doc_total_patient":doc_total_patient,
        "total_app_today":total_app_today,
        "pending_app_today":pending_app_today
    }   

    res.json(all_doc_data);
    // const 
})


module.exports=router;