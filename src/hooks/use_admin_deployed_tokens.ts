
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { get_token_details } from "@/functions/get_token_details"

export const useAdminDeployedTokens = () => {
    const { data: deployedTokens } = useQuery({
        queryKey: ["admin-deployed-tokens"],
        queryFn: async () => {
            const response = await axios.get("https://testnet.mirrornode.hedera.com/api/v1/tokens", {
                params: {
                    publickey: "64cbaf97688ee8b59659b4dfee9d43757d7b9bdcbfa7e49bf782e9c093a808b3"
                }
            });

            const tokens = response.data.tokens;

            if (!tokens || tokens.length === 0) {
                return [];
            }

            //fetch each tokens' details
            const tokenDetails = await Promise.all(tokens.map(async (token) => {
                const details = await get_token_details(token.token_id)
                return details;
            }));

            //combine the details with the original tokens
            const combinedTokens = tokens.map((token, index: number) => {
                return { ...token, details: tokenDetails[index] };
            });

            return combinedTokens;
        },
        refetchOnWindowFocus: false,
        refetchInterval: 20000,
    });

    return { deployedTokens };
}