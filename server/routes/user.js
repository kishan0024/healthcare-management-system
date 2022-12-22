 const express=require("express");
const UserSchema = require("../models/UserSchema");
const router=express.Router();
const bcrypt = require('bcrypt');
//const Userschema = require("../models/UserSchema") ; 

router.post('/Signin', async (req,res)=>{
    const Email = req.body.Email ; 
    const Password = req.body.Password; 
    const Usertype = req.body.Usertype ; 
    
   
    const user=await UserSchema.findOne({Email,Usertype});
    
    if(user==null)
    {
        // console.log("sda");
        res.json({"Status":"User Not Exist"});
    }
    else
    {
         
        if(await bcrypt.compare(Password,user.Password))
        {
            res.json(user);
        }
        else{
            res.json({"Status":"Wrong password"}) ; 
        }

    }
    // res.send(exi);
    // console.log(Username);



}) ;


router.post('/SignUp',async (req,res)=>{

    const Username=req.body.Username;
    const Password=req.body.Password;
    const Email=req.body.Email;
    const Usertype=req.body.Usertype;
    const Specialization=req.body.Specialization;
    const HospitalName=req.body.HospitalName;
    const Address=req.body.Address;
    const Address2=req.body.Address2;
    const ContactNo=req.body.ContactNo;

    const temp=await UserSchema.find().sort({_id:-1}).limit(1);
    let WorkId=10000;
    if(temp.length!=0)
    {

        WorkId=(parseInt(temp[0].WorkId)+1);
    }


    
    if(Username=="" || Password=="" || Email=="" || Usertype=="" || Specialization=="")
    {
        // alert("Please fill all the field");
        res.json({"Status":"Please Enter all the values"});
    }
    else
    {
        const hash=await bcrypt.genSalt();  
        const hashed=await bcrypt.hash(Password,hash);
        const create_new_user=await UserSchema({
            "WorkId":WorkId,
            "Username":Username,
            "Password":hashed,
            "Email":Email,
            "Usertype":Usertype,
            "Specialization":Specialization,
            "HospitalName":HospitalName,
            "Address":Address,
            "Address2":Address2,
            "ContactNo":ContactNo
        });

        const exist=await UserSchema.findOne({Email:Email});
        if(exist!=null)
        {
            res.json({"Status":"user already exist"});
        }
        else
        {
            create_new_user.save();
            res.json(create_new_user);
        }
    }
   

});


router.post("/AllPharmacist",async(req,res)=>{
    const HospitalName=req.body.HospitalName;

    const data=await UserSchema.find({Usertype:"Pharmacist"});

    res.json(data);

})

router.post("/AllDoctors",async(req,res)=>{
    const HospitalName=req.body.HospitalName;

    const data=await UserSchema.find({Usertype:"Doctor"});

    res.json(data);

})

router.post("/DeletePharmacist",async(req,res)=>{
    const WorkId=req.body.WorkId;

    await UserSchema.deleteOne({WorkId}).then(
        () => {
          res.json({
            Status: 'Pharmacist deleted successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            Status: error
          })
        });

    // res.json(data);

})

router.post("/DeleteDoctor",async(req,res)=>{
    const WorkId=req.body.WorkId;

    await UserSchema.deleteOne({WorkId}).then(
        () => {
          res.json({
            Status: 'Doctor deleted successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            Status: error
          })
        });

    // res.json(data);

})




module.exports = router ; 