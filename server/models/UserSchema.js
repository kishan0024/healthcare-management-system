const mongoose=require("mongoose");
const {Schema}=mongoose;



const UserSchema=new Schema({
    "WorkId":{
        type:String,
        required:true
    },
    'Username' : {  
        type: String, 
        required: true
    }, 
    'Password' : {
        type: String, 
        required: true
    }, 
    'Usertype':{
        type: String, 
        required: true
    },
    'Email':{
        type:String,
        required:true
    },
    'Specialization':{
        type:String
    },
    "HospitalName":{
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

module.exports = mongoose.model("User", UserSchema) ; 