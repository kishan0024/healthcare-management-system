const con=require("./db_conn");
var bodyParser = require('body-parser');
con();
const dotenv=require("dotenv");
dotenv.config();

const express=require("express");

const app=express();

const cors=require("cors");
const port=5000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use("/User", require("./routes/user")) ; 
app.use("/Patient",require("./routes/patient"));
app.use("/Allergy",require("./routes/allergy"));
app.use("/Medicine",require("./routes/medicine"));
app.use("/Appointment",require("./routes/appointment"));
app.use("/Reports",require("./routes/reports"));
app.use("/Disease",require("./routes/disease"));
app.use("/Data",require("./routes/data"));
app.use("/Doctor_pres",require("./routes/prescription"));
app.use("/Leave",require("./routes/leave"));
app.use("/Bill",require("./routes/bill"));
app.use("/Other",require("./routes/otherdata"));


app.listen(port,()=>{
   console.log("server running:");
});