import React, { Component } from 'react';
import CheckList from './CheckList.js'
class TeamMember extends Component {
    constructor(props) {
        super(props);

      }
    render(){
        return(
        <>
            <form>
                <div className = "form-label">
                    Please, Enter the Desired Technical Skills for this Position
                </div>
                <input type="text"  id="teamSize" onChange = {this.handleChange} className =" m-3 form-control"></input>
                    
            </form>
            {Array.from({length:6}, (_, i) => {return(<CheckList key = {i} />);})}
        </>
        );
    }
}
export default TeamMember;