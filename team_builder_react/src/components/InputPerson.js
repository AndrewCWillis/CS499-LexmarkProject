import Name from "./Name.js";
import Skills from "./Skills.js";
import Traits from "./Traits.js";

import { useState } from 'react';

/*
    Component to get the name, technical skills, and BP10 traits of an employee
        and send the info to the back-end. It will conditionally render a 
        component one at a time to get each of these pieces of information.
        Once done, a confirmation or error message will be displayed with
        regards to the status of sending the information to the back-end for
        storage.
*/
const InputPerson = () => {
    // State to store the person's information
    const [ person, setPerson ] = useState({
        firstName: '',
        lastName: '',
        skills: [],
        traits: []
    });

    const [ backEndResponse, setBackEndResponse ] = useState({});
    const [ thankForSubmit, setThankForSubmit ] = useState("Your information can now be used when building a team! Response from back-end:");

    // Boolean states represented which input so currently show the user
    const [ isOnName, setIsOnName ] = useState(true);
    const [ isOnSkills, setIsOnSkills ] = useState(false);
    const [ isOnFile, setIsOnFile ] = useState(false);

    // Choose which input component this InputPerson component should render.
    if (isOnName) {
        // console.log(person);
        return (<Name defaultFirstName={person.firstName} 
                        defaultLastName={person.lastName} 
                        setIsOnName={setIsOnName} 
                        setIsOnSkills={setIsOnSkills} 
                        person={person} 
                        setPerson={setPerson} />);
    } else if (isOnSkills) {
        // console.log(person);
        return (<Skills defaultSelectedList={person.skills} 
                        setIsOnName={setIsOnName} 
                        setIsOnSkills={setIsOnSkills} 
                        setIsOnFile={setIsOnFile} 
                        person={person} 
                        setPerson={setPerson} />);
    } else if (isOnFile) {
        // console.log(person);
        return (<Traits setIsOnSkills={setIsOnSkills} 
                        setIsOnFile={setIsOnFile} 
                        person={person} 
                        setPerson={setPerson}
                        setBackEndResponse={setBackEndResponse}
                        setThankForSubmit={setThankForSubmit} />);
    } else {
        // console.log(person);
        return (
            <div>
                <h2>
                    {thankForSubmit}
                </h2>
                <p>
                    {JSON.stringify(backEndResponse)} {/* https://kyleshevlin.com/how-to-render-an-object-in-react} */}
                </p>
            </div>
        );
    }
}

export default InputPerson;
