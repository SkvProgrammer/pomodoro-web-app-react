import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Container, Modal, Box, TextField } from '@mui/material';
import '../styles/Timer.css'; // Import custom styles for further styling if required
import { PlayArrow, PauseCircleFilled, Refresh, Alarm, Settings } from '@mui/icons-material'; // New icons



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
      <Typography
  variant="h3"
  align="center"
  gutterBottom
  sx={{
    fontWeight: 900,
    fontFamily: "'Montserrat', sans-serif",
    background: "linear-gradient(90deg, #FF6F61, #D84315)", // Stylish gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textTransform: "uppercase",
    letterSpacing: "2px",
  }}
>
  {formatTime(time)}
</Typography>

      {/* Flexbox Layout for Start, Pause, and Reset Buttons */}
      <Box display="flex" justifyContent="center" gap={2} mb={3}>
  <Button
    variant="contained"
    sx={{
      flex: 1,
      background: 'linear-gradient(135deg, #FF4081, #F50057)', // Bright pink gradient
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: '0 6px 20px rgba(255, 64, 129, 0.6)', // Deeper shadow
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'linear-gradient(135deg, #F50057, #FF4081)', // Reverse gradient on hover
        boxShadow: '0 8px 25px rgba(245, 0, 87, 0.8)', // Stronger shadow on hover
        transform: 'scale(1.05)', // Slight scaling on hover
      },
      '&:active': {
        background: 'linear-gradient(135deg, #F50057, #FF4081)', // Keep the same gradient on active state
        boxShadow: '0 4px 15px rgba(245, 0, 87, 0.6)', // Shadow shrinks
        transform: 'scale(0.95)', // Stronger press effect
        transition: 'all 0.1s ease', // Faster transition when pressed
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 4px rgba(255, 64, 129, 0.3)', // Add focus effect
      },
    }}
    onClick={() => setIsRunning(true)}
    startIcon={<PlayArrow />}
  >
    Start
  </Button>

  <Button
    variant="contained"
    sx={{
      flex: 1,
      background: 'linear-gradient(135deg, #FF3D00, #D50000)', // Bright red gradient
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: '0 6px 20px rgba(255, 61, 0, 0.6)', // Deeper shadow
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'linear-gradient(135deg, #D50000, #FF3D00)', // Reverse gradient on hover
        boxShadow: '0 8px 25px rgba(213, 0, 0, 0.8)', // Stronger shadow on hover
        transform: 'scale(1.05)', // Slight scaling on hover
      },
      '&:active': {
        background: 'linear-gradient(135deg, #D50000, #FF3D00)', // Keep the same gradient on active state
        boxShadow: '0 4px 15px rgba(213, 0, 0, 0.6)', // Shadow shrinks
        transform: 'scale(0.95)', // Stronger press effect
        transition: 'all 0.1s ease', // Faster transition when pressed
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 4px rgba(213, 0, 0, 0.3)', // Add focus effect
      },
    }}
    onClick={() => setIsRunning(false)}
    startIcon={<PauseCircleFilled />}
  >
    Pause
  </Button>
</Box>

<Button
  variant="contained"
  sx={{
    flex: 1,
    background: 'linear-gradient(135deg, #1DE9B6, #00BFAE)', // Teal gradient
    color: '#fff',
    fontWeight: 'bold',
    boxShadow: '0 6px 20px rgba(29, 233, 182, 0.6)', // Deeper shadow
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #00BFAE, #1DE9B6)', // Reverse gradient on hover
      boxShadow: '0 8px 25px rgba(0, 191, 174, 0.8)', // Stronger shadow on hover
      transform: 'scale(1.05)', // Slight scaling on hover
    },
    '&:active': {
      background: 'linear-gradient(135deg, #00BFAE, #1DE9B6)', // Keep the same gradient on active state
      boxShadow: '0 4px 15px rgba(0, 191, 174, 0.6)', // Shadow shrinks
      transform: 'scale(0.95)', // Stronger press effect
      transition: 'all 0.1s ease', // Faster transition when pressed
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 4px rgba(29, 233, 182, 0.3)', // Add focus effect
    },
  }}
  onClick={handleReset}
  startIcon={<Refresh />}
>
  Reset
</Button>

<br />

<Button
  variant="contained"
  sx={{
    flex: 1,
    background: 'linear-gradient(135deg, #FFEB3B, #FF9800)', // Yellow to orange gradient
    color: '#fff',
    fontWeight: 'bold',
    boxShadow: '0 6px 20px rgba(255, 235, 59, 0.6)', // Deeper shadow
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #FF9800, #FFEB3B)', // Reverse gradient on hover
      boxShadow: '0 8px 25px rgba(255, 152, 0, 0.8)', // Stronger shadow on hover
      transform: 'scale(1.05)', // Slight scaling on hover
    },
    '&:active': {
      background: 'linear-gradient(135deg, #FF9800, #FFEB3B)', // Keep the same gradient on active state
      boxShadow: '0 4px 15px rgba(255, 152, 0, 0.6)', // Shadow shrinks
      transform: 'scale(0.95)', // Stronger press effect
      transition: 'all 0.1s ease', // Faster transition when pressed
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 4px rgba(255, 235, 59, 0.3)', // Add focus effect
    },
  }}
  onClick={startPomodoro}
  startIcon={<Alarm />}
>
  Pomodoro
</Button>

<br />

{/* Timer Type Buttons */}
<Box display="flex" justifyContent="center" gap={2} mb={3}>
  <Button
    variant="contained"
    sx={{
      flex: 1,
      background: 'linear-gradient(135deg, #00E5FF, #00B8D4)', // Blue gradient
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: '0 6px 20px rgba(0, 229, 255, 0.6)', // Deeper shadow
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'linear-gradient(135deg, #00B8D4, #00E5FF)', // Reverse gradient on hover
        boxShadow: '0 8px 25px rgba(0, 184, 212, 0.8)', // Stronger shadow on hover
        transform: 'scale(1.05)', // Slight scaling on hover
      },
      '&:active': {
        background: 'linear-gradient(135deg, #00B8D4, #00E5FF)', // Keep the same gradient on active state
        boxShadow: '0 4px 15px rgba(0, 184, 212, 0.6)', // Shadow shrinks
        transform: 'scale(0.95)', // Stronger press effect
        transition: 'all 0.1s ease', // Faster transition when pressed
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 4px rgba(0, 229, 255, 0.3)', // Add focus effect
      },
    }}
    onClick={startShortBreak}
    startIcon={<Alarm />}
  >
    Short Break
  </Button>

  <Button
    variant="contained"
    sx={{
      flex: 1,
      background: 'linear-gradient(135deg, #6200EA, #7C4DFF)', // Purple gradient
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: '0 6px 20px rgba(98, 0, 234, 0.6)', // Deeper shadow
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'linear-gradient(135deg, #7C4DFF, #6200EA)', // Reverse gradient on hover
        boxShadow: '0 8px 25px rgba(124, 77, 255, 0.8)', // Stronger shadow on hover
        transform: 'scale(1.05)', // Slight scaling on hover
      },
      '&:active': {
        background: 'linear-gradient(135deg, #7C4DFF, #6200EA)', // Keep the same gradient on active state
        boxShadow: '0 4px 15px rgba(124, 77, 255, 0.6)', // Shadow shrinks
        transform: 'scale(0.95)', // Stronger press effect
        transition: 'all 0.1s ease', // Faster transition when pressed
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 4px rgba(124, 77, 255, 0.3)', // Add focus effect
      },
    }}
    onClick={startLongBreak}
    startIcon={<Alarm />}
  >
    Long Break
  </Button>
</Box>

{/* Set Timers Button */}
<Box display="flex" justifyContent="center" mb={3}>
  <Button
    variant="contained"
    sx={{
      flex: 1,
      background: 'linear-gradient(135deg, #4CAF50, #8BC34A)', // Green gradient
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.6)', // Deeper shadow
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'linear-gradient(135deg, #8BC34A, #4CAF50)', // Reverse gradient on hover
        boxShadow: '0 8px 25px rgba(139, 195, 74, 0.8)', // Stronger shadow on hover
        transform: 'scale(1.05)', // Slight scaling on hover
      },
      '&:active': {
        background: 'linear-gradient(135deg, #8BC34A, #4CAF50)', // Keep the same gradient on active state
        boxShadow: '0 4px 15px rgba(139, 195, 74, 0.6)', // Shadow shrinks
        transform: 'scale(0.95)', // Stronger press effect
        transition: 'all 0.1s ease', // Faster transition when pressed
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 4px rgba(139, 195, 74, 0.3)', // Add focus effect
      },
    }}
    onClick={() => setShowCustomTimerInputs(!showCustomTimerInputs)}
    startIcon={<Settings />}
  >
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
   <Button
  variant="contained"
  color="primary"
  sx={{
    background: 'linear-gradient(45deg, #3F51B5, #1A237E)', // Blue gradient
    color: '#fff', // Ensure text remains white
    fontWeight: 'bold', // Bold text for emphasis
    boxShadow: '0 6px 20px rgba(63, 81, 181, 0.6)', // Soft shadow to begin with
    transition: 'all 0.2s ease', // Smooth transition for effects
    '&:hover': {
      background: 'linear-gradient(45deg, #1A237E, #3F51B5)', // Reverse gradient on hover
      boxShadow: '0 8px 25px rgba(26, 35, 126, 0.8)', // Stronger shadow on hover
      transform: 'scale(1.05)', // Slight scaling on hover
    },
    '&:active': {
      background: 'linear-gradient(45deg, #1A237E, #3F51B5)', // Keep same gradient on active state
      boxShadow: '0 4px 15px rgba(26, 35, 126, 0.6)', // Shadow shrinks
      transform: 'scale(0.95)', // Stronger press effect (shrinks on click)
      transition: 'all 0.1s ease', // Faster transition when pressed
    },
    '&:focus': {
      outline: 'none', // Remove default outline
      boxShadow: '0 0 0 4px rgba(63, 81, 181, 0.3)', // Add focus glow
    },
  }}
  onClick={handleSaveCustomTimes}
  startIcon={<Settings />}
>
  Save & Apply
</Button>

  </Box>
 )}
  
    
      {/* Modal for timer end */}
      <Modal open={showModal}  onClose={handleCloseModal}>
        <Box sx={{ width: '80%', maxWidth: 400, bgcolor: 'background.paper', padding: 3, borderRadius: 2, margin: 'auto', marginTop: 10 }}>
          <Typography variant="h5" align="center">
            {modalMessage}
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" sx={{
  flex: 1,
  background: 'linear-gradient(45deg, #FB8C00, #FFEB3B)', // Orange to yellow gradient
  '&:hover': {
    background: 'linear-gradient(45deg, #FFEB3B, #FB8C00)', // Reverse gradient on hover
  },
}}
 onClick={handleCloseModal} fullWidth>
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
