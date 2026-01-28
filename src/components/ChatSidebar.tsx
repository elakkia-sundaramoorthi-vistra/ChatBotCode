import { Button } from "./ui/button";
import { Plus, MessageSquare } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface Session {
  id: string;
  title: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  sessions: Session[];
  currentSessionId: string;
  onNewSession: () => void;
  onSelectSession: (sessionId: string) => void;
}

export function ChatSidebar({
  sessions,
  currentSessionId,
  onNewSession,
  onSelectSession,
}: ChatSidebarProps) {
  return (
    <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Button onClick={onNewSession} className="w-full gap-2">
          <Plus className="w-4 h-4" />
          New Session
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full text-left p-3 rounded-lg mb-1 flex items-start gap-2 transition-colors ${
                session.id === currentSessionId
                  ? "bg-white shadow-sm border border-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
              <div className="flex-1 min-w-0">
                <div className="truncate text-gray-900">{session.title}</div>
                <div className="text-xs text-gray-500">
                  {session.timestamp.toLocaleDateString()}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
