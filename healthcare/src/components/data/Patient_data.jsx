import React from 'react'
import { useState } from 'react'
import './patient.css'
export const Patient_data = () => {
  const [data,setData]=useState({
    patientName:"",
    Email:"",
    Password:"",
    UniqueId:"",
    Dob:"",
    Height:"",
    Weight:"",
    BloodGroup:"",
    Address:"",
    Address2:"",
    ContactNo:""
  });


  const search_query= async ()=>{

    const number=document.getElementById("cardNo").value;

    if(number=="")
    {
      setData({
        patientName:"",
        Email:"",
        Password:"",
        UniqueId:"",
        Dob:"",
        Height:"",
        Weight:"",
        BloodGroup:"",
        Address:"",
        Address2:"",
        ContactNo:""

      });
      alert("enter card no....");
    }
    else{
       
      let request_url = "http://localhost:5000/Patient/FindPatient" ; 
      let request_option = {
        method: 'POST',
        headers: {     
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"UniqueId":number})
      }

      let request = await fetch(request_url, request_option) ; 
      let request_response = await request.json() ; 
      
      // console.log(request_response.UniqueId);
      if(request_response.Status)
      {
        setData({
          patientName:"",
          Email:"",
          Password:"",
          UniqueId:"",
          Dob:"",
          Height:"",
          Weight:"",
          BloodGroup:"",
          Address:"",
          Address2:"",
          ContactNo:""
  
        });
        alert(request_response.Status);
      }
      else{
        setData(request_response);
        console.log(data);
      }

   
      


      }
  }
  
  



  return (
    <div className='data_main' style={{color:"#388087"}}>
    {/* dsaf */}
    <div className='w-100 text-center mt-3'>
        <h2>Patient Details</h2>        
    </div>

    <div>

      <div class="mb-4 text-center mt-3">
        <label for="cardNo" className="form-label">Enter Card No.</label>
        <input type="text" className="form-control" id="cardNo" placeholder="Card No."/>
        <button type="button" className="btn btn-primary mt-2 w-50" onClick={search_query}>Search</button>
      </div>

    </div>

    <div className='w-100'>
      <hr style={{color:"#388087",width:"100%"}}/>
    </div>

    <div className='w-100 text-center mt-3 info_main'>
      
      <div className='left_div'>
      <i className="fas fa-user text_color display-3 m-3"></i>
      <div className='text_color p_name'>{data.patientName}</div>
      <div className='text_color '>{data.UniqueId}</div>
      </div>
      <div className='right_div form-row'>
        <div className='text_color_black w-100' style={{fontSize:"1.3rem",color:"black"}}>User Details:</div>
        <div className='w-100 row'>
          <div className=' form-group w-25 text_color m-2'>User Name:</div>
        
        <input className="form-control form-group w-50 p-2" type="text" placeholder="Readonly input here..." value={data.patientName} />
        </div>
        <div className='w-100 row'>
          <div className=' form-group w-25 text_color m-2'>Email:</div>
        
        <input className="form-control form-group w-50 p-2" type="text" placeholder="Readonly input here..." value={data.Email}/>
        </div>
        <div className='w-100 row'>
          <div className=' form-group w-25 text_color m-2'>Contact No :</div>
        
        <input className="form-control form-group w-50 p-2" type="text" placeholder="Readonly input here..." value={data.ContactNo}/>
        </div>
       
      </div>

      
    
    
    </div>

    <div className='info_sub row justify-content-center'>
      

    <div className=' w-50 form-row'>
        <div className='text_color_black w-100' style={{fontSize:"1.3rem"}}>Address Details:  </div>
        <div className='w-100 row m-2 address_input'>
          <div className=' form-group w-25 text_color m-2 '>Address</div>
        
        <input className="form-control form-group w-75 p-2 " id="address" type="text" placeholder="Readonly input here..." value={data.Address} />
        </div>
        <div className='w-100 row m-2 address_input'>
          <div className=' form-group w-25 text_color m-2'>Address-1</div>
        
        <input className="form-control form-group w-75 p-2" type="text" id="address1" placeholder="Address"  value={data.Address2}  />
        </div>
        
      </div>

      <div className=' w-50 form-row'>
        <div className='text_color_black w-100' style={{fontSize:"1.3rem"}}>Other Details:  </div>
        <div className='w-100 row m-2'>
          <div className=' form-group w-25 text_color m-2'>Blood Group</div>
        
        <input className="form-control form-group w-50 p-2" type="text" placeholder="Readonly input here..." value={data.BloodGroup}/>
        </div>
        <div className='w-100 row m-2'>
          <div className=' form-group w-25 text_color m-2'>Height</div>
        
        <input className="form-control form-group w-50 p-2" type="text" placeholder="Readonly input here..." value={data.Height} />
        </div>
        <div className='w-100 row m-2'>
          <div className=' form-group w-25 text_color m-2'>Weight</div>
        
        <input className="form-control form-group w-50 p-2" type="text" placeholder="Readonly input here..." value={data.Weight}/>
        </div>
        <div className='w-100 row m-2'>
          <div className=' form-group w-25 text_color m-2'>DOB</div>
        
        <input className="form-control form-group w-50 p-2" type="text" placeholder="Readonly input here..." value={data.Dob}/>
        </div>
        
      </div>
      </div>

  

 
</div>
   )
  }
