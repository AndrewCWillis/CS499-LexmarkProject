import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from "../components/Header.js";
import { GetEmployeeList } from '../utilities/API_Interface.js';
import Alert from 'react-bootstrap/Alert';
import React, {useState} from 'react';
import axios from "axios";

const Home = () => {
    const [error, setError] = useState(""); 
    GetEmployeeList([1])// try to fetch a dummy entry to test the connection with backend
                .then((team) => {
                    if (axios.isAxiosError(team)){ //check if the response is an error
                        setError(team.toString()) //update the view and display to user
                        document.getElementById("ErrorMessage").className = "text-danger visible"//reveal the Alert component
                    }
                });
    return (
        /* Syling: https://stackoverflow.com/questions/41265182/vertical-alignment-in-bootstrap-4#:~:text=1%20%2D%20Vertical%20Center%20Using%20Auto%20Margins */
        <>   
            <Header />
            <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto my-auto h-100">
                <Button className="mx-auto my-auto" variant="primary" href='/input'>Input Data</Button>
                <Button className="mx-auto my-auto" variant="primary" href='/build'>Build a Team</Button>
            </Stack>
            <div className="col-md-5 mx-auto my-auto h-100 invisible" id="ErrorMessage">
                <Alert variant={"danger"}>{error}. Verify that the back-end server is running. See the github page for instructions. Refresh the page when you have have fixed this to check the status again.</Alert>
            </div> 
        </>
    );
}

export default Home;