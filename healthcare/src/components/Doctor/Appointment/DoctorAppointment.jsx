import React, { useState } from 'react'
import './doctorAppointment.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const DoctorAppointment = () => {
    let navigate=useNavigate();
    const [data,setData]=useState();
    const h_name=sessionStorage.getItem("Hospital");
    const DoctorWorkId=sessionStorage.getItem("workId");
    useEffect(()=>{
        let options = {
            method: 'POST',
            headers: {
              
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({DoctorWorkId}),
          }
          console.log(h_name);

        const func1=async()=>{
            let req=await fetch("http://localhost:5000/Appointment/ShowToDoctor",options);
            let res=await req.json();
            console.log(res); 
                
            if(res.Status!="noData")
            {
              setData(res);
            }
           
             
            }
        func1();

        },[])


const change_status=async(PatientUniqueId)=>
{
    let options = {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({PatientUniqueId}),
      }
    
    let req=await fetch("http://localhost:5000/Appointment/ChangeStatus",options);
    let res=await req.json();

    let options1 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"Hospital":h_name}),
    }
        

    const func1=async()=>{
        let req1=await fetch("http://localhost:5000/Appointment/ShowToDoctor",options1);
        let res1=await req1.json();
               
        setData(res1);
        }
    func1();
        



    
    // console.log("check");

}

const prescribe_panel=async(num)=>{
//  navigate

//appointment to marked as done in backend

navigate("/Doctor/PrescribePatient/"+num);

// session to be set for patient id
}
    
      

  return (
    <div className='appointment_data_main' style={{color:"#388087"}}>
    {/* dsaf */}
    <div className='w-100 text-center mt-3'>
        <h2 style={{color:"#388087"}}>Appointments</h2>        
    </div>  

    <div className=' m-3 w-100 row justify-content-between' style={{color:"#388087"}}>
                <table>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Doctor Name</th>
            <th>Star Time</th>
            <th>End Time</th>
            <th>Status </th>
            <th>Take Appointment</th>
            {/* <th>Full Details</th> */}
        </tr>
 
            {data && data.map((element) => {
                return(<>
                <tr>
                <td>{element.PatientUniqueId}</td>
                <td>{element.PatientName}</td>
                <td>{element.DoctorName}</td>
                <td>{element.StartTime}</td>
                <td>{element.EndTime}</td>
                <td>{element.Status1}</td>
            
                <td><button type="button" className="btn btn-primary w-50" onClick={()=>{prescribe_panel(element.PatientUniqueId)}}>Prescribe</button></td>
                </tr>    
                </>)
            }) 
            
          }

            
       
       
      
        </table>

    </div>

 
</div>
  )
}
