import React from 'react'
import './addmedicine.css'
import Autocomplete from 'react-autocomplete'
import { useState, useEffect } from 'react'
import data from './drugData.json'
import priceData from './drugPrice.json'
// import { _renderMatches } from 'react-router/lib/hooks'
export const AddMedicine = () => {

  const [drugName, setDrug] = useState();

  const [final_data, setFinaldata] = useState({
    "medicineName": "",
    "price": "",
    "quantity": "",
    "stock": "",
  });




  const setDrugUtil = (val) => {

    setDrug(val);
    // setDrugPrice(priceData[val]);
    setFinaldata({ ...final_data, ["medicineName"]: drugName });
    setFinaldata({ ...final_data, ["price"]: priceData[val] });
    console.log(val);

  }

  const handleInput = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    setFinaldata({ ...final_data, [name]: value });

  }


  const submitData=()=>{
    final_data.medicineName=drugName;
    // console.log(final_data);

    if(final_data.medicineName=="" || final_data.price=="" || final_data.quantity=="" || final_data.stock=="")
    {
      alert("please fill all the details...");
    }
    else{
      const func1=async ()=>{
        let options = {
          method: 'POST',
          headers: {
            
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(final_data)
        }
    
    
       let req=await  fetch("http://localhost:5000/Medicine/AddMedicine",options);
       let response=await req.json();
    
       alert(response.Status);

      
      }
      func1();

    }

  }



  return (
    <div className='addMedicine_main'>

      <div className='wrapper'>
        <div className='w-100 display-6 text-center text_color'>Add Drug</div>
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
            <div className='row w-100 justify-content-center mt-2'>
              <label for="inputPassword" class="col-sm-2 col-form-label">Price</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="price" placeholder="Price" value={final_data.price} onChange={e => handleInput(e)} />

              </div>
            </div>

            <div className='row w-100 justify-content-center mt-2'>
              <label for="inputPassword" class="col-sm-2 col-form-label">Enter Stock</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="stock" name="stock" placeholder="Total" onChange={e => handleInput(e)} />

              </div>
            </div>
            <div className='row w-100 justify-content-center mt-2'>
              <label for="inputPassword" class="col-sm-2 col-form-label">Quantity</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="quantity" name="quantity" placeholder="Total Quantity in One Pack" onChange={e => handleInput(e)} />

              </div>
            </div>

            <div className='row w-100 justify-content-center mt-4'>
              <button type="button" class="btn btn-dark" onClick={()=>submitData()}>Add Drug</button>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
