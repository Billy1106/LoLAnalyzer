import React from "react";
import { useNavigate } from "react-router-dom";

export const RiotEmployee = () => {

    const navigate = useNavigate();

    return (
        <div className="riotemployee">
            <h1>Welcome, Riot employee.</h1>
            <button onClick = {() => navigate("/riotemployee/choosetable")}>Insert</button>
            <button onClick = {() => navigate("/riotemployee/select")}>select</button> // todo
            <button onClick={() => navigate("/")}>back</button>
        </div>
    );
};