import axios from "axios";

// https://stackoverflow.com/questions/48960497/http-get-request-with-axios-gets-sent-with-the-local-host-ip-at-the-beginning-of#:~:text=You%20can%20easily%20fix%20it%20by%20adding%20the%20http%3A//%20prefix%3A
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

/*
    CheckListArrayToString takes an array of objects as a parameter and returns
        a comma separated string where each value in the string is the name of a skill
        in the passed in array.
     
    parameters: listOfSkills - an array of objects. Each element is { name: string, id: int }
                    (as given by the CheckList component) and represents a
                    technical skill that the build team should posses, if possible.
    
    returns: a comma separated string of skills
*/
const CheckListArrayToString = (listOfSkills) => {
    var skillsString = "";

    listOfSkills.forEach(skill => {
        if (skillsString.length === 0){
            skillsString = skill.name;
        } else {
            skillsString = skillsString + "," + skill.name;
        }
    });

    return skillsString;
}

/*
    SendPersonToBackEnd is an asynchronous function that takes an object as a
        parameter and sends that object to the back-end as JSON in an HTTP
        request. This function will post a new person and their information to
        the back-end, which will then store it in the database.
     
    parameters: person - an object (or dictionary) to send to the back-end
                ex: {
                        firstName: '',
                        lastName: '',
                        skills: [], each element is { name: string, id: int }
                        traits: [], each element is { name: string, score: int }
                    }
    
    returns: if no server errors, a Promise that is the response from the server (https://axios-http.com/docs/res_schema).
             if there was an error in the request, then the Axios error in a Promise.

    What will actually be sent to the back-end:
    {
        "name_last": "Bar",
        "name_first": "Foo",
        "skills": "Python,Django",
        "bpt_confidence": 0.1,
        "bpt_delegator": 0.2,
        "bpt_determination": 0.3,
        "bpt_disruptor": 0.4,
        "bpt_independence": 0.5,
        "bpt_knowledge": 0.6,
        "bpt_profitability": 0.7,
        "bpt_relationship": 0.8,
        "bpt_risk": 0.9,
        "bpt_selling": 1.0
    }
*/
export const SendPersonToBackEnd = async (person) => {
    var objectToSend = {
        name_last: person.lastName,
        name_first: person.firstName,
        skills: ""
    };

    // Add the skill name for each skill the user selected
    objectToSend.skills = CheckListArrayToString(person.skills);

    person.traits.forEach(trait => {
        objectToSend["bpt_" + trait.name] = trait.score;
    })

    try {
        const response = await axiosInstance.post('/employees/', objectToSend);
        return response;
    } catch (error) {
        return error;
    }
}

/*
    SendTeamParameters is an asynchronous function that takes the parameters by
        which a new team will be built as parameters to the function. This
        function will put the parameters into a JSON object and POST it to the
        back-end so it can start the process of building a balanced team with
        those parameters.
     
    parameters: teamSize - integer representing the number of team members the
                    built team should have.

                techSkills - an array of objects. Each element is { name: string, id: int }
                    (as given by the CheckList component) and represents a
                    technical skill that the build team should posses, if possible.

    returns: if no server errors, a Promise that is the id of the newly created team
             if there was an error in the request, -1 as a Promise and the error is printed to the console.

    What will actually be sent to the back-end:
    {
        "teamSize": int
        "skills": comma separated string of skills
    }
*/
export const SendTeamParameters = async (teamSizeParam, techSkills) => {
    var objectToSend = {
        teamSize: teamSizeParam,
        skills: CheckListArrayToString(techSkills)
    };

    try {
        const response = await axiosInstance.post('/requested_teams/', objectToSend);
        return response.data.id;
    } catch (error) {
        return -1;
    }
}

/*
    GetValidTeam is an asynchronous function that will make an API call to
        the back-end to get the built team from a previous POST to build a team.
        The JSON response will be returned.
     
    parameters: teamID - unique integer ID for the built team to get

    https://stackoverflow.com/questions/48980380/returning-data-from-axios-api#:~:text=The%20function%20can%20be%20written%20more%20succinctly%3A

    returns: if no server errors, a Promise that is the response from the server (https://axios-http.com/docs/res_schema).
             if there was an error in the request, then the Axios error in a Promise.
*/
export const GetValidTeam = async (teamID) => {
    try {
        const response = await axiosInstance.get('/valid_teams/?id=' + teamID.toString());
        return response;
    } catch (error) {
        return error;
    }
}

/*
    GetEmployee is an asynchronous function that takes the ID of the employee whose
        information you wish to retrieve. This function will make a GET request
        to the back-end to get that employee's profile/information.
     
    parameters: employeeID - integer representing the unique ID that database
                    uses to identify an employee's record

    returns: if no server errors, a Promise that is the data of the response from the server (https://axios-http.com/docs/res_schema).
            {
                "id": int,
                "name_last": string,
                "name_first": string,
                "skills": string,
                "bpt_confidence": int,
                "bpt_delegator": int,
                "bpt_determination": int,
                "bpt_disruptor": int,
                "bpt_independence": int,
                "bpt_knowledge": int,
                "bpt_profitability": int,
                "bpt_relationship": int,
                "bpt_risk": int,
                "bpt_selling": int
            }

             if there was an error in the request, then the Axios error in a Promise.
*/
const GetEmployee = async (employeeID) => {
    // TODO: Test this when the back-end can be queried with values
    try {
        const response = await axiosInstance.get('/employees/?id=' + employeeID.toString());
        return response.data;
    } catch (error) {
        return error;
    }
}

/*
    GetEmployeeList is an asynchronous function that takes a list of ID's of the
        employees whose information you wish to retrieve. This function will make
        GET requests to the back-end to get each employee's profile/information.
     
    parameters: employeeIDList - list of integers where each element is an
                    integer representing the unique ID that database
                    uses to identify an employee's record

    returns: if no server errors, a Promise that a list of objects where each 
                element is an employee's information.
            [[{
                "id": int,
                "name_last": string,
                "name_first": string,
                "skills": string,
                "bpt_confidence": int,
                "bpt_delegator": int,
                "bpt_determination": int,
                "bpt_disruptor": int,
                "bpt_independence": int,
                "bpt_knowledge": int,
                "bpt_profitability": int,
                "bpt_relationship": int,
                "bpt_risk": int,
                "bpt_selling": int
            }, ...], ...]
             if there was an error in the request, then the Axios error in a Promise
             in a single element list.
*/
export const GetEmployeeList = async (employeeIDList) => {
    var listOfEmployees = [];

    // Loop through all the id's and get the employee that is associated with them
    /*
    await employeeIDList.forEach(async (id) => {
        const employee = await GetEmployee(id);
        
        // If the response was an error, just return the error
        if (axios.isAxiosError(employee)){
            return [employee];
        }

        listOfEmployees.push(employee);
    });
    */
    for (const id of employeeIDList) {
        const employee = await GetEmployee(id);
        
        if (axios.isAxiosError(employee)){
            return [employee];
        }

        listOfEmployees.push(employee);
    }
    
    return listOfEmployees;
}