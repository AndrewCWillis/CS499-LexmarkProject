import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from "../components/Header.js";

const Home = () => {
    return (
    /* Syling: https://stackoverflow.com/questions/41265182/vertical-alignment-in-bootstrap-4#:~:text=1%20%2D%20Vertical%20Center%20Using%20Auto%20Margins */
    <>   
        <Header />
        <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto my-auto h-100">
            <Button className="mx-auto my-auto" variant="primary" href='/input'>Input Data</Button>
            <Button className="mx-auto my-auto" variant="primary" href='/build'>Build a Team</Button>
        </Stack>
    </>
    );
}

export default Home;