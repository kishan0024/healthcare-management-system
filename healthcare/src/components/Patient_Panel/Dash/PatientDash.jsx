import React from 'react'
import { useState } from 'react'
import './style.css'
import { Main } from './Main'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Appointment } from '../Appointment/Appointment'
import { PrevAppointments } from '../Previous_Appointment/PrevAppointments'
import { PrevMedicines } from '../Show_Medicines/PrevMedicines'
import { UpcomingApp } from '../Upcoming_app/UpcomingApp';
import { PreviousData } from '../previous data/PreviousData'
export const PatientDash = () => {
    const { id } = useParams();
    const [name, setName] = useState(sessionStorage.getItem("Email"));
    const [pid, setId] = useState(sessionStorage.getItem("PatientUniqueId"));
    const navigate=useNavigate();
    console.log(id);
    let comp;
    if (id == undefined || id == "Dashboard") {
        comp = <Main />
    }
    else if (id == "Appointment") {
        comp = <Appointment />
    }
    else if (id == "PreviousApps") {
        comp = <PrevAppointments />
    }
    else if (id == "PreviousMeds") {
        comp = <PrevMedicines />
    }
    else if (id == "UpcomingApp") {
        comp = <UpcomingApp />
    }
    else if (id == "PrevData") {
        comp = <PreviousData />
    }


    const logout=()=>{
        sessionStorage.clear();
        navigate("/");
    }
    return (
        <>
            <div className='patient_main'>
                <div className='header'>
                    <div className='text_big'>{name}</div>
                    <div className='text_big'>
                        {pid}
                        <button type="button" class="btn btn-success w-auto m-1" style={{ backgroundColor: "black", color: "white" }} onClick={() => logout()}>Logout</button>

                    </div>

                </div>
                {/* <Main/> */}
                {comp}
            </div>

        </>
    )
}
