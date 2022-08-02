import React from "react";
import { useNavigate,useLocation } from "react-router-dom";

export const ChooseTable = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="choosetable">
            <h1>Please choose an option{location.state.action}</h1>
            <button onClick = {() => navigate("/riotemployee/choosetable/update", {state:{table: "champion"}})}>Champions</button>
            <button onClick = {() => navigate("/riotemployee/choosetable/update", {state:{table: "item"}})}>Items</button>
            <button onClick = {() => navigate("/riotemployee/choosetable/update", {state:{table: "ability"}})}>Abilities</button>
            <button onClick={() => navigate(-1)}>back</button>
        </div>
    );
};