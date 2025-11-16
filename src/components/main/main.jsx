import React, { useState } from "react"
import './main.css'
import { assets } from "../../assets/assets";

const Main = () => {
    const [input, setInput] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [isTyping, setIsTyping] = useState(false)

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

    const handleSuggestionClick = (text) => {
        setInput(text)
        setShowSuggestions(false)
        setIsTyping(true)
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
                            {/* Messages will appear here when chat starts */}
                        </div>
                    </div>
                </div>

                <div className={`main-bottom ${isTyping ? 'centered' : ''}`}>
                    <div className="input-container">
                        <input 
                            type="text" 
                            placeholder="Enter a prompt here" 
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value)
                                if (e.target.value) {
                                    setShowSuggestions(false)
                                    setIsTyping(true)
                                } else {
                                    setShowSuggestions(true)
                                    setIsTyping(false)
                                }
                            }}
                            onFocus={() => {
                                if (!input) {
                                    setShowSuggestions(true)
                                }
                            }}
                            onBlur={() => {
                                if (!input) {
                                    setIsTyping(false)
                                }
                            }}
                        />
                        <div className="input-icons">
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input && (
                                <img 
                                    src={assets.send_icon} 
                                    alt="send" 
                                    className="send-icon"
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

