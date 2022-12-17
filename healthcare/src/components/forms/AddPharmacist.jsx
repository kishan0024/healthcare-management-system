import React from 'react'
import './addpharmacist.css'
import { useState } from 'react';
export const AddPharmacist = () => {
  const valid_mail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid_pass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  const h_name=sessionStorage.getItem("Hospital");
  const [otp_var,setOTP]=useState();
  const [doctor_register,setDoctorRegister]=useState({
    UserName:"",
    Password:"",
    conf_pass:"",
    Usertype:"Pharmacist",
    Email:"",
    HospitalName:h_name,
    Address:"",
    Address2:"",
    ContactNo:""
  });
  
  
  const varify_login=()=>{
    console.log(otp_var);
  
    const temp=document.getElementById("enteredOTP").value;
    console.log(temp);
    if(parseInt(temp)==otp_var)
    {
    const func1=async ()=>{
      let options = {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(doctor_register)
      }
  
  
      let req=await  fetch("http://localhost:5000/User/SignUp",options);
     let response=await req.json();
  
     if(response.Status)
     {
      console.log(response.Status);
  
     }
     else
     {
      document.getElementById("otp_box").style.display="none";
      alert("successgfully created");
      console.log(response);
  
     }
   
    // setData(response);
    
    }
    func1();
  }
  
  
  
   
  }
  // const [conf_password]
  
  const generate_send_otp=(email)=>{
    let num=Math.floor(Math.random() * 100000);
    setOTP(num);
    var newWindow;
    let URL="http://keyur.epizy.com/Send_otp.php?email="+email+"&otp="+num;
      
    // window.open(URL,"_blank");
    function windowOpen() {   
      newWindow = window.open(URL, "_blank", "width=1, height=1");   
  }   
  
  // function to close the window opened by window.open()   
  function windowClose() {   
    newWindow.close();   
  }
  
  windowOpen();
  setTimeout(windowClose,3000); 
  
  
  
  
    
  
  
  
  
  };
  
  
  
  const close_OTP=()=>{
    document.getElementById("otp_box").style.display="none";
  }
  
  
  
  
  const handleInput=(e)=>{
  const name=e.target.id;
  const value=e.target.value;
  
  setDoctorRegister({...doctor_register,[name]:value});
  // console.log(value);
  }
  
  
  
  
  
  
  
  const submit_data=()=>{
  
  
    if(!valid_mail.test(doctor_register.Email))
    {
      alert("please enter valid email address...");
  
    }
    else if(!valid_pass.test(doctor_register.Password)){
      alert("Minimum eight characters, at least one letter, one number and one special character:");
    }
    else if(doctor_register.Password!=doctor_register.conf_pass)
    {
      console.log("addf");
      alert("password doesn't match...");
    }
    else if(isNaN(doctor_register.ContactNo) || doctor_register.ContactNo.length!=10)
    {
      alert("enter valid phone num..");
    }
    else{
      document.getElementById("otp_box").style.display="flex";
      generate_send_otp(doctor_register.Email);
  
    }
    
    // console.log(doctor_register);
  
  }
  
  






  return (

    <div className='Add_pharmacist_main'>
    <div className='otp_box' id="otp_box">
      <div className='otp_box_main'>
        <div className=' w-100 close_button'onClick={close_OTP}> <i class="fa fa-window-close" aria-hidden="true"></i></div>
        <div>Enter OTP</div>
      <div className="input-group input-group-sm mb-3 w-75">
<span className="input-group-text" id="inputGroup-sizing-sm">Small</span>
<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="enteredOTP"/>
<button type="button" class="btn btn-primary" onClick={varify_login}>Varify</button>
</div>

      </div>
    </div>

    <div className='w-100 text-center'>
      <h2 style={{ color: "#388087" }}>
        Add New Pharmacist
      </h2>
    </div>
    <div className='col-md-5'>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label for="username">Full Name</label>
          <input type="text" className="form-control" id="UserName"  onChange={handleInput} placeholder="Username" required />
        </div>
        <div className="form-group col-md-12">
          <label for="email">Email</label>
          <input type="email" className="form-control" id="Email"  placeholder="Email" onChange={handleInput}  required/>
        </div>
        <div className="form-group col-md-12">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="Password" placeholder="Password" onChange={handleInput} required/>
        </div>

        <div className="form-group col-md-12">
          <label for="conf_password">Confirm Password</label>
          <input type="password" className="form-control" id="conf_pass" placeholder="Password"  onChange={handleInput} required/>
        </div>
      </div>
      <div className="form-group">
        <label for="inputAddress">Address</label>
        <input type="text" className="form-control" id="Address" placeholder="1234 Main St"  onChange={handleInput} required/>
      </div>
      <div className="form-group">
        <label for="address2">Address 2</label>
        <input type="text" className="form-control" id="Address2" placeholder="Apartment, studio, or floor"  onChange={handleInput} required/>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label for="phone">Contact No.</label>
          <input type="text" className="form-control" id="ContactNo" onChange={handleInput} required />
        </div>

      </div>

      <div className='w-100 row justify-content-center mt-2'>
        <button type="submit" className="btn btn-primary" onClick={submit_data}>Send OTP</button>

      </div>
    </div>


  </div>
  
    )
}
