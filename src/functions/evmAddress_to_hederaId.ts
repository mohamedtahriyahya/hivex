
import axios from "axios"

export const evmAddress_to_hederaId = async (evmAddress: `0x${string}`): Promise<string | null> => {
    const response = await axios.get(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${evmAddress}`);
    const data = response.data;
    return data.account
}

const test = async (evmAddress: `0x${string}`): Promise<string | null> => {
    let accountId = null;

    axios.get(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${evmAddress}`).then((res) => {
        accountId = res.data.account;
    })

    return accountId
}

console.log(test('0x0aa0Bfb70aA4115D275615ff382e9D2c24181A94'))