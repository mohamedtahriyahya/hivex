
import React from 'react';
import { Shield, Users, BarChart3, Settings } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full">
        <div className="bg-primary/10 p-4 mb-6 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2">
            <Shield className="text-primary h-6 w-6" />
            <h2 className="text-lg font-semibold">Admin Mode</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            You are currently in admin mode. Changes made here will affect all users.
          </p>
        </div>
        
        {children}
      </div>
    </DashboardLayout>
  );
};

export default AdminLayout;
