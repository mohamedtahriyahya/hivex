
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Banknote,
  Send,
  FileText,
  Lightbulb,
  Settings,
  Menu,
  X,
  LogOut,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { VscRobot } from "react-icons/vsc";
import { useAccountDetails } from '@/hooks/use-account-details';
import toast from 'react-hot-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const result = useBalance({
    address: address!,
    unit: 'ether',
  })

  const { data } = useAccountDetails()
  const evmAddressRef = useRef()
  const hederaAccountIdRef = useRef()

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Buy Stocks', icon: ShoppingBag, path: '/buy' },
    { name: 'Sell Stocks', icon: Banknote, path: '/sell' },
    { name: 'Transfer Stocks', icon: Send, path: '/transfer' },
    { name: 'NFT Certificates', icon: FileText, path: '/certificates' },
    { name: 'AI Insights', icon: Lightbulb, path: '/insights' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'AI Chat', icon: VscRobot, path: '/chat' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar z-50 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
            {sidebarOpen && (
              <Link to="/dashboard" className="text-xl font-bold gradient-text flex items-center">
                <img src="/logo.png" alt="Hirex" className="h-12" />
                <span>Hivex</span>
              </Link>
            )}
            <button className="text-sidebar-foreground hover:text-web3-purple" onClick={toggleSidebar}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Wallet Info */}
          <div className={cn(
            "p-4 border-b border-sidebar-border",
            !sidebarOpen && "hidden md:block"
          )}>
            {sidebarOpen ? (
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Wallet</p>
                  <p className="text-sm text-sidebar-foreground truncate flex items-center gap-2.5">
                    <span>{address?.substring(0, 8)}...{address?.substring(address.length - 6)}</span>
                    <button type="button" title="Copy Wallet Address" onClick={() => {
                      navigator.clipboard.writeText(address!).then(() => {
                        toast.success("Wallet Address Copied!")
                      }).catch((err) => {
                        console.error("Failed to copy: ", err)
                        toast.error('Failed to copy!')
                      })
                    }}><Copy size={15} className="text-gray-400" /></button>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Hedera Account ID</p>
                  <p className="text-sm text-sidebar-foreground truncate flex items-center gap-2.5">
                    <span>{data?.account} </span> <button type="button" title="Copy Account ID" onClick={() => {
                      navigator.clipboard.writeText(data?.account).then(() => {
                        toast.success("Hedera Account ID Copied!")
                      }).catch((err) => {
                        console.error("Failed to copy: ", err)
                        toast.error('Failed to copy!')
                      })
                    }}><Copy size={15} className="text-gray-400" /></button>
                  </p>
                </div>
                <div>
                  <p className="mt-2 text-xs text-gray-400">Balance</p>
                  <p className="text-web3-gold font-semibold">{result.data?.formatted} {result.data?.symbol}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-web3-purple flex items-center justify-center">
                  <span className="text-xs font-bold">W</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            <ul className="space-y-2 px-2 divide-y-2 ">
              {navItems.map((item) => (
                <li key={item.name} className="pt-2">
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
                      location.pathname === item.path
                        ? "bg-sidebar-primary text-white"
                        : "text-gray-400 hover:bg-sidebar-accent hover:text-white"
                    )}
                  >
                    <item.icon size={20} />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle */}
          <div className={cn(
            "px-4 pb-2",
            !sidebarOpen && "flex justify-center"
          )}>
            {sidebarOpen ? (
              <div className="flex items-center justify-between text-gray-400">
                <span>Theme</span>
                <ThemeToggle showLabel={false} />
              </div>
            ) : (
              <ThemeToggle showLabel={false} />
            )}
          </div>

          {/* Logout */}
          <div className={cn(
            "p-4 border-t border-sidebar-border",
            !sidebarOpen && "flex justify-center"
          )}>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:bg-sidebar-accent"
              onClick={() => disconnect()}
            >
              <LogOut size={18} />
              {sidebarOpen && <span>Disconnect</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-0 md:ml-20"
      )}>
        {/* Top Bar */}
        <div className="p-4 md:hidden">
          <Button variant="outline" size="icon" onClick={toggleSidebar}>
            <Menu />
          </Button>
        </div>

        {/* Content */}
        <div className="px-4 md:px-8 py-6 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
