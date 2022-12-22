import React from 'react'
import './side.css';
import HealingIcon from '@mui/icons-material/Healing';
import { useNavigate } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/fontawesome-svg-core'
import { Link, Navigate } from 'react-router-dom';
export const Sidebar_pharmacist = () => {
  const navigate = useNavigate();
  const logout=()=>{
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div className='sidebar_div'>
      <div className='d-row w-100 text-center mt-1'>
        {/* <HealingIcon/>   */}
        <i className="fa fa-hospital-o" aria-hidden="true" style={{ fontSize: "4rem" }}></i>
      </div>
      <div className='navigation_menu'>





        <div>
          <Link to='/Pharmacist/Dashboard'>
            < i className="fas fa-th" style={{ fontSize: "1.6rem" }} />
            <div>
              Dashboard
            </div>
          </Link>
        </div>

        <div>
          <Link to='/Pharmacist/AddMedicine'>
            <i className="fas fa-user-md"></i>
            <div>Add Medicine</div>
          </Link>
        </div>

        <div>
          <Link to='/Pharmacist/DelMedicine'>
            <i className="fas fa-syringe"></i>
            <div>Remove Medicine</div>

          </Link>

        </div>

        <div>
          <Link to='/Pharmacist/ChangePrice'>
            <i className="fas fa-syringe"></i>
            <div>Change Price</div>

          </Link>

        </div>

        <div>
          <Link to='/Pharmacist/AddStock'>
          <i class="fa fa-plus-square" aria-hidden="true"></i>
            <div>Add Stock</div>

          </Link>

        </div>

        <div style={{"fontSize":"1.3rem"}}>

            <div className='w-100' style={{"backgroundColor":"white","color":"#388087","borderRadius":"0.3rem","cursor":"pointer"}} onClick={()=>logout()}>Log Out</div>


        </div>





      </div>
    </div>
  )
}
