import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

const TeamList = (props) =>{

    function removeHandler(event){
        event.target.parentElement.remove()
    }
    function addHandler(event){
        var name = event.target.parentElement.id
        //robert is hard coded now, but will be whatever member was last clicked
        var replacedName = document.getElementById('Robert').querySelector('.memberName').textContent
        console.log(`Tried replace a team member with ${name}.`)
        //will become more complicated later, but just starting off: 
        document.getElementById('Robert').querySelector('.memberName').textContent = name
        document.getElementById('Robert').querySelector('.memberName').id = name

        //then, the replaced member moves to the supplemental list:
        console.log(`${replacedName}`)
        event.target.parentElement.id = replacedName
        event.target.parentElement.querySelector('.memberName').textContent = replacedName
    }

    console.log(`Props: ${props.names}`)
    var TeamList = props.names
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

    if (TeamList.length > 0){
        return (  
            <>
            <Stack direction='vertical' gap={2} className="col-md-5 mx-auto my-auto h-100">
            {
                TeamList.map(
                    function (name) {
                        return(
                        <ButtonGroup aria-label="Basic example" key={name} id = {name}>
                            <Button variant={props.type} size = "lg" className = 'memberName'>{name}</Button>
                            <Button variant={props.type}
                            size = "sm"
                            onClick = {props.type === "info" ? removeHandler : addHandler}
                            style = {props.type === "info" ? remove : assign}>
                                {props.type === "info" ? 'X' : '+'}
                            </Button>
                        </ButtonGroup>
                        )
                    }
                )
            }
            </Stack>
            </>
        );
    }else{
        return (
            <Alert variant={"danger"}>
                Error loading the data!
            </Alert>
        );
    }
}
 
export default TeamList;