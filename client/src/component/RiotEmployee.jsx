import React from "react";
import { useNavigate } from "react-router-dom";

export const RiotEmployee = () => {

    const navigate = useNavigate();

    return (
        <div className="riotemployee">
            <h1>Welcome, Riot employee.</h1>
            <button onClick = {() => navigate("/riotemployee/choosetable")}>Update</button>
            <button onClick = {() => navigate("/riotemployee/division")}>division</button>
            <button onClick = {() => navigate("/riotemployee/aggregationgroupby")}>Aggregation Group By</button>
            <button onClick={() => navigate("/")}>back</button>
        </div>
    );
};