import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        if (transcript.toLowerCase().includes('help')) {
          sendEmergencyAlert();
          recognition.stop();
        }
      };

      recognition.start();
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  };

  const sendEmergencyAlert = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-alert', { method: 'GET' });

      if (response.ok) {
        setAlertSent(true);
        setTimeout(() => {
          setAlertSent(false);
          setIsListening(false);
        }, 3000);
      } else {
        alert('Error sending alert.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending alert.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-center mb-6 shadow-lg p-4">
  Emergency Alert System
</h1>

        
        <div className="space-y-6">
          <div className="bg-pink-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-pink-800 mb-4">Voice Recognition Status</h2>
            <div className="flex items-center space-x-4 justify-center">
              <button
                onClick={startVoiceRecognition}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${
                  isListening 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-pink-600 hover:bg-pink-700'
                } text-white transition-all duration-300`}
              >
                <Mic className="h-5 w-5" />
                <span>{isListening ? 'Listening...' : 'Start Listening'}</span>
              </button>
              
              {alertSent && (
                <div className="flex items-center space-x-2 text-green-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Emergency alerts sent successfully!</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-pink-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-pink-800 mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Click the "Start Listening" button to activate voice recognition</li>
              <li>In case of emergency, say "HELP" clearly</li>
              <li>The system will automatically send alerts to your emergency contacts</li>
              <li>Contacts will be notified in order of priority</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
