import React from 'react';
import CheckList from './CheckList.js'

const TeamMember = () => {  
    var techList = [];

    /*
        Callback function for when the user makes changes to the CheckList.
        
        This function is passed to the CheckList component as a prop and the
        CheckList will call it when its selected values change.
    */
    const GetInputFromCheckList = (skills) => {
        techList = skills;
    }

    return(
    <>
        <form>
            <div className="container">
                <div className = "form-label">
                    Please, Enter the Desired Technical Skills for this Position:
                </div>
                {<CheckList SendToParent={GetInputFromCheckList} />}
            </div>    
        </form>
    </>
    );
}

export default TeamMember;