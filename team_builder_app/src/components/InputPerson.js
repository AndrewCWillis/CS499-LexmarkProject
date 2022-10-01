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

            //https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
            if (/^[A-Za-z]+$/.test(firstN) && /^[A-Za-z]+$/.test(lastN)) {
                setPerson({...person, firstName: firstN, lastName: lastN});
            } else {
                console.log("error")
            }
        }

        // https://react-bootstrap.github.io/forms/overview/#overview
        return (
            <Form className="mx-auto my-auto h-100">
                <Form.Group className='mb-3' controlId='formFirstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder='Enter first name' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formLastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder='Enter last name' />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto">
                    <Button disabled={true}>Back</Button>
                    <Button onClick={HandleNameInput}>Continue</Button>
                </Stack>
            </Form>
        );
    }

    const Skills = () => {
        return (
            <CheckList></CheckList>
        );
    }

    if (isOnName) {
        console.log(person);
        return (<Name />);
    } else if (isOnSkills) {
        return (<Skills />);
    } else  {
        return <div>hi</div>
    }
}

export default InputPerson;