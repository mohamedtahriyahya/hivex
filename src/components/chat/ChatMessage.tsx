
import React from 'react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '@/types/chat';
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%] break-words",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <div><ReactMarkdown>{message.content}</ReactMarkdown></div>
        <div
          className={cn(
            "text-xs mt-1",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {formattedTime}
          {message.status === 'sending' && ' • Sending...'}
          {message.status === 'failed' && ' • Failed to send'}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
