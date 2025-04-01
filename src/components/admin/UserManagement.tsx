
import React from 'react';
import { Search, Filter, Download, Eye, Shield, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for users
const mockUsers = [
  {
    id: '1',
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    joinDate: '2023-10-15',
    tokensOwned: 5,
    totalValue: '$1,245.60',
    transactions: 12,
    status: 'active'
  },
  {
    id: '2',
    walletAddress: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
    joinDate: '2023-09-22',
    tokensOwned: 2,
    totalValue: '$587.30',
    transactions: 5,
    status: 'active'
  },
  {
    id: '3',
    walletAddress: '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544',
    joinDate: '2023-11-01',
    tokensOwned: 0,
    totalValue: '$0.00',
    transactions: 0,
    status: 'pending'
  },
  {
    id: '4',
    walletAddress: '0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C',
    joinDate: '2023-08-05',
    tokensOwned: 10,
    totalValue: '$3,845.12',
    transactions: 23,
    status: 'active'
  },
  {
    id: '5',
    walletAddress: '0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB',
    joinDate: '2023-10-28',
    tokensOwned: 1,
    totalValue: '$152.25',
    transactions: 2,
    status: 'suspended'
  }
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user =>
    user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">User Management</h2>
          <p className="text-muted-foreground">Manage platform users and their permissions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Manage Roles
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+3</span> new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter(u => u.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(mockUsers.filter(u => u.status === 'active').length / mockUsers.length * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,166.05</div>
            <p className="text-xs text-muted-foreground">
              Per active user
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8</span> this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search by wallet address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Tokens Owned</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Transactions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(38)}
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.tokensOwned}</TableCell>
                  <TableCell>{user.totalValue}</TableCell>
                  <TableCell>{user.transactions}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : user.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      {user.status !== 'suspended' ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Ban className="h-4 w-4" />
                          <span className="sr-only">Suspend user</span>
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-500 hover:text-green-600"
                        >
                          <Shield className="h-4 w-4" />
                          <span className="sr-only">Activate user</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
