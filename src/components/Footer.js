import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import quotes from "../data/quotes";
const Footer = () => {
// Display a random quote using toast
const showRandomQuote = () => {
  // toast.dismiss();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  toast.info(randomQuote, {
    position: "bottom-right",
    autoClose: 5000, 
    closeButton: false, // Removes the close button
    icon: false, // Removes the icon

});
  
};
// Show random quote every 5 minutes
  useEffect(() => {
    showRandomQuote(); // Show immediately on load
    const intervalId = setInterval(showRandomQuote, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);



  return (
    <footer className="mt-5 py-3 border-top">
      <Container className="text-center">
        <p className="mb-0">© {new Date().getFullYear()} Supomodoro. All rights reserved.</p>
        <p className="small">
          Built with ❤️ by{' '}
          <a
            href="https://satyamkumarverman.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Satyam Kumar Verman
          </a>
        </p>
      </Container>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
