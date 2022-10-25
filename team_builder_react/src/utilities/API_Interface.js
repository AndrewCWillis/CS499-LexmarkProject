import axios from "axios";

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
    SendPersonToBackEnd takes an object as a parameter and sends that object to 
        the back-end as JSON in an HTTP request. This function will post a new
        person and their information to the back-end, which will then store it in
        the database.
     
    parameters: personID - unique integer ID for this team to be built
            
                person - an object (or dictionary) to send to the back-end
                ex: {
                        firstName: '',
                        lastName: '',
                        skills: [], each element is { name: string, id: int }
                        traits: [], each element is { name: string, score: int}
                    }
    
    returns: nothing

    What will actually be sent to the back-end:
    {
        "id": 49902, Do we need?
        "name_last": "Bar",
        "name_first": "Foo",
        "skills": "Python, Django",
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
export const SendPersonToBackEnd = (personID, person) => {
    var objectToSend = {
        id: personID,
        name_last: person.lastName,
        name_first: person.firstName,
        skills: ""
    };

    // Add the skill name for each skill the user selected
    objectToSend.skills = CheckListArrayToString(person.skills);

    person.traits.forEach(trait => {
        objectToSend["bpt_" + trait.name] = trait.score;
    })

    console.log(objectToSend);
    //axiosInstance.post('/employees', objectToSend);
}

/*
    SendTeamParameters takes the parameters by which a new team will be built as
        parameters to the function. This function will put the parameters into a
        JSON object and POST it to the back-end so it can start the process of
        building a balanced team with those parameters.
     
    parameters: teamID - unique integer ID for this team to be built
    
                teamSize - integer representing the number of team members the
                    built team should have.

                techSkills - an array of objects. Each element is { name: string, id: int }
                    (as given by the CheckList component) and represents a
                    technical skill that the build team should posses, if possible.

    returns: nothing

    What will actually be sent to the back-end:
    {
        "id": int, Do we need?
        "teamSize": int
        "skills": comma separated string of skills
    }
*/
export const SendTeamParameters = (teamID, teamSizeParam, techSkills) => {
    var objectToSend = {
        id: teamID,
        teamSize: teamSizeParam,
        skills: CheckListArrayToString(techSkills)
    };

    console.log(objectToSend);
    //axiosInstance.post('/requestedteams', objectToSend);
}

/*
    GetValidTeam is an asynchronous function that will make an API call to
        the back-end to get the built team from a previous POST to build a team.
        The JSON response will be returned.
     
    parameters: teamID - unique integer ID for the built team to get

    https://stackoverflow.com/questions/48980380/returning-data-from-axios-api#:~:text=The%20function%20can%20be%20written%20more%20succinctly%3A

    returns: if no server errors, a Promise that is the response from the server (https://axios-http.com/docs/res_schema).
             if there was an error in the request, then the Axios error.
*/
export const GetValidTeam = async (teamID) => {
    try {
        const response = await axiosInstance.get('/valid_teams/' + teamID.toString());
        return response;
    } catch (error) {
        return error;
    }
}