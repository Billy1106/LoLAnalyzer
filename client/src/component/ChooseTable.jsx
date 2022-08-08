import React from "react";
import { useNavigate,useLocation } from "react-router-dom";

export const ChooseTable = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // if(location.state.action == "(to update)."){

    //     return (
    //         <div className="choosetable">
    //             <h1>Please choose an option{location.state.action}</h1>
    //             <button onClick = {() => navigate("/riotemployee/choosetable/update", {state:{table: "champion"}})}>Champions</button>
    //             <button onClick = {() => navigate("/riotemployee/choosetable/update", {state:{table: "item"}})}>Items</button>
    //             <button onClick = {() => navigate("/riotemployee/choosetable/update", {state:{table: "ability"}})}>Abilities</button>
    //             <button onClick={() => navigate(-1)}>back</button>
    //         </div>
    //     );

    // }
    
    if(location?.state?.action == "(to delete)."){

        return (
            <div className="choosetable">
                <h1>Please choose an option{location.state.action}</h1>
                <button onClick = {() => navigate("/riotemployee/choosetable/delete", {state:{table: "champion"}})}>Champions</button>
                <button onClick = {() => navigate("/riotemployee/choosetable/delete", {state:{table: "items"}})}>Items</button>
                <button onClick = {() => navigate("/riotemployee/choosetable/delete", {state:{table: "abilities_has"}})}>Abilities</button>
                <button onClick={() => navigate(-1)}>back</button>
            </div>
        );

    }


    // key is the key attribute. (assume there is only one)
    // tableNames are the tables you want to choose. (this function allows multiple,
    // but just use it with one only.)
    const getAttributes = async (key,...tableNames) => {
        try {
            const attributeNames = new Set();

            for (const tableName of tableNames) {
                const response = await fetch("http://localhost:5321/game/get/" + tableName + "/*/true");
                const jsonData = await response.json();

                for(var i in jsonData[0]){ // assume jsonData is not empty
                    attributeNames.add(i);
                }
            }

            const uniqueAttributeNames = [...attributeNames]; 
            navigate(`/riotemployee/choosetable/${location.state.action}`, {state:
                {table: tableNames[0],
                attributes: uniqueAttributeNames,
                primaryKey: key}});
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

