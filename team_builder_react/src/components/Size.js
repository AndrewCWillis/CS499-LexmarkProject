import React, { Component, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/*-------------------------------------------------------------------------------------------------------
- this is a form to collect the desired size of the team 
- it is a child of the Parameters component
- it is provided props which correspond to states of the Parameters component
- valid is a boolean prop, which is set to true when the input is a integer value > 1
- setNum is a method to store the validated input from the user as a state in the Parameters component
-------------------------------------------------------------------------------------------------------*/
const Size = ({setValid, setNum, valid}) => {
    //-------------------------------------------------------------------------------------------------------
    //FORM TO COLLECT TEAM SIZE PARAMETER
    //-------------------------------------------------------------------------------------------------------

    const handleChange = (event) =>{
        //INPUT VALIDATION vv
        var input = document.getElementById('teamSize').value
        if (isNaN(input)){//enforce that response is numeric
            //vv Give User feedback
            event.target.className = "form-control is-invalid"
            document.getElementById("ErrorMessage").className = "text-danger visible"
        }else{
            if ((Number(input) > 1 ) && (Number.isInteger(Number(input)))){//team consists of atleast 2 people
                setValid(true)//notify Parameters component
                //vv Give User feedback 
                event.target.className = "form-control is-valid"
                document.getElementById("ErrorMessage").className = "text-danger invisible"
            }else{//too few people or negative
                //vv Give User feedback
                event.target.className = "form-control is-invalid"
                document.getElementById("ErrorMessage").className = "text-danger visible"
            }
        }

    }
    const handleClick = (event) =>{
        //SUBMIT BUTTON PRESSED
        event.preventDefault()
        var amt = Number(document.getElementById("teamSize").value)
        if(valid){
            setNum(amt)//notify Parameters component
        }
    }
    //-------------------------------------------------------------------------------------------------------
    //CONSTRUCT THE VIEW
    //-------------------------------------------------------------------------------------------------------
    return ( 
        <Card border="dark">
            <Card.Header ><h4>Please, Enter the Number of Employees For Your Team:</h4></Card.Header>
            <Card.Body>
                <Form className="mx-auto my-auto h-100">
                <Form.Group className='mb-3' controlId='teamSize' onChange = {handleChange}>
                    <Form.Control placeholder='Enter Number of Team Members' />  
                </Form.Group>           
                <Button  onClick = {handleClick} variant="primary" id = "submit" disabled ={!valid}>Continue</Button> 
                <div className="text-danger invisible" id="ErrorMessage">
                <Alert variant={"danger"}>Please, insert a positive, integer value. </Alert>
                </div>        
                </Form>
            </Card.Body>
        </Card>

     );
}
 
export default Size;