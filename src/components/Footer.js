import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import quotes from '../data/quotes';

const Footer = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  
  const isSpeechSupported = () => {
    return 'speechSynthesis' in window;
  };

  const readQuoteAloud = (quote) => {
    if (!isSpeechSupported()) {
      toast.error("Text-to-speech is not supported in your browser");
      return;
    }

    try {
      stopSpeaking();

      const utterance = new SpeechSynthesisUtterance(quote);
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a female voice
//       const femaleVoice = voices.find(voice => 
//         voice.name.includes('female') || 
//         voice.name.includes('Samantha') || 
//         voice.name.includes('Victoria') ||
//         voice.name.includes('Karen') ||
//         voice.name.includes('Moira') ||
//         voice.name.toLowerCase().includes('woman') ||
//         voice.name.toLowerCase().includes('indian') || 
//         voice.name.toLowerCase().includes('aishwarya') || 
//         voice.name.toLowerCase().includes('priya') || 
//         voice.name.toLowerCase().includes('neha') 
//       );
      
// if (femaleVoice) {
//   utterance.voice = femaleVoice;
// }
const indianFemaleVoice = voices.find(voice => 
  voice.name === 'Aishwarya' || // or another specific Indian female voice name
  voice.name.toLowerCase().includes('indian')
);

if (indianFemaleVoice) {
utterance.voice = indianFemaleVoice;
}

      
      // Adjust parameters for a softer, higher-pitched voice
      utterance.rate = 0.95;      // Slightly slower for clarity
      utterance.pitch = 1.2;      // Higher pitch for feminine voice
      utterance.volume = 1;       // Full volume
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        // console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        // toast.error("Failed to read quote aloud");
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      // toast.error("Failed to initialize text-to-speech");
      setIsSpeaking(false);
    }
  };

  // Use effect to initialize voices
  useEffect(() => {
    const initVoices = () => {
      // Some browsers need a little time to initialize voices
      window.speechSynthesis.getVoices();
    };

    if (window.speechSynthesis) {
      initVoices();
      // Chrome requires this event handler
      window.speechSynthesis.onvoiceschanged = initVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const showRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
    
    toast.info(
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{randomQuote}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isSpeaking) {
              stopSpeaking();
            } else {
              readQuoteAloud(randomQuote);
            }
          }}
          style={{ 
            marginLeft: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {isSpeaking ? '🔇' : '🔊'}
        </button>
      </div>,
      {
        position: "bottom-right",
        autoClose: 8000,
        closeButton: true,
        icon: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        onOpen: () => {
          stopSpeaking();
          setTimeout(() => {
            readQuoteAloud(randomQuote);
          }, 100);
        }
      }
    );
  };

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      showRandomQuote();
    }, 1000);

    const intervalId = setInterval(showRandomQuote, 5 * 60 * 1000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopSpeaking();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <footer className="mt-5 py-3 border-top">
      <Container className="text-center">
        <p className="mb-0">© {new Date().getFullYear()} Supomodoro. All rights reserved.</p>
        <p className="small">
          Built with ❤️ by{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Satyam Kumar Verman
          </a>
        </p>
      </Container>
      <ToastContainer 
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </footer>
  );
};

export default Footer;
