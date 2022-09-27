import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';

const App = () => {
  return (
    // Syling: https://stackoverflow.com/questions/41265182/vertical-alignment-in-bootstrap-4#:~:text=1%20%2D%20Vertical%20Center%20Using%20Auto%20Margins
    <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto my-auto h-100">
      <Button className="mx-auto my-auto" variant="primary">Input Data</Button>
      <Button className="mx-auto my-auto" variant="primary">Build a Team</Button>
    </Stack>
  );
}

export default App;
