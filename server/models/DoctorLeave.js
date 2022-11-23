const mongoose=require("mongoose");
const {Schema}=mongoose;

const DoctorLeave=new Schema({
    "DoctorWorkId":{
    type:String,
    required:true
    },
    "Date":{
        type:String,
        required:true
    },
    "EndDate":{
        type:String,
        required:true
    },
    "Reason":{
        type:String,
        required:true
    }  

});

module.exports=mongoose.model("Doctor Leave",DoctorLeave);
