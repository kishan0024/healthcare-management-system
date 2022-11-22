import React from 'react'
import { Widget } from '../../other/Widget'
import { Charts } from '../../other/Charts'
import Calendar from 'react-calendar';  
import 'react-calendar/dist/Calendar.css';
// import {Charts} from '../other/Charts'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './D_panel.css'
export const D_panel = () => {
  const [data,setData]=useState({});

  const navigate=useNavigate();


const h_name=sessionStorage.getItem("Hospital");
const workId=sessionStorage.getItem("workId");
const gmail=sessionStorage.getItem("useremail");
const user_type=sessionStorage.getItem("usertype");


useEffect(()=>{
  let options = {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({DoctorWorkId:workId}),
    }
    console.log(h_name);

  const func1=async()=>{
      let req=await fetch("http://localhost:5000/Data/AllDataDoc",options);
      let res=await req.json();
      console.log(res); 
          
        setData(res);
      
     
       
      }
  func1();

  },[])


if(user_type!="Doctor")
{
  navigate('/');
}
  return (
    <div className='Dashboard_main_div'>
        <div className='w-100 topbar'>
      
      {gmail}
      <i className="fas fa-user p-2"></i>
    </div>
    <div className='w-100 text-center' style={{fontSize:"2rem",color:"#388087"
  }}>
 {h_name.toUpperCase()} HOSPITALS
    </div>
    <div className='Doctor_Dashboard'>
    

  <div className='left_side'>

  
    <Widget name="Total Patients" count={data.doc_total_patient}/>
      <Widget name="Total Appointments" count={data.total_app_today }/>
      <Widget name="Pending Appointments" count={data.pending_app_today}/>
      {/* <Widget name="PHARMACIST" count={data.pharmacist}/> */}
      <Calendar/>
  </div>
  <div  className='right_side'>
    <div style={{fontSize:"1.5rem"}} className="text_color w-100">News Section</div>
  <div className='news_in'>
      <div className='text-center w-100 '>headline</div>
      <div className='text-center w-100 light_color'>brief</div>
    </div>

  </div>

   
    
  </div>

</div>
      
  
  )
}