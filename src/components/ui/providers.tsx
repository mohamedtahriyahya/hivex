
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    hedera,
    hederaTestnet
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { Web3Provider } from "@/context/Web3Context";
import { ThemeProvider } from "@/context/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const config = getDefaultConfig({
    appName: 'Hivex',
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID!,
    chains: [hedera, hederaTestnet],
    ssr: false,
});

const queryClient = new QueryClient();

interface ProvidersProps {
    children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <Web3Provider>
                        <ThemeProvider>
                            <TooltipProvider>
                                {children}
                            </TooltipProvider>
                        </ThemeProvider>
                    </Web3Provider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};