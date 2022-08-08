import React from "react";
import { useNavigate } from "react-router-dom";

export const RiotEmployee = () => {

    const navigate = useNavigate();

    return (
        <div className="riotemployee">
            <h1>Welcome, Riot employee.</h1>
            <button onClick = {() => navigate("/riotemployee/choosetable",{state:{action: "(to update)."}})}>Update</button>
            <button onClick={() => navigate("/riotemployee/choosetable",{state:{action: "(to delete)."}})}>Delete</button>
            <button onClick={() => navigate("/")}>Insert</button>
            <button onClick={() => navigate("/riotemployee/select")}>Select(View)+Projction</button>
            <button onClick={() => navigate("/")}>Division</button>
            <button onClick={() => navigate("/riotemployee/join")}>Join</button>
            <button onClick={() => navigate("/")}>Aggregation with Group By</button>
            <button onClick={() => navigate("/riotemployee/aggwithhaving",{state:{action: "Aggregation with having"}})}>Aggregation with having</button>
            <button onClick={() => navigate("/riotemployee/nestedaggwithgb",{state:{action: "Nested aggreagtion with group by"}})}>Nested Aggregation with Group By</button>
            <button onClick={() => navigate("/")}>back</button>
        </div>
    );
};