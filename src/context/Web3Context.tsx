
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";

interface Web3ContextType {
  isConnected: boolean;
  walletAddress: string | null;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0.00");

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      // In a real implementation, this would interact with MetaMask, Hedera, or other wallet providers
      // Simulating wallet connection
      setTimeout(() => {
        const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        setWalletAddress(mockAddress);
        setBalance("1,245.67");
        setIsConnected(true);
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${mockAddress.substring(0, 6)}...${mockAddress.substring(38)}`,
        });
      }, 1000);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
      });
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setBalance("0.00");
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const value = {
    isConnected,
    walletAddress,
    balance,
    connectWallet,
    disconnectWallet,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
