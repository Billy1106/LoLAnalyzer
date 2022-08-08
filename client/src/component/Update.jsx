import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Update = () => {

    const [forms, setForms] = useState([]);
    var index = 0;
    const [newKeyForm, setNewKeyForm] = useState("");

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
            var value ="";
            var condition = "";

            for (var i = 0; i < location.state.attributes.length; i++) {
                if (location.state.attributes[i] === location.state.primaryKey) {
                    condition += location.state.attributes[i] + "=\'" + forms[i] + "\'";
                    value += location.state.attributes[i] + "=\'" + newKeyForm + "\'";
                } else {
                    value += location.state.attributes[i] + "=\'" + forms[i] + "\'";
                }
                if (i != location.state.attributes.length - 1) {
                    value += ",";
                }
            }

            const check = await fetch(`http://localhost:5321/game/get/${location.state.table}/*/${condition}`, {method: "GET"});
            const checkResult = await check.json();
            if (checkResult.length === 0) {
                navigate("/error", {state:{errorMessage : `Sorry, but an entry in the table ${location.state.table} with 
                                                            ${condition} does not exist!`}});
            } else {

                const response = await fetch(`http://localhost:5321/game/update/${location.state.table}/${value}/${condition}`, {method: "PUT"});
                const jsonData = await response.json();
                if (jsonData.startsWith("error:")) {
                    navigate("/error", {state:{errorMessage : jsonData}});
                }
                else {
                    navigate("/riotemployee");
                }
            }
        } catch(err) {
            console.error(err.message);
        }
    };

    return (
        <div className="riotemployee">
            <h1>Enter values to update for {location.state.table}</h1>
            <div>
                {location.state.attributes.map(e => initForms(e, index))}
                <p>{"new " + location.state.primaryKey}</p>
                <form><input type="text" value={newKeyForm} onChange={f=>setNewKeyForm(f.target.value)} /></form>
            </div>
            <div>
                <button onClick={onSubmit}>submit</button>
                <button onClick={() => navigate(-1)}>back</button>
            </div>
        </div>
    );
};