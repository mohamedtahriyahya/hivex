
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, AlertTriangle, Info } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useAccountTokens } from '@/hooks/use_account_tokens';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TransferStocks = () => {

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
          <h1 className="text-3xl font-bold mb-2">Transfer Stocks</h1>
          <p className="text-gray-400">Send your stock tokens to another wallet</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transfer Form */}
          <Card className="lg:col-span-2 bg-card-gradient border-web3-purple/20">
            <CardHeader>
              <CardTitle>Transfer Stock Ownership</CardTitle>
              <CardDescription>Transfer your NFT certificates to another wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="stock">Select Stock</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-black/20 border-web3-purple/20 rounded-md p-2 text-white">
                      <SelectValue placeholder="Select a stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Active Stocks</SelectLabel>
                        {
                          tokens.map((stock) => (
                            <SelectItem value={stock.tokenId}>{stock.tokenName} ({stock.tokenSymbol}) - {stock.balance} Shares</SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Recipient Address */}
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Wallet Address</Label>
                  <Input
                    id="recipient"
                    placeholder="0x..."
                    className="bg-black/20 border-web3-purple/20"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Number of Shares to Transfer</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="1"
                    min="1"
                    max="125"
                    className="bg-black/20 border-web3-purple/20"
                  />
                </div>

                {/* Warning */}
                <div className="p-4 rounded-lg bg-web3-warning/10 border border-web3-warning/30 flex items-start space-x-3">
                  <AlertTriangle className="text-web3-warning mt-0.5" size={18} />
                  <div>
                    <h4 className="font-medium text-web3-warning">Important</h4>
                    <p className="text-sm">
                      Transferring ownership is irreversible. Make sure you're sending to the correct wallet address.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button className="w-full bg-web3-purple hover:bg-web3-dark-purple">
                  <Send className="mr-2" size={18} />
                  Transfer Stock Tokens
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="bg-card-gradient border-web3-purple/20">
            <CardHeader>
              <CardTitle>Transfer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-black/30 border border-web3-purple/20 space-y-2">
                  <h4 className="font-medium">About Transfers</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <Info size={16} className="text-web3-purple mr-2 mt-0.5" />
                      Transferring stocks sends the NFT certificate to another wallet
                    </li>
                    <li className="flex items-start">
                      <Info size={16} className="text-web3-purple mr-2 mt-0.5" />
                      Gas fees apply (typically 0.25-0.5 HBAR)
                    </li>
                    <li className="flex items-start">
                      <Info size={16} className="text-web3-purple mr-2 mt-0.5" />
                      Transfers complete within 1-2 minutes
                    </li>
                    <li className="flex items-start">
                      <Info size={16} className="text-web3-purple mr-2 mt-0.5" />
                      Both parties receive confirmation
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-black/30 border border-web3-purple/20">
                  <h4 className="font-medium mb-2">Transaction Fees</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gas Fee (Estimated)</span>
                      <span>0.25 HBAR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transfer Fee</span>
                      <span>0.00 HBAR</span>
                    </div>
                    <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between">
                      <span>Total</span>
                      <span className="font-bold">0.25 HBAR</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardHeader>
            <CardTitle>Transfer History</CardTitle>
            <CardDescription>Your previous stock transfers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-400 py-8">
              <p>No transfer history found.</p>
              <p className="text-sm">Your completed transfers will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransferStocks;
