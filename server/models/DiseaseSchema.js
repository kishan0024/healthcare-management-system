const mongoose=require("mongoose");
const {Schema}=mongoose;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();


today = dd + '/' + mm + '/' + yyyy;


const DiseaseSchema=new Schema({
    "patientUniqueId":{
        type:String,
        required:true
       },
       "DiseaseName":{
        type:String,
        required:true
       },
       "date":{
        type:String,
        default:today
       }, 
       "description":{
        type:String,
        required:true
       }
});


module.exports=mongoose.model("Disease",DiseaseSchema);