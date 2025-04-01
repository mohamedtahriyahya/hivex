
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from 'wagmi';
import { useAccountTokens } from '@/hooks/use_account_tokens';
import { UserStockHoldingTable } from '@/components/user/UserStockHoldingTable';

const SellStocks = () => {

  const { address } = useAccount()

  const { tokens } = useAccountTokens({
    evmAccountAddress: address!,
    networkType: 'testnet'
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Sell Stocks</h1>
          <p className="text-gray-400">Manage and sell your stock holdings</p>
        </div>

        {/* Stocks Table */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardHeader>
            <CardTitle>Your Stock Holdings</CardTitle>
            <CardDescription>Select the stocks you want to sell</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <UserStockHoldingTable tokens={tokens} />
            </div>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardHeader>
            <CardTitle>Selling Stock Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                When you sell your stock tokens, the transaction is processed on the blockchain:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Select the stock and number of shares you wish to sell</li>
                <li>Review the current market price and total value</li>
                <li>Confirm the transaction and pay a small gas fee</li>
                <li>Receive the value in your wallet after blockchain confirmation</li>
                <li>Your NFT certificate will be updated or burned accordingly</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SellStocks;
