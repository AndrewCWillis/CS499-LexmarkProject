import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '127.0.0.0:0000'
});

/*
    SendPersonToBackEnd takes an object as a parameter and sends that object to 
        the back-end as JSON in an HTTP request. This function will post a new
        person and their information to the back-end, which will then store it in
        the database.
     
    parameters: person - an object (or dictionary) to send to the back-end
    ex: {
            firstName: '',
            lastName: '',
            skills: [], each element is { name: string, id: int }
            traits: [], each element is { name: string, score: int}
        }

    What will actually be sent to the back-end:
    {
            "id": 49902,
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
export const SendPersonToBackEnd = (person) => {
    var objectToSend = {
        name_last: person.lastName,
        name_first: person.firstName,
        skills: ""
    };

    // Add the skill name for each skill the user selected
    person.skills.forEach(skill => {
        if (objectToSend.skills.length === 0){
            objectToSend.skills = skill.name;
        } else {
            objectToSend.skills = objectToSend.skills + "," + skill.name;
        }
    });

    person.traits.forEach(trait => {
        objectToSend["bpt_" + trait.name] = trait.score;
    })

    console.log(objectToSend);
    //axiosInstance.post('/employees', objectToSend);
}