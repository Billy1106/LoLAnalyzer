import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// if I want to check for FDs, then I probably have to pass in a function to Insert, that returns true or false dependong on if the FDs are satisfied

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