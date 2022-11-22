import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './prevMedicines.css'
export const PrevMedicines = () => {
    const [prevMedList,setPrevMed]=useState();
    const PatientUniqueId=sessionStorage.getItem("PatientUniqueId");

    useEffect(() => {
        const func=async()=>{
            let options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({PatientUniqueId})
              }
               
              let req=await fetch("http://localhost:5000/Doctor_pres/SeePrescribeMedicinesPatient",options);
              let res=await req.json();
              console.log(res);
              setPrevMed(res);
            }
            func();
    }, [])
    
  return (
    
     <div className='med_main text_big'>
                <div className='w-100 p-2'>
                    <Link to="/Patient/Dashboard">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{ color: "#388087", fontSize: "2.5rem" }}></i>
                    </Link>
                </div>
                <div className='w-100 text-center text_big'>Prescribed Medicines</div>
                <div className='wrapper_4  text-center' style={{fontSize:"1.2rem"}}>

                    {prevMedList && prevMedList.map((e)=>{
                        console.log("asda");
                    return(
                        <div className='med_div'>
                        <div className='med_div_1'>
                            <div>{e.Date}</div>
                            <div>Doctor Id:{e.DoctorWorkId}</div>
                        </div>
                        <div className='med_div_2 '>
                            <button type="submit" className="btn btn-primary w-auto" style={{"color":"white",fontSize:"1.2rem"}}>View</button>
                        </div>
                    </div>
                    )
                    })}
                  


                </div>

                {/* <div className=''></div> */}
            </div>
  )
}
