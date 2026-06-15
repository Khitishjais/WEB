import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, ChevronRight } from 'lucide-react';
import './ChatBot.css';
import botAvatarImg from '../../assets/images/chatbot_avatar.jpg';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I'm Sparsh AI Chatbot 👋 How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Find a Doctor",
    "OPD Timings",
    "Emergency Services",
    "Book Appointment"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      const botMessage = { 
        id: Date.now() + 1, 
        text: data.reply || "I'm having trouble connecting to my knowledge base. Please try again or contact hospital support.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Connection error. Please check if the server is running.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className="chatbot-header">
              <div className="bot-info">
                <div className="bot-avatar">
                  <img src={botAvatarImg} alt="Bot Avatar" className="bot-avatar-img" />
                </div>
                <div className="bot-name-status">
                  <h3>Sparsh Assistant</h3>
                  <div className="status-online">AI Powered</div>
                </div>
              </div>
              <button className="close-btn-lux" onClick={() => setIsOpen(false)}>
                <X size={20} color="#94a3b8" />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="message bot typing">
                  <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input-area">
              <div className="quick-replies">
                {quickReplies.map((reply, idx) => (
                  <button 
                    key={idx} 
                    className="qr-btn"
                    onClick={() => handleSend(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="Type your query..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  className="send-btn" 
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="chatbot-greeting-tooltip"
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ delay: 2, duration: 0.6, type: 'spring', bounce: 0.5 }}
          >
            Hi, I'm Sparsh AI Chatbot 👋
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="chatbot-bubble"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <>
            <img src={botAvatarImg} alt="Chat" className="bot-bubble-img" />
            <span className="chatbot-notification-dot" />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ChatBot;
