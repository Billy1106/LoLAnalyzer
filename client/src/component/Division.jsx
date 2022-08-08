import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Division = () => {

    const [teams, setTeams] = useState([{ team_name: "blank", world_rank: 0 }]) // state auto updates!!!!!

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5321/game/get/Esport_Teams et/DISTINCT et.Team_name, et.World_rank/" +
                "NOT EXISTS ((SELECT Company_name FROM Sponsors) EXCEPT" +
                "(SELECT company_name FROM Esport_Sponsors es WHERE et.Team_name = es.team_name))", { method: "GET" });
            //const response = await fetch("http://localhost:5321/game/get/Esport_Teams/*/True",{method:"GET"});
            //const response = await fetch("http://localhost:5321/game/get/Esport_Sponsors/*/True",{method:"GET"});
            //const response = await fetch("http://localhost:5321/game/insert/Esport_Sponsors/'Louis Vuitton','T1'",{method:"PUT"});
            const jsonData = await response.json();
            return jsonData;
        }
        fetchData().then((data) => {setTeams(data);});
    }, []);

    return (
        <div className="division">
            <h1>Here are all the esports teams that were sponsored by every company.</h1>
            <table>
                <tr>
                    <td>team name</td>
                    <td>world rank</td>
                </tr>
                {teams.map((entry) => {
                        return <tr key={entry.team_name}>
                            <td>{entry.team_name}</td>
                            <td>{entry.world_rank}</td>
                        </tr>
                    })}
            </table>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};