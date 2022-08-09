import React, { useState, useEffect } from 'react'
import "../assets/styles/select.scss"
import { useNavigate, useLocation } from "react-router-dom";
const joinHelper = require("./JoinHelper.json")
export const Join = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [tables, setTables] = useState([]);//list of tables
    const [keys, setKeys] = useState({})//selected tables
    const [property, setProperty] = useState([])//each attribute's property (checked? condtions?)
    const [tuples, setTuples] = useState([])//result of select
    const [fetching, setFetching] = useState(false)//is currently fetching or not (using for loading)

    const fetchData = async (select, from, where) => {//getting data
        try {
            const response = await fetch(`http://localhost:5321/game/get/${from}/${select}/${where}`);
            const jsonData = await response.json();
            return jsonData
        } catch (error) {
            console.log("error")
            console.log(error.message)
        }
    }

    const getResult = async (e) => {//get join data
        setFetching(true)
        e.preventDefault();
        try {
            var select = ""
            var where = "";
            Object.keys(keys).map(table => {
                Object.keys(property["obj"][table]).forEach(function (key) {
                    if (property["obj"][table][key]["checked"]) {
                        select = table + "." + key + "," + select
                        if (property["obj"][table][key]["condition"] != ""){
                            console.log(table)
                            where = table + "." + key + property["obj"][table][key]["equality"] + property["obj"][table][key]["condition"] + " AND " + where
                        }
                    }
                })

            })
            
            const firstTable = Object.keys(keys)[0];
            const secondTable = Object.keys(keys)[1];
            const secondKey = keys[firstTable][0][secondTable];
            const firstKey = keys[secondTable][0][firstTable];
            const from = firstTable + " join " + secondTable + " on " + firstTable + "." + firstKey + " = " + secondTable + "." + secondKey;
            select = select.slice(0, -1);
            where += "true"
            console.log(`http://localhost:5321/game/get/${from}/${select}/${where}`)
            const response = await fetch(`http://localhost:5321/game/get/${from}/${select}/${where}`)
            const jsonData = await response.json();
            setTuples(jsonData)
        } catch (error) {
            console.log("error!")
            console.log(error.message)
            setTuples([])
        } finally {
            setFetching(false)

        }
    }

    const handleOnCheckbox = (e, index, entity) => {
        setProperty({ obj: { ...property["obj"], [entity]: { ...property["obj"][entity], [index]: { ...property["obj"][entity][index], checked: !property["obj"][entity][index]["checked"] } } } })
    }
    const handleOnTextbox = (e, index, entity) => {
        
        setProperty({ obj: { ...property["obj"], [entity]: { ...property["obj"][entity], [index]: { ...property["obj"][entity][index], condition: e.target.value } } } })
    }
    const handleEquality = (e, index, entity) => {

        setProperty({ obj: { ...property["obj"], [entity]: { ...property["obj"][entity], [index]: { ...property["obj"][entity][index], equality: e.target.value } } } })
    }
    const initialTable = async () => {
        const tables = await fetchData("table_name", "INFORMATION_SCHEMA.TABLES", "TABLE_SCHEMA='public'");
        var tableInfo = {}
        for (let i = 0; i < tables.length; i++) {
            tableInfo[tables[i].table_name] = { picked: false, isKey: true };
        }
        setTables(tableInfo);
    }

    const pickTables = async (tableName) => {//when button clicked
        var newTables = { ...tables, [tableName]: { picked: !tables[tableName]["picked"], isKey: tables[tableName]["isKey"] } };

        var joinTables = []
        var tempKeys = keys;
        await Promise.all(Object.keys(newTables).map(async (e) => {

            newTables[e]["isKey"] = false;
            if (newTables[e]["picked"]) {
                newTables[e]["isKey"] = true;
                if (tempKeys[e] === undefined) {
                    const fetchedData = joinHelper[e];//get tables being referenced or referencing
                    if (fetchedData != undefined) {
                        joinTables.push(fetchedData)
                        tempKeys = { ...tempKeys, [e]: joinTables }
                    }
                }
            } else {
                newTables[e]["picked"] = false
                const temp = tempKeys;
                delete temp[e]
                tempKeys = temp;
            }
        }))
        {
            Object.keys(tempKeys).map(table => {
                Object.keys(tempKeys[table]).map(index => {
                    Object.keys(tempKeys[table][index]).map(e => {
                        newTables[e]["isKey"] = true;
                    })
                })
            })
        }

        if (Object.keys(tempKeys).length === 2) {
            Object.keys(newTables).map(e => {
                if (!newTables[e]["picked"]) {
                    newTables[e]["isKey"] = false;
                }
            })
        } else {
            if (Object.keys(tempKeys).length === 0) {
                initialTable();
            }

        }
        setKeys(tempKeys);
        setTables(newTables);
    }

    useEffect(() => {
        const initializeData = async () => {
            const tables = await fetchData("table_name", "INFORMATION_SCHEMA.TABLES", "TABLE_SCHEMA='public'");
            var tableInfo = {}
            for (let i = 0; i < tables.length; i++) {
                tableInfo[tables[i].table_name] = { picked: false, isKey: true };
            }

            setTables(tableInfo);

            const col = await fetchData("column_name", "INFORMATION_SCHEMA.COLUMNS", `TABLE_SCHEMA='public' AND table_name='items'`);
            var obj = {}
            var initialTable = {}
            for (let i = 0; i < col.length; i++) {
                initialTable[col[i].column_name] = { checked: false, condition: "", equality: "=" };
            }
            obj["items"] = initialTable;
            setProperty({ obj })
        }
        initializeData().catch(console.error)
    }, []);
    useEffect(() => {
        const updateTable = async () => {
            var obj = {}
            await Promise.all(Object.keys(keys).map(async (table) => {
                const col = await fetchData("column_name", "INFORMATION_SCHEMA.COLUMNS", `TABLE_SCHEMA='public' AND table_name='${table}'`);
                var newTable = {}
                for (let i = 0; i < col.length; i++) {
                    newTable[col[i].column_name] = { checked: false, condition: "", equality: "=" };
                }
                obj[table] = newTable
                console.log(newTable)
            }))
            setProperty({ obj })
        }
        updateTable()
    }, [keys]);

    return (
        <div style={{ textAlign: "center", fontSize: "20px" }} className='select'>
            <h1>Select A Table From Below</h1>
            <table style={{ marginLeft: "20%", marginRight: "20%" }}>
                <tr>
                    {(tables.length === 0) ? <p>loading</p> : Object.keys(tables).map(e => {
                        return <button onClick={() => pickTables(e)} disabled={fetching || !tables[e]["isKey"]} style={tables[e]["picked"] ? { backgroundColor: "green" } : {}}>{JSON.stringify(e).replace(/\"/g, "")}</button>
                    }
                    )}
                </tr>
            </table>
            <button onClick={() => navigate(-1)}>back</button>
            <form onSubmit={getResult} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {
                    (Object.keys(keys).length === 0) ? <p>Please select tables</p> :
                        Object.keys(keys).map(entity => {
                            return (property["obj"] === undefined) ? <p>wait...</p> :
                                <div>
                                    <p style={{ marginLeft: "10px", marginRight: "10px" }}>{entity}</p>
                                    <div>
                                        {
                                            (property["obj"][entity] === undefined) ? <p>Connection failed.Select table again{console.log(property["obj"])}</p> :
                                                Object.keys(property["obj"][entity]).map(attribute => {
                                                    return (<div>{attribute}

                                                        <select name="equality" onChange={(e) => handleEquality(e, attribute, entity)} value={property["obj"][entity][attribute]["equality"]} disabled={!property["obj"][entity][attribute]["checked"]} >
                                                            <option value="="> {"="} </option>
                                                            <option value="<="> {"<="} </option>
                                                            <option value="<"> {"<"} </option>
                                                            <option value=">="> {"=>"} </option>
                                                            <option value=">"> {">"} </option>
                                                        </select>
                                                        <input type="textbox" disabled={!property["obj"][entity][attribute]["checked"]}
                                                            onChange={(e) => handleOnTextbox(e, attribute, entity)}
                                                            value={property["obj"][entity][attribute]["condition"]} />

                                                        <input type="checkbox" value={attribute} onChange={(e) => handleOnCheckbox(e, attribute, entity)}
                                                            checked={property["obj"][entity][attribute]["checked"]} />
                                                    </div>)
                                                })
                                        }
                                    </div>
                                </div>
                        })
                }

                <div style={{ display: "flex" }}>
                    <button type='submit' disabled={keys[Object.keys(keys)[0]] === undefined || keys[Object.keys(keys)[1]] === undefined}
                    >Join with</button>
                    <p >{(keys[Object.keys(keys)[0]] === undefined || keys[Object.keys(keys)[1]] === undefined) ? <p></p> :
                        Object.keys(keys[Object.keys(keys)[0]][0]).map(first => {
                            if (Object.keys(keys).includes(first)) {
                                return <p>{keys[Object.keys(keys)[0]][0][first]}</p>
                            }
                        })}</p>
                </div>

            </form>
            <p>Result:</p>
            <table style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {!fetching ? tuples.length === 0 ? <p>no data</p> :
                    <div>
                        <tr>
                            {
                                Object.keys(tuples[0]).map(index => {
                                    return <th>{index}</th>;
                                })
                            }
                        </tr>
                        {
                            Object.keys(tuples).map(index => {
                                return <tr >{Object.keys(tuples[index]).map(e => {
                                    return <td style={{ border: "1px solid black" }}>{tuples[index][e]}</td>
                                })}</tr>
                            })
                        }
                    </div> : <p>Getting...</p>}



            </table>
        </div>
    )
}

