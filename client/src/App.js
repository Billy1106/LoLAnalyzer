import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home} from "./component/Home"
import {NormalUser} from "./component/NormalUser"
import {RiotEmployee} from "./component/RiotEmployee"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/riotemployee" element = {<RiotEmployee/>}/>
          <Route path = "/normaluser" element = {<NormalUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
