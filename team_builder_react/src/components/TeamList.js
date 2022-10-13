import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Stack from 'react-bootstrap/Stack';

function TeamList(props) {
    var TeamList = ['Robert', 'Spencer', 'Wade', 'Alex', 'Andrew']
    console.log(props.type)

    const remove = {
        color: '#df4759',
        fontWeight: 'bold'
    };
    const assign = {
        color: '#5cb85c',
        fontSize: '25px',
        fontWeight: 'bold'
    };
    return (  
        <>
        <Stack direction='vertical' gap={2} className="col-md-5 mx-auto my-auto h-100">
        {
            TeamList.map(
                function (name) {
                    return(
                    <ButtonGroup aria-label="Basic example" key={name}>
                        <Button variant={props.type} size = "lg" >{name}</Button>
                        <Button variant={props.type} size = "sm" style = {props.type == "info" ? remove : assign}>{props.type == "info" ? 'X' : '+'}</Button>
                    </ButtonGroup>
                    )
                }
            )
        }
        </Stack>
        </>
    );
}
 
export default TeamList;