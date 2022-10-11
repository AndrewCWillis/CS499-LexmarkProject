import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { Component } from 'react';
import TeamMember from '../components/TeamMember.js';
import Results from '../components/Results.js';

class TeamSize extends Component {
    constructor() {
        super();
        this.state = {valid: false, submit: false, num: 0};

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    handleChange(event) {
        var input = document.getElementById('teamSize').value
        console.log.here("here")
        if (isNaN(input)){

            event.target.className = "form-control is-invalid"
            document.getElementById("ErrorMessage").className = "text-danger visible"

        }else{
            if (input > 0){
                this.setState({
                    valid: true,
                    submit: false,
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
                submit: false,
                num : amt
              });
            console.log("ACCEPTED!")

        }else{
            console.log("REJECTED!")
        }
    }
    handleSubmit(event){
        event.preventDefault()
        this.setState({
            valid: true,
            submit: true,
            num : this.state.num
          });
    }
    render(){
        if ((this.state.valid) && (this.state.num !== 0)){
            if (this.state.submit){
                return(
                    <Results />
                );
            }else{
                return(
                    <>
                        <TeamMember key = {0} />
                        <Button  variant="primary" href='/build' onClick = {this.handleSubmit} className = "col-2">Build</Button>
                    </>
                );
            }
        }else{

            return(
                
                <Form className="mx-auto my-auto h-100">
                    <Form.Group className='mb-3' controlId='teamSize' onChange = {this.handleChange}>
                        <Form.Label>
                            Please, Enter the Number of Employees For Your Team:
                        </Form.Label> 
                        <Form.Control placeholder='Enter Number of Team Members' />  
                    </Form.Group>           
                    <Button  onClick = {this.handleClick} variant="primary" href='/build' className = "col-2">Continue</Button> 
                    <div className="text-danger invisible" id="ErrorMessage">Please, insert a postive number.</div>        
                </Form>
                
            );
        }
    }
}

export default TeamSize;