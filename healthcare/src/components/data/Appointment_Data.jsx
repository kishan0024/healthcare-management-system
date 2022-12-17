import React, { useState } from 'react'
import './Appointment.css'
import { useEffect } from 'react';
export const Appointment_Data = () => {
    const [data,setData]=useState([]);
    const h_name=sessionStorage.getItem("Hospital");
    useEffect(()=>{
        let options = {
            method: 'POST',
            headers: {
              
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"Hospital":h_name}),
          }
          // console.log(h_name);

        const func1=async()=>{
            let req=await fetch("http://localhost:5000/Appointment/ShowToAdmin",options);
            let res=await req.json();
                
            setData(res);
            console.log(res);  
            }
        func1();

        },[])


const change_status=async(PatientUniqueId)=>
{
  // data={
  //   "PatientUniqueid":
  // }
    let options = {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({PatientUniqueId}),
      }
    
    let req=await fetch("http://localhost:5000/Appointment/ChangeStatus",options);
    let res=await req.json();
    console.log(res);

    let options1 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"Hospital":h_name}),
    }
        

    const func1=async()=>{
        let req1=await fetch("http://localhost:5000/Appointment/ShowToAdmin",options1);
        let res1=await req1.json();
               
        setData(res1);
        }
    func1();
        



    
    // console.log("check");

}
    
      

  return (
    <div className='appointment_data_main' style={{color:"#388087"}}>
    {/* dsaf */}
    <div className='w-100 text-center mt-3'>
        <h2 style={{color:"#388087"}}>Appointments</h2>        
    </div>  

    <div className=' m-3 w-100 row justify-content-center' style={{color:"#388087"}}>
                <table>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Doctor Name</th>
            <th>Star Time</th>
            <th>End Time</th>
            <th>Status </th>
            <th>Mark As </th>
            {/* <th>Full Details</th> */}
        </tr>
            {data.map && data.map((element) => {
                return(
                <tr>
                <td>{element.PatientUniqueId}</td>
                <td>{element.PatientName}</td>
                <td>{element.DoctorName}</td>
                <td>{element.StartTime}</td>
                <td>{element.EndTime}</td>
                <td>{element.Status1}</td>
            
                <td>
                <i class="fa fa-check" aria-hidden="true" style={{color:"#388087",fontSize:"1.5rem",cursor:"pointer"}} onClick={()=>change_status(element.PatientUniqueId)}></i>  
                </td>
                </tr>    
              
                )
            })

            }
       
       
      
        </table>

    </div>

 
</div>
  )
}
