import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Container, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/TaskManager.css'; // Import custom styles if needed

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Update localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks)); // Update localStorage
      setTask(''); // Clear input field after adding task
    }
  };

  // Remove a task and update localStorage
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update localStorage
  };

  return (
    <Container maxWidth="sm" className="task-manager-container" sx={{ minHeight: '5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>
      
      {/* Task Input and Add Button */}
      <Box mb={3} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Add a new task..."
          variant="outlined"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
        />
        <Button variant="contained" color="primary" fullWidth onClick={addTask}>
          Add Task
        </Button>
      </Box>
      
      {/* Task List */}
      <List>
        {tasks.map((t, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <ListItemText primary={t} />
            <IconButton edge="end" onClick={() => removeTask(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskManager;
