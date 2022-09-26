import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';

const App = () => {
  return (
    // <div className='App'>
    //   <Container>
    //   <Row classname="align-items-center">
    //     <Col md="auto">
    //       <Button variant="primary">Input Data</Button>
    //     </Col>
    //     <Col md="auto">
    //       <Button variant="primary">Build a Team</Button>
    //     </Col>
    //   </Row>
    // </Container>
    // </div>
    <Stack direction='horizontal' gap={2} className="col-md-5 mx-auto my-auto h-100">
      <Button className="mx-auto my-auto" variant="primary">Input Data</Button>
      <Button className="mx-auto my-auto" variant="primary">Build a Team</Button>
    </Stack>
  );
}

export default App;
