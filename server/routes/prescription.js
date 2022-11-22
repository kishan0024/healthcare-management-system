const express=require("express");
const Prescribed_medicine=require("../models/Prescibed_medicine");
const router=express.Router();


router.post('/PrescribeMedicines',async (req,res)=>{

    const PatientUniqueId=req.body.PatientUniqueId;
    const DoctorWorkId=req.body.DoctorWorkId;
    const Date=req.body.Date;
    const Medicines=req.body.Medicines;
    const PharmacistStatus="Remaining";

    const create_new_prescription=new Prescribed_medicine({
        PatientUniqueId,
        DoctorWorkId,
        Date,
        Medicines,
        PharmacistStatus
    });
    create_new_prescription.save();
    res.json({Status:"Successfully added...."});

});


router.post('/SeePrescribeMedicines',async (req,res)=>{

    const PatientUniqueId=req.body.PatientUniqueId;
    // const Date=req.body.Date;
    
    const data=await Prescribed_medicine.findOne({PatientUniqueId,PharmacistStatus:"Remaining"});
    console.log(data);
    if(data==null)
    {
        res.json({Status:"no data found"});
    }
    else
    {
        res.json(data);
    }


});
router.post('/ChangePrescriptionStatus',async (req,res)=>{

    const PatientUniqueId=req.body.PatientUniqueId;
    const DoctorWorkId=req.body.DoctorWorkId;
    // console.log(Doctor);
    const data=await Prescribed_medicine.findOne({PatientUniqueId,DoctorWorkId});
    console.log(data);
    await Prescribed_medicine.updateOne({_id:data._id},{PharmacistStatus:"Completed"}).then(
        () => {
          res.json({
            Status: 'Thing Updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            Status: error
          })
        });


    

});

router.post('/SeePrescribeMedicinesPatient',async (req,res)=>{

  const PatientUniqueId=req.body.PatientUniqueId;
  // const Date=req.body.Date;
  
  const data=await Prescribed_medicine.find({PatientUniqueId,PharmacistStatus:"Completed"});
  console.log(data);
  if(data==null)
  {
      res.json({Status:"no data found"});
  }
  else
  {
      res.json(data);
  }


});

module.exports=router
