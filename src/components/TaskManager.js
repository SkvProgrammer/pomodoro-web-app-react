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
  // const showRandomQuote = () => {
  //   // toast.dismiss();
  //   const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  //   toast.info(randomQuote, {
  //     // position: "bottom-right",
  //     autoClose: 10000, 
  //     closeButton: false, // Removes the close button
  //     icon: false, // Removes the icon

  // });
    
  // };

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

  // // Show random quote every 5 minutes
  // useEffect(() => {
  //   showRandomQuote(); // Show immediately on load
  //   const intervalId = setInterval(showRandomQuote, (0.1) * 60 * 1000); // 5 minutes
  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, []);

  return (
<Container
      maxWidth="sm"
      className="task-manager-container"
      sx={{ minHeight: "5vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      <Typography variant="h4" align="center" sx={{
    fontWeight: 900,
    fontFamily: "'Montserrat', sans-serif",
    background: "linear-gradient(90deg, #FF6F61, #D84315)", // Stylish gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textTransform: "uppercase",
    letterSpacing: "2px",
  }}  gutterBottom>
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
       <Button
  variant="contained"
  sx={{
    flex: 1,
    background: "linear-gradient(45deg, #3F51B5, #2196F3)", // Indigo to blue gradient
    color: "#fff", // Ensure text remains white
    fontWeight: "bold", // Bold text for emphasis
    boxShadow: "0 6px 20px rgba(63, 81, 181, 0.6)", // Soft shadow to begin with
    transition: "all 0.2s ease", // Smooth transition for effects
    "&:hover": {
      background: "linear-gradient(45deg, #2196F3, #3F51B5)", // Reverse gradient on hover
      boxShadow: "0 8px 25px rgba(33, 150, 243, 0.8)", // Stronger shadow on hover
      transform: "scale(1.05)", // Slight scaling on hover
    },
    "&:active": {
      background: "linear-gradient(45deg, #2196F3, #3F51B5)", // Keep same gradient on active state
      boxShadow: "0 4px 15px rgba(33, 150, 243, 0.6)", // Shadow shrinks
      transform: "scale(0.95)", // Stronger press effect (shrinks on click)
      transition: "all 0.1s ease", // Faster transition when pressed
    },
    "&:focus": {
      outline: "none", // Remove default outline
      boxShadow: "0 0 0 4px rgba(33, 150, 243, 0.3)", // Add focus glow
    },
  }}
  color="primary"
  fullWidth
  onClick={addTask}
  startIcon={<TaskAlt />}
>
  Add Task
</Button>
      </Box>

      {/* Task List */}
      <List>
        {tasks.map((t, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <ListItemText primary={t} />
            <IconButton edge="end" onClick={() => removeTask(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
   
  {/* <ToastContainer /> */}
    </Container>
  );
};

export default TaskManager;
