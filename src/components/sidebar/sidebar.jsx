import React, { useState } from "react"
import './sidebar.css'
import { assets } from "../../assets/assets";

const Sidebar = () => {
    
    const [extended, setExtended] = useState(true)
    
    return (
        <div className={`sidebar ${!extended ? 'collapsed' : ''}`}>
            <div className="top">
                <button 
                    className="menu-button" 
                    onClick={() => setExtended(prev => !prev)}
                    aria-label="Toggle sidebar"
                >
                    <img src={assets.menu_icon} alt="menu" />
                </button>
                <button className="new-chat">
                    <img src={assets.plus_icon} alt="plus" />
                    {extended && <span>New Chat</span>}
                </button>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        <div className="recent-list">
                            <div className="recent-entry">
                                <img src={assets.message_icon} alt="message" />
                                <p>What is react...</p>
                            </div>
                            <div className="recent-entry">
                                <img src={assets.message_icon} alt="message" />
                                <p>Explain JavaScript...</p>
                            </div>
                            <div className="recent-entry">
                                <img src={assets.message_icon} alt="message" />
                                <p>How to use CSS...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item">
                    <img src={assets.question_icon} alt="help" />
                    {extended && <span>Help</span>}
                </div>
                <div className="bottom-item">
                    <img src={assets.history_icon} alt="activity" />
                    {extended && <span>Activity</span>}
                </div>
                <div className="bottom-item">
                    <img src={assets.setting_icon} alt="settings" />
                    {extended && <span>Settings</span>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;