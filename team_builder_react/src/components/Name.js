import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

/*
    Component to get the name of the user. It shows two text inputs to the user,
    first and last name, and two buttons, Back and Continue. The Back button
    cannot be clicked and the Continue button moves the user to inputting
    their technical skills.

    props: defaultFirstName - string default value for the first name input
            defaultLastName - string default value for the last name input
            setIsOnName - callback function to set the isOnName boolean variable in InputPerson
            setIsOnSkills - callback function to set the isOnSkills boolean variable in InputPerson
            person - the person object varialbe in InputPerson
            setPerson - callback function to set the setPerson object variable in InputPerson
*/
const Name = ( { defaultFirstName, defaultLastName, setIsOnName, setIsOnSkills, person, setPerson} ) => {

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
        <Card border="dark">
            <Card.Header className="font-weight-bold">
                <h4>Please, Enter Your Name Exactly as it Appears in Your BP10 Results CSV:</h4>
            </Card.Header>
            <Card.Body>
                <Form className="mx-auto my-auto h-80">
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
            </Card.Body>
        </Card>
    );
}

export default Name;