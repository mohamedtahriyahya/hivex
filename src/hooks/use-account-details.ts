import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

export const useAccountDetails = () => {
    const { address } = useAccount()

    return useQuery({
        queryKey: ["accountDetails"],
        queryFn: async () => {
            if (!address) return null
            const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${address}`)
            if (!response.ok) throw new Error("Failed to fetch account details")
            return response.json()
        },
    })
}