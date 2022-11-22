import React from 'react'
import { useState, useEffect } from 'react';
import './pharmacist_dash.css';
import Autocomplete from 'react-autocomplete'
// import 'https://unpkg.com/easyinvoice/dist/easyinvoice.min.js'
// import easyinvoice from 'easyinvoice'
import {storage} from './firebase'
import {ref, uploadBytes,uploadBytesResumable,getDownloadURL,uploadString} from 'firebase/storage';
import {v4} from 'uuid';
// import {}

export const Pharmacist_Dash = () => {
  const [data1,setData1]=useState();
  const [UniqueId, setPatientId] = useState();
  const [patientName, setPName] = useState();
  //list for showing
  const [drug_list, setDrugList] = useState([]);

  const [drug_name, setName] = useState("");
  //all the data of all the drugs fetched
  const [all_data,setAllData]=useState([]);

  const [drug_price,setPrice]=useState("");
  const [Quantity,setQuantity]=useState("");
  const [totalPrice,setTotalPrice]=useState();

  const [drug_data_to_be_shown, setDrugData] = useState();
  const [invoice_pdf,setInvoice]=useState();
  const [patientAllDetails,setPDetails]=useState();

  //for fetched prescription data
  const [presData,setPresData]=useState();
  const [AvailableQuantity,setAvailableQuantity]=useState();
 
  //for pdf
  

  let inc=0;

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
      setAllData(res);
      console.log(all_data);

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
    inc=0;



  }, [])

  useEffect(() => {
    
    all_data.map((e)=>{
      if(e.medicineName==drug_name)
      {
        setPrice(e.price);
        setAvailableQuantity(e.stock); 
        // console.log(e.stock);
        // break;
      }
    })
  
 
  }, [drug_name])
  






  const find_patient = async () => {
    let options = {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ UniqueId }),
    }

    let req = await fetch("http://localhost:5000/Patient/FindPatient", options);
    let res = await req.json();
    if (res.Status) {
      alert(res.Status);
    }
    else {
      setPDetails(res);
      setPName(res.patientName);
      // console.log(patientAllDetails);
    }

  }

const setQuantityAndTotal=(e)=>{
  setQuantity(e);
  let temp=parseInt(e)*parseInt(drug_price);
  setTotalPrice(temp);
}

const add_drug_data=async()=>{
  // console.log(Quantity,AvailableQuantity);
  if(Quantity=="" || drug_name==""|| drug_price=="")
  {
    alert("please fill all the fields");
  }
  else if(parseInt(Quantity)>parseInt(AvailableQuantity))
  {
    alert("Alert! not enough quantity...")
  }
  else
  {
    const create_drug={
      "quantity":Quantity,
      "description": drug_name,
      "tax-rate": "2",
      "price": parseInt(drug_price)  
      }
    // console.log(create_drug);
          
          if (!drug_data_to_be_shown) {
            let temp = [create_drug];
            setDrugData(temp);

          }
          else {
            let temp = drug_data_to_be_shown;
            temp.push(create_drug);
            setDrugData(temp);
          }
//upadating the stock data
         let options = {
            method: 'POST',
            headers: {
    
              'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({"medicineName":drug_name,"stock":Quantity})
          }
            // console.log(Quantity); 
          let req = await fetch("http://localhost:5000/Medicine/ChangeStock", options);
          // let res = await req.json();


          setName("");
          setPrice("");
          setQuantity("");
          setTotalPrice("");
          // console.log(drug_data_to_be_shown);


  }
 

}

const delete_drug=async(e)=>{

  const pos = e.target.id;
    let temp = [];
    console.log(pos);
    for (let i = 0; i < drug_data_to_be_shown.length; i++) {
      if (i == pos) {
        const medicineName=drug_data_to_be_shown[i]["description"];
        const stock=drug_data_to_be_shown[i]["quantity"]
        let options = {
          method: 'POST',
          headers: {
  
            'Content-Type': 'application/json;charset=utf-8'
          },
          body:JSON.stringify({medicineName,stock})
        }
          // console.log(Quantity); 
        let req = await fetch("http://localhost:5000/Medicine/AddStock", options);



      }
      else {
        temp.push(drug_data_to_be_shown[i]);
      }
    }

    setDrugData(temp);

}

const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
      out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: 'application/pdf' });
};


const generateBill=async()=>
{
  // console.log("sdsdf");
  var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
           },
    // Your own data
    "sender": {
        "company": "Stalwart",
        "address": "Hospital Address",
        "city": "Vallabh Vidhyanagar",
        "country": "Anand Gujarat India",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    // Your recipient
    "client": {
        "company": patientAllDetails.patientName+"["+patientAllDetails.UniqueId+"]",
        "address": patientAllDetails.Address,
        "custom1": patientAllDetails.Address2,
        "custom2":(patientAllDetails.ContactNo+""),
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
    },
    "information": {
        // Invoice number
        "number": "2021.0001",
        // Invoice data
        "date": "12-12-2021",
        // Invoice due date
        "due-date": "12-12-2021"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": drug_data_to_be_shown,
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Thank you for your visit...",
    // Settings to customize your invoice
    "settings": {
        "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "tax-notation": "gst", // Defaults to 'vat'
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal" // Defaults to 'Total'
    },
};


let options = {
  method: 'POST',
  headers: {

    'Content-Type': 'application/json;charset=utf-8'
  },
  body:JSON.stringify({data:data})
}
let req = await fetch("https://api.easyinvoice.cloud/v2/free/invoices", options);
let res = await req.json();
console.log(res.data.pdf);
setTimeout(async() => {
  setData1(await res.data.pdf);  
}, 5000);

setTimeout(function(){

const base64WithoutPrefix =res.data.pdf.substr('data:application/pdf;base64,'.length);

const bytes = atob(base64WithoutPrefix);
let length = bytes.length;
let out = new Uint8Array(length);

while (length--) {
    out[length] = bytes.charCodeAt(length);
}
const pdfData=new Blob([out], { type: 'application/pdf' });

// console.log(pdfData);

const storageRef=ref(storage,`${"DUMMY"+v4()}`);


const uploadTask = uploadBytesResumable(storageRef, pdfData);

uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      window.open(downloadURL);
      // if(presData.)
      data={
        "PatientUniqueId":UniqueId,
        "DoctorWorkId":presData.DoctorWorkId,
        "URL":downloadURL
      }
      
      console.log(data);
      const func1=async ()=>{
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        
        }  
        let req=await fetch("http://localhost:5000/Bill/SaveBill",options);
        let res=await req.json();
        
        alert(res.Status);
      
      }
      
      func1();
      const func2=async ()=>{
        const data1={
          PatientUniqueId:UniqueId,
          DoctorWorkId:presData.DoctorWorkId
        }
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data1)
        
        }  
        let req=await fetch("http://localhost:5000/Doctor_pres/ChangePrescriptionStatus",options);
        let res=await req.json();
        
        alert(res.Status);
      
      }
      
      func2();
      
    });
  }
);


}, 5000); 



// window.location.reload();


}


const search_pre=async()=>{
  let options = {
    method: 'POST',
    headers: {

      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({PatientUniqueId:UniqueId }),
  }

  let req = await fetch("http://localhost:5000/Doctor_pres/SeePrescribeMedicines", options);
  let res = await req.json();
  console.log("presData");
  
  setPresData(res);

console.log(presData);
}



  return (
    <div className='text_color pharmacist_main'>
      <div className='left_1 text_color'>
        <div className='upper_1 p-1'>
          <div className='text_color  w-100 text-center text_bigger ' style={{ backgroundColor: "#BADFE7" }}>Billing System</div>
          <div className='text_color w-100'>
            <div className="row g-1 mt-1">
              <div className="col-md-3">
                <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Card No' onChange={e => setPatientId(e.target.value)} />
              </div>
              <div className="col-md-5">
                <input type="text" className="form-control" id="inputPassword4" placeholder='Patient Name' value={patientName} />
              </div>
              <div className="col-md-4 ">
                <button type="button" className="btn btn-primary" onClick={find_patient}>Search</button>
              </div>
              <div className="col-md-12 text_color text_bigger w-100 text-center">
                Add Drug
              </div>
              <div className="col-md-3 text_color mt-3">
                Search Drug
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
              </div>
              <div className="col-md-3">
                <label for="Quantity" className="form-label">Enter Quantity</label>
                <input type="text" className="form-control" id="Quantity" onChange={e=>setQuantityAndTotal(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label for="Price" className="form-label">Price</label>
                <input type="text" className="form-control" id="Price" value={drug_price} onChange={e=>setPrice(e.target.value)}/>
              </div>
              <div className="col-md-3">
                <label for="TotalPrice" className="form-label">Total Price</label>
                <input type="text" className="form-control" id="TotalPrice" value={totalPrice} />
              </div>
              <div className="col-md-6 text_color text_bigger">
                <button type="button" className="btn btn-primary" onClick={add_drug_data}>Add Drug</button>

              </div>



            </div>
          </div>
        </div>
        <div className='lower_1' style={{ color: "#388087" }}>

          <div className='table_div'>
            <table className='p-2'>
              <tr>
                <th>Drug Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Delete</th>

              </tr>

              {
                // let inc=0;
                drug_data_to_be_shown && drug_data_to_be_shown.map((element) => {
                  return (
              <tr>
                <td>{element.description}</td>
                <td>{element.quantity}</td>
                <td>{element.price}</td>
                <td>{parseInt(element.price)*parseInt(element.quantity)}</td>
                <td><i class="fa fa-window-close text_bigger" aria-hidden="true" id={inc++} style={{ color: "#388087", cursor: "pointer" }} onClick={delete_drug}></i></td>

              </tr>
                  )})

              }





            </table>

          </div>

          <div className="col-md-12 text_color text_bigger text-center">
            <button type="button" className="btn btn-primary" onClick={generateBill}>Save And Generate Bill</button>

          </div>


        </div>
      </div>
      <div className='right_1 text_color'>
        <div className='text_bigger text_color w-100 text-center upper_2'>
          <div className='text_bigger text_color w-100 text-center'>Search Patient Prescription</div>
          <div className="col-md-11 m-1">
            <input type="text" className="form-control" id="search_pre" placeholder='Enter Card No' value={UniqueId} />
          </div>
          <div className="col-md-12 text_color text_bigger">
            <button type="button" className="btn btn-primary" onClick={search_pre}>search</button>

          </div>
        </div>
        <div className='lower_2'>
        <div className='each_drug'>
              <div>Name</div>
              <div>
                Quantity
              </div>
            </div>

          {presData && presData.Medicines && presData.Medicines.map((e)=>{
            return(
              <div className='each_drug'>
              <div>{e.drug_name}</div>
              <div>
                {e.quantity}
              </div>
            </div>
            )
          })}
         







        </div>
      </div>

    </div>
  )
}
