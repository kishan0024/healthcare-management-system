const mongoose=require("mongoose");
const {Schema}=mongoose;



const ReportSchema=new Schema({
    "patientUniqueId":{
        type:String,
        required:true,
    },
    "DoctorWorkId":{
        type:String,
        required:true
    },
    "Date":{
        type:String,
        required:true
    },
    "URL": {
        type: String,
        required:true
    },
}); 

module.exports = mongoose.model("Report", ReportSchema) ; 