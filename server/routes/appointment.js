const express=require("express");
const { Schema } = require("mongoose");
const router=express.Router();
const AppointmentDataSchema=require("../models/AppointmentDataSchema");
const BillSchema=require("../models/BillSchema");
const { listeners } = require("../models/patientSchema");
// const AppointmentSchema=require("../models/AppointmentSchema");
const patientSchema=require("../models/patientSchema");
const UserSchema = require("../models/UserSchema");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mahetakishan01@gmail.com',
      pass: 'hpybsuzxqseaftyy'
    }
  });
  
  var mailoptions;
  var tempData;

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
        tempData=await patientSchema.findOne({UniqueId:PatientUniqueId});
        console.log(tempData.Email);
        mailoptions = {
            from: 'mahetakishan01@gmail.com',
            to: tempData.Email,
            subject: 'Regarding Appointment Booked',
            // text: `Hi`+tempData.patientName +`Smartherd, This is to notify you that your appointment on`+dates[j]+ `has been canelled
            //         Reson`
            html: `<html>
                            <head>
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                              <title>Simple Transactional Email</title>
                              <style>
                          @media only screen and (max-width: 620px) {
                            table.body h1 {
                              font-size: 28px !important;
                              margin-bottom: 10px !important;
                            }
                          
                            table.body p,
                          table.body ul,
                          table.body ol,
                          table.body td,
                          table.body span,
                          table.body a {
                              font-size: 16px !important;
                            }
                          
                            table.body .wrapper,
                          table.body .article {
                              padding: 10px !important;
                            }
                          
                            table.body .content {
                              padding: 0 !important;
                            }
                          
                            table.body .container {
                              padding: 0 !important;
                              width: 100% !important;
                            }
                          
                            table.body .main {
                              border-left-width: 0 !important;
                              border-radius: 0 !important;
                              border-right-width: 0 !important;
                            }
                          
                            table.body .btn table {
                              width: 100% !important;
                            }
                          
                            table.body .btn a {
                              width: 100% !important;
                            }
                          
                            table.body .img-responsive {
                              height: auto !important;
                              max-width: 100% !important;
                              width: auto !important;
                            }
                          }
                          @media all {
                            .ExternalClass {
                              width: 100%;
                            }
                          
                            .ExternalClass,
                          .ExternalClass p,
                          .ExternalClass span,
                          .ExternalClass font,
                          .ExternalClass td,
                          .ExternalClass div {
                              line-height: 100%;
                            }
                          
                            .apple-link a {
                              color: inherit !important;
                              font-family: inherit !important;
                              font-size: inherit !important;
                              font-weight: inherit !important;
                              line-height: inherit !important;
                              text-decoration: none !important;
                            }
                          
                            #MessageViewBody a {
                              color: inherit;
                              text-decoration: none;
                              font-size: inherit;
                              font-family: inherit;
                              font-weight: inherit;
                              line-height: inherit;
                            }
                          
                            .btn-primary table td:hover {
                              background-color: #34495e !important;
                            }
                          
                            .btn-primary a:hover {
                              background-color: #34495e !important;
                              border-color: #34495e !important;
                            }
                          }
                          </style>
                            </head>
                            <body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                              <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
                                <tr>
                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                                  <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                                    <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                          
                                      <!-- START CENTERED WHITE CONTAINER -->
                                      <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
                          
                                        <!-- START MAIN CONTENT AREA -->
                                        <tr>
                                          <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                              <tr>
                                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hello `+ tempData.patientName + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">This is to inform you that your appointment is booked, here is the details.</p>
                                              
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Patient Name:`+ tempData.patientName + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Date:`+ Date + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Time Slot:`+ StartTime+ `-` + EndTime + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Doctor Id:`+ DoctorWorkId + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hospital:`+ Hospital + `</p>




                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Stay Healthy! Stay Fit!</p>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                          
                                      <!-- END MAIN CONTENT AREA -->
                                      </table>
                                      <!-- END CENTERED WHITE CONTAINER -->
                          
                                      <!-- START FOOTER -->
                                      <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                          <tr>
                                            <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                              <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                                              <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Unsubscribe</a>.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                              Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">HTMLemail</a>.
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                      <!-- END FOOTER -->
                          
                                    </div>
                                  </td>
                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                                </tr>
                              </table>
                            </body>
                          </html>
                            `
          };
          transporter.sendMail(mailoptions, async function (error, info) {
            if (error) {
              res.json({Status:"something went wrong while sending mail.."});
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

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
            tempData=await patientSchema.findOne({UniqueId:PatientUniqueId});
        mailoptions = {
            from: 'mahetakishan01@gmail.com',
            to: tempData.Email,
            subject: 'Regarding Appointment Booked',
            // text: `Hi`+tempData.patientName +`Smartherd, This is to notify you that your appointment on`+dates[j]+ `has been canelled
            //         Reson`
            html: `<html>
                            <head>
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                              <title>Simple Transactional Email</title>
                              <style>
                          @media only screen and (max-width: 620px) {
                            table.body h1 {
                              font-size: 28px !important;
                              margin-bottom: 10px !important;
                            }
                          
                            table.body p,
                          table.body ul,
                          table.body ol,
                          table.body td,
                          table.body span,
                          table.body a {
                              font-size: 16px !important;
                            }
                          
                            table.body .wrapper,
                          table.body .article {
                              padding: 10px !important;
                            }
                          
                            table.body .content {
                              padding: 0 !important;
                            }
                          
                            table.body .container {
                              padding: 0 !important;
                              width: 100% !important;
                            }
                          
                            table.body .main {
                              border-left-width: 0 !important;
                              border-radius: 0 !important;
                              border-right-width: 0 !important;
                            }
                          
                            table.body .btn table {
                              width: 100% !important;
                            }
                          
                            table.body .btn a {
                              width: 100% !important;
                            }
                          
                            table.body .img-responsive {
                              height: auto !important;
                              max-width: 100% !important;
                              width: auto !important;
                            }
                          }
                          @media all {
                            .ExternalClass {
                              width: 100%;
                            }
                          
                            .ExternalClass,
                          .ExternalClass p,
                          .ExternalClass span,
                          .ExternalClass font,
                          .ExternalClass td,
                          .ExternalClass div {
                              line-height: 100%;
                            }
                          
                            .apple-link a {
                              color: inherit !important;
                              font-family: inherit !important;
                              font-size: inherit !important;
                              font-weight: inherit !important;
                              line-height: inherit !important;
                              text-decoration: none !important;
                            }
                          
                            #MessageViewBody a {
                              color: inherit;
                              text-decoration: none;
                              font-size: inherit;
                              font-family: inherit;
                              font-weight: inherit;
                              line-height: inherit;
                            }
                          
                            .btn-primary table td:hover {
                              background-color: #34495e !important;
                            }
                          
                            .btn-primary a:hover {
                              background-color: #34495e !important;
                              border-color: #34495e !important;
                            }
                          }
                          </style>
                            </head>
                            <body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                              <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
                                <tr>
                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                                  <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                                    <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                          
                                      <!-- START CENTERED WHITE CONTAINER -->
                                      <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
                          
                                        <!-- START MAIN CONTENT AREA -->
                                        <tr>
                                          <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                              <tr>
                                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hello `+ tempData.patientName + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">This is to inform you that your appointment is booked, here is the details.</p>
                                              
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Patient Name:`+ tempData.patientName + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Date:`+ Date + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Time Slot:`+ StartTime+ `-` + EndTime + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Doctor Id:`+ DoctorWorkId + `</p>
                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hospital:`+ Hospital + `</p>




                                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Stay Healthy! Stay Fit!</p>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                          
                                      <!-- END MAIN CONTENT AREA -->
                                      </table>
                                      <!-- END CENTERED WHITE CONTAINER -->
                          
                                      <!-- START FOOTER -->
                                      <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                          <tr>
                                            <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                              <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                                              <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Unsubscribe</a>.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                              Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">HTMLemail</a>.
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                      <!-- END FOOTER -->
                          
                                    </div>
                                  </td>
                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                                </tr>
                              </table>
                            </body>
                          </html>
                            `
          };
          transporter.sendMail(mailoptions, async function (error, info) {
            if (error) {
              res.json({Status:"something went wrong while sending mail.."});
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.json({"Status":"Successfully Booked...."});

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

    let data=await AppointmentDataSchema.find({PatientUniqueId,"Status1":"Pending"});
    
    // res.send("Keyur") ; 
    // res.send(data) ; 

    if (data.length == 0){
      res.send("Not find any data") ; 
    }
    else{
      res.send("Find data") ; 
    }

    // let new_data=data;
    // if(data.length==0)
    // {  
       
    //   // console.log(data);
    //     res.send("Runt")
    // }
    // else
    // {
    //     // data=data.json();
    //     // let new_data=[];
    //     // res.send(data) ; 

    //     let New_data = [] ; 
    //     for(var i=0;i<data.length;i++)
    //     {
    //         const DoctorWorkId=data[i].DoctorWorkId;
    //         const PatientName=await patientSchema.findOne({UniqueId:PatientUniqueId});
    //         // console.log(PatientName.patientName);
    //         const DoctorName=await UserSchema.findOne({WorkId:DoctorWorkId});
    //         // const URL=await BillSchema.findOne({patientUniqueId:PatientUniqueId,DoctorWorkId,Date:data[i].Date});
    //         let new_data = {
    //             "PatientName" : PatientName.patientName, 
    //             "DoctorName" : DoctorName.Username,
    //             // "URL":URL.URL
    //         }
  
    //         New_data.push({...data[i]["_doc"], ...new_data}) ; 
    //     }
       
    
  
  
    //     res.send(New_data);
    // }


});





module.exports=router;