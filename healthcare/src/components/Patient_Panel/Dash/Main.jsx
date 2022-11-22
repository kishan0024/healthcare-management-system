import React from 'react'
import { Link } from 'react-router-dom'
export const Main = () => {
    return (
        <div className='content_main'>


            <div className='container'>
                <Link to="/Patient/Appointment">
                    <div className='container'>
                        <div className='text_color'>Book Appointment</div>
                        <div className='text_color'>
                            <i className="fa fa-calendar-check-o text_big_2" aria-hidden="true"></i>
                        </div>

                    </div>
                </Link>


            </div>
            <div className='container'>
                <Link to="/Patient/PreviousApps">
                    <div className='container'>
                        <div className='text_color text-center'>See Previous Appointments</div>
                        <div className='text_color'>
                            <i className="fa fa-clock-o text_big_2" aria-hidden="true"></i>
                        </div>
                    </div>
                </Link>

            </div>
            <div className='container'>
                <Link to="/Patient/PreviousApps">
                    <div className='container'>
                        <div className='text_color text-center'>See Prescribed Medicines</div>
                        <div className='text_color'>
                            <i className="fa fa-plus-circle text_big_2" aria-hidden="true"></i>
                        </div>
                    </div>
                </Link>
            </div>
            
            <div className='container'>
            <Link to="/Patient/UpcomingApp">
                    <div className='container'>
                        <div className='text_color text-center'>See Upcoming Appointments</div>
                        <div className='text_color'>
                    <i class="fa fa-id-card-o text_big_2" aria-hidden="true"></i>
                    </div>
                    </div>
                </Link>
            </div>

        </div>
    )
}


// Patient/Dashboard