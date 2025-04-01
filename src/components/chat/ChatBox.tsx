
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Message } from '@/types/chat';
import { fetchMessages, sendMessage } from '@/lib/chat-service';
import ChatMessage from './ChatMessage';
import { VscRobot } from "react-icons/vsc";

const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch initial messages
    useEffect(() => {
        const getMessages = () => {
            try {
                setIsLoading(true);
                const data = fetchMessages();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
                toast.error("Failed to load messages");
            } finally {
                setIsLoading(false);
            }
        };

        getMessages();
    }, [messages]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        try {
            setIsLoading(true);

            // Optimistically add message to UI
            const tempMessage: Message = {
                id: `temp-${Date.now()}`,
                content: newMessage,
                sender: 'user',
                timestamp: new Date().toISOString(),
                status: 'sending'
            };

            setMessages(prev => [...prev, tempMessage]);
            setNewMessage('');

            // Send message to API
            const sentMessage = await sendMessage(newMessage);

            // Replace temporary message with actual response
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === tempMessage.id ? sentMessage : msg
                )
            );

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message");

            // Mark message as failed
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === `temp-${Date.now()}` ? { ...msg, status: 'failed' } : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full h-fit flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <VscRobot className="h-5 w-5" />
                    Hivex AI Chat
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-[500px] pr-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                            No messages yet. Start a conversation!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </ScrollArea>
            </CardContent>

            <CardFooter>
                <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                    <Textarea
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="min-h-[44px] max-h-[120px]"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                            }
                        }}
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !newMessage.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
};

export default ChatBox;

