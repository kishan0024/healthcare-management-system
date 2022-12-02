import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './prevMedicines.css'
export const PrevMedicines = () => {
    const [prevMedList, setPrevMed] = useState();
    const [selectedId, setSelectedId] = useState("0");
    const PatientUniqueId = sessionStorage.getItem("PatientUniqueId");
    var count = 1;

    useEffect(() => {
        const func = async () => {
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ PatientUniqueId })
            }

            let req = await fetch("http://localhost:5000/Doctor_pres/SeePrescribeMedicinesPatient", options);
            let res = await req.json();
            console.log(res);
            setPrevMed(res);
        }
        func();
    }, [])


    const setDropDown = (e) => {

        if (selectedId != "0") {
            setSelectedId("0");
            document.getElementById(e.target.name).style.display = "none";


        }
        else {
            setSelectedId(e.target.name);
            document.getElementById(e.target.name).style.display = "block";


        }

    }

    return (

        <div className='med_main text_big'>
            <div className='w-100 p-2'>
                <Link to="/Patient/Dashboard">
                    <i className="fa fa-arrow-left" aria-hidden="true" style={{ color: "#388087", fontSize: "2.5rem" }}></i>
                </Link>
            </div>
            <div className='w-100 text-center text_big'>Prescribed Medicines</div>
            <div className='wrapper_4  text-center' style={{ fontSize: "1.2rem" }}>

                {prevMedList && prevMedList.map((e) => {
                    console.log("asda");
                    return (
                        <div className='med_div'>
                            <div className='med_div_1'>
                                <div>{e.Date}</div>
                                <div>Doctor Id:{e.DoctorWorkId}</div>
                            </div>
                            <div id={count} className="w-100 drop_down">
                                <table>
                                    <tr>
                                        <th>Drug Name</th>
                                        <th>Dosage</th>
                                        <th>Duration</th>
                                        <th>Total Duration</th>
                                        <th>Notes</th>
                                        <th>Time</th>
                                        <th>Quantity</th>
                                        {/* <th>Full Details</th> */}
                                    </tr>

                                    {e.Medicines && e.Medicines.map((element) => {
                                        return (<>
                                            <tr>
                                                <td>{element.drug_name}</td>
                                                <td>{element.dosage}</td>
                                                <td>{element.dosage_duration}</td>
                                                <td>{element.total_duration}</td>
                                                <td>{element.Notes}</td>
                                                <td>{element.before_after}</td>
                                                <td>{element.quantity}</td>

                                            </tr>
                                        </>)
                                    })

                                    }





                                </table>
                            </div>
                            <div className='med_div_2 '>
                                {selectedId == "0" ?
                                    <>
                                        <button type="submit" className="btn btn-primary w-auto" style={{ "color": "white", fontSize: "1rem", borderRadius: "10%" }} name={count++} onClick={(e) => { setDropDown(e) }}>

                                            <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                        </button>
                                    </> :
                                    <>
                                        <button type="submit" className="btn btn-primary w-auto" style={{ "color": "white", fontSize: "1rem", borderRadius: "10%" }} name={count++} onClick={(e) => { setDropDown(e) }}>

                                            <i class="fa fa-arrow-up" aria-hidden="true"></i>
                                        </button>

                                    </>}

                            </div>

                        </div>
                    )
                })}




            </div>

            {/* <div className=''></div> */}
        </div>
    )
}
