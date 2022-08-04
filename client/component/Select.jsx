import React, { useState } from '../../../client-before/node_modules/@types/react'
import "../assets/styles/select.scss"

export const Select = () => {
    const [select, setSelect] = useState("name,function");
    const [from, setFrom] = useState("items");
    const [where, setWhere] = useState("true");
    const [data, setData] = useState([]);
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = from + "/" + select + "/" + where;
            const response = await fetch("http://localhost:5321/game/get/" + body);
            const jsonData = await response.json();
            setData(jsonData)
        } catch (error) {
            console.log("error")
            console.log(error.message)
        }
    }
    const showResult = () => {
        console.log(data)
        if (data.length === 0) {
            return <p>nothing</p>
        } else {
            return <tbody>

                {Object.keys(data[0]).map(e =>
                    <tr className='attribute'>
                        <th>{e}</th>
                        {data.map(tuple =>
                            <td className='box'>{JSON.stringify(tuple[e])}
                            </td>
                        )}
                    </tr>

                )}

            </tbody>;
        }
    }
    return (
        <div className='select'>
            <form onSubmit={onSubmitForm}>
                <div className='box'>
                    <p>Select</p>
                    <input type={"text"} value={select} onChange={e => { setSelect(e.target.value) }} />
                </div>
                <div className='box'>
                    <p>From</p>
                    <input type={"text"} value={from} onChange={e => { setFrom(e.target.value) }} />
                </div>
                <div className='box'>
                    <p>Where</p>
                    <input type={"text"} value={where} onChange={e => { setWhere(e.target.value) }} />
                </div>
                <button>submit</button>
            </form>
            <table>
                {showResult()}
            </table>
        </div>
    )
}
