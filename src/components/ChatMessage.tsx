import { ThumbsUp, ThumbsDown, Bot, User } from "lucide-react";
import { useState } from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  messageId: string;
  onFeedback?: (messageId: string, feedback: "up" | "down") => void;
  initialFeedback?: "up" | "down" | null;
}

export function ChatMessage({
  role,
  content,
  messageId,
  onFeedback,
  initialFeedback = null,
}: ChatMessageProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(initialFeedback);

  const handleFeedback = (type: "up" | "down") => {
    const newFeedback = feedback === type ? null : type;
    setFeedback(newFeedback);
    if (onFeedback && newFeedback) {
      onFeedback(messageId, newFeedback);
    }
  };

  const isUser = role === "user";

  return (
    <div className={`flex gap-4 p-6 ${isUser ? "bg-white" : "bg-gray-50"}`}>
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="mb-1">
          {isUser ? "Me" : "Genie Finance Assistance"}
        </div>
        <div className="text-gray-900 whitespace-pre-wrap">{content}</div>
        
        {!isUser && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleFeedback("up")}
              className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                feedback === "up" ? "bg-gray-200 text-blue-600" : "text-gray-500"
              }`}
              aria-label="Thumbs up"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFeedback("down")}
              className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                feedback === "down" ? "bg-gray-200 text-red-600" : "text-gray-500"
              }`}
              aria-label="Thumbs down"
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
