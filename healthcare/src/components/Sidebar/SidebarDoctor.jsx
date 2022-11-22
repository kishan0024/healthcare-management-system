import React from 'react'
import './SidebarDoctor.css';
import HealingIcon from '@mui/icons-material/Healing';

import FontAwesomeIcon from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom';
export const SidebarDoctor = () => {
  return (
    <div className='sidebar_div'>
        <div className='d-row w-100 text-center mt-1'>
          {/* <HealingIcon/>   */}
          <i className="fa fa-hospital-o" aria-hidden="true" style={{fontSize:"4rem"}}></i>        
        </div>
        <div className='navigation_menu'>
          
           
              
           

            <div>
            <Link to='/Doctor/Dashboard'>
            < i className="fas fa-th" style={{fontSize:"1.6rem"}}/>
            <div>
              Dashboard
            </div>
            </Link>
            </div>

            <div>
              <Link to='/Doctor/Appointment'>
            <i className="fas fa-user-md"></i>
            <div>View Appointments</div>
            </Link>
            </div>

              <div>
              <Link to='/Doctor/PreviousData'>
              <i className="fas fa-syringe"></i>
              <div>See Previous Data</div>

              </Link>
   
              </div> 

              <div>
              <Link to='/Doctor/DoctorLeave'>
            <i className="fas fa-user-md"></i>
            <div>Mark Leave</div>
            </Link>
            </div>


           
       
        
    

         

        </div>
    </div>
  )
}
