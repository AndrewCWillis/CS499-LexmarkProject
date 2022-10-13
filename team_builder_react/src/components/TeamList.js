import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function TeamList(props) {
    var TeamList = ['Robert', 'Spencer', 'Wade', 'Alex', 'Andrew']
    console.log(props.type)
    return (  
        <>
        <Stack direction='vertical' gap={2} className="col-md-5 mx-auto my-auto h-100">
        {
            TeamList.map(
                function (name) {
                    return <Button variant={props.type} size = "lg" key={name}>{name}</Button>
                }
            )
        }
        </Stack>
        </>
    );
}
 
export default TeamList;