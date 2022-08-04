
import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

//`http://localhost:5321/game/get/${from}/${select}/${where}`


export const Delete = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [AllData, setAllData] = useState(null);
    const effect = useEffect(() => {

        let url = `http://localhost:5321/game/get/${location.state.table}/*/true`;

        if(location.state.table == 'champion'){
            url = 'http://localhost:5321/game/get/Champion1%20C1,%20Champion3%20C3,%20Champion5%20C5,%20Champion6%20C6/*/C1.RP_cost%20=%20C3.RP_cost%20AND%20C3.years_since_release%20=%20C5.years_since_release%20AND%20C3.years_since_release%20=%20C6.years_since_release';
        }
        fetch(url)
        .then(
            (employeeResponse) => {
                return employeeResponse.json()
                .then(
                    (employeeJson) => {setAllData(employeeJson)}
                )
            }
        )
        }
        ,[]
      );

      
return(
    <>
    <h1>Choose values to delete for {location.state.table}</h1>
    {location.state.table == 'champion' && <table>
  <tr>
    <th>Name</th>
    <th>Years since release</th>
    <th>Number of skins</th>
    <th>RP cost</th>
    <th>BE cost</th>
  </tr>
    {AllData && AllData.map((entry) => {
        return <tr key={entry.name}>
        <td>{entry.name}</td>
        <td>{entry.years_since_release}</td>
        <td>{entry.num_skins}</td>
        <td>{entry.rp_cost}</td>
        <td>{entry.be_cost}</td>
      </tr>
        })}
</table>}

{location.state.table == 'items' && <table>
  <tr>
    <th>Name</th>
    <th>Function</th>
    <th>Cost</th>

  </tr>
    {AllData && AllData.map((entry) => {
        return <tr key={entry.name}>
        <td>{entry.name}</td>
        <td>{entry.function}</td>
        <td>{entry.cost}</td>
      </tr>
        })}
</table>}


{location.state.table == 'abilities_has' && <table>
  <tr>
    <th>Ability Name</th>
    <th>Champion Name</th>
    <th>Effect</th>
    <th>Cooldown</th>

  </tr>
    {AllData && AllData.map((entry) => {
        return <tr key={entry.ability_name}>
        <td>{entry.ability_name}</td>
        <td>{entry.champion_name}</td>
        <td>{entry.effect}</td>
        <td>{entry.cooldown}</td>
      </tr>
        })}
</table>}

   {!AllData && <span>Loading...</span>} 
    </>

)


}

// import React from 'react'
// import { useState, useEffect } from 'react'

// export const Delete = () => {
//     const [data, setData] = useState([[]]);
//     const [tuples, setTuples] = useState([]);
//     const [tables, setTables] = useState([]);
//     const [table, setTable] = useState([]);
//     const [columns, setColumns] = useState([]);
//     const handleDelete = async (tuple) => {
//         // console.log(tuple[0])
//         // console.log(columns[0].column_name)
//         try {
//             const response = await fetch(`http://localhost:5321/game/delete/${table}/${columns[0].column_name}/${tuple[0]}`, {
//                 method: "DELETE"
//               });
//             const jsonData = await response.json();
//             console.log("re-render")
//             const tup = await fetchData("*", `${table}`, `true`);
//             setTuples(tup)
//             console.log(tuples);
            
            
//         } catch (error) {
//             console.log("error")
//             console.log(error.message)
//         }
//     }

//     const fetchData = async (select, from, where) => {
//         try {
//             const response = await fetch(`http://localhost:5321/game/get/${from}/${select}/${where}`);
//             const jsonData = await response.json();
//             return jsonData
//         } catch (error) {
//             console.log("error")
//             console.log(error.message)
//         }
//     }
//     const showTables = () => {
//         if (tables.length === 0) {
//             return <p>Loading</p>
//         } else {
//             return <tbody>
//                 {Object.keys(tables[0]).map(e =>
//                     <tr className='attribute'>
//                         {tables.map(tuple =>
//                             <button className='box' onClick={() => getTable(tuple[e])}>{JSON.stringify(tuple[e]).replace(/\"/g, "")}
//                             </button>
//                         )}
//                     </tr>
//                 )}

//             </tbody>;
//         }
//     }
    
//     const showTable = () => {
//         if (columns.length === 0) {
//             return <p>Loading</p>
//         } else {
//             return <div>
//                 <p>{table}</p>
//              <div>{data.map(e=><tr>{e.map(x=><td>{x}</td>)}<button onClick={()=>handleDelete(e)}>Delete</button></tr>)}</div>
//             </div>
//         }
//     }
//     const showTuples = () => {
//         if (tuples === undefined || tuples.length === 0) {
//             return <p>Loading</p>
//         } else {
//             const tempData = []
//             var tempAttributes = []
//             {Object.keys(tuples[0]).map(e =>
//                     {   
//                         tuples.map(tuple => {
//                             tempAttributes.push(JSON.stringify(tuple[e]).replace(/\"/g, ""))
                      
//                         });
                       
//                         // console.log(tempAttributes)
//                         tempData.push(tempAttributes);
//                         tempAttributes = []
//                     }
//             )
//             }
//             // console.log("data")
//             // console.log(tempData)
//             setData(tempData[0].map((_, colIndex) => tempData.map(row => row[colIndex])))
            
//         }

//     }
//     const getTable = async (tableName) => {
//         setTable(tableName);
//     }
//     useEffect(() => {
//         const initializeData = async () => {
//             setTables(await fetchData("table_name", "INFORMATION_SCHEMA.TABLES", "TABLE_SCHEMA='public'"));
//             setTable("items")
//             setColumns(await fetchData("column_name", "INFORMATION_SCHEMA.COLUMNS", `TABLE_SCHEMA='public' AND table_name='items'`))
//             setTuples(await fetchData("*", "items", `true`))
//         }
//         initializeData().catch(console.error)
//     }, []);
//     useEffect(() => {
//         (async () => {
//             const col = await fetchData("column_name", "INFORMATION_SCHEMA.COLUMNS", `TABLE_SCHEMA='public' AND table_name='${table}'`);
//             setColumns(col)
//             setData([[]])
//             setTuples(await fetchData("*", `${table}`, `true`))
            
//         })();

//     }, [table]);
//     useEffect(() => {
//         showTuples()
//     },[tuples])


//     return (
//     <div>
//     <table>
//             {showTables()}
//             </table>
//             <table>
//                 {showTable()}
//             </table>
        
    
//     </div>
//     )
// }
// >>>>>>> develop
