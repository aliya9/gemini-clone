import React, { useState, useContext, useEffect, useRef } from "react"
import ReactMarkdown from 'react-markdown'
import './main.css'
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
    const { onSent, currentChat, isLoading, error } = useContext(Context);
    const [input, setInput] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(true)
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentChat, isLoading]);

    useEffect(() => {
        if (currentChat.length > 0) {
            setShowSuggestions(false);
        } else {
            setShowSuggestions(true);
        }
    }, [currentChat]);

    const suggestions = [
        {
            icon: assets.bulb_icon,
            text: "Plan a trip to see the northern lights"
        },
        {
            icon: assets.code_icon,
            text: "Write a Python script to analyze data"
        },
        {
            icon: assets.compass_icon,
            text: "Explain quantum computing in simple terms"
        },
        {
            icon: assets.message_icon,
            text: "Help me write a professional email"
        }
    ]

    const handleSuggestionClick = async (text) => {
        setInput(text)
        setShowSuggestions(false)
        await onSent(text)
        setInput("")
    }

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const prompt = input.trim();
        setInput("");
        await onSent(prompt);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="main">
            <div className="main-header">
                <h1 className="app-title">Gemini Clone</h1>
                <div className="profile-icon">
                    <img src={assets.user_icon} alt="Profile" />
                </div>
            </div>
            <div className="main-container">
                <div className="main-content">
                    <div className={`greet-wrapper ${showSuggestions ? 'show' : 'hide'}`}>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="suggestions">
                            {suggestions.map((suggestion, index) => (
                                <div 
                                    key={index}
                                    className="suggestion-card"
                                    onClick={() => handleSuggestionClick(suggestion.text)}
                                >
                                    <img src={suggestion.icon} alt="" />
                                    <p>{suggestion.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`messages-wrapper ${!showSuggestions ? 'show' : 'hide'}`}>
                        <div className="messages">
                            {currentChat.map((message, index) => (
                                <div key={index} className={`message ${message.role === "user" ? "user-message" : "ai-message"}`}>
                                    <div className="message-content">
                                        {message.role === "user" ? (
                                            <div className="user-message-wrapper">
                                                <img src={assets.user_icon} alt="user" className="message-icon" />
                                                <p>{message.parts}</p>
                                            </div>
                                        ) : (
                                            <div className="ai-message-wrapper">
                                                <img src={assets.gemini_icon} alt="gemini" className="message-icon" />
                                                <div className="markdown-content">
                                                    <ReactMarkdown>{message.parts}</ReactMarkdown>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message ai-message">
                                    <div className="message-content">
                                        <div className="ai-message-wrapper">
                                            <img src={assets.gemini_icon} alt="gemini" className="message-icon" />
                                            <div className="typing-indicator">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="error-message">
                                    <p>Error: {error}</p>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                </div>

                <div className="main-bottom">
                    <div className="input-container">
                        <input 
                            type="text" 
                            placeholder="Enter a prompt here" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            autoFocus
                        />
                        <div className="input-icons">
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input && (
                                <img 
                                    src={assets.send_icon} 
                                    alt="send" 
                                    className="send-icon"
                                    onClick={handleSend}
                                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                                />
                            )}
                        </div>
                    </div>
                    <p className="info">
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main

