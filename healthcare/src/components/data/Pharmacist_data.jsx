import React, { useState } from 'react'
import './pharmacist_data.css'
import { useEffect } from 'react';
export const Pharmacist_data = () => {
    const [data,setData]=useState([]);
    const [FullData,setFullData]=useState([]);
    const h_name=sessionStorage.getItem("Hospital");

const open_pop_up=(elementFull)=>{
    document.getElementById("fullDetails").style.display="flex";
    console.log(elementFull);
    setFullData(elementFull);
 

}
const close_pop_up=()=>{
    document.getElementById("fullDetails").style.display="none";
  
}


    useEffect(()=>{
        let options = {
            method: 'POST',
            headers: {
              
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"HospitalName":h_name}),
          }

        const func1=async()=>{
            let req=await fetch("http://localhost:5000/User/AllPharmacist",options);
            let res=await req.json();
                
            setData(res);
            console.log(res);  
            }
        func1();

        },[])
    
        const Deletedata = async (id) => {
            
            let request_url = "http://localhost:5000/User/DeletePharmacist" ; 
            let request_opton = {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }, 
                body: JSON.stringify({
                    "WorkId": id
                }) 
            }

            let request = await fetch(request_url, request_opton) ;
            let request_response = await request.json() ; 


            let options = {
                method: 'POST',
                headers: {
                  
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({"HospitalName":h_name}),
              }
    
            const func1=async()=>{
                let req=await fetch("http://localhost:5000/User/AllPharmacist",options);
                let res=await req.json();
                    
                setData(res);
                console.log(res);  
                }
            func1();
        }

  return (
    <div className='pharmacist_data_main' style={{color:"#388087"}}>



{/* pop up for full details window */}

<div className="pop_up_all_details" id="fullDetails">

    <div className="pop_up_wrap">
    <div className='w-100 text-center m-2'>
              
    <i class="fa fa-window-close" aria-hidden="true" style={{color:"#388087",fontSize:"1.5rem",cursor:"pointer"}} onClick={close_pop_up}></i>

        </div>
        <div className='w-100 display-6 text-center m-2'>
            {FullData.Username}
        </div>
    <div class="col-auto m-2">
        {/* <label class="visually-hidden" for="autoSizingInputGroup">Username</label> */}
        <div class="input-group">
        <div class="input-group-text">Work ID</div>
        <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="WorkId" value={FullData.WorkId}/>
        </div>
    </div>
    <div class="col-auto m-2" >
        {/* <label class="visually-hidden" for="autoSizingInputGroup">Username</label> */}
        <div class="input-group">
        <div class="input-group-text">Email</div>
        <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="Email" value={FullData.Email}/>
        </div>
    </div>
    <div class="col-auto m-2">
        {/* <label class="visually-hidden" for="autoSizingInputGroup">Username</label> */}
        <div class="input-group">
        <div class="input-group-text">Hospital Name </div>
        <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="" value={FullData.HospitalName}/>
        </div>
    </div>
    <div class="col-auto m-2">
        {/* <label class="visually-hidden" for="autoSizingInputGroup">Username</label> */}
        <div class="input-group">
        <div class="input-group-text">Address </div>
        <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="" value={FullData.Address}/>
        </div>
    </div>
    <div class="col-auto m-2">
        {/* <label class="visually-hidden" for="autoSizingInputGroup">Username</label> */}
        <div class="input-group">
        <div class="input-group-text">Address2 </div>
        <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="" value={FullData.Address2}/>
        </div>
    </div>
    <div class="col-auto m-2">
        {/* <label class="visually-hidden" for="autoSizingInputGroup">Username</label> */}
        <div class="input-group">
        <div class="input-group-text">ContactNo </div>
        <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="" value={FullData.ContactNo}/>
        </div>
    </div>

    </div>

</div>




{/* ends  */}



    {/* dsaf */}
    <div className='w-100 text-center mt-3'>
        <h2 style={{color:"#388087"}}>Pharmacists</h2>        
    </div>  

    <div className=' m-3 w-100 row justify-content-center' style={{color:"#388087"}}>
                <table>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete </th>

            <th>Full Details</th>
        </tr>
        {data.map((element) => {
            return(<>
            <tr>
               <td>{element.WorkId}</td>
               <td>{element.Username}</td>
               <td>{element.Email}</td>
               <td >
                
               <i class="fa fa-window-close" aria-hidden="true" style={{color:"#388087",fontSize:"1.5rem",cursor:"pointer"}}
                    onClick={()=>Deletedata(element.WorkId)}></i>
               </td>
               
               <td>
                <div onClick={()=>open_pop_up(element)} style={{color:"black",cursor:"pointer"}}>
                    See here
                </div>
               </td>
               </tr>    
            </>)
        })

        }
       
       
      
        </table>

    </div>

 
</div>
  )
}
