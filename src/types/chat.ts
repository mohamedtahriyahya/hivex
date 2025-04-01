
export interface Message {
<<<<<<< HEAD
    id: string;
    content: string;
    sender: 'user' | 'system' | 'assistant';
    timestamp: string;
    status?: 'sending' | 'sent' | 'failed';
=======
  id: string;
  content: string;
  sender: 'user' | 'system' | 'assistant';
  timestamp: string;
  status?: 'sending' | 'sent' | 'failed';
>>>>>>> 9663ec869fbb591a20f6760fc08407b61eb6f529
}
