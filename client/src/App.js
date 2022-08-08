import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home} from "./component/Home"
import {NormalUser} from "./component/NormalUser"
import {RiotEmployee} from "./component/RiotEmployee"
import {ChooseTable} from "./component/ChooseTable"
import {Update} from "./component/Update"
import {Delete} from "./component/Delete"
import {AggWithHaving} from "./component/AggWithHaving"
import {NestedAggWithGB} from "./component/NestedAggWithGB"



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
          <Route path = "/riotemployee/aggwithhaving" element = {<AggWithHaving/>}/>
          <Route path = "/normaluser/aggwithhaving" element = {<AggWithHaving/>}/>
          <Route path = "/riotemployee/NestedAggWithGB" element = {<NestedAggWithGB/>}/>
          <Route path = "/normaluser/NestedAggWithGB" element = {<NestedAggWithGB/>}/>

        </Routes>
      </BrowserRouter>

{/* =======
import { Select } from '../src/component/Select';
import { Delete } from './component/Delete';
import { Join } from './component/Join';

function App() {
  return (
    <div>
      <Delete />
>>>>>>> develop */}
    </div>
  );
}
export default App;
