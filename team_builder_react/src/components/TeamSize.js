import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { Component } from 'react';
import TeamMember from '../components/TeamMember.js';

class TeamSize extends Component {
    constructor() {
        super();
        this.state = {valid: false, num: 0};

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
      }

    handleChange(event) {
        var input = document.getElementById('teamSize').value

        if (isNaN(input)){

            event.target.className = "form-control is-invalid"
            document.getElementById("ErrorMessage").className = "text-danger visible"

        }else{
            if (input > 0){
                this.setState({
                    valid: true,
                    num : 0
                  });
                event.target.className = "form-control is-valid"
                document.getElementById("ErrorMessage").className = "text-danger invisible"
            }else{
                event.target.className = "form-control is-invalid"
                document.getElementById("ErrorMessage").className = "text-danger visible"
            }
        }

    }
    handleClick(event){
        event.preventDefault()
        var amt = document.getElementById("teamSize").value
        if(this.state.valid){
            this.setState({
                valid: true,
                num : amt
              });
            console.log("ACCEPTED!")

        }else{
            console.log("REJECTED!")
        }
    }
    render(){
        if ((this.state.valid) && (this.state.num !== 0)){
            var amt = this.state.num
            return(<TeamMember key = {0} />);
        }else{

            return(
                
                <Form className="mx-auto my-auto h-100">
                    <Form.Group className='mb-3' controlId='teamSize' onChange = {this.handleChange}>
                        <Form.Label>
                            Please, Enter the Number of Employees For Your Team:
                        </Form.Label> 
                        <Form.Control placeholder='Enter Number of Team Members' />  
                    </Form.Group>           
                    <Button  onClick = {this.handleClick} variant="primary" href='/build' className = "col-2">Build</Button> 
                    <div className="text-danger invisible" id="ErrorMessage">Please, insert a postive number.</div>        
                </Form>
                
                
            );
        }
    }
}

export default TeamSize;