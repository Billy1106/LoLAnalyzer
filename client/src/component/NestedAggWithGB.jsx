import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";




export const NestedAggWithGB = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [AllData, setAllData] = useState(null);
//    const [refreshAfterDelete, setRefreshAfterDelete] = useState(0);



    const effectGet = useEffect(() => {

        let url = "http://localhost:5321/game/groupby/Players4 P4, Pro_players_belong PPB/PPB.team_name, MIN(P4.level), AVG(P4.level)/P4.level > 99 AND PPB.ID = P4.ID AND PPB.server = P4.server/PPB.team_name/AVG(P4.level) > (SELECT AVG(level) FROM Players4)";
        fetch(url, {method: "GET"})
        .then(
            (Response) => {
                return Response.json()
                .then(
                    (ResponseJson) => {setAllData(ResponseJson)}
                )
            }
          )
        }
        ,[]//dependency for rerunning this page
    );

    if(location.state.action == "Nested aggreagtion with group by"){
        
    return(

        <>
        <div className="nestedaggwithgb">
        <h1>Show the level of the lowest-level pro-players with level >= 100 for each team for which the average level of the pro-players which are at least 100 level is higher than the average of all pro-players across all e-sport-teams.</h1>
        <button onClick={() => navigate(-1)}>back</button>
<table style={{marginLeft:"auto",marginRight:"auto",fontSize:"30px"}}>
    <tr>
    <th>Team Name</th>
    <th>Players Lowest Level</th>
    <th>Average Pro-Player Level</th>
    </tr>

    {AllData && AllData.map((entry) => {
        return <tr key={entry.level}>
        <td>{entry.team_name}</td>
        <td>{entry.min}</td>
        <td>{entry.avg}</td>
      </tr>
        })}
</table>

{!AllData && <span>Loading...</span>} 
</div>
        </>
    )

    }
}
