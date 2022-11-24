const express = require("express");
const DoctorLeave = require("../models/DoctorLeave");
const DiseaseSchema = require("../models/DoctorLeave");
const AppointmentDataSchema = require("../models/AppointmentDataSchema");
const router = express.Router();
var nodemailer = require('nodemailer');
const patientSchema = require("../models/patientSchema");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mahetakishan01@gmail.com',
    pass: 'hpybsuzxqseaftyy'
  }
});

var mailoptions;
var tempData;


Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = new Date(startDate.split("/").reverse().join("/"));

  var endDate = new Date(stopDate.split("/").reverse().join("/"));
  var today;
  while (currentDate <= endDate) {
    // console.log("sf");
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDate.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    dateArray.push(today);
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}
// const d=new Date();



router.post("/MarkLeave", async (req, res) => {
  const DoctorWorkId = req.body.DoctorWorkId;
  const Date = req.body.Date;
  const EndDate = req.body.EndDate;
  const Reason = req.body.Reason;
  // const dat=new Date();
  const create_new_leave = new DoctorLeave({
    "DoctorWorkId": DoctorWorkId,
    "Date": Date,
    "EndDate": EndDate,
    "Reason": Reason
  });

  const dates = getDates(Date, EndDate);
  create_new_leave.save(async function (err, result) {
    if (err) {
      res.json({ "Status": err });
    }
    else {
      for (let j = 0; j < dates.length; j++) {
        await AppointmentDataSchema.find({ DoctorWorkId, Date: dates[j] }).then(
          async (data) => {
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                tempData = await patientSchema.findOne({ UniqueId: data[i]["PatientUniqueId"] });
                await AppointmentDataSchema.deleteOne({ DoctorWorkId,PatientUniqueId:data[i]["PatientUniqueId"], Date: dates[j]}).then(
                  () => {
                    console.log("asdas");
                  }
                ).catch(
                  (error) => {
                    res.status(400).json({
                      Status: error
                    })
                  });
                console.log(tempData);
                if (tempData) {
                  console.log("fds");
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
                                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hi `+ tempData.patientName + `</p>
                                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">This is to inform you that your appointment which you scheduled has been cancelled, here is the details.</p>
                                                      
                                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Patient Name:`+ tempData.patientName + `</p>
                                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Date:`+ dates[j] + `</p>
                                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Time Slot:`+ data[i]["StartTime"] + `-` + data[i]["EndTime"] + `</p>
                                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Doctor's Reason:`+ Reason + `</p>
    
    
    
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
                      // console.log('Email sent: ' + info.response);
                    }
                  });

                }
                // console.log(tempData.Email);


              }
            }

          })



      }

      res.json({ "Status": "Successfully Addedd..." });
    }
  })

})

router.post("/FetchLeave", async (req, res) => {
  const DoctorWorkId = req.body.DoctorWorkId;
  const data = await DiseaseSchema.findOne({ DoctorWorkId });
  if (data != null)
    res.json(data);
  else {
    res.json({ Status: "404NotFound" });
  }


})



module.exports = router;