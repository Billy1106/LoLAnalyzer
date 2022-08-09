import React from "react";
import {useNavigate} from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="home">
            <h1>Welcome to the LOL Database Program</h1>
            <button onClick={() => navigate("/riotemployee") }style={{fontSize:"50px"}}>Riot Employee</button>
            <button onClick={()=> navigate("/normaluser")} style={{fontSize:"50px"}}>Normal User</button>
        </div>
    );
};