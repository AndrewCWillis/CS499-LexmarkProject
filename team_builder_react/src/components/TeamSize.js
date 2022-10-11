import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
<<<<<<< HEAD
import TeamMember from '../components/TeamMember.js';
import Results from '../components/Results.js';
=======
import TeamMember from './TeamMember.js'
>>>>>>> parent of 645b3e2 (Fixed the sizing of input forms to match Spencers. (#5))

class TeamSize extends Component {
    constructor() {
        super();
        this.state = {valid: false, submit: false, num: 0};

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    handleChange(event) {
<<<<<<< HEAD
        var input = document.getElementById('teamSize').value
        console.log.here("here")
        if (isNaN(input)){
=======

        if (isNaN(event.target.value)){
>>>>>>> parent of 645b3e2 (Fixed the sizing of input forms to match Spencers. (#5))

            event.target.className = "form-control is-invalid"
            document.getElementById("ErrorMessage").className = "text-danger visible"

        }else{
            if (event.target.value > 0){
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
<<<<<<< HEAD
    handleSubmit(event){
        event.preventDefault()
        this.setState({
            valid: true,
            submit: true,
            num : this.state.num
          });
    }
=======
    static getDerivedStateFromProps(props, state) {
        return {favoritecolor: props.favcol };
      }
>>>>>>> parent of 645b3e2 (Fixed the sizing of input forms to match Spencers. (#5))
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
<<<<<<< HEAD
                
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
                
=======
                <form>
                    <div className="container">
                    <label className = "form-group control-label" htmlFor="teamSize">
                        Please, Enter the Number of Employees For Your Team:
                    </label>
                    <div className="form-group row">
                        <div className = "row">
                            <div className="col">       
                                <input type="text"  id="teamSize" onChange = {this.handleChange} className ="form-control input-sm"></input>
                            </div>
                            <Button  onClick = {this.handleClick} variant="primary" href='/build' className = "col-2">Build</Button>
                        </div>
                    </div>  
                    <div className="text-danger invisible" id="ErrorMessage">Please, insert a postive number.</div>
                    </div>     
                        
                </form>
>>>>>>> parent of 645b3e2 (Fixed the sizing of input forms to match Spencers. (#5))
            );
        }
    }
}

export default TeamSize;