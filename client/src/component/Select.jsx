import React, { useState, useEffect } from 'react'
import "../assets/styles/select.scss"

export const Select = () => {
    // const [select, setSelect] = useState("name,function");
    // const [from, setFrom] = useState("items");
    // const [where, setWhere] = useState("true");
    const [data, setData] = useState([]);
    const [tuples, setTuples] = useState([]);
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState([]);
    const [columns, setColumns] = useState([]);
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

    const showTables = () => {
        if (tables.length === 0) {
            return <p>Loading</p>
        } else {
            return <tbody>
                {Object.keys(tables[0]).map(e =>
                    <tr className='attribute'>

                        {tables.map(tuple =>
                            <button className='box' onClick={() => getTable(tuple[e])}>{JSON.stringify(tuple[e])}
                            </button>
                        )}
                    </tr>

                )}

            </tbody>;
        }
    }
    const showTable = () => {
    
        if (columns.length === 0) {
            return <p>Loading</p>
        } else {
            return <tbody>
                <p>{table}</p>
                {Object.keys(columns[0]).map(e =>
                    <tr className='attribute'>
                        {columns.map(tuple =>
                            <button className='box' onClick={() => getTuples(tuple[e])}>{JSON.stringify(tuple[e])}
                            </button>
                        )}
                    </tr>

                )}
            </tbody>;
        }
    }

    const showTuples = () => {
  
        if (tuples.length === 0) {
            return <p>Loading</p>
        } else {
            return <tbody>
                <p>data</p>
                {Object.keys(tuples[0]).map(e =>
                    <tr className='attribute'>
                        {tuples.map(tuple =>
                            <tr className='box' >{JSON.stringify(tuple[e])}
                            </tr>
                        )}
                    </tr>

                )}
            </tbody>;
        }
    }

    const getTable = async (tableName) => {
        setTable(tableName);
    }
    const getTuples = async(attributeName) =>{
        console.log("tuples")
        console.log(attributeName)
        setTuples((await fetchData(attributeName, table, `true`)))
    }

    useEffect(() => {
        const initializeData = async () => {
            setTables(await fetchData("table_name", "INFORMATION_SCHEMA.TABLES", "TABLE_SCHEMA='public'"));
            setTable("items")
            setColumns(await fetchData("column_name", "INFORMATION_SCHEMA.COLUMNS", `TABLE_SCHEMA='public' AND table_name='items'`))
            setTuples(await fetchData("name", "items", `true`))
        }
        initializeData().catch(console.error)
    }, []);

    useEffect(() => {
        (async () => {
            const col = await fetchData("column_name", "INFORMATION_SCHEMA.COLUMNS", `TABLE_SCHEMA='public' AND table_name='${table}'`);
            setColumns(col)
            setTuples([])
            console.log("now column")
            console.log(columns)
        })();
    }, [table]);
    

    return (
        <div className='select'>
            <table>
                {showTables()}
            </table>
            <table>
                {showTable()}
            </table>
            
            <table>
                {showTuples()}
            </table>
        </div>
    )
}

