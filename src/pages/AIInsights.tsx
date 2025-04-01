
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  AlertTriangle, 
  LineChart, 
  BarChart2, 
  Zap,
  Clock
} from 'lucide-react';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const AIInsights = () => {
  // Mock data for charts
  const marketTrendData = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 40 },
    { name: 'Mar', value: 30 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 70 },
    { name: 'Jun', value: 90 },
    { name: 'Jul', value: 70 },
    { name: 'Aug', value: 80 }
  ];

  const stockPredictionData = [
    { name: 'SCOM', current: 28.45, predicted: 32.20 },
    { name: 'EQTY', current: 45.80, predicted: 47.50 },
    { name: 'KPLC', current: 15.75, predicted: 14.30 },
    { name: 'KCB', current: 42.30, predicted: 45.10 }
  ];

  const portfolioAllocationData = [
    { name: 'Safaricom', value: 3556.25, color: '#8B5CF6' },
    { name: 'Equity Bank', value: 3572.40, color: '#EC4899' },
    { name: 'Kenya Power', value: 3622.50, color: '#10B981' },
    { name: 'KCB Group', value: 4060.80, color: '#F59E0B' }
  ];

  const insightCards = [
    {
      id: 1,
      title: 'Buy Opportunity: Safaricom',
      description: 'AI analysis shows positive momentum and favorable technical indicators. Consider increasing your position.',
      icon: TrendingUp,
      sentiment: 'positive',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Sector Alert: Banking',
      description: 'Banking sector showing volatility. KCB Group might face resistance at current levels.',
      icon: AlertTriangle,
      sentiment: 'neutral',
      timestamp: '1 day ago'
    },
    {
      id: 3,
      title: 'Consider Selling: Kenya Power',
      description: 'Technical indicators and recent fundamental analysis suggest a potential downward trend.',
      icon: TrendingDown,
      sentiment: 'negative',
      timestamp: '3 hours ago'
    },
    {
      id: 4,
      title: 'Portfolio Rebalance Recommended',
      description: 'Your portfolio is overweight in utility stocks. Consider diversifying to reduce sector risk.',
      icon: BarChart2,
      sentiment: 'neutral',
      timestamp: '5 hours ago'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
          <p className="text-gray-400">Smart trading recommendations powered by artificial intelligence</p>
        </div>

        {/* AI Recommendation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insightCards.map((insight) => (
            <Card 
              key={insight.id}
              className={`bg-card-gradient border-web3-purple/20 card-hover ${
                insight.sentiment === 'positive' ? 'border-l-4 border-l-web3-success' : 
                insight.sentiment === 'negative' ? 'border-l-4 border-l-web3-error' : 
                'border-l-4 border-l-web3-warning'
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center">
                    <div className={`mr-2 p-1.5 rounded-full ${
                      insight.sentiment === 'positive' ? 'bg-web3-success/20' : 
                      insight.sentiment === 'negative' ? 'bg-web3-error/20' : 
                      'bg-web3-warning/20'
                    }`}>
                      <insight.icon 
                        size={16} 
                        className={
                          insight.sentiment === 'positive' ? 'text-web3-success' : 
                          insight.sentiment === 'negative' ? 'text-web3-error' : 
                          'text-web3-warning'
                        } 
                      />
                    </div>
                    {insight.title}
                  </CardTitle>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Clock size={12} className="mr-1" />
                    {insight.timestamp}
                  </div>
                </div>
                <CardDescription className="mt-2">{insight.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Trends */}
          <Card className="bg-card-gradient border-web3-purple/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Market Trends</CardTitle>
                <Badge variant="outline" className="bg-web3-purple/10 text-web3-purple border-web3-purple/30">
                  <Zap className="mr-1" size={14} /> AI Analyzed
                </Badge>
              </div>
              <CardDescription>Kenyan market trend prediction (6-month forecast)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={marketTrendData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="marketTrendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#596A7B" />
                    <YAxis stroke="#596A7B" />
                    <CartesianGrid stroke="#243240" strokeDasharray="3 3" />
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
                      fill="url(#marketTrendGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Stock Price Predictions */}
          <Card className="bg-card-gradient border-web3-purple/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Price Predictions</CardTitle>
                <Badge variant="outline" className="bg-web3-purple/10 text-web3-purple border-web3-purple/30">
                  <LineChart className="mr-1" size={14} /> 30-Day Forecast
                </Badge>
              </div>
              <CardDescription>AI price predictions for your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stockPredictionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
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
                    <Bar dataKey="current" name="Current Price" fill="#6D28D9" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="predicted" name="Predicted Price" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Allocation */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Portfolio Allocation</CardTitle>
              <Badge variant="outline" className="bg-web3-purple/10 text-web3-purple border-web3-purple/30">
                <Lightbulb className="mr-1" size={14} /> Optimized
              </Badge>
            </div>
            <CardDescription>Current allocation vs AI recommended</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[250px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioAllocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {portfolioAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} KES`, 'Value']}
                      contentStyle={{
                        backgroundColor: '#0A0E17',
                        borderColor: '#8B5CF6',
                        color: '#fff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 flex flex-col justify-center">
                <h4 className="font-medium text-lg">AI Recommendations</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></span>
                    <span>Safaricom: <span className="text-web3-success">Increase by 5%</span></span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#EC4899] mr-2"></span>
                    <span>Equity Bank: <span className="text-gray-400">Maintain current position</span></span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></span>
                    <span>Kenya Power: <span className="text-web3-error">Reduce by 8%</span></span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B] mr-2"></span>
                    <span>KCB Group: <span className="text-web3-success">Increase by 3%</span></span>
                  </li>
                </ul>
                <p className="text-sm text-gray-400 italic">
                  Based on market analysis, technical indicators, and fundamental data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Explanation */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardHeader>
            <CardTitle>How AI Insights Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Our AI-powered insights analyze vast amounts of market data to provide you with 
                actionable trading recommendations:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-black/30 border border-web3-purple/20">
                  <LineChart className="text-web3-purple mb-2" size={24} />
                  <h4 className="font-medium mb-1">Technical Analysis</h4>
                  <p className="text-sm text-gray-400">
                    AI evaluates price patterns, trends, and technical indicators to identify entry and exit points.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-black/30 border border-web3-purple/20">
                  <BarChart2 className="text-web3-purple mb-2" size={24} />
                  <h4 className="font-medium mb-1">Fundamental Data</h4>
                  <p className="text-sm text-gray-400">
                    Analysis of financial statements, earnings reports, and economic indicators.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-black/30 border border-web3-purple/20">
                  <Lightbulb className="text-web3-purple mb-2" size={24} />
                  <h4 className="font-medium mb-1">Sentiment Analysis</h4>
                  <p className="text-sm text-gray-400">
                    Monitoring news, social media, and market sentiment to gauge investor psychology.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
