import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home} from "./component/Home"
import {NormalUser} from "./component/NormalUser"
import {RiotEmployee} from "./component/RiotEmployee"
import {ChooseTable} from "./component/ChooseTable"
import {Update} from "./component/Update"
import {Select} from "./component/Select"
import {Delete} from "./component/Delete"
import {Insert} from "./component/Insert"
import {Error} from "./component/Error"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/riotemployee" element = {<RiotEmployee/>}/>
          <Route path = "/riotemployee/select" element = {<Delete/>}/> // todo
          <Route path = "/riotemployee/choosetable" element = {<ChooseTable/>}/>
          <Route path = "/riotemployee/choosetable/insert" element = {<Insert/>}/>
          <Route path = "/riotemployee/choosetable/update" element = {<Update/>}/>
          <Route path = "/normaluser" element = {<NormalUser/>}/>
          <Route path = "/error" element = {<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
