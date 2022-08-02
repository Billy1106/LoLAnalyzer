import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Update = () => {

    const [attributes, setAttributes] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="riotemployee">
            <h1>Enter values to update for {location.state.table}</h1>
            <div>
                {location.state.attributes.map(e =>
                <div>
                    <p>{e}</p>
                    <form><input type="text" /></form>
                </div>
                )}
            </div>
            <div>
                <button>submit</button>
                <button onClick={() => navigate(-1)}>back</button>
            </div>
        </div>
    );
};