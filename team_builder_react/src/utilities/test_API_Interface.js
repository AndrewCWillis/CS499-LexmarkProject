/*
    A file that can be used to call some of the API_Interface functions and view
    what they return.

    Note: So that you can run this file, you must add `"type": "module",` to the
    package.json file in the top-level directory of the react application. The
    React application will not run, though, with this included, so be sure to
    remove that line when you are done using this file and wish to run the front-end.
*/

import { SendTeamParameters,
        GetValidTeam,
        GetEmployeeList } from "./API_Interface.js";

SendTeamParameters(3, [{name: 'React', id: 1}, {name: 'Python', id: 2}])
.then((response) => {
    console.log("Response for Sending Team Parameters: {id: " + response.data.id + ", completeTeam: " + response.data.completeTeam + "}");
    GetValidTeam(response.data.id).then((team) => {
        console.log("Response for Getting a Built Team: " + JSON.stringify(team.data.team));
        GetEmployeeList(team.data.team).then(response => console.log("Response for Getting the Names of the People on the Team: " + JSON.stringify(response, null, 4)));
    });
});