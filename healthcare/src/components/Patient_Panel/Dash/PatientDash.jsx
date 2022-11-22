import React from 'react'
import './style.css'
import {Main} from './Main'
import { useParams } from 'react-router-dom'
import { Appointment } from '../Appointment/Appointment'
import { PrevAppointments } from '../Previous_Appointment/PrevAppointments'
import { PrevMedicines } from '../Show_Medicines/PrevMedicines'
import {UpcomingApp} from '../Upcoming_app/UpcomingApp';
export const PatientDash = () => {
    const {id}=useParams();
    console.log(id);
    let comp;
    if(id==undefined || id=="Dashboard")
    {
comp=<Main/>
    }
    else if(id=="Appointment")
    {
        comp=<Appointment/>
    }
    else if(id=="PreviousApps")
    {
        comp=<PrevAppointments/>
    }
    else if(id=="PreviousMeds")
    {
        comp=<PrevMedicines/>
    }
    else if(id=="UpcomingApp")
    {
        comp=<UpcomingApp/>
    }
    return (
        <>
            <div className='patient_main'>
                <div className='header'>
                    <div className='text_big'>Name</div>
                    <div className='text_big'>Logo</div>
                </div>
                {/* <Main/> */}
                {comp}
            </div>

        </>
    )
}
