import React from 'react'
import './uploadReport.css'
import { useState } from 'react'
import {storage} from './firebase'
import {ref, uploadBytes,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';


export const UploadReport = () => {

  const [pdfUpload,setPDF]=useState();
  const [URL,setURL]=useState();

  
  let data;

const upload_report=async()=>{

  console.log(pdfUpload);
  const pdfRef=ref(storage,`${pdfUpload.name+v4()}`);
  const uploadTask = uploadBytesResumable(pdfRef,pdfUpload);

  const PatientUniqueId=document.getElementById("PatientUniqueId").value;

  
   uploadTask.on('state_changed', 
  async (snapshot) => {
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  async() => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const DoctorWorkId=sessionStorage.getItem("workId");
      // setURL(downloadURL);
      data={
        "PatientUniqueId":PatientUniqueId,
        "DoctorWorkId":DoctorWorkId,
        "URL":downloadURL
      }
      
      console.log(data);
      const func1=async ()=>{
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        
        }  
        let req=await fetch("http://localhost:5000/Reports/NewReport",options);
        let res=await req.json();
        
        alert(res.Status);
      
      }
      
      func1();
      
    });
  }
);












}



  return (
    <div className='report_wrapper'>

        <div className='inner_wrapper'>
            <div class="form-group">
                <label for="PatientUniqueId">Enter Patient ID</label>
                <input type="text" class="form-control" id="PatientUniqueId" aria-describedby="emailHelp" placeholder="ID"/>
                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div class="form-group row ">
                <input type="file" class="form-control-file" id="report" name="report" onChange={(e)=>{setPDF(e.target.files[0])}}/>
            </div>

            <button type="submit" class="btn btn-primary" onClick={upload_report}>Upload</button>


        </div>



    </div>
  )
}
