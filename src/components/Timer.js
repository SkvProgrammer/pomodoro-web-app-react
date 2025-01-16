import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Container, Modal, Box, TextField } from '@mui/material';
import '../styles/Timer.css'; // Import custom styles for further styling if required

const Timer = () => {
  const [time, setTime] = useState(25 * 60); // Default Pomodoro time
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [timerType, setTimerType] = useState('');
  const [customTime, setCustomTime] = useState({ pomodoro: "25", shortBreak: "5", longBreak: "15" }); // Store custom times as strings
  const [showCustomTimerInputs, setShowCustomTimerInputs] = useState(false); // Manage visibility of custom timer inputs
  const audioRef = useRef(null); // Reference for the alert audio

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
            setIsRunning(false);
            setModalMessage(timerType === 'pomodoro' ? 'Timer Ended !' : timerType === 'short-break' ? 'Timer Finished!' : 'Timer Finished!');
            setShowModal(true);
            if (audioRef.current) {
              audioRef.current.volume = 0.3;
              audioRef.current.play();
            }
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, timerType]);  // Added `timerType` to the dependency array

  const handleReset = () => {
    setTime(parseInt(customTime.pomodoro, 10) * 60);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const handleCloseModal = () => setShowModal(false);

  const startPomodoro = () => {
    setTime(parseInt(customTime.pomodoro, 10) * 60);
    setElapsedTime(0);
    setIsRunning(true);
    setModalMessage('Pomodoro Ended');
    setTimerType('pomodoro');
  };

  const startShortBreak = () => {
    setTime(parseInt(customTime.shortBreak, 10) * 60);
    setElapsedTime(0);
    setIsRunning(true);
    setModalMessage('Short Break Finished!');
    setTimerType('short-break');
  };

  const startLongBreak = () => {
    setTime(parseInt(customTime.longBreak, 10) * 60);
    setElapsedTime(0);
    setIsRunning(true);
    setModalMessage('Long Break Finished!');
    setTimerType('long-break');
  };

  const handleCustomTimeChange = (type, value) => {
    if (/^\d*$/.test(value)) { // Allow only numeric input
      setCustomTime((prev) => ({ ...prev, [type]: value }));
    }
  };

  const handleSaveCustomTimes = () => {
    setShowCustomTimerInputs(false);
    setCustomTime((prev) => ({
      pomodoro: parseInt(prev.pomodoro, 10),
      shortBreak: parseInt(prev.shortBreak, 10),
      longBreak: parseInt(prev.longBreak, 10),
    }));
    if (timerType === 'pomodoro') {
      startPomodoro();
    } else if (timerType === 'short-break') {
      startShortBreak();
    } else if (timerType === 'long-break') {
      startLongBreak();
    }

    setTime(parseInt(customTime.pomodoro, 10) * 60);
    setElapsedTime(0);
    setIsRunning(false);
  };

  return (
    <Container maxWidth="sm" className={`timer-container ${timerType}`} style={{ minHeight: '5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h3" align="center" gutterBottom>
        {formatTime(time)}
      </Typography>

      {/* Flexbox Layout for Start, Pause, and Reset Buttons */}
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

      {/* Timer Type Buttons */}
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

      {/* Set Timers Button */}
      <Box display="flex" justifyContent="center" mb={3}>
        <Button variant="contained" color="info" onClick={() => setShowCustomTimerInputs(!showCustomTimerInputs)} sx={{ flex: 1 }}>
          Set Custom Timers
        </Button>
      </Box>

      {/* Custom Timer Inputs */}
      {showCustomTimerInputs && (
        <Box display="flex" flexDirection="column" gap={2} mb={3}>
          <TextField
            label="Pomodoro Time (mins)"
            type="text"
            value={customTime.pomodoro}
            onChange={(e) => handleCustomTimeChange('pomodoro', e.target.value)}
          />
          <TextField
            label="Short Break Time (mins)"
            type="text"
            value={customTime.shortBreak}
            onChange={(e) => handleCustomTimeChange('shortBreak', e.target.value)}
          />
          <TextField
            label="Long Break Time (mins)"
            type="text"
            value={customTime.longBreak}
            onChange={(e) => handleCustomTimeChange('longBreak', e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSaveCustomTimes}>
            Save & Apply
          </Button>
        </Box>
      )}

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

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/alert.mp3" />
    </Container>
  );
};

export default Timer;
