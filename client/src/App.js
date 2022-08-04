import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home} from "./component/Home"
import {NormalUser} from "./component/NormalUser"
import {RiotEmployee} from "./component/RiotEmployee"
import {ChooseTable} from "./component/ChooseTable"
import {Update} from "./component/Update"
import {Delete} from "./component/Delete"



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/riotemployee" element = {<RiotEmployee/>}/>
          <Route path = "/riotemployee/choosetable" element = {<ChooseTable/>}/>
          <Route path = "/riotemployee/choosetable/update" element = {<Update/>}/>
          <Route path = "/riotemployee/choosetable/delete" element = {<Delete/>}/>
          <Route path = "/normaluser" element = {<NormalUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
