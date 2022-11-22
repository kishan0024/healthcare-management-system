const mongoose=require("mongoose");
const {Schema}=mongoose;

const AppointmentSchema=new Schema({
    "Hospital":{
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
    "TotalSlots":{
        type:String,
        required:true
    }
  

});

module.exports=mongoose.model("Appointment",AppointmentSchema);
