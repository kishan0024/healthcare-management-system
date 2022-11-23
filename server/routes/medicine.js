const express=require("express");
const MedicineSchema=require("../models/MedicineSchema");
const router=express.Router();

router.post("/AddMedicine",async (req,res)=>{
    const medicineName=req.body.medicineName;
    const price=req.body.price;
    const quantity=req.body.quantity;
    const stock=req.body.stock;
    //validation to be added in front end
    if(medicineName=="" || price=="" || quantity=="")
    {
        res.json({"Status":"FieldsNotFilled"});
    }
    else
    {
        const create_new_medicine=new MedicineSchema({
            "medicineName":medicineName,
            "price":price,
            "quantity":quantity,
            "stock":stock
        });
        create_new_medicine.save();
        res.json(create_new_medicine);

    }

});


router.post("/ChangePrice",async (req,res)=>
{
        const  medicineName=req.body.medicineName;
        const newPrice=req.body.newPrice;
        const data= await MedicineSchema.findOne({medicineName});
        // res.json(data);
        //validation remaining
        if(data==null)
        {
            res.json({"Status":"Medicine Not Found"});
        }
        else
        {
            data.price=newPrice;
            await MedicineSchema.updateOne({_id:data._id},data);
            res.json({"Status":"success"});
        }
      
});

router.post("/DeleteMedicine",async (req,res)=>
{   
    //validation remaining
    const medicineName=req.body.medicineName;
    const data=await MedicineSchema.findOne({medicineName});
    if(data==null)
    {
        res.json({"Status":"404 Not Found"});
    }
    else
    {
        console.log(data);
    await MedicineSchema.deleteOne({_id:data._id}).then(
        () => {
          res.json({
            Status: 'Thing deleted successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            Status: error
          })
        });
        

    }

});


router.post("/ChangeStock",async (req,res)=>
{
        const  medicineName=req.body.medicineName;
        const stock1=req.body.stock;
        const data= await MedicineSchema.findOne({medicineName});
        // res.json(data);
        //validation remaining
        // console.log(medicineName,stock1);
        if(data==null)
        {
            res.json({"Status":"Medicine Not Found"});
        }
        else
        {
            var newStock=parseInt(data.stock)-parseInt(stock1);
            data.stock=newStock;
            await MedicineSchema.updateOne({_id:data._id},data);
            res.json({"Status":"success"});
        }
      
});

router.post("/AllMedicine",async (req,res)=>
{

        const data= await MedicineSchema.find();
        // res.json(data);
        //validation remaining
        
        if(data==null)
        {
            res.json({"Status":"no medicines.."});
        }
        else
        {
          
            res.json(data);
        }
      
});


router.post("/AddStock",async (req,res)=>
{
        const  medicineName=req.body.medicineName;
        const stock1=req.body.stock;
        const data= await MedicineSchema.findOne({medicineName});
        // res.json(data);
        //validation remaining
        // console.log(medicineName,stock1);
        if(data==null)
        {
            res.json({"Status":"Medicine Not Found"});
        }
        else
        {
            var newStock=parseInt(data.stock)+parseInt(stock1);
            data.stock=newStock;
            await MedicineSchema.updateOne({_id:data._id},data);
            res.json({"Status":"success"});
        }
      
});


module.exports=router;