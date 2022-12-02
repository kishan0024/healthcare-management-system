import React from 'react'
import { useState, useEffect } from 'react'
import './appointment.css'
import Autocomplete from 'react-autocomplete'
import { Link,useNavigate } from 'react-router-dom'
export const UpcomingApp = () => {
  let navigate = useNavigate();

  const [prevReportList, setPrevRep] = useState();
  const PatientUniqueId=sessionStorage.getItem("PatientUniqueId");
// console.log(PatientUniqueId);
  useEffect(() => {
      const func=async()=>{
      let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"PatientUniqueId": PatientUniqueId})
        }
         
        let req=await fetch("http://localhost:5000/Appointment/ShowToPatientUp",options);
        let res=await req.json();
        console.log(res);
      }
      func();
  }, [])

  const viewBill=(URL)=>{
      window.open(URL,"_blank");
  }
  


  if (sessionStorage.getItem("PatientUniqueId") == null) {
      console.log("sdc");
      window.location.href = "/PatientLogin";
  }
  else {



      // console.log(sessionStorage.getItem("PatientUniqueId"));
      return (
          <div className='app_main text_big'>
              <div className='w-100 p-2'>
                  <Link to="/Patient/Dashboard">
                      <i className="fa fa-arrow-left" aria-hidden="true" style={{ color: "#388087", fontSize: "2.5rem" }}></i>
                  </Link>
              </div>
              <div className='wrapper_4  text-center' style={{fontSize:"1.2rem"}}>

                  {prevReportList && prevReportList.map((e)=>{

                  return(
                      <div className='app_div'>
                      <div className='app_div_1'>
                          <div>{e.Date}</div>
                          <div>{e.StartTime+"-"+e.EndTime}</div>
                          <div>{e.DoctorName}</div>
                      </div>
                  </div>
                  )
                  })}
                


              </div>
          </div>
      )
  }

}