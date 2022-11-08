import React, { Component, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
            if (input > 1){//team consists of atleast 2 people
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
        var amt = document.getElementById("teamSize").value
        if(valid){
            setNum(amt)//notify Parameters component
        }
    }
    //-------------------------------------------------------------------------------------------------------
    //CONSTRUCT THE VIEW
    //-------------------------------------------------------------------------------------------------------
    return ( 
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
 
export default Size;