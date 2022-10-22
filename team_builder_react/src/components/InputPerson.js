import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import CSVReader from 'react-csv-reader'; // https://www.npmjs.com/package/react-csv-reader
import { useState } from 'react';

import CheckList from '../components/CheckList';
import { SendPersonToBackEnd } from '../utilities/API_Interface';

const InputPerson = () => {
    // State to store the person's information
    const [ person, setPerson ] = useState({
        firstName: '',
        lastName: '',
        skills: [],
        traits: []
    });

    // Boolean states represented which input so currently show the user
    const [ isOnName, setIsOnName ] = useState(true);
    const [ isOnSkills, setIsOnSkills ] = useState(false);
    const [ isOnFile, setIsOnFile ] = useState(false);

    /*
        Component to get the name of the user. It shows two text inputs to the user,
        first and last name, and two buttons, Back and Continue. The Back button
        cannot be clicked and the Continue button moves the user to inputting
        their technical skills.

        props: defaultFirstName - string default value for the first name input
               defaultLastName - string default value for the last name input
     */
    const Name = ( { defaultFirstName, defaultLastName } ) => {
        
        /*
            Callback function for when the user clicks the "Continue" button.
        */
        const HandleNameInput = () => {
            // Get the inputs for first and last name
            // https://stackoverflow.com/questions/70824806/getting-user-input-value-from-bootstrap-form
            var firstN = document.getElementById('formFirstName').value;
            var lastN = document.getElementById('formLastName').value;

            // Create booleans for whether the inputs contain only letters
            // True if they do, false otherwise
            var regexForLetters = /^[A-Za-z]+$/;  //https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
            var isFirstValid = regexForLetters.test(firstN);
            var isLastValid = regexForLetters.test(lastN);

            
            // If first and last name are valid, move on to inputting skills
            if (isFirstValid && isLastValid) {
                setPerson({...person, firstName: firstN, lastName: lastN});
                document.getElementById("ErrorMessage").className = "text-danger invisible";
                document.getElementById("formFirstName").className = "form-control is-valid";
                document.getElementById("formLastName").className = "form-control is-valid";

                setIsOnName(false);
                setIsOnSkills(true);
            } else if (!isFirstValid && isLastValid) { // if only the first name is invalid, mark it as such
                document.getElementById("formFirstName").className = "form-control is-invalid";
                document.getElementById("formLastName").className = "form-control is-valid";
                document.getElementById("ErrorMessage").className = "text-danger visible";
            } else if (!isLastValid && isFirstValid) { // if only the last name is invalid, mark it as such
                document.getElementById("formFirstName").className = "form-control is-valid";
                document.getElementById("formLastName").className = "form-control is-invalid";
                document.getElementById("ErrorMessage").className = "text-danger visible";
            } else { // if first and last name are invalid, mark them as such
                document.getElementById("formFirstName").className = "form-control is-invalid";
                document.getElementById("formLastName").className = "form-control is-invalid";
                document.getElementById("ErrorMessage").className = "text-danger visible";
            }
        }

        // https://react-bootstrap.github.io/forms/overview/#overview
        return (
            <Form className="mx-auto my-auto h-100">
                <Form.Group className='mb-3' controlId='formFirstName' >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control defaultValue={defaultFirstName} placeholder='First Name' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formLastName' >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control defaultValue={defaultLastName} placeholder='Last Name' />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto">
                    <Button disabled={true}>Back</Button>
                    <Button onClick={HandleNameInput}>Continue</Button>
                </Stack>
                <div className="text-danger invisible" id="ErrorMessage">Please, input letters in the above boxes.</div>
            </Form>
        );
    }

    /*
        Component to get the technical skills of a user. It will display the
            CheckList component as well as two buttons, Back and Continue.

        props: defaultSelectedList - an array of objects with the structure
          { 'name' : string, 'id' : number }. These will be the already selected
          values in the CheckList displayed by the Skills component.
     */
    const Skills = ({ defaultSelectedList }) => {
        // Non-state variable for holding changes to the selected values in the CheckList
        var skillsList = []

        /*
            Callback function for when the user clicks the "Continue" button.

            Move the user to inputting the csv of their BP10 assessment.
        */
        const HandleSkillsSubmit = () => {
            setIsOnSkills(false);
            setIsOnFile(true);

            // Set the skills state to the variable that was holding the selected
            //  values in the CheckList.
            setPerson({...person, 'skills': skillsList});
        }

        /*
            Callback function for when the user makes changes to the CheckList.
            
            This function is passed to the CheckList component as a prop and the
            CheckList will call it when its selected values change.
        */
        const GetInputFromCheckList = (skills) => {
            skillsList = skills;
        }

        /*
            Callback function for when the user clicks the "Back" button.
        */
        const HandleBack = () => {
            setIsOnName(true);
            setIsOnSkills(false);
        }

        return (
            <Form className="mx-auto my-auto h-100">
                <Form.Group className='mb-3' controlId='formTechSkills' >
                    <Form.Label>Enter Your Technical Skills</Form.Label>
                    <CheckList 
                        SendToParent={GetInputFromCheckList}
                        defaultSelected={defaultSelectedList}
                    />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto">
                    <Button disabled={false} onClick={HandleBack}>Back</Button>
                    <Button onClick={HandleSkillsSubmit}>Continue</Button>
                </Stack>
            </Form>
        );
    }

    /*
        Component to get a person's BP10 results. It will display a file upload
            to the user.
     */
    const Traits = () => {
        var parsedTraits = [];
        const traitNames = ['confidence',
                            'delegator',
                            'determination',
                            'disruptor',
                            'independence',
                            'knowledge',
                            'profitibility',
                            'relationship',
                            'risk',
                            'selling'];

        /*
            Callback function for when the user clicks the "Back" button.
        */
        const HandleBack = () => {
            setIsOnFile(false)
            setIsOnSkills(true);
        }

        /*
            Callback function for when the user clicks the "Continue" button.

            Set the state's traits to the ones read from the csv.

            Send the person's information to the back-end
        */
        const HandleTraitsSubmit = () => {
            // If traits have been collected
            if (parsedTraits.length === 10) {
                setIsOnFile(false);
                var oldPersonValue = person;

                // I believe that this should use the correct values, but I am
                //  not 100% sure since React might update the state at any point.
                SendPersonToBackEnd({...oldPersonValue, 'traits': parsedTraits});

                setPerson({...oldPersonValue, 'traits': parsedTraits});
            } else {
                document.getElementById("TraitsErrorMessage").className = "text-danger visible";
                document.getElementById("TraitsErrorMessage").innerText = "Please upload a valid CSV file before submitting.";
                document.getElementById("react-csv-reader-input").className = "form-control is-invalid";
            }
        }

        /*
            Callback function for when the user uploads a file. This function
                will parse the csv and display an error if the file cannot
                be read as expected.

            As mentioned in this GitHub issue (https://github.com/nzambello/react-csv-reader/issues/17),
                an updated file with the same name as the one loaded into the app
                will not cause the csv-reader to load the newly updated file.
                
                TODO: Add to the help page that the user can click 'Back' then
                'Continue' to clear the loaded file and circumvent the above issue.

            data - an array of objects where each one is a record.
        */
        const HandleFileUpload = (data, fileInfo, originalFile) => {
            var foundMatch = false;
            var traitScoreError = false;

            // Loop through all the records looking for one with a name that EXACTLY
            //  matches the one input thus far.
            data.forEach((record) => {
                // Note: If no values exist for names in the csv, this will evaluate to false
                if (record['First Name'] === person.firstName && record['Last Name'] === person.lastName) {
                    foundMatch = true;

                    // Put the trait values into an array
                    for (var key in record) {
                        if (traitNames.includes(key.toLowerCase())){
                            parsedTraits.push({
                                name: key.toLowerCase(),
                                score: record[key]
                            });
                        }
                    }

                    // If any of the traits could not be read, tell the user
                    // https://stackoverflow.com/questions/19324294/equivalent-of-pythons-keyerror-exception-in-javascript
                    if (parsedTraits.length !== traitNames.length) {
                        console.log(parsedTraits.length);
                        traitScoreError = true;
                        parsedTraits = [] // reset the traits array
                        
                        document.getElementById("TraitsErrorMessage").className = "text-danger visible";
                        document.getElementById("TraitsErrorMessage").innerText = "Could not find a value for one or more of the BP10 traits for the previously inputted name.";
                        document.getElementById("react-csv-reader-input").className = "form-control is-invalid";
                        
                        return;
                    }

                    // For each trait we found, check that it is numeric
                    parsedTraits.forEach((trait) => {
                        // If the trait score is not a number, say that we cannot parse it
                        if (typeof(trait.score) !== 'number') {
                            traitScoreError = true;
                            parsedTraits = [] // reset the traits array

                            document.getElementById("TraitsErrorMessage").className = "text-danger visible";
                            document.getElementById("TraitsErrorMessage").innerText = "Could not find a numeric value for one or more of the BP10 traits for the previously inputted name.";
                            document.getElementById("react-csv-reader-input").className = "form-control is-invalid";
                            
                            return;
                        }
                    });
                }
            });

            /*
                If the thus-far inputted person cannot be found in the csv,
                then display an error message. If the person can be found,
                tell the user the input is valid.
            */
            if (!foundMatch && !traitScoreError) {
                document.getElementById("TraitsErrorMessage").className = "text-danger visible";
                document.getElementById("TraitsErrorMessage").innerText = "Previously inputted name could not be found.";
                document.getElementById("react-csv-reader-input").className = "form-control is-invalid";
            } else if (foundMatch && !traitScoreError){
                document.getElementById("TraitsErrorMessage").className = "text-danger invisible";
                document.getElementById("react-csv-reader-input").className = "form-control is-valid";
            }
        }

        /*
            Callback function for when the CSVReader gets a file that is not 
                of type csv/text.
        */
        const HandleUploadError = (error) => {
            document.getElementById("TraitsErrorMessage").className = "text-danger visible";
            document.getElementById("TraitsErrorMessage").innerText = error.message;
            document.getElementById("react-csv-reader-input").className = "form-control is-invalid";
        }

        // https://www.npmjs.com/package/react-csv-reader
        const papaparseOptions = {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true
        }

        return (
            <Form className="mx-auto my-auto h-100">
                <Form.Group className='mb-3' controlId='formBP10File' >
                    <Form.Label>Upload Your BP10 Report as a CSV File</Form.Label>
                    <CSVReader 
                        onFileLoaded={HandleFileUpload}
                        onError={HandleUploadError}
                        cssClass='custom-file-input'
                        cssInputClass='form-control'
                        parserOptions={papaparseOptions}
                        strict={true} />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto">
                    <Button onClick={HandleBack}>Back</Button>
                    <Button onClick={HandleTraitsSubmit} id="TraitsSubmit">Submit</Button>
                </Stack>
                <div className="text-danger invisible" id="TraitsErrorMessage">Please upload a valid csv.</div>
            </Form>
        );
    }

    // Choose which input component this InputPerson component should render.
    if (isOnName) {
        // console.log(person);
        return (<Name defaultFirstName={person.firstName} defaultLastName={person.lastName} />);
    } else if (isOnSkills) {
        // console.log(person);
        return (<Skills defaultSelectedList={person.skills}/>);
    } else if (isOnFile) {
        console.log(person);
        return (<Traits />);
    } else {
        console.log(person);
        return (
            <div>
                <h2>
                    Thank you for submitting your information!
                </h2>
                <h2>
                    Your information can now be used when building a team!
                </h2>
            </div>
        );
    }
}

export default InputPerson;