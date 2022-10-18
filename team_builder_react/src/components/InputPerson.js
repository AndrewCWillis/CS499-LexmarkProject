import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import CSVReader from 'react-csv-reader';
import { useState } from 'react';

import CheckList from '../components/CheckList';

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

        TODO: Update so that if user goes back from Trait input their previously
            inputted skills are already filled in.
     */
    const Skills = () => {
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
                    <CheckList SendToParent={GetInputFromCheckList}></CheckList>
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
            setIsOnFile(false);

            setPerson({...person, 'traits': parsedTraits});

            // TODO: send person to back-end
        }

        /*
            Callback function for when the user uploads a file. This function
                will parse the csv and display an error if the file cannot
                be read as expected.

            data should be an array of objects where each one is a record.
        */
        const HandleFileUpload = (data, fileInfo, originalFile) => {
            // console.log(data)
            var foundMatch = false;

            // Loop through all the records looking for one with a name that EXACTLY
            //  matches the one input thus far.
            data.forEach((record) => {
                // Note: If no values exist for names in the csv, this will evaluate to false
                if (record['First Name'] === person.firstName && record['Last Name'] === person.lastName) {
                    foundMatch = true;

                    // Put the trait values into an array.
                    parsedTraits.push(record['Confidence']);
                    parsedTraits.push(record['Delegator']);
                    parsedTraits.push(record['Determination']);
                    parsedTraits.push(record['Disruptor']);
                    parsedTraits.push(record['Independence']);
                    parsedTraits.push(record['Knowledge']);
                    parsedTraits.push(record['Profitibility']);
                    parsedTraits.push(record['Relationship']);
                    parsedTraits.push(record['Risk']);
                    parsedTraits.push(record['Selling']);

                    // If any of the traits could not be read
                    if (parsedTraits.contains(undefined)) {
                        // TODO: display error
                    }
                }
            });

            if (!foundMatch) {
                // TODO: display error
            }
        }

        /*
            Callback function for when the CSVReader cannot parse the file.
        */
        const HandleUploadError = (error) => {
            // TODO: Handle CSVReader parsing error
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
                        parserOptions={papaparseOptions} />
                    {/* <Form.Control type='file' /> */}
                </Form.Group>
                <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto">
                    <Button disabled={false} onClick={HandleBack}>Back</Button>
                    <Button onClick={HandleTraitsSubmit}>Submit</Button>
                </Stack>
            </Form>
        );
    }

    // Choose which input component this InputPerson component should render.
    if (isOnName) {
        return (<Name defaultFirstName={person.firstName} defaultLastName={person.lastName} />);
    } else if (isOnSkills) {
        return (<Skills />);
    } else if (isOnFile) {
        console.log(person);
        return (<Traits />)
    } else {
        return <h1>Thank you for submitting your information.</h1>
    }
}

export default InputPerson;