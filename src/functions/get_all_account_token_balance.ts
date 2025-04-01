
import {
    AllTokensBalancesApiResponse,
    DetailedTokenBalance,
    HederaNetworkType,
    HtsTokenBalanceApiReponse, HtsTokenDetails,
} from "@/types";
import { get_hts_token_details } from "./get_hts_token_details";
import { toDisplayUnit } from "@/utils/hts-format-utils";

export const get_all_tokens_balances = async (
    networkType: HederaNetworkType,
    accountId: string
): Promise<Array<DetailedTokenBalance>> => {
    let url: string | null = `https://${networkType}.mirrornode.hedera.com/api/v1/balances?account.id=${accountId}`;
    const array = new Array<DetailedTokenBalance>();

    try {
        while (url) { // Results are paginated
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: AllTokensBalancesApiResponse = await response.json();

            for (const token of data.balances[0]?.tokens || []) {
                const tokenDetails: HtsTokenDetails = await get_hts_token_details(token.token_id, networkType);

                const detailedTokenBalance: DetailedTokenBalance = {
                    balance: token.balance,
                    tokenDecimals: tokenDetails.decimals,
                    tokenId: token.token_id,
                    tokenName: tokenDetails.name,
                    tokenSymbol: tokenDetails.symbol,
                    balanceInDisplayUnit: (await toDisplayUnit(token.token_id, token.balance, networkType))
                };
                array.push(detailedTokenBalance);
            }

            // Update URL for pagination
            url = data.links.next;
        }

        return array;
    } catch (error) {
        console.error("Failed to fetch token balances. Error:", error);
        throw error;
    }
};