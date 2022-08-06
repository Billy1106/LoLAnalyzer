import React from "react";
import { useNavigate } from "react-router-dom";

export const ChooseTable = () => {

    const navigate = useNavigate();

    // key is the name of the key attribute. Doing this, because I couldn't
    // figure out how to get the names of the primary keys from the server. 
    // Also, I'm assuming there is only one primary key attribute.
    // Also, Keys should be all lowercase only.
    const getAttributes = async (key,...tableNames) => {
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
            navigate("/riotemployee/choosetable/insert", {state:
                {table: tableNames[0],
                attributes: uniqueAttributeNames,
                primaryKey: key}});
            /*
            navigate("/riotemployee/choosetable/insert", {state:
                {table: (isNaN((parseFloat(tableNames[0].charAt(tableNames[0].length - 1)))) ?
                    tableNames[0] : 
                    tableNames[0].substring(0, tableNames[0].length - 1)), // if last char is a number (in case we have multiple tables), remove it
                attributes: uniqueAttributeNames}});
                */
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="choosetable">
            <h1>Please choose an option.</h1>
            <button onClick = {() => getAttributes("rp_cost","Champion1")}>Champions</button>
            <button onClick = {() => getAttributes("name","Items")}>Items</button>
            <button onClick = {() => getAttributes("ability_name","Abilities_has")}>Abilities</button>
            <button onClick={() => navigate(-1)}>back</button>
        </div>
    );
};

