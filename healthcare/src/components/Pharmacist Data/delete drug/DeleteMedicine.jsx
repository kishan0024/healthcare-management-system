import React from 'react'
import './deleteMedicine.css'
import Autocomplete from 'react-autocomplete'
import { useState, useEffect } from 'react'
// import data from '../Add Med/drugData.json'
import priceData from '../Add Med/drugPrice.json'
// import { _renderMatches } from 'react-router/lib/hooks'
export const DeleteMedicine = () => {

  const [drugName, setDrug] = useState();
  const [data,setData]=useState([]);
  useEffect(() => {

    const func1=async ()=>{
      let options = {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json;charset=utf-8'
        },
        // body: JSON.stringify(final_data)
      }
  
  
     let req=await  fetch("http://localhost:5000/Medicine/AllMedicine",options);
     let res=await req.json();
     res.map((e) => {
      // console.log(e);
      let temp = { "label": e.medicineName };
      // let temp1;
      // console.log(temp);
      if (!data) {
        let temp1 = [temp];
        setData(temp1);

      }
      else {
        let temp1 = data;
        temp1.push(temp);
        setData(temp1);
      }

    })
    
    }
    func1();


  }, [])
  



  const setDrugUtil = (val) => {

    setDrug(val);

  }



  const submitData = () => {


    if (drugName == "") {
      alert("please fill all the details...");
    }
    else {
      const func1 = async () => {
        let options = {
          method: 'POST',
          headers: {

            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ "medicineName": drugName })
        }


        let req = await fetch("http://localhost:5000/Medicine/DeleteMedicine", options);
        let response = await req.json();

        alert(response.Status);


      }
      func1();

    }

  }



  return (
    <div className='delMedicine_main'>

      <div className='wrapper'>

        <div className='w-100 display-6 text-center text_color'>Delete Medicine</div>
        <div clas>


          <div class="form-group col w-100 h-100 justify-content-between mt-2">

            <div className='row w-100 justify-content-center mt-2'>
              <label for="inputPassword" class="col-sm-2 col-form-label">Select Drug</label>
              <div class="col-sm-8">
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
                        'lightgray' : 'white', color: "#388087", "width": "100%"
                    }}
                      key={item.id}>
                      {item.label}
                    </div>
                  }
                  value={drugName}
                  id="disease_name"

                  onChange={e => setDrugUtil(e.target.value)}

                  onSelect={(val) => setDrugUtil(val)}

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
            </div>



            <div className='row w-100 justify-content-center mt-4'>
              <button type="button" class="btn btn-dark" onClick={() => submitData()}>Delete</button>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
