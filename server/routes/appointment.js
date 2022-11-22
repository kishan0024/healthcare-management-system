const express=require("express");
const { Schema } = require("mongoose");
const router=express.Router();
const AppointmentDataSchema=require("../models/AppointmentDataSchema");
const BillSchema=require("../models/BillSchema");
const { listeners } = require("../models/patientSchema");
// const AppointmentSchema=require("../models/AppointmentSchema");
const patientSchema=require("../models/patientSchema");
const UserSchema = require("../models/UserSchema");

router.post("/BookAppointment", async (req,res)=>{
    const Hospital=req.body.Hospital;
   
    const PatientUniqueId=req.body.PatientUniqueId;
    // const PatientName=await patientSchema.findOne({PatientUniqueId});
    const DoctorWorkId=req.body.DoctorWorkId;
    // const DoctorName=await patientSchema.findOne({WorkId:DoctorWorkId});
    const Date=req.body.Date;
    const StartTime=req.body.StartTime;
    const EndTime=req.body.EndTime; 
    const Status1="Pending";
    const data=await AppointmentDataSchema.findOne({Hospital,Date,StartTime,EndTime,DoctorWorkId});
    const data1=await AppointmentDataSchema.find({Hospital,Date,StartTime,EndTime,DoctorWorkId});
    const exist=await AppointmentDataSchema.findOne({PatientUniqueId,Date,DoctorWorkId});
    const exist1=await AppointmentDataSchema.findOne({PatientUniqueId,Date,StartTime,EndTime});
   


    if(exist!=null)
    {
        res.json({"Status":"We're Sorry, but You can only book on appointment in one day."});
    }
    else if(exist1!=null)
    {
        res.json({"Status":"This Slot is already booked by you for appointment."});

    }

    else if(data==null)
    {
        // const create_appointment=new AppointmentSchema({
        //     "Hospital":Hospital,
        //     "Date":Date,
        //     "StartTime":StartTime,
        //     "EndTime":EndTime,
        //     "TotalSlots":"2",
        // });
        // create_appointment.save();

        const appointment_data=new AppointmentDataSchema
        ({
            // "Key":create_appointment._id,
            "Hospital":Hospital,
            "PatientUniqueId":PatientUniqueId,
            "DoctorWorkId":DoctorWorkId,
            "Date":Date,
            "StartTime":StartTime,
            "EndTime":EndTime,
            "Status1":Status1

        });
        appointment_data.save();

        res.json({"Status":"Successfully Booked...."});
    }
    else
    {


        if(data1.length<3)
        {
            const appointment_data=new AppointmentDataSchema
            ({
                // "Key":data._id,
                "Hospital":Hospital,
                "PatientUniqueId":PatientUniqueId,
                "DoctorWorkId":DoctorWorkId,
                "Date":Date,
                "StartTime":StartTime,
                "EndTime":EndTime,
                "Status1":Status1
    
            });
            appointment_data.save();
            res.send(appointment_data);

        }
        else
        {
            res.json({Status:"SlotsFull"});
        }
    }


    
});


router.post("/ShowToDoctor",async (req,res)=>{
    const DoctorWorkId=req.body.DoctorWorkId;
    const Status1="Attended";
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    let data=await AppointmentDataSchema.find({DoctorWorkId,Status1,Date:today});
    // let new_data=data;
    if(data.length==0)
    {
        res.json({Status:"noData"});
    }
    else
    {
        // data=data.json();
        // let new_data=[];
        // res.send(data) ; 

        let New_data = [] ; 
        for(var i=0;i<data.length;i++)
        {
            const PatientUniqueId=data[i].PatientUniqueId;
            const PatientName=await patientSchema.findOne({PatientUniqueId});
            const DoctorName=await UserSchema.findOne({WorkId:DoctorWorkId});
            let new_data = {
                "PatientName" : PatientName.patientName, 
                "DoctorName" : DoctorName.Username 
            }
  
            New_data.push({...data[i]["_doc"], ...new_data}) ; 
        }
       
    
  
  
        res.send(New_data);
    }
    
});


router.post("/ShowToPatient",async (req,res)=>{

    const PatientUniqueId=req.body.PatientUniqueId;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    let data=await AppointmentDataSchema.find({PatientUniqueId});
    // let new_data=data;
    if(data.length==0)
    {
        res.json({Status:"noData"});
    }
    else
    {
        // data=data.json();
        // let new_data=[];
        // res.send(data) ; 

        let New_data = [] ; 
        for(var i=0;i<data.length;i++)
        {
            const DoctorWorkId=data[i].DoctorWorkId;
            const PatientName=await patientSchema.findOne({UniqueId:PatientUniqueId});
            // console.log(PatientName.patientName);
            const DoctorName=await UserSchema.findOne({WorkId:DoctorWorkId});
            const URL=await BillSchema.findOne({patientUniqueId:PatientUniqueId,DoctorWorkId,Date:data[i].Date});
            let new_data = {
                "PatientName" : PatientName.patientName, 
                "DoctorName" : DoctorName.Username,
                "URL":URL.URL
            }
  
            New_data.push({...data[i]["_doc"], ...new_data}) ; 
        }
       
    
  
  
        res.send(New_data);
    }


});

//first set session of admin and fetch hospital name from there
// and give call to api of that hospital name to get all appointmnets

router.post("/ShowToAdmin",async (req,res)=>{

    const Hospital=req.body.Hospital;

    let data=await AppointmentDataSchema.find({Hospital,Status1:"Pending"});
    // let new_data=data;
    if(data.length==0)
    {
        res.json({Status:"noData"});
    }
    else
    {
        // data=data.json();
        // let new_data=[];
        // res.send(data) ; 

        let New_data = [] ; 
        for(var i=0;i<data.length;i++)
        {
            console.log(data[i]);
            const PatientName=await patientSchema.findOne({UniqueId:data[i].PatientUniqueId});
            const DoctorName=await UserSchema.findOne({WorkId:data[i].DoctorWorkId});
            let new_data = {
                "PatientName" : PatientName.patientName, 
                "DoctorName" : DoctorName.Username 
            }
  
            New_data.push({...data[i]["_doc"], ...new_data}) ; 
        }
       
    
  
  
        res.send(New_data);
    }


});


router.post('/ChangeStatus',async (req,res)=>{

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    const PatientUniqueId=req.body.PatientUniqueId;
    // const DoctorWorkId=req.body.DoctorWorkId;
    // // const Date=today;
    // const Status1=req.body.Status1;

    let data=await AppointmentDataSchema.findOne({PatientUniqueId});
    if(data==null)
        {
            res.json({"Status":"No appointment for this id"});
        }
        else
        {
            // data.price=newPrice;
            await AppointmentDataSchema.updateOne({_id:data._id},{Status1:"Attended"});
            res.json({"Status":"success"});
        }
    // res.json(data);

});


router.post('/ChangeStatus_doctor',async (req,res)=>{

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    const PatientUniqueId=req.body.PatientUniqueId;
    // const DoctorWorkId=req.body.DoctorWorkId;
    // // const Date=today;
    // const Status1=req.body.Status1;

    let data=await AppointmentDataSchema.findOne({PatientUniqueId});
    if(data==null)
        {
            res.json({"Status":"No appointment for this id"});
        }
        else
        {
            // data.price=newPrice;
            await AppointmentDataSchema.updateOne({_id:data._id},{Status1:"Completed"});
            res.json({"Status":"success"});
        }
    // res.json(data);

});


router.post('/TimeSlots',async(req,res)=>{
    const Date=req.body.Date;
    const DoctorWorkId=req.body.DoctorWorkId;
    const times=[["10:30","11:30"],["11:30","12:30"],["12:30","1:30"],["1:30","2:30"],["2:30","3:30"],["3:30","4:30"]];
    let finalData=[];
    let temp;

    for(let i=0;i<times.length;i++)
    {
        temp=await AppointmentDataSchema.count({Date,DoctorWorkId,StartTime:times[i][0],EndTime:times[i][1]});
        console.log(temp);
        finalData.push({
                        StartTime:times[i][0],
                        EndTime:times[i][1],
                        Count:temp
        });
    }
   
    res.json({data:finalData});
   
    
})

router.post("/ShowToPatientUp",async (req,res)=>{

    const PatientUniqueId=req.body.PatientUniqueId;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    let data=await AppointmentDataSchema.find({PatientUniqueId,Status1:"Pending"});
    // let new_data=data;
    if(data.length==0)
    {
        res.json({Status:"noData"});
    }
    else
    {
        // data=data.json();
        // let new_data=[];
        // res.send(data) ; 

        let New_data = [] ; 
        for(var i=0;i<data.length;i++)
        {
            const DoctorWorkId=data[i].DoctorWorkId;
            const PatientName=await patientSchema.findOne({UniqueId:PatientUniqueId});
            // console.log(PatientName.patientName);
            const DoctorName=await UserSchema.findOne({WorkId:DoctorWorkId});
            // const URL=await BillSchema.findOne({patientUniqueId:PatientUniqueId,DoctorWorkId,Date:data[i].Date});
            let new_data = {
                "PatientName" : PatientName.patientName, 
                "DoctorName" : DoctorName.Username,
                // "URL":URL.URL
            }
  
            New_data.push({...data[i]["_doc"], ...new_data}) ; 
        }
       
    
  
  
        res.send(New_data);
    }


});





module.exports=router;