import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Modal, Box, LinearProgress } from '@mui/material';
import '../styles/Timer.css'; // Import custom styles for further styling if required

const Timer = () => {
  const [time, setTime] = useState(25 * 60); // Default Pomodoro time
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [timerType, setTimerType] = useState('');

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          const newTime = prev - 1;
          setElapsedTime((prevElapsed) => prevElapsed + 1);
          if (newTime <= 0) {
            // When the timer hits zero, show the modal
            setIsRunning(false);
            setShowModal(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleReset = () => {
    setTime(25 * 60);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const handleCloseModal = () => setShowModal(false);

  const startPomodoro = () => {
    setTime(25 * 60);
    setElapsedTime(0);
    setIsRunning(true);
    setModalMessage('Pomodoro Ended');
    setTimerType('pomodoro');
  };

  const startShortBreak = () => {
    setTime(5 * 60);
    setElapsedTime(0);
    setIsRunning(true);
    setModalMessage('Short Break Finished!');
    setTimerType('short-break');
  };

  const startLongBreak = () => {
    setTime(15 * 60);
    setElapsedTime(0);
    setIsRunning(true);
    setModalMessage('Long Break Finished!');
    setTimerType('long-break');
  };

  return (
    <Container maxWidth="sm" className={`timer-container ${timerType}`} style={{ minHeight: '5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h3" align="center" gutterBottom>
        {formatTime(time)}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(elapsedTime / time) * 100}
        className="progress-bar"
        sx={{ height: 10, borderRadius: 5, marginBottom: 3 }}
      />

      {/* Flexbox Layout for Buttons */}
      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <Button variant="contained" color="success" onClick={() => setIsRunning(true)} sx={{ flex: 1 }}>
          Start
        </Button>
        <Button variant="contained" color="error" onClick={() => setIsRunning(false)} sx={{ flex: 1 }}>
          Pause
        </Button>
        <Button variant="outlined" color="default" onClick={handleReset} sx={{ flex: 1 }}>
          Reset
        </Button>
      </Box>

      {/* Flexbox Layout for Timer Types */}
      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <Button variant="contained" onClick={startPomodoro} sx={{ flex: 1 }}>
          Pomodoro
        </Button>
        <Button variant="contained" onClick={startShortBreak} sx={{ flex: 1 }}>
          Short Break
        </Button>
        <Button variant="contained" onClick={startLongBreak} sx={{ flex: 1 }}>
          Long Break
        </Button>
      </Box>

      {/* Modal for timer end */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{ width: '80%', maxWidth: 400, bgcolor: 'background.paper', padding: 3, borderRadius: 2, margin: 'auto', marginTop: 10 }}>
          <Typography variant="h5" align="center">
            {modalMessage}
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" onClick={handleCloseModal} fullWidth>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Timer;
