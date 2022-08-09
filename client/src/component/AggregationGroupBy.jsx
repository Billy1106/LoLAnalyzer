import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AggregationGroupBy = () => {

    const [teams, setTeams] = useState([{ server: "blank", level: 0 }])

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5321/game/get/Players4/server, AVG(level) AS level/" +
                "True GROUP BY server", { method: "GET" });
            const jsonData = await response.json();
            return jsonData;
        }
        fetchData().then((data) => {setTeams(data);});
    }, []);

    return (
        <div className="division">
            <h1>Here is the average level of the players in each server.</h1>
            <table style={{marginLeft:"auto",marginRight:"auto",fontSize:"30px"}}>
                <tr>
                    <td>server</td>
                    <td>level</td>
                </tr>
                {teams.map((entry) => {
                        return <tr key={entry.server}>
                            <td>{entry.server}</td>
                            <td>{entry.level}</td>
                        </tr>
                    })}
            </table>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};