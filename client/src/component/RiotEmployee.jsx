import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export const RiotEmployee = () => {

    const navigate = useNavigate();

    return (
        <div className="riotemployee">
            <h1>Welcome, Riot employee.</h1>
            <button onClick={() => navigate("/")}>back</button>
        </div>
    );
};