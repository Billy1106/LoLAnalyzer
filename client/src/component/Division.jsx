import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Division = () => {

    const [teams, setTeams] = useState([{ team_name: "blank", world_rank: 0 }])

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5321/game/get/Esport_Teams et/DISTINCT et.Team_name, et.World_rank/" +
                "NOT EXISTS ((SELECT Company_name FROM Sponsors) EXCEPT" +
                "(SELECT company_name FROM Esport_Sponsors es WHERE et.Team_name = es.team_name))", { method: "GET" });
            const jsonData = await response.json();
            return jsonData;
        }
        fetchData().then((data) => {setTeams(data);});
    }, []);

    return (
        <div className="division">
            <h1>Here are all the esports teams that were sponsored by every company.</h1>
            <table style={{fontSize:"30px", marginLeft:"auto", marginRight:"auto"}}>
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
            <button onClick={() => navigate(-1)} style={{fontSize:"30px"}}>Back</button>
        </div>
    );
};