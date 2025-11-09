import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Paperclip, Image } from "lucide-react";
import { useState } from "react";

interface VetChatScreenProps {
  onNavigate: (screen: string) => void;
}

const messages = [
  {
    id: 1,
    sender: "vet",
    name: "Dr. Sarah Johnson",
    avatar: "👩‍⚕️",
    message: "Hello! I reviewed Max's recent eye scan. The mild redness is likely due to minor irritation.",
    time: "2:34 PM",
  },
  {
    id: 2,
    sender: "user",
    message: "Thank you for reviewing! Should I be concerned?",
    time: "2:36 PM",
  },
  {
    id: 3,
    sender: "vet",
    name: "Dr. Sarah Johnson",
    avatar: "👩‍⚕️",
    message: "Not at this point. Monitor for 48 hours. If redness increases or you notice discharge, book an in-person visit.",
    time: "2:38 PM",
  },
  {
    id: 4,
    sender: "user",
    message: "Got it. What about using eye drops?",
    time: "2:39 PM",
  },
  {
    id: 5,
    sender: "vet",
    name: "Dr. Sarah Johnson",
    avatar: "👩‍⚕️",
    message: "You can use saline solution to gently clean the area 2x daily. Avoid human eye drops unless prescribed by a vet.",
    time: "2:41 PM",
  },
];

export function VetChatScreen({ onNavigate }: VetChatScreenProps) {
  const [message, setMessage] = useState("");

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Chat Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-2xl">
            👩‍⚕️
          </div>
          <div className="flex-1">
            <h3 className="text-[#111827]">Dr. Sarah Johnson</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6EE7B7]"></div>
              <span className="text-sm text-[#6B7280]">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
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
                className={`rounded-2xl px-4 py-3 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-[#2563EB] to-[#60A5FA] text-white rounded-tr-sm"
                    : "bg-white text-[#111827] rounded-tl-sm shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
              <p className={`text-xs text-[#9CA3AF] mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-[#E5E7EB] p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full"
          >
            <Image className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-[#F3F4F6] border-0 rounded-full px-4"
          />
          <Button
            size="icon"
            className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#60A5FA] hover:from-[#1D4ED8] hover:to-[#3B82F6] rounded-full"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
