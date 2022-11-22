import React from 'react'
import { Sidebar_pharmacist } from '../sidebar/Sidebar_pharmacist'
import './pharmacist.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pharmacist_Dash } from '../Dashboard/Pharmacist_Dash'

export const PharmacistPanel = () => {

    const {id}=useParams();
    let comp;
    if(id=="Dashboard")
    {
        comp=<Pharmacist_Dash/>
    }

  return (
    <div className='Admin_wrapper'>
    <Sidebar_pharmacist/>
    {/* <div className='other_comp'> */}
    <div className='wrapper_right'>
    {comp}
    </div>    

    {/* </div> */}
    
    

    </div>
  )

    
}
