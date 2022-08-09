import React from "react";
import { useNavigate } from "react-router-dom";

export const NormalUser = () => {

    const navigate = useNavigate();

    return (
        <div className="normaluser">
            <h1>Welcome, normal user.</h1>
            <button onClick={() => navigate("/normaluser/select")}>Select(View)+Projection</button>
            <button onClick={() => navigate("/riotemployee/division")}>Division</button>
            <button onClick={() => navigate("/normaluser/join")}>Join</button>
            <button onClick={() => navigate("/riotemployee/aggregationgroupby")}>Aggregation with Group By</button>
            <button onClick={() => navigate("/riotemployee/aggwithhaving",{state:{action: "Aggregation with having"}})}>Aggregation with having</button>
            <button onClick={() => navigate("/riotemployee/nestedaggwithgb",{state:{action: "Nested aggreagtion with group by"}})}>Nested Aggregation with Group By</button>
            <button onClick={() => navigate("/")}>back</button>
        </div>
    );
};