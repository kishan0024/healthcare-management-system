import React from 'react'
import './prevReport.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const PrevAppointments = () => {
    let navigate = useNavigate();

    const [prevReportList, setPrevRep] = useState([]);
    const PatientUniqueId=sessionStorage.getItem("PatientUniqueId");
    console.log(PatientUniqueId);

    useEffect(() => {
        const func=async()=>{
        let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({PatientUniqueId})
          }
           
          let req=await fetch("http://localhost:5000/Appointment/ShowToPatient",options);
          let res=await req.json();
          console.log(res)

          if(res.Status)
          {
            setPrevRep("nodata");
          }
          else
          {
            setPrevRep(res);
            console.log(res);
          }
        
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

        return (
            <div className='app_main text_big'>
                <div className='w-100 p-2'>
                    <Link to="/Patient/Dashboard">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{ color: "#388087", fontSize: "2.5rem" }}></i>
                    </Link>
                </div>
                <div className='wrapper_4  text-center' style={{fontSize:"1.2rem"}}>
            <div className='app_div'>
                     <div className='app_div_1 m-2' style={{"backgroundColor":"rgb(225, 225, 225)"}}>
                        <div>Date</div>
                        <div>Time</div>
                        <div>Doctor Id</div>

                    </div>

                    { prevReportList!="nodata" ? prevReportList.map((e)=>{

                    return(
                      <>
                        <div className='app_div_1'>
                            <div>{e.Date}</div>
                            <div>{e.StartTime+"-"+e.EndTime}</div>
                            <div>{e.DoctorName}</div>
                        </div>
                        <div className='app_div_2'>
                            <button type="submit" className="btn btn-primary w-auto" onClick={()=>viewBill(e.URL)}>View Bill</button>
                        </div>
                    </>
                    )
                    })
                    :
                    <>
                    <div className='text_big app_div_1'>
                        No previous appointments
                        </div>
                    </>
                    
                }
                  
            </div>

                </div>
            </div>
        )
    }

}