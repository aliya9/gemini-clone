import { createContext, useState } from "react";
import { sendMessage } from "../config/gemini";

const Context = createContext();

const ContextProvider = (props) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSent = async (prompt) => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);

        // Add user message to current chat
        const userMessage = {
            role: "user",
            parts: prompt,
            timestamp: new Date().toISOString()
        };

        const updatedChat = [...currentChat, userMessage];
        setCurrentChat(updatedChat);

        try {
            // Prepare chat history for API (last 10 messages to avoid token limits)
            const recentHistory = updatedChat.slice(-10).map(msg => ({
                role: msg.role,
                parts: msg.parts
            }));

            // Send message to Gemini API
            const response = await sendMessage(prompt, recentHistory.slice(0, -1));

            // Add AI response to chat
            const aiMessage = {
                role: "model",
                parts: response,
                timestamp: new Date().toISOString()
            };

            const finalChat = [...updatedChat, aiMessage];
            setCurrentChat(finalChat);
        } catch (err) {
            console.error("Error in onSent:", err);
            setError(err.message || "Failed to get response from Gemini");
            
            // Remove the user message if there was an error
            setCurrentChat(updatedChat.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };

    const startNewChat = () => {
        // Save current chat to history if it has messages
        if (currentChat.length > 0) {
            const chatTitle = currentChat[0].parts.substring(0, 30) + (currentChat[0].parts.length > 30 ? "..." : "");
            const newHistoryEntry = {
                id: Date.now().toString(),
                title: chatTitle,
                messages: [...currentChat],
                timestamp: new Date().toISOString()
            };
            setChatHistory(prev => [newHistoryEntry, ...prev]);
        }
        setCurrentChat([]);
        setError(null);
    };

    const loadChat = (chatId) => {
        const chat = chatHistory.find(c => c.id === chatId);
        if (chat) {
            setCurrentChat(chat.messages);
            setError(null);
        }
    };

    const contextValue = {
        onSent,
        currentChat,
        chatHistory,
        isLoading,
        error,
        startNewChat,
        loadChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
export { Context };