import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const PatientLogin = () => {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
let navigate=useNavigate();


const submit_login=async()=>{
  if(email==="")
  {
    alert("Please Enter Email....");

  }
  else if(password==="")
  {
    alert("Please Enter Password..");
  }
  else
  {
    const data={
      "Email":email,
      "Password":password

    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
     
    let req=await fetch("http://localhost:5000/Patient/PatientSignIn",options);
    let res=await req.json();
    if(res.Status)
    {
      alert(res.Status);
    }
    else
    {
      sessionStorage.setItem("Email",res.Email);
      sessionStorage.setItem("PatientUniqueId",res.UniqueId);
      navigate("/Patient");
    }
  

  }
}

  return (

    <div>
      <section className="vh-100" style={{ backgroundColor: "#BADFE7", color: "black" }}>
        <div className="py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5 text-center">

                  <h3 className="mb-5">Sign in</h3>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} value={email} />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} value={password} />
                  </div>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit" className="btn btn-primary w-75" onClick={submit_login}>Submit</button>

                  <hr className="my-4" />


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  )
}
