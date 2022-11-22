import React from 'react'
import './previosData.css'

import { useState } from 'react';   

export const PreviousData = () => {
  const [allergies,setAllergy]=useState();
  const [disease,setDisease]=useState();
  const [reports,setReport]=useState();

  const [popName,setPopName]=useState();
  const [desc,setDesc]=useState();

  const see_desc=(name,desc)=>{
    document.getElementById('pop_up_desc').style.display="flex";
    setPopName(name);
    setDesc(desc);
    // console.log(popDisease+""+desc);
  }

  const close_pop_up=()=>{
    document.getElementById('pop_up_desc').style.display="none";
  }

  const previous_data=async()=>{
    const patientUniqueId=document.getElementById("cardNo").value;
    let options = {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({patientUniqueId}),
    }
    let req=await fetch("http://localhost:5000/Allergy/FetchAllAllergy",options);
    let allergies1=await req.json();
    // console.log(allergies1);
   
    
    let req1=await fetch("http://localhost:5000/Disease/FetchAllDisease",options);
    let disease1=await req1.json();
    

     let req2=await fetch("http://localhost:5000/Reports/ShowReport",options);
     let reports1=await req2.json();
     
     if(allergies1.Status=="404NotFound" && disease1.Status=="404NotFound" && reports1.Status=="404NotFound")
     {
      alert("no data found");
     }
     else
     {
      setAllergy(allergies1);
      setDisease(disease1);
      setReport(reports1);

     }

  }

  const see_report=(url)=> 
  {
    window.open(url,"_blank");

  }





  return (

    
    <div className='prev_data_main'>


{/* pop up starts  */}
      <div className='pop_up_desc' id="pop_up_desc">
        <div className='pop_up_desc_inner'>
        <div className='w-100 m-1'>
               q  
              <i class="fa fa-window-close" aria-hidden="true" style={{color:"#388087",fontSize:"1.5rem",cursor:"pointer"}} onClick={close_pop_up}></i>
          
        </div>
          <div className='text_color w-100 text-center display-6'>{popName}</div>
          <div className='desc_main mt-1 p-3 '>
            {desc}
          </div>

        </div>
      </div>

      {/* pop up ends  */}


      <div class="mb-4 text-center mt-3">
        <label for="cardNo" className="form-label">Enter Card No.</label>
        <input type="text" className="form-control" id="cardNo" placeholder="Card No."/>
        <button type="button" className="btn btn-primary mt-2 w-50" onClick={previous_data}>Search</button>
      </div>
   
  {/* upper div starts  */}

       <div className='upper'>
        <div>
              <div className='text_color' style={{fontSize:"1.4rem"}}>Disease</div>
              <div className='w-100 row justiy-content-center m-3 list_data'>
              <table>
                  <tr>
                      <th>Disease Name</th>
                      <th>Diagnose Date</th>
                      <th>Description</th>
                  </tr>
                  {disease && disease.map((element)=>
                  {
                    return(
                      <tr>
                      <td>{element.DiseaseName}</td>
                      <td>{element.date}</td>
                      <td> <button type="button" className="btn btn-primary w-75" onClick={()=>see_desc(element.DiseaseName,element.description)}>Description</button></td>
                      </tr>
                  
                    )

                  })
                  }
                
              </table>
            </div>

        </div>
        <div>
              <div className='text_color' style={{fontSize:"1.4rem"}}>Allergies</div>
              <div className='w-100 row justiy-content-center m-3 list_data'>
              <table>
                  <tr>
                      <th>Allergy Name</th>
                      <th>Diagnose Date</th>
                      <th>Description</th>
                  </tr>
                  {allergies && allergies.map((element)=>
                  {
                    return(
                      <tr>
                      <td>{element.DrugName}</td>
                      <td>{element.date}</td>
                      <td> <button type="button" className="btn btn-primary w-75" onClick={()=>see_desc(element.DrugName,element.description)}>Description</button></td>
                      </tr>
                  
                    )

                  })
                  }
               
                 
                  
              </table>
            </div>

        </div>
       </div>

{/* upper div ends  */}

{/* lower div starts containing report  */}

       <div className='lower'>
       <div className='text_color' style={{fontSize:"1.4rem"}}>Previous Reports</div>
              <div className='w-100 row justify-content-center align-item-center mt-1 list_data'>

                {reports && reports.map((element)=>{
                  return(
                    <div className='report_div'>
                    <div>
                      {element.patientUniqueId}
    
                    </div>
                    <div>
                       {element.Date}
    
                    </div>
                    <div>
                       <button type="button" className="btn btn-primary w-100" onClick={()=>see_report(element.URL)}>See Report</button>
                    </div>
    
    
                  </div>

                  )

                })}
         
      
         

            </div>
        
       </div>
     
{/* lower div ends  */}
    </div>
  )
}
