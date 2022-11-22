const mongoose=require("mongoose");
const {Schema}=mongoose;

const AppointmentDataSchema=new Schema({
    "Hospital":{
        type:String,
        required:true
    },

    "PatientUniqueId":{
        type:String,
        required:true
    },

    "DoctorWorkId":{
        type:String,
        required:true
    },
    "Date":{
        type:String,
        required:true
    },
    "StartTime":{
        type:String,
        required:true
    },
    "EndTime":{
        type:String,
        required:true
    },
    "Status1":{
        type:String,
        required:true
    }
  

});

module.exports=mongoose.model("AppointmentData",AppointmentDataSchema);
