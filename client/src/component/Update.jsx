import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="riotemployee">
            <h1>Enter values to update for {location.state.table}</h1>
            <div>
                <p>attribute1</p>
                <form><input type = "text"/></form>
            </div>
            <div>
                <button>submit</button>
                <button onClick={() => navigate(-1)}>back</button>
            </div>
        </div>
    );
};