import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';

import CheckList from '../components/CheckList';

const InputPerson = () => {
    const [ person, setPerson ] = useState({
        firstName: '',
        lastName: '',
        skills: [],
        traits: []
    });

    const [ isOnName, setIsOnName ] = useState(true);
    const [ isOnSkills, setIsOnSkills ] = useState(false);
    const [ isOnFile, setIsOnFile ] = useState(false);

    const Name = () => {
        const HandleNameInput = () => {
            // https://stackoverflow.com/questions/70824806/getting-user-input-value-from-bootstrap-form
            var firstN = document.getElementById('formFirstName').value;
            var lastN = document.getElementById('formLastName').value;

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
            } else if (!isFirstValid && isLastValid) { // if the first name is invalid, mark it as such
                document.getElementById("formFirstName").className = "form-control is-invalid";
                document.getElementById("formLastName").className = "form-control is-valid";
                document.getElementById("ErrorMessage").className = "text-danger visible";
            } else if (!isLastValid && isFirstValid) { // if the last name is invalid, mark it as such
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
                    <Form.Control placeholder='Enter first name' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formLastName' >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder='Enter last name' />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto">
                    <Button disabled={true}>Back</Button>
                    <Button onClick={HandleNameInput}>Continue</Button>
                </Stack>
                <div className="text-danger invisible" id="ErrorMessage">Please, input letters in the above boxes.</div>
            </Form>
        );
    }

    const Skills = () => {
        const HandleSkillsInput = () => {

        }
        return (
            <Stack gap={2} className="h-100">
                <CheckList></CheckList>
                <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto">
                    <Button>Back</Button>
                    <Button onClick={HandleSkillsInput}>Continue</Button>
                </Stack>
                
            </Stack>

        );
    }

    if (isOnName) {
        return (<Name />);
    } else if (isOnSkills) {
        return (<Skills />);
    } else  {
        return <div>hi</div>
    }
}

export default InputPerson;