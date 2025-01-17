import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Footer from './components/Footer';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import { Container, Row, Col, Toast } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import './App.css';


const App = () => {
  // State to track theme mode
  const [darkMode, setDarkMode] = useState(() => {
    // Load initial theme from localStorage
    return localStorage.getItem('darkMode') === 'true';
  });

  // Update `body` class and save theme to localStorage on mode change
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Toggle theme handler
  const handleToggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <>
      <Header />
      <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
        {/* Dark Mode Toggle Button */}
        <IconButton
          onClick={handleToggleDarkMode}
          sx={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 1000,
            color: darkMode ? '#FFD700' : '#333', // Sun color for dark mode, dark gray for light mode
            '&:hover': {
              color: darkMode ? '#FFC107' : '#000', // Lighter hover effect
            },
          }}
        >
          {darkMode ? <Brightness7 fontSize="large" /> : <Brightness4 fontSize="large" />}
        </IconButton>

        {/* Main Content */}
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
      </div>
      <Footer />

    
    </>
  );
};

export default App;
