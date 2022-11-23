import React,{useState} from 'react'
import './doctorLeave.css'

export const DoctorLeave = () => {
    // localhost:5000/Leave/MarkLeave
    const DoctorWorkId=sessionStorage.getItem("workId");
    const [Reason,setReason]=useState("");
    // const [Duration,setDuration]=useState("");
const submit_leave=async ()=>
{
    let today=new Date(document.getElementById("Date").value);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    let EndDate=new Date(document.getElementById("EndDate1").value);
    dd = String(EndDate.getDate()).padStart(2, '0');
    mm = String(EndDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = EndDate.getFullYear();
    EndDate = dd + '/' + mm + '/' + yyyy;
    console.log(EndDate);

    const data={
        "DoctorWorkId":DoctorWorkId,
        "Reason":Reason,
        "Date":today,
        "EndDate":EndDate
    }
    console.log(data);
    
    let options = {
        method: 'POST',
        headers: {
  
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }
      let req = await fetch("http://localhost:5000/Leave/MarkLeave", options);
      let res = await req.json();
  
      alert(res.Status);
}
  return (
    <div className='doctor_leave_main'>
      
        <div className="leave_wrapper">
            <div className='display-6 text_color m-2'>Mark A Leave</div>
            <div className="form-group row w-75">
                <label for="staticEmail" className="col-sm-4 col-form-label">Your Id</label>
                <div className="col-sm-8">
                <input type="text" readonly className="form-control-plaintext" id="workId" value={sessionStorage.getItem("workId")}/>
                </div>
            </div>
            <div className="form-group row w-75">
                <label for="inputPassword" className="col-sm-2 col-form-label">Date</label>
                <div className="col-sm-10">
                <input type="date" className="form-control" id="Date" required/>
                </div>
            </div>
            <div className="form-group row w-75">
                <label for="inputPassword" className="col-sm-2 col-form-label">End Date</label>
                <div className="col-sm-10">
                <input type="date" className="form-control" id="EndDate1" required/>
                </div>
            </div>
            <div className="form-group row w-75 mt-2">
                <label for="inputPassword" className="col-sm-2 col-form-label" >Reason</label>
                <div className="col-sm-10">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" required onChange={e=>setReason(e.target.value)}></textarea>
                </div>
            </div>

            <button type="button" className="btn btn-primary mt-2" onClick={submit_leave}>Submit</button>
        </div>
    </div>
  )
}
