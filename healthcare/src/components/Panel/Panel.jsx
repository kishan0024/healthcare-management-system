import React from 'react'
import { Widget } from '../other/Widget'
import {Charts} from '../other/Charts'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './panel.css'
export const Panel = () => {
  const [data,setData]=useState({});
  let navigate=useNavigate();

  useEffect( () => {

    const func1=async ()=>{
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        // body: JSON.stringify(data)
      }

      let req=await  fetch("http://localhost:5000/Data/Alldata",options);
     let response=await req.json();
    //  console.log(response);
    //  data=response;
    setData(response);
    
    }



    func1();
      
  },[]);

  const h_name=sessionStorage.getItem("Hospital");
  const username=sessionStorage.getItem("useremail");
  const user_type=sessionStorage.getItem("usertype");

  if(user_type!="Admin")
  {
    navigate('/');
  }
  return (
    <div className='Dashboard_main_div'>
        <div className='w-100 topbar'>
      
      {username}
      <i className="fas fa-user p-2"></i>
    </div>
    <div className='w-100 text-center' style={{fontSize:"2rem",color:"#388087"
  }}>
        {h_name.toUpperCase()} HOSPITALS
    </div>

    <div className='Dashboard_inner'>

      <Widget name="PATIENTS" count={data["patients"]}/>
      <Widget name="DOCTORS" count={data.doctors}/>
      <Widget name="PHARMACIST" count={data.pharmacist}/>
      
      <Widget name="Total Appointments" count={data.total_app_today}/>
      
   
      <Charts charttype="PieChart"/>
    

      <Charts charttype="Line"/>
      <Charts charttype="Line"/>

      {/* <Charts charttype="BarChart"/> */}
    </div>
    </div>
      
  
  )
}
