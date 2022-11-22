import React from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Panel } from '../Panel/Panel';
import {widget} from '../other/Widget';
import { AddDoctor } from '../forms/AddDoctor';
import { AddPharmacist } from '../forms/AddPharmacist';
import { Doctor } from '../data/Doctor';
import './admin.css'
import { Pharmacist_data } from '../data/Pharmacist_data';
import { Patient_data } from '../data/Patient_data';
import { AddPatient } from '../forms/AddPatient';
import {Appointment_Data} from '../data/Appointment_Data';
export const Admin = () => {
    let comp;
    const {id}=useParams();
    if(id=="Dashboard")
    {
      comp=<Panel/>;
    }
    else if(id=="AddDoctor")
    {
      comp=<AddDoctor/>
    }
    else if(id=="AddPharmacist")
    {
      comp=<AddPharmacist/>
    }
    else if(id=="Doctors")
    {
      comp=<Doctor/>
    }
    else if(id=="Pharmacist")
    {
      comp=<Pharmacist_data/>
    }
    else if(id=="Patient")
    {
      comp=<Patient_data/>
    }
    else if(id=="AddPatient")
    {
      comp=<AddPatient/>
    }
    else if(id=="Appointment")
    {
      comp=<Appointment_Data/>
    }


    // else if(id=="")

 


  return (
    <div className='Admin_wrapper'>
    <Sidebar/>
    {/* <div className='other_comp'> */}
    {comp}
    {/* </div> */}
    
    

    </div>
  )
}
