
import React, { useState } from 'react';

import {
  BarChart4, Edit, Eye, Loader2, Plus, RefreshCw, Rocket, Search,
  Trash2, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for stock tokens
const mockStockTokens = [
  {
    id: '1',
    name: 'Safaricom',
    symbol: 'SCOM',
    totalSupply: '10000000',
    price: '25.60',
    change: '+2.3%',
    marketCap: '1.03B',
    status: 'active',
    lastUpdated: '2023-11-01'
  },
  {
    id: '2',
    name: 'Equity Bank',
    symbol: 'EQTY',
    totalSupply: '5000000',
    price: '45.35',
    change: '-0.7%',
    marketCap: '226.8M',
    status: 'active',
    lastUpdated: '2023-11-02'
  },
  {
    id: '3',
    name: 'KCB Group',
    symbol: 'KCB',
    totalSupply: '3200000',
    price: '38.75',
    change: '+1.2%',
    marketCap: '124M',
    status: 'active',
    lastUpdated: '2023-11-01'
  },
  {
    id: '4',
    name: 'EABL',
    symbol: 'EABL',
    totalSupply: '1800000',
    price: '152.25',
    change: '+0.5%',
    marketCap: '274.1M',
    status: 'pending',
    lastUpdated: '2023-10-30'
  }
];

const TokenManagement = () => {
  const [tokens, setTokens] = useState(mockStockTokens);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentToken, setCurrentToken] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter tokens based on search term
  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateToken = () => {
    setCurrentToken({
      id: '',
      name: '',
      symbol: '',
      totalSupply: '',
      price: '',
      change: '',
      marketCap: '',
      status: 'pending',
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    setIsCreating(true);
  };

  const handleEditToken = (token) => {
    setCurrentToken(token);
    setIsEditing(true);
  };

  const handleDeployToken = (token) => {
    setCurrentToken(token);
    setIsDeploying(true);
  };

  const handleDeleteToken = (tokenId: string) => {
    // In a real app, this would call an API to delete the token
    setTokens(tokens.filter(t => t.id !== tokenId));
    toast.success('Token deleted successfully');
  };

  const handleSaveToken = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isCreating) {
        const newToken = {
          ...currentToken,
          id: (tokens.length + 1).toString(),
        };
        setTokens([...tokens, newToken]);
        toast.success('Token created successfully');
      } else if (isEditing) {
        setTokens(tokens.map(t => t.id === currentToken.id ? currentToken : t));
        toast.success('Token updated successfully');
      }

      setIsLoading(false);
      setIsCreating(false);
      setIsEditing(false);
      setCurrentToken(null);
    }, 1000);
  };

  const handleDeployConfirm = () => {
    setIsLoading(true);

    // Simulate token deployment
    setTimeout(() => {
      setTokens(tokens.map(t =>
        t.id === currentToken.id
          ? { ...t, status: 'active' }
          : t
      ));
      toast.success(`${currentToken.name} token deployed successfully`);
      setIsLoading(false);
      setIsDeploying(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentToken({ ...currentToken, [name]: value });
  };

  const handleRefreshData = () => {
    const TOAST_ID = "1"

    toast.loading('Refreshing token data...', {
      id: TOAST_ID
    });

    // In a real app, this would fetch the latest data from the blockchain
    setTimeout(() => {
      toast.success('Token data refreshed', {
        id: TOAST_ID
      });
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Stock Tokens</h2>
          <p className="text-muted-foreground">Manage tokenized stocks on the platform</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshData}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={handleCreateToken}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Token
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tokens.length}</div>
            <p className="text-xs text-muted-foreground">
              {tokens.filter(t => t.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.65B</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+5.25%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trading Volume (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125.4M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.3%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search tokens by name or symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell className="font-medium">{token.name}</TableCell>
                  <TableCell>{token.symbol}</TableCell>
                  <TableCell>${token.price}</TableCell>
                  <TableCell className={token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                    {token.change}
                  </TableCell>
                  <TableCell>${token.marketCap}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${token.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                      {token.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditToken(token)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      {token.status !== 'active' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-500 hover:text-blue-600"
                          onClick={() => handleDeployToken(token)}
                        >
                          <Rocket className="h-4 w-4" />
                          <span className="sr-only">Deploy</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteToken(token.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <BarChart4 className="h-4 w-4" />
                        <span className="sr-only">Analytics</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No tokens found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Token Dialog */}
      <Dialog open={isCreating || isEditing} onOpenChange={(open) => {
        if (!open) {
          setIsCreating(false);
          setIsEditing(false);
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isCreating ? 'Create New Token' : 'Edit Token'}</DialogTitle>
            <DialogDescription>
              {isCreating
                ? 'Fill in the details below to create a new stock token.'
                : 'Update the token details and save your changes.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={currentToken?.name || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. Safaricom"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="symbol" className="text-sm font-medium">Symbol</label>
                <Input
                  id="symbol"
                  name="symbol"
                  value={currentToken?.symbol || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. SCOM"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="totalSupply" className="text-sm font-medium">Total Supply</label>
                <Input
                  id="totalSupply"
                  name="totalSupply"
                  value={currentToken?.totalSupply || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. 10000000"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Initial Price ($)</label>
                <Input
                  id="price"
                  name="price"
                  value={currentToken?.price || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. 25.60"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="marketCap" className="text-sm font-medium">Market Cap</label>
              <Input
                id="marketCap"
                name="marketCap"
                value={currentToken?.marketCap || ''}
                onChange={handleInputChange}
                placeholder="e.g. 1.03B"
              />
            </div>
            {/* Additional fields could be added here as needed */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreating(false);
              setIsEditing(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveToken} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deploy Token Dialog */}
      <Dialog open={isDeploying} onOpenChange={(open) => {
        if (!open) setIsDeploying(false);
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Deploy Token to Blockchain</DialogTitle>
            <DialogDescription>
              This action will deploy the {currentToken?.name} ({currentToken?.symbol}) token to the blockchain.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="font-medium">Token Details</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Name:</div>
                <div>{currentToken?.name}</div>
                <div className="text-muted-foreground">Symbol:</div>
                <div>{currentToken?.symbol}</div>
                <div className="text-muted-foreground">Total Supply:</div>
                <div>{currentToken?.totalSupply}</div>
                <div className="text-muted-foreground">Initial Price:</div>
                <div>${currentToken?.price}</div>
              </div>
            </div>
            <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950/50">
              <div className="flex gap-3">
                <Upload className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="font-medium text-amber-800 dark:text-amber-400">
                    Ready to Deploy
                  </div>
                  <div className="text-sm text-amber-700 dark:text-amber-300/80">
                    This will create a new token contract on the blockchain.
                    Gas fees will apply.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeploying(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleDeployConfirm}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Deploying...' : 'Deploy Token'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TokenManagement;

