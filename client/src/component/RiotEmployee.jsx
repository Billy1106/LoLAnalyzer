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
            <button onClick = {() => navigate("/riotemployee/choosetable", {state:{action: "update"}})} style={{fontSize:"30px"}}>Update</button>
            <button onClick={() => navigate("/riotemployee/choosetable",{state:{action: "(to delete)."}})} style={{fontSize:"30px"}}>Delete</button>
            <button onClick={() => navigate("/riotemployee/choosetable", {state:{action: "insert"}})} style={{fontSize:"30px"}}>Insert</button>
            <button onClick={() => navigate("/riotemployee/select")} style={{fontSize:"30px"}}>View</button>
           
            <button onClick={() => navigate("/riotemployee/join")} style={{fontSize:"30px"}}>Combine</button>
            
            <button onClick={() => navigate("/riotemployee/aggwithhaving",{state:{action: "Aggregation with having"}})} style={{fontSize:"30px"}}>Show the lowest-level of pro-players for each team....</button>
            <button onClick={() => navigate("/riotemployee/nestedaggwithgb",{state:{action: "Nested aggreagtion with group by"}})} style={{fontSize:"30px"}}>Show the level of the lowest-level pro-players with....</button>
            
            <button onClick = {() => navigate("/riotemployee/division")} style={{fontSize:"30px"}}>All the esports teams that were sponsored by every company</button>
            <button onClick = {() => navigate("/riotemployee/aggregationgroupby")} style={{fontSize:"30px"}}>Average level of the players in each server</button>
            <button onClick = {resetServer} style={{fontSize:"30px"}}>Reset Server</button>
            <button onClick={() => navigate("/")} style={{fontSize:"30px"}}>back</button>
        </div>
    );
};