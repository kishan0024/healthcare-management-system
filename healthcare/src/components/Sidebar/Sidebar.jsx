import React from 'react'
import './side.css';
import HealingIcon from '@mui/icons-material/Healing';

import FontAwesomeIcon from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom';
export const Sidebar = () => {
  return (
    <div className='sidebar_div'>
        <div className='d-row w-100 text-center mt-1'>
          {/* <HealingIcon/>   */}
          <i className="fa fa-hospital-o" aria-hidden="true" style={{fontSize:"4rem"}}></i>        
        </div>
        <div className='navigation_menu'>
          
           
              
           

            <div>
            <Link to='/Admin/Dashboard'>
            < i className="fas fa-th" style={{fontSize:"1.6rem"}}/>
            <div>
              Dashboard
            </div>
            </Link>
            </div>

            <div>
              <Link to='/Admin/AddDoctor'>
            <i className="fas fa-user-md"></i>
            <div>Add Doctor</div>
            </Link>
            </div>

              <div>
              <Link to='/Admin/AddPharmacist'>
              <i className="fas fa-syringe"></i>
              <div>Add Pharmacist</div>

              </Link>
   
            </div> 


            <div>
              <Link to='/Admin/AddPatient'>
              <i className="fas fa-hospital-user"></i>
              <div>Add Patient</div>

              </Link>
            
            </div>

            <div>
              <Link to='/Admin/Doctors'>
              <i className="fas fa-users"></i>
            <div>Doctors</div>

              </Link>
          
            </div>

            <div>
              <Link to='/Admin/Patient'>
              <i className="fas fa-users"></i>
            <div>Patients</div>

              </Link>
           
            </div>
        
            <div>
              <Link to='/Admin/Pharmacist'>
              <i className="fas fa-users"></i>
              <div>Pharmacist</div>

              </Link>
          
            </div>
            <div>
              <Link to='/Admin/Appointment'>
              <i class="fa fa-address-book" aria-hidden="true"></i>
              <div>Appointments</div>

              </Link>
          
            </div>


         

        </div>
    </div>
  )
}
