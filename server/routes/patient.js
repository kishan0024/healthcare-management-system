const express=require("express");
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const patientSchema=require("../models/patientSchema");

const regex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;



router.post('/AddPatient', async (req,res)=>{
    // console.log((await patientSchema.find()).length);
    // const patientId=parseInt((await patientSchema.find()).length)+1000; 
    const patientName=req.body.patientName;
    const Email=req.body.Email;
    const Password=req.body.Password;
    console.log(Password);
    const temp=await patientSchema.find().sort({_id:-1}).limit(1);
    let UniqueId=10000000000;
    if(temp.length!=0)
    {
        // console.log(temp[0].UniqueId);
        UniqueId=(parseInt(temp[0].UniqueId)+1);
    }

    console.log(UniqueId);
    const Dob=req.body.Dob;
    const Height=req.body.Height;
    const Weight=req.body.Weight;
    const BloodGroup=req.body.BloodGroup;
    const address=req.body.address;
    const ContactNo=req.body.ContactNo;
    const Address=req.body.Address;
    const Address2=req.body.Address2;

        const create_new_patient=await patientSchema({
            "patientName":patientName,
            "Email":Email,
            "Password":Password,
            "UniqueId":UniqueId,
            "Dob":Dob,
            "Height":Height,
            "Weight":Weight,
            "BloodGroup":BloodGroup,
            "address":address,
            "ContactNo":ContactNo,
            "Address":Address,
            "Address2":Address2
        });

        if(patientName=="" || Email=="" || Password=="" || UniqueId=="" || Dob=="" || Height=="" || Weight=="" || BloodGroup=="" || address=="" || ContactNo=="")
        {
            res.json({"Status":"enter all the details"});
        } 
        else if(!regex.test(Password))
        {
            res.json({"Status":"enter appropriate pass"});
        }
   
        else
        {
             const exist= await patientSchema.find({Email});
            
             if(exist.length!=0)
            {
                res.json({"Status":"email id already exist..please enter different email.."});
            }
            else{
                const hash=await bcrypt.genSalt();  
                const hashed=await bcrypt.hash(Password,hash);

                const create_new_patient=await patientSchema({
                    "patientName":patientName,
                    "Email":Email,
                    "Password":hashed,
                    "UniqueId":UniqueId,
                    "Dob":Dob,
                    "Height":Height,
                    "Weight":Weight,
                    "BloodGroup":BloodGroup,
                    "address":address,
                    "ContactNo":ContactNo,
                    "Address":Address,
                    "Address2":Address2
                });



                create_new_patient.save();
                res.json(create_new_patient);
            }
        }

       

      


});

router.post('/PatientSignIn', async (req,res)=>{

    // const UniqueId=req.body.uniqueId;
    const Email=req.body.Email;
    const Password=req.body.Password;

    if(Email==""|| Password=="")
    {
        res.json({"Status":"enter all the details"});
    }
    else
    {
        const user=await patientSchema.findOne({Email});

        if(!user)
        {
            res.json({"Status":"user doesn't exist"});
        }
        else{
            if(await bcrypt.compare(Password,user.Password))
            {
                res.json(user);
            }
         
            else{

                res.json({"Status":"Wrong password"}) ; 

            }

        }
        
    }

});

router.post('/FindPatient', async (req,res)=>{

const UniqueId=req.body.UniqueId;

const data=await patientSchema.findOne({UniqueId});

if(data==null)
{
    res.json({Status:"No user Found"});
}

res.json(data);

});



module.exports=router;