import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";




export const AggWithHaving = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [AllData, setAllData] = useState(null);
//    const [refreshAfterDelete, setRefreshAfterDelete] = useState(0);



    const effectGet = useEffect(() => {

        let url = `http://localhost:5321/game/groupby/Pro_players_belong%20PPB,%20Players4%20P4/PPB.team_name,%20MIN(P4.level)/PPB.ID%20=%20P4.ID%20AND%20PPB.server%20=%20P4.server%20AND%20P4.level%20%3E%20999/PPB.team_name/COUNT(*)%20%3E1`;

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

    if(location.state.action == "Aggregation with having"){
        
    return(

        <>
        <div className="aggwithhaving">
        <h1>Show the level of the lowest-level-pro-players whose level is at least 1000 for each e-sport teams that has at least 2 such pro-players.</h1>
        <button onClick={() => navigate(-1)}>back</button>
<table style={{marginLeft:"auto",marginRight:"auto",fontSize:"30px"}}>
    <tr>
    <th>Team Name</th>
    <th>Players Lowest Level</th>
    </tr>

    {AllData && AllData.map((entry) => {
        return <tr key={entry.team_name}>
        <td>{entry.team_name}</td> 
        <td>{entry.min}</td>
      </tr>
        })}
</table>

{!AllData && <span>Loading...</span>} 
</div>
        </>
    )

    }
}
