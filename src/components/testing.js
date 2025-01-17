import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Box, List, ListItem, ListItemText, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskAlt } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import quotes from "../data/quotes";

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [task, setTask] = useState("");

  // Display a random quote using toast
  const showRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    toast.info(randomQuote, {
      position: "top-right",
      autoClose:5000,
    });
  };

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update localStorage
      setTask(""); // Clear input field
    }
  };

  // Remove a task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Show random quote every 5 minutes
  useEffect(() => {
    showRandomQuote(); // Show immediately on load
    const intervalId = setInterval(showRandomQuote, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      {/* Input and Add Button */}
      <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        
        <Button
          variant="contained"
          onClick={addTask}
          startIcon={<TaskAlt />}
        >
          Add Task
        </Button>
      </Box>

      {/* Task List */}
      <List sx={{ width: "100%" }}>
        {tasks.map((t, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => removeTask(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={t} />
          </ListItem>
        ))}
      </List>

      {/* Toast Container */}
      <ToastContainer />
    </Container>
  );
};

export default TaskManager;
