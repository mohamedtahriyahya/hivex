
import axios from "axios"

export const get_token_details = async (tokenId: string) => {
    const response = await axios.get(`https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}`);
    return response.data;
}