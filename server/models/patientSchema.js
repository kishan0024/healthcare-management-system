const mongoose=require("mongoose");
const {Schema}=mongoose;



const patientSchema=new Schema({
  "patientName":{
    type:String,
    required:true
  },
  "Email":{
    type:String,
    required:true
  },
  "Password":{
    type:String,
    required:true
  },
  "UniqueId":{
    type:String,
    required:true
  },
  "Dob":{
    type:String,
    required:true
  },
  "Height":{
    type:String,
    required:true
  },
  "Weight":{
    type:String,
    required:true
  },
  "BloodGroup":{
    type:String,
    required:true
  },
  "Address":{
    type:String,
    required:true
  },
  "Address2":{
    type:String,
    required:true
  },
  "ContactNo":{
    type:String,
    required:true
  }
}); 

module.exports = mongoose.model("Patient", patientSchema) ; 