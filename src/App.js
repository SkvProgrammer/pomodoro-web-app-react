import React from 'react';
import Timer from './components/Timer';
import Footer from './components/Footer';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Import custom styles

const App = () => {
  return (
    <>
      <Header />
      <Container fluid className="mt-4 px-4">
        <Row className="justify-content-center align-items-start gx-4">
          {/* Timer Section */}
          <Col xs={12} md={6} lg={5} className="mb-4">
            <div className="component-wrapper shadow p-3 rounded">
              <Timer />
            </div>
          </Col>

          {/* Task Manager Section */}
          <Col xs={12} md={6} lg={5} className="mb-4">
            <div className="component-wrapper shadow p-3 rounded">
              <TaskManager />
            </div>
          </Col>
        </Row>
      </Container>
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
      <Footer />
    </>
  );
};

export default App;
