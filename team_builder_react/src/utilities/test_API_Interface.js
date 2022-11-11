import { SendTeamParameters,
        GetValidTeam,
        GetEmployeeList } from "./API_Interface.js";

SendTeamParameters(3, [{name: 'React', id: 1}, {name: 'Python', id: 2}])
.then((teamId) => {
    console.log("Response for Sending Team Parameters: " + teamId);
    GetValidTeam(teamId).then((team) => {
        console.log("Response for Getting a Built Team: " + JSON.stringify(team.data.team));
        GetEmployeeList(team.data.team).then(response => console.log("Response for Getting the Names of the People on the Team: " + JSON.stringify(response, null, 4)));
    });
});

