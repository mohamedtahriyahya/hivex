
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Wallet
} from 'lucide-react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAccount, useBalance } from 'wagmi';
import { useAccountTokens } from '@/hooks/use_account_tokens';
import { UserStockHoldingTable } from '@/components/user/UserStockHoldingTable';
import { toast } from "react-hot-toast"

const Dashboard = () => {

  const { address, isConnected } = useAccount()
  const navigate = useNavigate()

  if (!isConnected) {
    toast.error("Please connect your wallet to access the dashboard.")
    navigate("/")
  }

  const { data } = useBalance({
    address: address!
  })

  const { tokens } = useAccountTokens({
    evmAccountAddress: address!,
    networkType: 'testnet'
  })

  // Mock data
  const portfolioValue = "23,456.78";
  const portfolioChange = "+12.4%";
  const portfolioPositive = true;

  const stockData = [
    { id: 1, name: 'Safaricom', symbol: 'SCOM', price: '28.45', change: '+2.3%', shares: '125', value: '3,556.25', positive: true },
    { id: 2, name: 'Equity Bank', symbol: 'EQTY', price: '45.80', change: '-0.7%', shares: '78', value: '3,572.40', positive: false },
    { id: 3, name: 'Kenya Power', symbol: 'KPLC', price: '15.75', change: '+5.2%', shares: '230', value: '3,622.50', positive: true },
    { id: 4, name: 'KCB Group', symbol: 'KCB', price: '42.30', change: '+1.1%', shares: '96', value: '4,060.80', positive: true }
  ];

  const chartData = [
    { name: 'Mon', value: 18000 },
    { name: 'Tue', value: 19500 },
    { name: 'Wed', value: 18700 },
    { name: 'Thu', value: 21500 },
    { name: 'Fri', value: 20200 },
    { name: 'Sat', value: 21800 },
    { name: 'Sun', value: 23400 }
  ];

  const transactions = [
    { id: 1, type: 'Buy', stock: 'Safaricom', shares: '25', price: '28.45', total: '711.25', date: 'Today, 10:24 AM' },
    { id: 2, type: 'Sell', stock: 'KCB Group', shares: '10', price: '42.30', total: '423.00', date: 'Yesterday, 2:15 PM' },
    { id: 3, type: 'Buy', stock: 'Kenya Power', shares: '50', price: '15.75', total: '787.50', date: '23 Aug, 9:32 AM' },
  ];

  const aiInsights = [
    { id: 1, title: 'Safaricom looks promising', description: 'Technical indicators suggest a potential 8% upside in the coming weeks.', icon: TrendingUp },
    { id: 2, title: 'Consider trimming Equity Bank', description: 'Recent financial reports show declining profitability metrics.', icon: TrendingDown },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Overview of your stock portfolio</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card-gradient border-web3-purple/20">
            <CardHeader className="pb-2">
              <CardDescription>Portfolio Value</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                <DollarSign className="mr-1 text-web3-gold" size={20} />
                {portfolioValue} KES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`flex items-center ${portfolioPositive ? 'text-web3-success' : 'text-web3-error'}`}>
                {portfolioPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                <span className="ml-1">{portfolioChange} (7d)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-gradient border-web3-purple/20">
            <CardHeader className="pb-2">
              <CardDescription>Wallet Balance</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2.5">
                <Wallet className="mr-1 text-web3-gold" size={20} />
                {Number(data?.formatted).toPrecision(8)} {data?.symbol}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400">≈ 15,345.78 KES</div>
            </CardContent>
          </Card>

          <Card className="bg-card-gradient border-web3-purple/20">
            <CardHeader className="pb-2">
              <CardDescription>Total Stocks</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                <BarChart3 className="mr-1 text-web3-purple" size={20} />
                {tokens.length} {tokens.length > 1 ? "Companies" : "Company"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400">{tokens.reduce((sum, token) => { return sum + token.balance }, 0)} Total Shares</div>
            </CardContent>
          </Card>

          <Card className="bg-card-gradient border-web3-purple/20">
            <CardHeader className="pb-2">
              <CardDescription>Market Sentiment</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                <PieChart className="mr-1 text-web3-success" size={20} />
                Bullish
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-web3-success">Markets trending upward</div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Chart and Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-card-gradient border-web3-purple/20">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Last 7 days value in KES</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#243240" />
                    <XAxis dataKey="name" stroke="#596A7B" />
                    <YAxis stroke="#596A7B" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0A0E17',
                        borderColor: '#8B5CF6',
                        color: '#fff'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8B5CF6"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-gradient border-web3-purple/20">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Smart trading recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="p-3 rounded-lg bg-black/30 border border-web3-purple/10">
                    <div className="flex items-center mb-1">
                      <insight.icon
                        className={insight.icon === TrendingUp ? "text-web3-success mr-2" : "text-web3-error mr-2"}
                        size={18}
                      />
                      <h4 className="font-medium">{insight.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm">{insight.description}</p>
                  </div>
                ))}
                <Link to="/insights">
                  <Button variant="outline" className="w-full mt-2 text-web3-purple border-web3-purple/50 hover:bg-web3-purple/10">
                    View All Insights
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Holdings */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Stock Holdings</CardTitle>
                <CardDescription>Your current stock portfolio</CardDescription>
              </div>
              <Link to="/buy">
                <Button className="bg-web3-purple hover:bg-web3-dark-purple">Buy Stocks</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <UserStockHoldingTable tokens={tokens} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest stock trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-web3-purple/10">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'Buy' ? 'bg-web3-success/20' : 'bg-web3-error/20'
                      }`}>
                      {tx.type === 'Buy' ?
                        <ArrowUpRight className="text-web3-success" size={18} /> :
                        <ArrowDownRight className="text-web3-error" size={18} />
                      }
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">
                        {tx.type} {tx.shares} {tx.stock}
                      </div>
                      <div className="text-gray-400 text-sm">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{tx.total} KES</div>
                    <div className="text-gray-400 text-sm">@ {tx.price} per share</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
