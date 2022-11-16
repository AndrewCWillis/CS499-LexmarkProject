import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import CheckList from '../components/CheckList';

/*
    Component to get the technical skills of a user. It will display the
        CheckList component as well as two buttons, Back and Continue.

    props:  defaultSelectedList - an array of objects with the structure
                { 'name' : string, 'id' : number }. These will be the already selected
                values in the CheckList displayed by the Skills component.
            setIsOnName - callback function to set the isOnName boolean variable in InputPerson
            setIsOnSkills - callback function to set the isOnSkills boolean variable in InputPerson
            setIsOnFile - callback function to set the isOnFile boolean variable in InputPerson
            person - the person object varialbe in InputPerson
            setPerson - callback function to set the setPerson object variable in InputPerson
*/
const Skills = ({ defaultSelectedList, setIsOnName, setIsOnSkills, setIsOnFile, person, setPerson }) => {
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
        <Card border="dark">
            <Card.Header className="font-weight-bold">
                <h4>Please, Enter Your Technical Skills:</h4>
            </Card.Header>
            <Card.Body>
                <Form className="mx-auto my-auto h-100">
                    <Form.Group className='mb-3' controlId='formTechSkills' >
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
            </Card.Body>
        </Card>
    );
}

export default Skills;