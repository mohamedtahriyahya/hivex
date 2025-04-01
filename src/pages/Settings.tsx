
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Wallet,
  Bell,
  Lock,
  PhoneCall,
  Download,
  Smartphone,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Settings = () => {
  const { walletAddress } = useWeb3();
  const { theme, toggleTheme } = useTheme();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card className="bg-card border-web3-purple/20">
              <CardHeader>
                <div className="flex items-center">
                  <User className="mr-2 text-web3-purple" size={20} />
                  <CardTitle>Profile Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      placeholder="Your Name"
                      className="bg-background/50 border-web3-purple/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background/50 border-web3-purple/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="w-full h-24 bg-background/50 border border-web3-purple/20 rounded-md p-2"
                  ></textarea>
                </div>

                <Button className="bg-web3-purple hover:bg-web3-dark-purple">
                  Save Profile Changes
                </Button>
              </CardContent>
            </Card>

            {/* Wallet Management */}
            <Card className="bg-card border-web3-purple/20">
              <CardHeader>
                <div className="flex items-center">
                  <Wallet className="mr-2 text-web3-purple" size={20} />
                  <CardTitle>Wallet Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-web3-purple/20">
                  <h4 className="font-medium mb-2">Connected Wallet</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Address</p>
                      <p className="font-mono">{walletAddress}</p>
                    </div>
                    <Button variant="outline" className="border-web3-purple/30 text-web3-purple hover:bg-web3-purple/10">
                      Change Wallet
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="border-web3-purple/30 text-web3-purple hover:bg-web3-purple/10 flex items-center">
                    <Download className="mr-2" size={16} />
                    Export Private Key
                  </Button>
                  <Button variant="outline" className="border-web3-purple/30 text-web3-purple hover:bg-web3-purple/10 flex items-center">
                    <ShieldCheck className="mr-2" size={16} />
                    Backup Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-card border-web3-purple/20">
              <CardHeader>
                <div className="flex items-center">
                  <Lock className="mr-2 text-web3-purple" size={20} />
                  <CardTitle>Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-web3-purple/20">
                  <div className="flex items-center">
                    <Smartphone className="mr-3 text-web3-purple" size={20} />
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-web3-purple/20">
                  <div className="flex items-center">
                    <Bell className="mr-3 text-web3-purple" size={20} />
                    <div>
                      <h4 className="font-medium">Login Notifications</h4>
                      <p className="text-sm text-gray-400">Get alerted about new logins</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <Button className="w-full">Change Password</Button>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-card border-web3-purple/20">
              <CardHeader>
                <div className="flex items-center">
                  <CreditCard className="mr-2 text-web3-purple" size={20} />
                  <CardTitle>Withdrawal Methods</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-web3-purple/20">
                  <div className="flex items-center">
                    <div className="mr-3 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">M</div>
                    <div>
                      <h4 className="font-medium">M-Pesa</h4>
                      <p className="text-sm text-gray-400">Connect mobile money account</p>
                    </div>
                  </div>
                  <Button variant="outline" className="text-web3-purple border-web3-purple/30">
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-web3-purple/20">
                  <div className="flex items-center">
                    <div className="mr-3 h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">B</div>
                    <div>
                      <h4 className="font-medium">Bank Account</h4>
                      <p className="text-sm text-gray-400">Add bank account details</p>
                    </div>
                  </div>
                  <Button variant="outline" className="text-web3-purple border-web3-purple/30">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Theme Settings - New Section */}
            <Card className="bg-card border-web3-purple/20">
              <CardHeader>
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <Moon className="mr-2 text-web3-purple" size={20} />
                  ) : (
                    <Sun className="mr-2 text-web3-purple" size={20} />
                  )}
                  <CardTitle>Appearance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 rounded-lg border border-web3-purple/20">
                  <div>
                    <h4 className="font-medium">Theme Mode</h4>
                    <p className="text-sm text-gray-400">Switch between dark and light mode</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-gray-400" />
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                    <Moon className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-card border-web3-purple/20">
              <CardHeader>
                <div className="flex items-center">
                  <Bell className="mr-2 text-web3-purple" size={20} />
                  <CardTitle>Notification Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="stock-alerts" className="flex-1">Stock Price Alerts</Label>
                  <Switch id="stock-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="purchase-notifications" className="flex-1">Purchase Confirmations</Label>
                  <Switch id="purchase-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-insights" className="flex-1">AI Trading Insights</Label>
                  <Switch id="ai-insights" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="market-news" className="flex-1">Market News</Label>
                  <Switch id="market-news" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="promo" className="flex-1">Promotional Updates</Label>
                  <Switch id="promo" />
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-card border-web3-purple/20">
              <CardHeader>
                <div className="flex items-center">
                  <PhoneCall className="mr-2 text-web3-purple" size={20} />
                  <CardTitle>Help & Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border border-web3-purple/20 flex items-center justify-between cursor-pointer hover:bg-web3-purple/10 transition-colors">
                  <span>Contact Support</span>
                  <ChevronRight size={18} className="text-web3-purple" />
                </div>
                <div className="p-3 rounded-lg border border-web3-purple/20 flex items-center justify-between cursor-pointer hover:bg-web3-purple/10 transition-colors">
                  <span>FAQs</span>
                  <ChevronRight size={18} className="text-web3-purple" />
                </div>
                <div className="p-3 rounded-lg border border-web3-purple/20 flex items-center justify-between cursor-pointer hover:bg-web3-purple/10 transition-colors">
                  <span>Video Tutorials</span>
                  <ChevronRight size={18} className="text-web3-purple" />
                </div>
              </CardContent>
            </Card>

            {/* App Information */}
            <Card className="bg-card border-web3-purple/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <h3 className="gradient-text font-bold text-2xl">Hivex</h3>
                  <p className="text-gray-400">Version 1.0.0</p>
                  <div className="pt-4 flex justify-center space-x-4">
                    <Button variant="outline" size="sm" className="text-web3-purple border-web3-purple/30 hover:bg-web3-purple/10">
                      Terms of Service
                    </Button>
                    <Button variant="outline" size="sm" className="text-web3-purple border-web3-purple/30 hover:bg-web3-purple/10">
                      Privacy Policy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
