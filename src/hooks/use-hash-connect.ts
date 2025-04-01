
import { LedgerId } from "@hashgraph/sdk";
import { useQuery } from "@tanstack/react-query";
import { DappMetadata, HashConnect } from "hashconnect";

const appMetadata: DappMetadata = {
    name: "Hivex",
    description: "Embrace the Future of Trading",
    icons: [
        "/logo_2.png",
    ],
    url: "https://hivex.vercel.app",
};


export const useHashConnect = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["hashConnect"],
        queryFn: async () => {
            const hashConnectInstance = new HashConnect(LedgerId.TESTNET, import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID!, appMetadata, true);
            return hashConnectInstance;
        },
        enabled: true,
        refetchOnWindowFocus: false,
    })

    return { ...data, error, isLoading }
}