import React from "react";
import { useNavigate } from "react-router-dom";

export const NormalUser = () => {

    const navigate = useNavigate();

    return (
        <div className="normaluser">
            <h1>Welcome, normal user.</h1>
            <button onClick={() => navigate("/")}>back</button>
            <button onClick={() => navigate("/")}>Select(View)</button>
            <button onClick={() => navigate("/")}>Division</button>
            <button onClick={() => navigate("/")}>Projection</button>
            <button onClick={() => navigate("/")}>Join</button>
            <button onClick={() => navigate("/")}>Aggregation with Group By</button>
            <button onClick={() => navigate("/")}>Aggregation with having</button>
            <button onClick={() => navigate("/")}>Nested Aggregation with Group By</button>
        </div>
    );
};