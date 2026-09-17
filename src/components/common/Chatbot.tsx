"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Bot } from "lucide-react";
import clsx from "clsx";
import { siteConfig } from "@/src/config/site";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! 👋 Welcome to Go India Cab. How can we help you plan your trip today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: inputValue }]);
    setInputValue("");

    // Simulate bot reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          sender: "bot", 
          text: `Thanks for reaching out! Our agents are currently assisting other travelers. For immediate bookings, please call us directly at ${siteConfig.phone.booking1}.` 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={clsx(
          "mb-4 w-[calc(100vw-3rem)] sm:w-[360px] max-w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-left",
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-[#3f51b5] text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Go India Cab Support</h3>
              <p className="text-xs text-white/80">We typically reply in minutes</p>
            </div>
          </div>
          <button 
            onClick={toggleChat}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="h-[250px] p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={clsx(
                "flex max-w-[85%]",
                msg.sender === "user" ? "self-end justify-end" : "self-start"
              )}
            >
              {msg.sender === "bot" && (
                <div className="w-6 h-6 rounded-full bg-[#3f51b5] flex items-center justify-center shrink-0 mr-2 mt-1">
                  <Bot className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div 
                className={clsx(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  msg.sender === "user" 
                    ? "bg-[#3f51b5] text-white rounded-br-none" 
                    : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none"
                )}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center shrink-0 ml-2 mt-1">
                  <User className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-gray-100 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3f51b5]/50"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="ml-2 w-10 h-10 bg-[#3f51b5] text-white rounded-full flex items-center justify-center shrink-0 hover:bg-[#32408f] transition-colors disabled:opacity-50 disabled:hover:bg-[#3f51b5]"
            >
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        onClick={toggleChat}
        className={clsx(
          "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-300 hover:scale-110 pointer-events-auto",
          isOpen ? "bg-gray-800" : "bg-[#3f51b5]"
        )}
        aria-label="Open Chat Support"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
      </button>

    </div>
  );
}
