import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Login} from './components/LogIn/Login';
import {Admin} from './components/Admin_Panel/Admin';
import { DoctorPanel } from './components/Doctor/Panel/DoctorPanel';
import { Prescibe } from './components/Doctor/Prescribe/Prescibe';
import { SidebarDoctor } from './components/Sidebar/SidebarDoctor';
import { PharmacistPanel } from './components/Pharmacist Data/Panel/PharmacistPanel';
import { PatientLogin } from './components/Patient_Panel/Login/PatientLogin';
import { Landing } from './components/Patient_Panel/Login/Landing';
import { PatientDash } from './components/Patient_Panel/Dash/PatientDash';

// import { Home } from './components/home/Home';
function App() {
  return (
    
    // <Demo/>
    <BrowserRouter>

      <Routes>  
        <Route index path="/" element={ <Login/> } />
        <Route path="/Admin/:id" element={ <Admin/> } />
        <Route path="/Doctor/:id" element={ <DoctorPanel/> } />
        <Route path="/Doctor/:id/:id2" element={<DoctorPanel/>} />
        <Route path="/Pharmacist/:id" element={ <PharmacistPanel/>} />
        <Route path="/PatientLogin" element={ <PatientLogin/> } />
        <Route path='/LandingPage' element={<Landing/>}/>
        <Route path='/Patient' element={<PatientDash/>}/>
        <Route path='/Patient/:id' element={<PatientDash/>}/>

        
        

             
      </Routes>   

    </BrowserRouter>
  

  );
}

export default App;
