import React from 'react'
import { Widget } from '../../other/Widget'
import { Charts } from '../../other/Charts'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import {Charts} from '../other/Charts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './D_panel.css'
export const D_panel = () => {
  const [data, setData] = useState({});
  const [news, setNews] = useState();



  const navigate = useNavigate();


  const h_name = sessionStorage.getItem("Hospital");
  const workId = sessionStorage.getItem("workId");
  const gmail = sessionStorage.getItem("useremail");
  const user_type = sessionStorage.getItem("usertype");


  useEffect(() => {
    let options = {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ DoctorWorkId: workId }),
    }
    console.log(h_name);

    const func1 = async () => {
      let req = await fetch("http://localhost:5000/Data/AllDataDoc", options);
      let res = await req.json();
      console.log(res);

      setData(res);



    }
    func1();


    const func2 = async () => {
      let options = {
        method: 'GET',
        headers: {
  
          'Content-Type': 'application/json;charset=utf-8'
        },
       
      }
      let req = await fetch("https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=fdbf28bad7a0407a9d86fc752a506ba1");
      let res = await req.json();
  

      const temp=[];

      for(let i=0;i<5;i++)
      {
        temp.push(res.articles[i]);
      }
      setNews(temp);
      console.log(news);

  

      
    }
    func2();

  }, [])


  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  }


  if (user_type != "Doctor") {
    navigate('/');
  }
  else {
    return (
      <div className='Dashboard_main_div'>
        <div className='w-100 topbar'>

          {gmail}
          <i className="fas fa-user p-2"></i>
          <div>
            <button type="button" class="btn btn-primary w-auto" style={{ backgroundColor: "black", color: "white" }} onClick={() => logout()}>Log Out</button>
          </div>
        </div>

        <div className='w-100 text-center' style={{
          fontSize: "2rem", color: "#388087"
        }}>
          {h_name.toUpperCase()} HOSPITALS
        </div>

        <div className='Doctor_Dashboard'>


          <div className='left_side'>


            <Widget name="Total Patients" count={data.doc_total_patient} />
            <Widget name="Total Appointments" count={data.total_app_today} />
            <Widget name="Pending Appointments" count={data.pending_app_today} />
            {/* <Widget name="PHARMACIST" count={data.pharmacist}/> */}
            <Calendar />
          </div>
          <div className='right_side'>
            <div style={{ fontSize: "1.5rem" }} className="text_color w-100">News Section</div>
            <div className='news_in'>

              {news ?
              <>
                {news.map((e)=>{
                  return(
                    <div style={{"fontSize":"1rem","marginTop":"0.5rem"}}>
                    {/* <> */}
                    <div className='text-left p-2 w-100 '>{e.title}</div>
                    <div className='text-left p-2 w-100 light_color '>{e.description}</div>
                    </div>
                  )
                })}
              </>
              :
              <></>
              }
            
            </div>

          </div>



        </div>

      </div>


    )
  }

}
