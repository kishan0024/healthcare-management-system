import React from 'react'
import './addpatient.css'
import { useState } from 'react';
export const AddPatient = () => {


  const valid_mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const h_name = sessionStorage.getItem("Hospital");
  const [otp_var, setOTP] = useState();
  const [patient_register, setPatientRegister] = useState({
    patientName: "",
    Email: "",
    Password: "",
    conf_pass: "",
    UniqueId: "",
    Dob: "",
    Height: "",
    Weight: "",
    BloodGroup: "",
    Address: "",
    Address2: "",
    ContactNo: "",
  });


  const varify_login = () => {
    console.log(otp_var);

    const temp = document.getElementById("enteredOTP").value;
    console.log(temp);
    if (parseInt(temp) == otp_var) {
      const func1 = async () => {
        let options = {
          method: 'POST',
          headers: {

            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(patient_register)
        }


        let req = await fetch("http://localhost:5000/Patient/AddPatient", options);
        let response = await req.json();

        if (response.Status) {
          console.log(response.Status);

        }
        else {
          document.getElementById("otp_box").style.display = "none";
          alert("successgfully created");
          console.log(response);

        }

        // setData(response);

      }
      func1();
    }




  }
  // const [conf_password]

  const generate_send_otp = (email) => {
    let num = Math.floor(Math.random() * 100000);
    setOTP(num);
    var newWindow;
    let URL = "http://smartinfo.epizy.com/Kishan_send_email.php?email=" + email + "&otp=" + num;

    // window.open(URL,"_blank");
    function windowOpen() {
      newWindow = window.open(URL, "_blank", "width=1, height=1");
    }

    // function to close the window opened by window.open()   
    function windowClose() {
      newWindow.close();
    }

    windowOpen();
    setTimeout(windowClose, 3000);









  };



  const close_OTP = () => {
    document.getElementById("otp_box").style.display = "none";
  }




  const handleInput = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    console.log(name, value);

    setPatientRegister({ ...patient_register, [name]: value });
    // console.log(value);
  }







  const submit_data = () => {
    // console.log(patient_register.Email)
    console.log(patient_register);
    if (!valid_mail.test(patient_register.Email)) {
      alert("please enter valid email address...");

    }
    else if (!valid_pass.test(patient_register.Password)) {
      alert("Minimum eight characters, at least one letter, one number and one special character:");
    }
    else if (patient_register.Password != patient_register.conf_pass) {
      console.log("addf");
      alert("password doesn't match...");
    }
    else if (isNaN(patient_register.ContactNo) || patient_register.ContactNo.length != 10) {
      alert("enter valid phone num..");
    }
    else {
      document.getElementById("otp_box").style.display = "flex";
      generate_send_otp(patient_register.Email);

    }
  }




  return (
    <div className='Add_patient_main'>
      <div className='otp_box' id="otp_box">
        <div className='otp_box_main'>
          <div className=' w-100 close_button' onClick={close_OTP}> <i class="fa fa-window-close" aria-hidden="true"></i></div>
          <div>Enter OTP</div>
          <div className="input-group input-group-sm mb-3 w-75">
            <span className="input-group-text" id="inputGroup-sizing-sm">Small</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="enteredOTP" />
            <button type="button" class="btn btn-primary" onClick={varify_login}>Primary</button>
          </div>

        </div>
      </div>


      <div className='w-100 text-center'>
        <h2 style={{ color: "#388087" }}>
          Add New Patient
        </h2>
      </div>
      <form className='col-md-5'>
        <div className="form-row">
          <div className='text_color mt-2 w-100 text-center text_larger'>
            Personal Details
          </div>
          <div className="form-group col-md-12">
            <label for="username">Full Name</label>
            <input type="email" className="form-control" id="patientName" placeholder="Username" onChange={handleInput} />
          </div>
          <div class="row mt-3">
            <div class="col">
              <label for="email">Email</label>
              <input type="text" class="form-control" id='Email' placeholder="Email" onChange={handleInput} />
            </div>
            <div class="col">
              <label for="password">Password</label>
              <input type="text" class="form-control" id='Password' placeholder="password" onChange={handleInput} />
            </div>
          </div>


          <div className="form-group col-md-12">
            <label for="conf_password">Confirm Password</label>
            <input type="password" className="form-control" id="conf_pass" placeholder="Password" onChange={handleInput} />
          </div>
        </div>


        <div class="row mt-3">
        <div className="col">
          <label for="inputAddress">Address</label>
          <input type="text" className="form-control" id="Address" placeholder="1234 Main St" onChange={handleInput} />
        </div>
        <div className="col">
          <label for="Dob">DOB</label>
          <input type="date" className="form-control" id="Dob" placeholder="DD-MM-YYYY" onChange={handleInput} />
        </div>
    
        </div>

       
        <div class="row mt-3">
          <div class="col">
            <label for="address">Address-2</label>
            <input type="text" class="form-control" id='Address2' placeholder="address-2" onChange={handleInput} />
          </div>
          <div class="col">
            <label for="contactNo">Contact No.</label>
            <input type="text" class="form-control" id='ContactNo' placeholder="Contact No." onChange={handleInput} />
          </div>
        </div>

        <div className='text_color mt-2 w-100 text-center text_larger'>
          Other Details
        </div>
        <div class="row mt-3">
          <div class="col">
            <label for="height">Height</label>
            <input type="text" class="form-control" id='Height' placeholder="in CMs" onChange={handleInput} />
          </div>
          <div class="col">
            <label for="weight">Weight</label>
            <input type="text" class="form-control" id='Weight' placeholder="in KGs" onChange={handleInput} />
          </div>
          <div class="col">
            <label for="weight">Blood Group</label>
            <input type="text" class="form-control" id='BloodGroup' placeholder="Blood Group" onChange={handleInput} />
          </div>
        </div>

        <div className='w-100 row justify-content-center mt-2'>
          <button type="submit" className="btn btn-primary" onClick={submit_data}>Send OTP</button>

        </div>
      </form>


    </div>
  )
}

