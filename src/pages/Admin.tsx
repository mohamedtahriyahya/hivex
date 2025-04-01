
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '@/context/Web3Context';
import AdminLayout from '@/components/layout/AdminLayout';
import TokenManagement from '@/components/admin/TokenManagement';
import UserManagement from '@/components/admin/UserManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";

// Admin wallet addresses that are authorized
const ADMIN_ADDRESSES = [
  "0x5b38da6a701c568545dcfcb03fcb875f56beddc4", // Example admin address
];

const Admin = () => {
  const { walletAddress, isConnected } = useWeb3();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the connected wallet is an admin
    if (!isConnected || !walletAddress) {
      toast.error("Please connect your wallet");
      navigate('/');
      return;
    }

    const isAuthorized = ADMIN_ADDRESSES.some(
      addr => addr.toLowerCase() === walletAddress.toLowerCase()
    );

    if (!isAuthorized) {
      toast.error("Unauthorized: Admin access only");
      navigate('/dashboard');
      return;
    }

    setIsAdmin(true);
  }, [walletAddress, isConnected, navigate]);

  if (!isAdmin) {
    return <div className="flex items-center justify-center h-screen">Verifying admin access...</div>;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Admin Dashboard</h1>

        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="tokens">Token Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens">
            <TokenManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="settings">
            <div className="rounded-lg border p-6 bg-card">
              <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
              <p className="text-muted-foreground">Configure platform settings, fees, and operational parameters.</p>

              {/* Settings content will go here in future implementation */}
              <div className="mt-4 p-8 border border-dashed rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Settings management interface coming soon.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="rounded-lg border p-6 bg-card">
              <h2 className="text-2xl font-semibold mb-4">Platform Analytics</h2>
              <p className="text-muted-foreground">View trading statistics, user growth, and platform performance.</p>

              {/* Analytics content will go here in future implementation */}
              <div className="mt-4 p-8 border border-dashed rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Analytics dashboard coming soon.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Admin;
