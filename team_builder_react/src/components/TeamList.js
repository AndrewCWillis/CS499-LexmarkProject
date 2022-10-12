import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const TeamList = () => {
    var TeamList = ['Robert', 'Spencer', 'Wade', 'Alex', 'Andrew']
    return (  
        <>
        <style type="text/css">
        {`

            .btn-xxl {
                background-color: #5bc0de;
                padding: 1rem 1.5rem ;
                font-size: 1.5rem ;
            }
        `}
        </style>
        
        <Stack direction='vertical' gap={2} className="col-md-5 mx-auto my-auto h-100">
        {
            TeamList.map(
                function (name) {
                    return <Button class = '.bttn-xxl'>{name}</Button>
                }
            )
        }
        </Stack>
        </>
    );
}
 
export default TeamList;