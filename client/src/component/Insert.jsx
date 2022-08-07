import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Insert = () => {
    
    const [forms, setForms] = useState([]);
    var index = 0;

    const navigate = useNavigate();
    const location = useLocation();

    const initForms = (e, tempIndex) => {
        forms.push("");
        index++;
        return (<div>
            <p>{e}</p>
            <form><input type="text" value={forms[tempIndex]} onChange={f=>setForms(modifyForm(f.target.value, tempIndex))} /></form>
        </div>);
    }

    const modifyForm = (newValue, tempIndex) => {
        forms[tempIndex] = newValue;
        const newForms = [];
        for (var i = 0; i < index; i++) {
            newForms[i] = forms[i];
        }
        return newForms;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            var attributes = "\'";
            for (var i =0; i < index - 1; i++) {
                attributes = attributes + forms[i] + "\', \'";
            }
            attributes = attributes + forms[index- 1] + "\'";
            const response = await fetch(`http://localhost:5321/game/insert/${location.state.table}/${attributes}`, {method: "PUT"});
            const jsonData = await response.json();
                if (jsonData.startsWith("error:")) {
                    navigate("/error", {state:{errorMessage : jsonData}});
                }
                else {
                    navigate("/riotemployee");
                }
        } catch(err) {
            console.error(err.message);
        }
    };

    return (
        <div className="riotemployee">
            <h1>Enter values to insert for {location.state.table}</h1>
            <div>
                {location.state.attributes.map(e => initForms(e, index))}
            </div>
            <div>
                <button onClick={onSubmit}>submit</button>
                <button onClick={() => navigate(-1)}>back</button>
            </div>
        </div>
    );
};