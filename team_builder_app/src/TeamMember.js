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
                <div className="container">
                    <div className = "form-label">
                    Please, Enter the Desired Technical Skills for this Position:
                    </div>
                    {<CheckList />}
                </div>    
            </form>
            
        </>
        );
    }
}

export default TeamMember;