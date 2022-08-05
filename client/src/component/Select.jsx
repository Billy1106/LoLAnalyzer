import React, { useState, useEffect } from 'react'
import "../assets/styles/select.scss"

export const Select = () => {

    const [tables, setTables] = useState([]);//list of tables
    const [table, setTable] = useState([]);//selected tables
    const [property, setProperty] = useState([])//each attribute's property (checked? condtions?)
    const [tuples,setTuples] = useState([])//result of select
    const [fetching,setFetching] = useState(false)//is currently fetching or not


    const fetchData = async (select, from, where) => {
        try {
            const response = await fetch(`http://localhost:5321/game/get/${from}/${select}/${where}`);
            const jsonData = await response.json();
            return jsonData
        } catch (error) {
            console.log("error")
            console.log(error.message)
        }
    }

    const getResult = async (e) => {
        setFetching(true)
        e.preventDefault();
        try {
            var select = ""
            var where = "";
            Object.keys(property["obj"]).forEach(function (key) {
              
                if (property["obj"][key]["checked"]) {
                    select = key + "," + select
                    if (property["obj"][key]["condition"] != "")
                        where = key + property["obj"][key]["equality"] + property["obj"][key]["condition"] + " AND " + where
                }
            });
            const from = table;
            select = select.slice(0, -1);
            console.log(property)
            where += "true"
            
            console.log(`http://localhost:5321/game/get/${from}/${select}/${where}`)
            const response = await fetch(`http://localhost:5321/game/get/${from}/${select}/${where}`)
            
            const jsonData = await response.json();
            console.log("obj")
            // console.log(Object.values(jsonData))
    
            setTuples(jsonData)
         

        } catch (error) {
            console.log("error!")
            console.log(error.message)
            setTuples([])
            
            
        } finally{
            setFetching(false)
            
        }
    }

    const handleOnCheckbox = (e) => {

        setProperty({ obj: { ...property["obj"], [e.target.value]: { ...property["obj"][e.target.value], checked: !property["obj"][e.target.value]["checked"] } } })
    }
    const handleOnTextbox = (value, index) => {
        const keys = Object.keys(property["obj"]);
       
        setProperty({ obj: { ...property["obj"], [index]: { ...property["obj"][index], condition: value } } })
    }
    const handleEquality = (value,index)=>{
        setProperty({ obj: { ...property["obj"], [index]: { ...property["obj"][index], equality: value } } })
    }


    const getTable = async (tableName) => {
        setTable(tableName);
    }
    useEffect(() => {
        const initializeData = async () => {
            setTables(await fetchData("table_name", "INFORMATION_SCHEMA.TABLES", "TABLE_SCHEMA='public'"));
            setTable("items")
            const col = await fetchData("column_name", "INFORMATION_SCHEMA.COLUMNS", `TABLE_SCHEMA='public' AND table_name='items'`);
            var obj = {}
            for (let i = 0; i < col.length; i++) {
                obj[col[i].column_name] = { checked: false, condition: "",equality:"=" };
            }
            setProperty({ obj })
            // console.log("new obj")
            // console.log({ obj })

        }
        initializeData().catch(console.error)
    }, []);
    useEffect(() => {
        (async () => {
            const col = await fetchData("column_name", "INFORMATION_SCHEMA.COLUMNS", `TABLE_SCHEMA='public' AND table_name='${table}'`);
            var obj = {}
            for (let i = 0; i < col.length; i++) {
                obj[col[i].column_name] = { checked: false, condition: "",equality:"=" };
            }
            // console.log("new obj")
            // console.log({obj})
            setProperty({ obj })
            setTuples([])

        })();

    }, [table]);
    return (
        <div style={{textAlign:"center",fontSize:"20px"}} className='select'>
            <h1>Select A Table From Below</h1>
            <table style={{marginLeft:"20%",marginRight:"20%"}}>
                {(tables.length === 0) ? <p>loading</p> : Object.keys(tables[0]).map(e =>
                    <tr>
                        {tables.map(tuple =>
                            <button style={{marginLeft:"5px",marginRight:"5px",marginTop:"5px",fontSize:"20px"}} className='box' onClick={() => getTable(tuple[e])}>{JSON.stringify(tuple[e]).replace(/\"/g, "")}
                            </button>
                        )}
                    </tr>
                )}
            </table>
            <table style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                {(property["obj"] === undefined) ? <p>loading</p> :
                    <div>
                        <p>Selected:{table}</p>
                
                        <form onSubmit={getResult}>
                            {
                                Object.keys(property["obj"]).map(attribute => <div>{attribute}
                                  <select name="equality" onChange={(e)=>handleEquality(e.target.value,attribute)} value={property["obj"][attribute]["equality"]} disabled={!property["obj"][attribute]["checked"]} >
                                        <option value="="> {"="} </option>
                                        <option value="<="> {"<="} </option>
                                        <option value="<"> {"<"} </option>
                                        <option value=">="> {"=>"} </option>
                                        <option value=">"> {">"} </option>
                                    </select>
                                    <input type="textbox" disabled={!property["obj"][attribute]["checked"]}
                                        onChange={(e) => handleOnTextbox(e.target.value, attribute)}
                                        value={property["obj"][attribute]["condition"]} />
                                    <input type="checkbox" value={attribute} onChange={(e) => handleOnCheckbox(e, attribute)}
                                        checked={property["obj"][attribute]["checked"]} />
                                </div>)
                            }
                            <button type='submit'>get</button>
                        </form>
                    </div>
                }
            </table>
            <table style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
           
                {!fetching?tuples.length===0?<p>no data</p>:
                    <div>
                    <tr>
                        {
                            Object.keys(tuples[0]).map(index=>{
                                return <th>{index}</th>;
                            })
                        }
                    </tr>
                    {
                        Object.keys(tuples).map(index=>{
                            return <tr >{Object.keys(tuples[index]).map(e=>{
                                return <td style={{border: "1px solid black"}}>{tuples[index][e]}</td>
                            })}</tr>
                        })
                    }
                    </div>:<p>Getting...</p>}



            </table>
        </div>
    )
}

