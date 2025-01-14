import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-5 py-3 border-top">
      <Container className="text-center">
        <p className="mb-0">© {new Date().getFullYear()} Pomodoro App. All rights reserved.</p>
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
    </footer>
  );
};

export default Footer;
