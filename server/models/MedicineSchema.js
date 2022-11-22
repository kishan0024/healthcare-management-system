const mongoose=require("mongoose");
const {Schema}=mongoose;


const MedicineSchema=new Schema({
    "medicineName":{
        type:String,
        required:true
    },
    "price":{
        type:String,
        required:true
    },
    "quantity":{
        type:String,
        required:true
    },
    "stock":{
        type:String,
        required:true
    }
});


module.exports=mongoose.model("Medicines",MedicineSchema);