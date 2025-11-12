import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Paperclip, Image, Phone, Video, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useChat } from "../hooks/useApi";
import { usePets } from "../hooks/useApi";
import type { ChatMessage } from "../types/api";

interface VetChatFinalProps {
  onNavigate: (screen: string) => void;
}

export function VetChatFinal({ onNavigate }: VetChatFinalProps) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { loading, sendMessage, getChatHistory } = useChat();
  const { pets } = usePets();
  const currentPet = pets && pets.length > 0 ? pets[0] : null;

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      setIsLoadingHistory(true);
      const history = await getChatHistory();
      setChatHistory(history);
      setIsLoadingHistory(false);
    };
    loadHistory();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage("");

    try {
      const response = await sendMessage({
        message: userMessage,
        pet_id: currentPet?.id,
      });

      if (response) {
        // Refresh chat history after sending
        const updatedHistory = await getChatHistory();
        setChatHistory(updatedHistory);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format messages for display
  const formattedMessages = chatHistory.flatMap((chat, idx) => [
    {
      id: `user-${idx}`,
      sender: "user",
      message: chat.message,
      time: formatTime(new Date(chat.created_at)),
    },
    {
      id: `ai-${idx}`,
      sender: "vet",
      name: "PawMetric AI Assistant",
      avatar: "🤖",
      message: chat.response,
      time: formatTime(new Date(chat.created_at)),
    },
  ]);

  if (isLoadingHistory) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Chat Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#34D399] flex items-center justify-center text-2xl">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="text-[#111827]">PawMetric AI Assistant</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></div>
              <span className="text-sm text-[#6B7280]">Online</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full text-[#6B7280] hover:bg-[#F3F4F6]"
            >
              <Phone className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full text-[#6B7280] hover:bg-[#F3F4F6]"
            >
              <Video className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {formattedMessages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          formattedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] ${msg.sender === "user" ? "order-2" : ""}`}>
              {msg.sender === "vet" && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{msg.avatar}</span>
                  <span className="text-xs text-[#6B7280]">{msg.name}</span>
                </div>
              )}
              <div
                className={`rounded-[20px] px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)] ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white rounded-tr-sm"
                    : "bg-white text-[#111827] rounded-tl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
              <p className={`text-xs text-[#9CA3AF] mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                {msg.time}
              </p>
            </div>
          </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-[#E5E7EB] p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition-all"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition-all"
          >
            <Image className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="flex-1 bg-[#F3F4F6] border-0 rounded-full px-4 h-11 focus:ring-2 focus:ring-[#2563EB] transition-all"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={loading || !message.trim()}
            className="w-11 h-11 bg-gradient-to-br from-[#2563EB] to-[#34D399] hover:from-[#1D4ED8] hover:to-[#10B981] rounded-full shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Utility function
function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
