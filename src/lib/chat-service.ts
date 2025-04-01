
import { Message } from '@/types/chat';
import axios from "axios"

// Mock data for demo purposes
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Welcome to the Hivex chat! How can I help you today?',
    sender: 'system',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 24h ago
    status: 'sent'
  }
];

// In a real application, replace these with actual API calls
export const fetchMessages = (): Message[] => {

  // Return mock data
  return [...MOCK_MESSAGES];
};

export const sendMessage = async (content: string): Promise<Message> => {

  const response = await axios.post(`${import.meta.env.VITE_HIVEX_BACKEND_URL!}/api/v1/chat`, {
    message: content
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })

  const aiResponseMessage = response.data.response;

  // Create user message
  const userMessage: Message = {
    id: `user - ${Date.now()} `,
    content,
    sender: 'user',
    timestamp: new Date().toISOString(),
    status: 'sent'
  };

  // Simulate response from API
  const responseMessage: Message = {
    id: `assistant - ${Date.now()} `,
    content: aiResponseMessage,
    sender: 'assistant',
    timestamp: new Date().toISOString(),
    status: 'sent'
  };

  // Add messages to mock data for future fetches
  MOCK_MESSAGES.push(userMessage, responseMessage);

  return userMessage;
};

