import { evmAddress_to_hederaId } from "@/functions/evmAddress_to_hederaId"
import { get_all_tokens_balances } from "@/functions/get_all_account_token_balance";
import { DetailedTokenBalance } from "@/types";
import { useEffect, useState } from "react";

export const useAccountTokens = ({ evmAccountAddress, networkType }) => {
    //convert evm to hedera account Id

    //fetch tokens from hedera account Id
    const [accountId, setAccountId] = useState("")
    const [tokens, setTokens] = useState<DetailedTokenBalance[]>([]);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                evmAddress_to_hederaId(evmAccountAddress).then((res) => {
                    if (!res) {
                        throw new Error("No valid Hedera Account Id found!")
                    }

                    setAccountId(res);
                }).catch((error) => {
                    console.error("Error converting EVM address to Hedera account ID:", error);
                    setAccountId("")
                })

                const tokens = await get_all_tokens_balances(networkType, accountId);
                if (tokens) {
                    setTokens(tokens);
                } else {
                    console.error("No tokens found for the account.");
                    setTokens([]);
                }
            } catch (error) {
                console.error("Error fetching tokens:", error);
            }
        };

        fetchTokens();
    }, [accountId, networkType, evmAccountAddress]);

    return { tokens };

}