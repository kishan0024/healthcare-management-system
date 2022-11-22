const mongoose=require("mongoose");
const {Schema}=mongoose;

const Prescribed_medicine=new Schema({
    "PatientUniqueId":{
        type:String,
        required:true
    },
    "DoctorWorkId":{
        type:String,
        // required:true
    },
    "Date":{
        type:String,
        required:true
    },
    "Medicines":{
        type:Object,
        required:true
    },
    "PharmacistStatus":{
        type:String,
        required:true
    }
});


module.exports=mongoose.model("Prescribed Medicines",Prescribed_medicine);