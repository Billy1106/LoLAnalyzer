import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Delete = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
return(
    <>
    <h1>Choose values to delete for {location.state.table}</h1>
    </>

)


}