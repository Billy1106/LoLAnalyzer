import React from "react";
import { useNavigate } from "react-router-dom";

export const NormalUser = () => {

    const navigate = useNavigate();

    return (
        <div className="normaluser">
            <h1>Welcome, normal user.</h1>
            <button style={{fontSize:"30px"}}onClick={() => navigate("/normaluser/select")}>View</button>
            <button style={{fontSize:"30px"}}onClick={() => navigate("/riotemployee/division")}>All the esports teams that were sponsored by every company</button>
            <button style={{fontSize:"30px"}} onClick={() => navigate("/normaluser/join")}>Combine</button>
            <button style={{fontSize:"30px"}} onClick={() => navigate("/riotemployee/aggregationgroupby")}>Average level of the players in each server</button>
            <button style={{fontSize:"30px"}} onClick={() => navigate("/riotemployee/aggwithhaving",{state:{action: "Aggregation with having"}})}>Show the lowest-level pro-players for each team....</button>
            <button style={{fontSize:"30px"}} onClick={() => navigate("/riotemployee/nestedaggwithgb",{state:{action: "Nested aggreagtion with group by"}})}>Show the level of the lowest-level pro-players with....</button>
            <button style={{fontSize:"30px"}} onClick={() => navigate("/")}>back</button>
        </div>
    );
};