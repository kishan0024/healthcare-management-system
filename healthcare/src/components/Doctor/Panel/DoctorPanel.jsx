import React from 'react'
// import { Widget } from '../other/Widget'
// import {Charts} from '../other/Charts'
import { useEffect,useState } from 'react'
import { SidebarDoctor } from '../../Sidebar/SidebarDoctor';
import { D_panel } from './D_panel';
import { useParams } from 'react-router-dom';
import { DoctorAppointment } from '../Appointment/DoctorAppointment';
import { PreviousData } from '../Previous data/PreviousData';
// import './panel.css'
import './DoctorPanel.css';
import { Prescibe } from '../Prescribe/Prescibe';
import { UploadReport } from '../Upload Rep/UploadReport';
import { DoctorLeave } from '../leave_form/DoctorLeave';

export const DoctorPanel = () => {
    let comp;
    const {id}=useParams();
    if(id=="Dashboard")
    {
        console.log("Asda");
      comp=<D_panel/>;
    }
    else if(id=="Appointment")
    {
      comp=<DoctorAppointment/>
    }
    else if(id=="PreviousData")
    {
      comp=<PreviousData/>
    }
    else if(id=="PrescribePatient")
    {
      comp=<Prescibe/>
    }
    else if(id=="AddReport")
    {
      comp=<UploadReport/>
    }
    else if(id=="DoctorLeave")
    {
      comp=<DoctorLeave/>
    }


 


  return (
    <div className='Admin_wrapper'>
    <SidebarDoctor/>
    {/* <div className='other_comp'> */}
    <div className='wrapper_right'>
    {comp}
    </div>    

    {/* </div> */}
    
    

    </div>
  )
}
