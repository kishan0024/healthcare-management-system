import React from 'react'
import { useState, useEffect } from 'react'
import './appointment.css'
import Autocomplete from 'react-autocomplete'
import { Link } from 'react-router-dom'
export const Appointment = () => {


  const [DoctorList, setDoctors] = useState([]);
  // const[Doctor]
  const [SelectedDoc, setSelectedDoc] = useState("");
  const HospitalName = "Stalwart";
  //for conditional css
  const [TimeDiv, setTimeDiv] = useState("0");
  //for setting time in database
  const [Timing, setTiming] = useState();
  //for setting Date in database
  const [Date1, setDate] = useState("");
  let count=1;
  //array for total available slots
  const [slotsList, setSlotsList] = useState();

  //doctor leave data
  const [DocLeave,setDocLeave]=useState();

  const keyPair = [
    { StartTime: "10:30", EndTime: "11:30" },
    { StartTime: "11:30", EndTime: "12:30" },
    { StartTime: "12:30", EndTime: "1:30" },
    { StartTime: "2:30", EndTime: "3:30" },
    { StartTime: "3:30", EndTime: "4:30" },
    { StartTime: "4:30", EndTime: "5:30" }
  ]

  useEffect(() => {
    const func = async () => {
      let options = {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ HospitalName: HospitalName })
      }
      let req = await fetch("http://localhost:5000/User/AllDoctors", options);
      let res = await req.json();
      // console.log(res);
      res.map((e) => {
        // console.log(e);
        let temp = { "label": e.Username + ":" + e.WorkId };
        // let temp1;
        // console.log(temp);
        if (!DoctorList) {
          let temp1 = [temp];
          setDoctors(temp1);

        }
        else {
          let temp1 = DoctorList;
          temp1.push(temp);
          setDoctors(temp1);
        }

      });


    }
    func();
    // console.log(DoctorList);


    


  }, [])


  const setTime = async (e) => {
    console.log(e.target.id);
    setTimeDiv(e.target.id);
    setTiming(keyPair[parseInt(e.target.id) - 1]);

  }

  const BookAppointment = async () => {

    var today = new Date(Date1);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    const PatientUniqueId = sessionStorage.getItem("PatientUniqueId");
    const Hospital = "Stalwart";
    const temp = SelectedDoc.split(":");
    const DoctorWorkId = temp[1];
    const StartTime = Timing.StartTime;
    const EndTime = Timing.EndTime;
    // const Date=today;
    // console.log(Date1);
    const create_new_appointment = {
      PatientUniqueId,
      Hospital,
      DoctorWorkId,
      StartTime,
      EndTime,
      Date: today
    }
    console.log(create_new_appointment);


    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(create_new_appointment)
    }

    let req = await fetch("http://localhost:5000/Appointment/BookAppointment", options);
    let res = await req.json();
    if (res.Status) {
      alert(res.Status);
    }



  }

  const setSelectedDocUtil = async (e) => {
    console.log("sfssfd");
    setSelectedDoc(e);
    const temp = SelectedDoc.split(":");
    const DoctorWorkId = temp[1];
    var today = new Date(Date1);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "Date": today,
        "DoctorWorkId": DoctorWorkId
      })
    }

    let req = await fetch("http://localhost:5000/Appointment/TimeSlots", options);
    let res = await req.json();
    setSlotsList(res.data)
    // console.log(slotsList)  ;


    let options1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({"DoctorWorkId": DoctorWorkId
      })
    }

    let req1 = await fetch("http://localhost:5000/Leave/FetchLeave", options1);
    let res1 = await req1.json();

    // console.log(res1);
    // const arr=res1.Date;
    // console.log(arr);
    // const newDate=parseInt(arr[0])+parseInt(res1.Duration);
    // setDocLeave({"StartDate":res1.Date,"EndDate":newDate+"/"+arr[1]+"/"+arr[2]});
    // console.log(DocLeave);

  }

  return (
    <div className='appointment_main text_big'>
      <div className='w-100 p-2'>
        <Link to="/Patient/Dashboard">
        <i className="fa fa-arrow-left" aria-hidden="true" style={{color:"#388087",fontSize:"2.5rem"}}></i>
        </Link>
       </div>
      <div className='wrapper  text-center'>
        <div className='text_big_1'>
          Pick A Date

        </div>
        <div class="input-group flex-nowrap mt-2 w-100">
          <span class="input-group-text" id="addon-wrapping">Date</span>
          <input type="date" class="form-control" aria-label="Username" id="app_date" aria-describedby="addon-wrapping" onChange={e => { setDate(e.target.value) }} />
        </div>
        {/* {Date1} */}
        <div className="mt-3 text-center w-100 text_small">

          <div style={{ fontSize: "1rem", width: "100%" }}>
            <Autocomplete


              items={DoctorList}

              shouldItemRender={(item, value
              ) => item.label.toLowerCase()
                .indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.label}
              renderItem={(item, isHighlighted) =>
                // Styling to highlight selected item
                <div style={{
                  background: isHighlighted ?
                    'lightgray' : 'white', color: "#388087"
                }}
                  key={item.id}>
                  {item.label}
                </div>
              }
              value={SelectedDoc}
              id="disease_name"

              onChange={e => setSelectedDocUtil(e.target.value)}

              onSelect={(val) => setSelectedDocUtil(val)}

              inputProps={{
                style: {
                  padding: "0.4rem",
                  width: "100%",
                  borderRadius: "0.5rem",
                  border: "2px solid #dfdfdf",
                  // borderColor:"gray"
                },
                placeholder: 'Select A Doctor'
              }}
            />
          </div>
        
        </div>
        <small id="emailHelp" class="form-text text-muted" style={{fontSize:"0.8rem"}}>Select Doctor And Date to see available slots</small>
        <div className='slots text_big'>
          {slotsList && slotsList.map(e=>{
              // console.log(e);

            if(e.Count<3)
            {
              return(
                <div id={count++} onClick={e => setTime(e)} style={{ backgroundColor: TimeDiv == count-1 ? "black" : "#388087" }}>{e.StartTime+"-"+e.EndTime}</div>
             
              )
              // {count++}
            }
            // count++;
          })
          }

        </div>
        <button type="button" className="btn btn-primary w-75 mt-2" onClick={BookAppointment}>Book Appointment</button>

      </div>

    </div>
  )
}
