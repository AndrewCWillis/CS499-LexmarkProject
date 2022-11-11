import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

const TeamList = (props) =>{
    //-------------------------------------------------------------------------------------------------------
    //DISPLAYS AS A LIST OF REMOVABLE BUTTONS
    //-------------------------------------------------------------------------------------------------------
    function removeHandler(event){
        event.target.parentElement.remove()
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

    if (TeamList.length > 0){//verify that array of member names was supplied
        return (  
            <>
            <Stack direction='vertical' gap={2} className="col-md-5 mx-auto my-auto h-100">
            {
                TeamList.map(
                    function (name) {
                        var isError = name.startsWith("ERROR")
                        return(
                        <ButtonGroup aria-label="Basic example" key={name} id = {name}>
                            <Button variant={isError ? "danger" : "info"} size = "lg" className = 'memberName'>{name}</Button>
                            <Button variant={isError ? "danger" : "info"}
                            size = "sm"
                            onClick = {removeHandler}
                            style = {remove}>
                                X
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