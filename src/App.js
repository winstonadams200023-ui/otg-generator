import React, { useState, useEffect, useRef } from 'react';
import './index.css';

function App() {
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied,setCopied] = useState(false);
  const timerRef = useRef(null);

  // 1. Standalone timer function
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const generateOtp = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(newOtp);
      setTimeLeft(30);
      setIsGenerating(false);

      // 2. Call the timer function here
      startTimer();
    }, 600);
  };

  const copyToClipboard = () => {
    if (otp) {
      navigator.clipboard.writeText(otp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="App">
      <h1>OTP Generator</h1>
      <button 
        onClick={generateOtp} 
        disabled={isGenerating || timeLeft > 0}
      >
        {isGenerating ? "Generating..." : timeLeft > 0 ? `Wait (${timeLeft}s)` : "Generate OTP"}
      </button>

      <p id="otp-timer" aria-live="polite">
        {isGenerating
          ? "Waiting..."
          : timeLeft > 0
          ? `Expires in: ${timeLeft} seconds`
          : otp
          ? "OTP expired. Click the button to generate a new OTP."
          : ""}
      </p>

      {otp && !isGenerating && (
        <div>
          <h2>Your OTP: {otp}</h2>
          <button onClick={copyToClipboard} style={{ marginTop: '5px', padding: '6px 12px', fontSize: '0.85rem' }}>
            {copied ? "Copied! ✓" : "Copy to Clipboard"}
          </button>
        </div>
      )}

      <hr/>
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
        Secure, fast, and reliable one-time password generation.  
      </p>
      <div className="footer">
       <small>© 2026 Winston Adams.</small>
       <div>
        <small>All rights reserved.</small>
       </div> 
      </div> 
    </div>
  );
}

export default App;
