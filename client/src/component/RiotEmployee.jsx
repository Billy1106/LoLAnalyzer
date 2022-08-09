import React from "react";
import { useNavigate } from "react-router-dom";

export const RiotEmployee = () => {

    const navigate = useNavigate();

    const resetServer = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5321/game", {method: "POST"});
            const jsonData = await response.json();
        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <div className="riotemployee">
            <h1>Welcome, Riot employee.</h1>
            <button onClick = {() => navigate("/riotemployee/choosetable", {state:{action: "update"}})}>Update</button>
            <button onClick={() => navigate("/riotemployee/choosetable",{state:{action: "(to delete)."}})}>Delete</button>
            <button onClick={() => navigate("/riotemployee/choosetable", {state:{action: "insert"}})}>Insert</button>
            <button onClick={() => navigate("/riotemployee/select")}>Select(View)+Projction</button>
           
            <button onClick={() => navigate("/riotemployee/join")}>Join</button>
            
            <button onClick={() => navigate("/riotemployee/aggwithhaving",{state:{action: "Aggregation with having"}})}>Aggregation with having</button>
            <button onClick={() => navigate("/riotemployee/nestedaggwithgb",{state:{action: "Nested aggreagtion with group by"}})}>Nested Aggregation with Group By</button>
            
            <button onClick = {() => navigate("/riotemployee/division")}>division</button>
            <button onClick = {() => navigate("/riotemployee/aggregationgroupby")}>Aggregation Group By</button>
            <button onClick = {resetServer}>Reset Server</button>
            <button onClick={() => navigate("/")}>back</button>
        </div>
    );
};