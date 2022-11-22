import React from 'react'
import './widget.css'


export const Widget = (props) => {
 let icon;
  if(props.name==="PATIENTS")
  {
    icon=<i className="fas fa-hospital-user large_icon" ></i>;
  }
  else if(props.name=="DOCTORS")
  {
    icon=<i class="fas fa-user-md"></i>

  }
  else if(props.name=="PHARMACIST")
  {
    icon=<i class="fas fa-tablets"></i>;
  }
  else if(props.name=="Total Appointments"  )
  {
    icon=<i class="fas fa-notes-medical"></i>
  }
  return (
    <div className='widget_main'>
      <div className='larger'>
        {icon}
      </div>
        <div>
          {props.name}
        </div>
        <div>
          {props.count}
        </div>
    </div>
  )
}
