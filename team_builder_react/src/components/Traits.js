import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { SendPersonToBackEnd } from '../utilities/API_Interface';
import CSVReader from 'react-csv-reader'; // https://www.npmjs.com/package/react-csv-reader

/*
    Component to get a person's BP10 results. It will display a file upload
    to the user.

    props:  setIsOnSkills - callback function to set the isOnSkills boolean variable in InputPerson
            setIsOnFile - callback function to set the isOnFile boolean variable in InputPerson
            person - the person object varialbe in InputPerson
            setPerson - callback function to set the setPerson object variable in InputPerson
            setBackEndResponse - callback function to set the backEndResponse variable in InputPerson
            setThankForSubmit - callback function to set the thankForSubmit variable in InputPerson
*/
const Traits = ({ setIsOnSkills, setIsOnFile, person, setPerson, setBackEndResponse, setThankForSubmit }) => {
    var parsedTraits = [];
    const traitNames = ['confidence',
                        'delegator',
                        'determination',
                        'disruptor',
                        'independence',
                        'knowledge',
                        'profitability',
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
            SendPersonToBackEnd({...oldPersonValue, 'traits': parsedTraits})
            .then((response) => {
                if (axios.isAxiosError(response)){
                    setThankForSubmit("There was an error uploading your information. Please try again.")
                }
                setBackEndResponse(response);
            });

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
                    // If the trait score is not a number [0, 1], say that we cannot parse it
                    if (typeof(trait.score) !== 'number' || trait.score < 0 || trait.score > 1) {
                        traitScoreError = true;
                        parsedTraits = [] // reset the traits array

                        document.getElementById("TraitsErrorMessage").className = "text-danger visible";
                        document.getElementById("TraitsErrorMessage").innerText = "Could not find a numeric value [0, 1] for one or more of the BP10 traits for the previously inputted name.";
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
            document.getElementById("TraitsErrorMessage").innerText = "Previously inputted name could not be found in the csv.";
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
        parsedTraits = [];
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
        <Card border="dark">
            <Card.Header className="font-weight-bold">
                <h4>Please, Upload Your BP10 Report as a CSV File:</h4>
            </Card.Header>
            <Card.Body>
                <Form className="mx-auto my-auto h-100">
                    <Form.Group className='mb-3' controlId='formBP10File' >
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
            </Card.Body>
        </Card>
    );
}

export default Traits;