
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { Search, TrendingUp, TrendingDown, Check, Info } from 'lucide-react';
import { useAdminDeployedTokens } from '@/hooks/use_admin_deployed_tokens';

const BuyStocks = () => {
  const { deployedTokens } = useAdminDeployedTokens()
  const [searchTerm, setSearchTerm] = useState('');
  const [purchaseDialog, setPurchaseDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState('1');
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [processingPurchase, setProcessingPurchase] = useState(false);

  const filteredStocks = deployedTokens?.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPurchaseDialog = (stock) => {
    setSelectedStock(stock);
    setPurchaseDialog(true);
  };

  const handleContinuePurchase = () => {
    setPurchaseDialog(false);
    setConfirmationDialog(true);
  };

  const handleConfirmPurchase = () => {
    setProcessingPurchase(true);

    // Simulate blockchain transaction
    setTimeout(() => {
      setProcessingPurchase(false);
      setConfirmationDialog(false);

      toast.success(`You have successfully purchased ${shares} shares of ${selectedStock.name}.`)
    }, 2000);
  };

  const calculateTotal = () => {
    if (!selectedStock || !shares || isNaN(parseInt(shares))) return 0;
    return (parseFloat(selectedStock.price) * parseInt(shares)).toFixed(2);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Buy Stocks</h1>
          <p className="text-gray-400">Explore and purchase tokenized stocks</p>
        </div>

        {/* Search and Filter */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search stocks by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 border-web3-purple/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStocks?.map((stock) => (
            <Card key={stock.id} className="bg-card-gradient border-web3-purple/20 card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{stock.symbol}</CardTitle>
                    <CardDescription>{stock.name}</CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${stock.positive ? 'bg-web3-success/20 text-web3-success' : 'bg-web3-error/20 text-web3-error'
                    }`}>
                    {stock.change}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stock.price} KES</div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="text-gray-400">Market Cap</div>
                    <div>{stock.details.max_supply}</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-gray-400">Volume</div>
                    <div>{stock.details.total_supply}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-web3-purple hover:bg-web3-dark-purple"
                  onClick={() => openPurchaseDialog(stock)}
                >
                  Buy Stock
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Purchase Dialog */}
        <Dialog open={purchaseDialog} onOpenChange={setPurchaseDialog}>
          <DialogContent className="bg-web3-dark-blue border border-web3-purple/30">
            <DialogHeader>
              <DialogTitle>Buy {selectedStock?.name} Stock</DialogTitle>
              <DialogDescription>
                Enter the number of shares you want to purchase.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                <div>
                  <div className="text-gray-400 text-sm">Current Price</div>
                  <div className="text-lg font-medium">{selectedStock?.price} KES</div>
                </div>
                <div className={`flex items-center ${selectedStock?.positive ? 'text-web3-success' : 'text-web3-error'
                  }`}>
                  {selectedStock?.positive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  <span className="ml-1">{selectedStock?.change}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shares">Number of Shares</Label>
                <Input
                  id="shares"
                  type="number"
                  min="1"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  className="bg-black/20 border-web3-purple/20"
                />
              </div>

              <div className="p-3 rounded-lg bg-black/30">
                <div className="flex justify-between items-center">
                  <div className="text-gray-400">Subtotal</div>
                  <div>{calculateTotal()} KES</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-gray-400">Gas Fee</div>
                  <div>~0.25 HBAR</div>
                </div>
                <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between items-center">
                  <div className="font-medium">Total Cost</div>
                  <div className="font-bold">{calculateTotal()} KES + 0.25 HBAR</div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setPurchaseDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-web3-purple hover:bg-web3-dark-purple"
                onClick={handleContinuePurchase}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog open={confirmationDialog} onOpenChange={setConfirmationDialog}>
          <DialogContent className="bg-web3-dark-blue border border-web3-purple/30">
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
              <DialogDescription>
                Review your stock purchase details before confirming.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-black/30 border border-web3-purple/20">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold">{selectedStock?.name} ({selectedStock?.symbol})</h3>
                  <p className="text-gray-400">Stock Purchase Confirmation</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shares</span>
                    <span className="font-medium">{shares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price per Share</span>
                    <span className="font-medium">{selectedStock?.price} KES</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Value</span>
                    <span className="font-medium">{calculateTotal()} KES</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Fee</span>
                    <span className="font-medium">0.25 HBAR</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 flex justify-between">
                    <span>Total Cost</span>
                    <span className="font-bold">{calculateTotal()} KES + 0.25 HBAR</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2 p-3 rounded-lg bg-web3-purple/10 border border-web3-purple/30">
                <Info size={18} className="text-web3-purple mt-0.5" />
                <div className="text-sm">
                  <p>You'll receive an NFT certificate as proof of ownership after your purchase is confirmed on the blockchain.</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmationDialog(false)} disabled={processingPurchase}>
                Cancel
              </Button>
              <Button
                className="bg-web3-purple hover:bg-web3-dark-purple"
                onClick={handleConfirmPurchase}
                disabled={processingPurchase}
              >
                {processingPurchase ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Purchase"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default BuyStocks;
