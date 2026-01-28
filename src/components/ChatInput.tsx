import { useState, KeyboardEvent } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-4xl mx-auto flex gap-3">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          disabled={disabled}
          className="flex-1 resize-none min-h-[60px] max-h-[200px]"
          rows={2}
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="icon"
          className="h-[60px] w-[60px] flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      <div className="max-w-4xl mx-auto mt-2 text-xs text-gray-500">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}
