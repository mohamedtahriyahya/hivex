
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ChatBox from '@/components/chat/ChatBox';

const Chat = () => {
  return (
    <DashboardLayout>
      <div className="container h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <ChatBox />
          <div className="mt-6 text-sm text-muted-foreground">
            Need immediate assistance? Our team is available 24/7.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;


