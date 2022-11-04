import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { Component, useState} from 'react';
import CheckList from '../components/CheckList.js';
import Results from '../components/Results.js';

const TeamSize = () => {

    const [valid, setValid] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [num, setNum] = useState(0); 

    var techList = []; // Look at skills for an example as to how to use this var

    const handleChange = (event) =>{
        var input = document.getElementById('teamSize').value
        if (isNaN(input)){

            event.target.className = "form-control is-invalid"
            document.getElementById("ErrorMessage").className = "text-danger visible"

        }else{
            if (input > 0){
                setValid(true)
                event.target.className = "form-control is-valid"
                document.getElementById("ErrorMessage").className = "text-danger invisible"
            }else{
                event.target.className = "form-control is-invalid"
                document.getElementById("ErrorMessage").className = "text-danger visible"
            }
        }

    }

    const handleClick = (event) =>{
        event.preventDefault()
        var amt = document.getElementById("teamSize").value
        if(valid){
            setNum(amt)
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        setSubmit(true)
    }

    /*
        Callback function for when the user makes changes to the CheckList.
        
        This function is passed to the CheckList component as a prop and the
        CheckList will call it when its selected values change.
    */
    const GetInputFromCheckList = (skills) => {
        techList = skills;
    }
    
    if ((valid) && (num !== 0)){
        if (submit){
            return(
                <Results />
            );
        }else{
            return(
                <div>
                    <div>
                        <div>
                            Please, Enter the Desired Technical Skills for this Position:
                        </div>
                        {<CheckList SendToParent={GetInputFromCheckList} defaultSelected={[]} />}
                    </div>  
                    <div style = {{marginTop: "15px"}}>
                        <Button  variant="primary" href='/build' onClick = {handleSubmit} className = "col-2">Build</Button>
                    </div>
                </div>
            );
        }
    }else{

        return(
                
            <Form className="mx-auto my-auto h-100">
                <Form.Group className='mb-3' controlId='teamSize' onChange = {handleChange}>
                    <Form.Label>
                        Please, Enter the Number of Employees For Your Team:
                    </Form.Label> 
                    <Form.Control placeholder='Enter Number of Team Members' />  
                </Form.Group>           
                <Button  onClick = {handleClick} variant="primary" href='/build' className = "col-2">Continue</Button> 
                <div className="text-danger invisible" id="ErrorMessage">Please, insert a postive number.</div>        
            </Form>
                
        );
    }
    
    
}

export default TeamSize;
