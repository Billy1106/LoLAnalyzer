import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Error = () => {

    const navigate = useNavigate();
    const location = useLocation();


    return (
        <div>
            <h1>Sorry, an error has occured:</h1>
            <p>{location.state.errorMessage}</p>
            <button onClick={()=>navigate("/")}>Return to home page</button>
        </div>
    );
};