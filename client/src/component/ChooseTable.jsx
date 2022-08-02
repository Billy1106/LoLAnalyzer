import React from "react";
import { useNavigate } from "react-router-dom";

export const ChooseTable = () => {

    const navigate = useNavigate();

    const getAttributes = async (...tableNames) => {
        try {
            /* from https://stackoverflow.com/questions/8430336/get-keys-of-json-object-in-javascript
            for(var i in jsonData){
                var key = i;
                var val = jsonData[i];
                for(var j in val){
                    var sub_key = j;
                    var sub_val = val[j];
                    console.log(sub_key);
                }
            }
            */
            const attributeNames = new Set();

            for (const tableName of tableNames) {
                const response = await fetch("http://localhost:5321/game/get/" + tableName + "/*/true");
                const jsonData = await response.json();

                for(var i in jsonData[0]){ // assume jsonData is not empty
                    attributeNames.add(i);
                }
            }

            const uniqueAttributeNames = [...attributeNames]; 

            navigate("/riotemployee/choosetable/update", {state:
                {table: (isNaN((parseFloat(tableNames[0].charAt(tableNames[0].length - 1)))) ?
                    tableNames[0] : 
                    tableNames[0].substring(0, tableNames[0].length - 1)), // if last char is a number (in case we have multiple tables), remove it
                attributes: uniqueAttributeNames}});
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="choosetable">
            <h1>Please choose an option.</h1>
            <button onClick = {() => getAttributes("Champion1", "Champion3", "Champion5","Champion6")}>Champions</button>
            <button onClick = {() => getAttributes("Items")}>Items</button>
            <button onClick = {() => getAttributes("Abilities_has")}>Abilities</button>
            <button onClick={() => navigate(-1)}>back</button>
        </div>
    );
};

