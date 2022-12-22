import React, { useState, useEffect } from 'react'
import './prescribe.css'
import { useNavigate, useParams } from 'react-router-dom';
import { tableBodyClasses } from '@mui/material';
import Autocomplete from 'react-autocomplete'
import data from './medicinenet-diseases.json'
export const Prescibe = () => {

  let { id2 } = useParams();
  let navigate = useNavigate();

  //drug name for adding drug allergy with desc.

  const [drug_name, setName] = useState();

  //disease name for adding disease with desc.
  const [disease_name, setDiseaseName] = useState("");
  //for listing all the drug
  const [drug_list, setDrugList] = useState([]);
  let inc = 0;
  console.log(id2);
  //for total drugs prescribd
  const [drug_data, setDrugData] = useState();



  //for drug prescription

  const [pre_drug_name, setPreDrug] = useState("");
  const [dosage, setDosage] = useState("");
  const [dosage_duration, setDosageDuration] = useState("");
  const [total_duration, setTotalDuration] = useState("");
  const [before_after, setBeforeAfter] = useState("Before Meal");
  const [Notes, setNotes] = useState("");
  // const [quantity, setQuantity] = useState("");


  //for height and weight

  const [Height,setHeight]=useState();
  const [Weight,setWeight]=useState();
  const [BloodPressure,setBlood]=useState();


  useEffect(() => {

    const func1 = async () => {
      let options = {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json;charset=utf-8'
        }
      }
      let req = await fetch("http://localhost:5000/Medicine/AllMedicine", options);
      let res = await req.json();

      res.map((e) => {
        // console.log(e);
        let temp = { "label": e.medicineName };
        // let temp1;
        console.log(temp);
        if (!drug_list) {
          let temp1 = [temp];
          setDrugList(temp1);

        }
        else {
          let temp1 = drug_list;
          temp1.push(temp);
          setDrugList(temp1);
        }

      })
    }

    func1();



  }, [])



  const prescribe_div_open = () => {
    document.getElementById("medicine_pre_main").style.display = "flex";
  }


  const prescribe_div_close = () => {
    document.getElementById("medicine_pre_main").style.display = "none";
  }

  const gather_data = () => {

  }
  //for adding diseases

  const addDisease = async () => {
    const DiseaseName = disease_name;
    const description = document.getElementById('description').value;
    const patientUniqueId = id2;
    const data = {
      "patientUniqueId": patientUniqueId,
      "DiseaseName": DiseaseName,
      "description": description
    }

    let options = {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    let req = await fetch("http://localhost:5000/Disease/AddDisease", options);
    let res = await req.json();

    alert(res.Status);

  }

  //for allergies
  const addAllergy = async () => {
    const DrugName = drug_name;
    const description = document.getElementById('all_description').value;
    const patientUniqueId = id2;
    const data = {
      "patientUniqueId": patientUniqueId,
      "DrugName": DrugName,
      "description": description
    }

    let options = {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    let req = await fetch("http://localhost:5000/Allergy/AddAllergy", options);
    let res = await req.json();

    alert(res.Status);

  }




  const submit_medicine = () => {
    console.log("submit");
    let quantity = parseInt(total_duration) / parseInt(dosage_duration);
    setBeforeAfter(document.getElementById("bef_aft").value);
    quantity = Math.floor(quantity * parseInt(dosage));
    const one_drug = {
      "drug_name": pre_drug_name,
      "dosage": dosage,
      "dosage_duration": "Per " + dosage_duration + " Days",
      "total_duration": total_duration + " Days",
      "Notes": Notes,
      "before_after": before_after,
      "quantity": quantity
    };
    console.log(one_drug);

    if (!drug_data) {
      let temp = [one_drug];
      setDrugData(temp);

    }
    else {
      let temp = drug_data;
      temp.push(one_drug);
      setDrugData(temp);
    }




  }

  const del_drug_item = (e) => {
    const pos = e.target.id;
    let temp = [];
    // console.log(pos);
    for (let i = 0; i < drug_data.length; i++) {
      if (i == pos) {

      }
      else {
        temp.push(drug_data[i]);
      }
    }

    setDrugData(temp);
    // console.log(drug_data);

  }


  const submit_final_data = async () => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;



    const data = {
      "PatientUniqueId": id2,
      "DoctorWorkId": sessionStorage.getItem("workId"),
      "Date": today,
      "Medicines": drug_data
    }

    let options = {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    let req = await fetch("http://localhost:5000/Doctor_pres/PrescribeMedicines", options);
    let res = await req.json();

    setDrugData();

    alert(res.Status);


  }

  const end_appointment = async () => {
    let options = {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ PatientUniqueId: id2 })
    }
    let req = await fetch("http://localhost:5000/Appointment/ChangeStatus_doctor", options);
    let res = await req.json();

    navigate('/Doctor/Dashboard');

  }

  const hwAdd=async()=>{
    const data={
      "patientUniqueId":id2,
      "Height":Height,
      "Weight":Weight,
      "BloodPressure":BloodPressure
    }
    let options = {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    let req = await fetch("http://localhost:5000/Other/AddHW", options);
    let res = await req.json();
    if(res.Status)
    {
      alert(res.Status);
    }

  }






  return (
    <div className='Prescribe_main'>
      <div className='w-100 text-center prescribe_header'>Patient Id:{id2}</div>
      <div className='mt-3'></div>

      <div className='common_design'>
        <div className='common_design_upper'>Disease</div>
        <div className='text_color common_design_mid'>

          <div className="col-md-2">
            <Autocomplete


              items={data}

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
              value={disease_name}
              id="disease_name"

              onChange={e => setDiseaseName(e.target.value)}

              onSelect={(val) => setDiseaseName(val)}

              inputProps={{
                style: {
                  padding: "0.4rem",
                  width: "100%",
                  borderRadius: "0.5rem",
                  border: "2px solid #dfdfdf",
                  // borderColor:"gray"
                },
                placeholder: 'Search Disease'
              }}
            />
          </div>
          <div className="col-md-8">
            <textarea className="form-control" rows="3" placeholder='Description' id='description'></textarea>
          </div>

        </div>
        <div className='common_design_lower'>
          <button type="button" className="btn btn-primary w-100" onClick={addDisease}>Add Disease</button>
        </div>
      </div>
      <div className='common_design'>
        <div className='common_design_upper'>Allergies</div>
        <div className='text_color common_design_mid'>

          <div className="col-md-2">
            {/* <input type="text" className="form-control" placeholder="Drug name" id="drug_name"/> */}

            <Autocomplete


              items={drug_list}

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
              value={drug_name}
              id="drug_name"

              onChange={e => setName(e.target.value)}

              onSelect={(val) => setName(val)}

              inputProps={{
                style: {
                  padding: "0.4rem",
                  width: "100%",
                  borderRadius: "0.5rem",
                  border: "2px solid #dfdfdf",
                  // borderColor:"gray"
                },
                placeholder: 'Search drug'
              }}
            />
            {/* {value} */}

          </div>
          <div className="col-md-8">
            <textarea className="form-control" rows="3" placeholder='Description' id="all_description"></textarea>       </div>

        </div>
        <div className='common_design_lower'>
          <button type="button" className="btn btn-primary w-100" onClick={addAllergy}>Add Allergy</button>
        </div>
      </div>

      <div className='common_design'>
        <div className='common_design_upper'>Height-Weight Blood-Pressure</div>
        <div className='text_color common_design_mid'>

        
            <div class="row w-100">
              <div class="col">
                <input type="text" class="form-control" placeholder="Weight(KGs)" onChange={e=>setWeight(e.target.value)}/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Height(CMs)" onChange={e=>setHeight(e.target.value)}/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Blood Pressure" onChange={e=>setBlood(e.target.value)}/>
              </div>
            </div>
         



        </div>
        <div className='common_design_lower'>
          <button type="button" className="btn btn-primary w-100" onClick={()=>hwAdd()}>Add </button>
        </div>
      </div>

      <div className='foot_design'>
        <div className='common_design_lower'>
          <button type="button" className="btn btn-primary w-100" onClick={prescribe_div_open}>Prescribe</button>
        </div>

        <div className='common_design_lower'>
          <button type="button" className="btn btn-primary w-100" onClick={end_appointment}>End Appointment</button>
        </div>
      </div>

      {/* precsription page starts */}
      <div className='medicine_pre_main' id="medicine_pre_main">

        <div className=' row justify-content-center'>
          <button type="button" className="btn btn-primary w-auto" onClick={prescribe_div_close}>close</button>

        </div>


        <div className='medicine_pre_sub'>
          <div className='medicine_pre_left'>
            <div className='pre_up '>Select Drug</div>
            <div className='pre_low'>

              <div className='row mt-12'>
                <Autocomplete


                  items={drug_list}

                  shouldItemRender={(item, value
                  ) => item.label.toLowerCase()
                    .indexOf(value.toLowerCase()) > -1}
                  getItemValue={item => item.label}
                  renderItem={(item, isHighlighted) =>
                    // Styling to highlight selected item
                    <div style={{
                      background: isHighlighted ?
                        'lightgray' : 'white', color: "#388087",
                      width: "100%"
                    }}
                      key={item.id}>
                      {item.label}
                    </div>
                  }
                  value={pre_drug_name}
                  name="DrugName"

                  onChange={e => setPreDrug(e.target.value)}

                  onSelect={(val) => setPreDrug(val)}

                  inputProps={{
                    style: {
                      padding: "0.4rem",
                      width: "100%",
                      borderRadius: "0.5rem",
                      border: "2px solid #dfdfdf",
                      // borderColor:"gray"
                    },
                    placeholder: 'Search drug'
                  }}
                />

              </div>




              <div className='row mt-3'>

                <div className="col-md-3">
                  <input type="text" className="form-control" placeholder="Dosage" id='Dosage' onChange={e => setDosage(e.target.value)} />
                </div>
                <div className="col-md-2 text_color mt-1" style={{ fontSize: "1.2rem" }}>
                  Every
                </div>
                <div className="col-md-5">
                  <Autocomplete


                    items={[{ "label": "1" },
                    { "label": "2" }, { "label": "3" },
                    { "label": "4" },
                    { "label": "5" },
                    { "label": "6" },
                    { "label": "7" },
                    { "label": "8" },
                    ]}

                    shouldItemRender={(item, value
                    ) => item.label.toLowerCase()
                      .indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderItem={(item, isHighlighted) =>
                      // Styling to highlight selected item
                      <div style={{
                        background: isHighlighted ?
                          'lightgray' : 'white', color: "#388087",
                        width: "100%"
                      }}
                        key={item.id}>
                        {item.label}
                      </div>
                    }
                    value={dosage_duration}
                    // name="DrugName"

                    onChange={e => setDosageDuration(e.target.value)}

                    onSelect={(val) => setDosageDuration(val)}

                    inputProps={{
                      style: {
                        padding: "0.4rem",
                        width: "100%",
                        borderRadius: "0.5rem",
                        border: "2px solid #dfdfdf",
                        // borderColor:"gray"
                      },
                      placeholder: 'Dosage Duration'
                    }}
                  />

                </div>
                <div className="col-md-2 text_color mt-1" style={{ fontSize: "1.2rem" }}>
                  Days
                </div>

                <div className="col-md-4 text_color mt-3 text-center" style={{ fontSize: "1.2rem" }}>
                  Duration
                </div>
                <div className="col-md-8 text_color mt-3">

                  <Autocomplete


                    items={[{ "label": "1" },
                    { "label": "2" }, { "label": "3" },
                    { "label": "4" },
                    { "label": "5" },
                    { "label": "6" },
                    { "label": "7" },
                    { "label": "8" },
                    ]}

                    shouldItemRender={(item, value
                    ) => item.label.toLowerCase()
                      .indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderItem={(item, isHighlighted) =>
                      // Styling to highlight selected item
                      <div style={{
                        background: isHighlighted ?
                          'lightgray' : 'white', color: "#388087",
                        width: "100%"
                      }}
                        key={item.id}>
                        {item.label}
                      </div>
                    }
                    value={total_duration}
                    name="DrugName"

                    onChange={e => setTotalDuration(e.target.value)}

                    onSelect={(val) => setTotalDuration(val)}

                    inputProps={{
                      style: {
                        padding: "0.4rem",
                        width: "100%",
                        borderRadius: "0.5rem",
                        border: "2px solid #dfdfdf",
                        // borderColor:"gray"
                      },
                      placeholder: 'Total Duration in days'
                    }}
                  />



                </div>


              </div>

              <select class="form-select mt-3" aria-label="Default select example" id="bef_aft">
                <option value="After Meal" onSelect={e => setBeforeAfter(e.target.value)}>After Meal</option>
                <option selected value="Before Meal" onSelect={e => setBeforeAfter(e.target.value)}>Before Meal</option>
              </select>

              <div className="col-md-12 mt-3">
                <input type="text" className="form-control" placeholder="Notes" value={Notes} id='Notes' onChange={e => setNotes(e.target.value)} />
              </div>


              <div className='w-100 row justify-content-center mt-2'>
                <button type="button" className="btn btn-primary w-25" onClick={submit_medicine}>Add Drug</button>

              </div>


            </div>

          </div>
          <div className='medicine_pre_right'>
            <div className='pre_up_1 '>Total</div>
            <div className='pre_low_1'>

              {
                // let inc=0;
                drug_data && drug_data.map((element) => {
                  return (
                    <>
                      <div className='indi_drug_div'>
                        <div className='close_button_drug'>

                        </div>
                        <div className='text_color text-center p-1 drug_div_upper'>
                          {element.drug_name}
                          <i className="fa fa-window-close" id={inc++} aria-hidden="true" style={{ color: "#388087", fontSize: "1.5rem", cursor: "pointer" }} onClick={del_drug_item}></i>

                        </div>
                        <div className='text_color text-center p-1 w-100 drug_div_lower'>
                          <div>{element.dosage + " " + element.dosage_duration}</div>
                          <div>{element.total_duration}</div>
                          <div>{element.quantity}</div>

                        </div>
                      </div>

                    </>


                  )



                })}





            </div>

          </div>

        </div>


        <div className='submit_data row justify-content-center'>
          <button type="button" className="btn btn-primary w-25" onClick={submit_final_data}>Submit</button>

        </div>












      </div>



      {/* prescription page ends */}

    </div>
  )
}
