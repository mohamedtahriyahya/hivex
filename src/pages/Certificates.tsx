
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Download, ExternalLink } from 'lucide-react';

const Certificates = () => {
  // Mock NFT certificate data
  const certificates = [
    {
      id: '0x8a3c...4f21',
      stockName: 'Safaricom',
      symbol: 'SCOM',
      shares: 125,
      purchaseDate: 'Aug 15, 2023',
      purchasePrice: '27.35',
      currentPrice: '28.45',
      value: '3,556.25',
      transactionHash: '0x7d8f...2e91',
    },
    {
      id: '0xf21d...9a72',
      stockName: 'Equity Bank',
      symbol: 'EQTY',
      shares: 78,
      purchaseDate: 'Sep 3, 2023',
      purchasePrice: '44.50',
      currentPrice: '45.80',
      value: '3,572.40',
      transactionHash: '0x3e7b...1c83',
    },
    {
      id: '0x6c9e...2d74',
      stockName: 'Kenya Power',
      symbol: 'KPLC',
      shares: 230,
      purchaseDate: 'Jul 28, 2023',
      purchasePrice: '14.20',
      currentPrice: '15.75',
      value: '3,622.50',
      transactionHash: '0x9f5a...7b23',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">NFT Certificates</h1>
          <p className="text-gray-400">Your blockchain-verified stock ownership certificates</p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="bg-card-gradient border-web3-purple/20 card-hover">
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-web3-purple/20 text-web3-purple border-web3-purple/30 flex items-center">
                  <CheckCircle2 size={14} className="mr-1" />
                  Verified
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  {cert.stockName} ({cert.symbol})
                </CardTitle>
                <CardDescription>
                  Certificate ID: {cert.id}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* NFT Display */}
                  <div className="rounded-lg p-6 bg-gradient-to-br from-web3-purple/20 to-web3-dark-blue border border-web3-purple/30 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-web3-purple/30 mb-3 flex items-center justify-center">
                      <span className="text-2xl font-bold">{cert.symbol}</span>
                    </div>
                    <h3 className="text-xl font-bold gradient-text">{cert.shares} Shares</h3>
                    <div className="text-sm text-gray-400 mt-2">Issued on {cert.purchaseDate}</div>
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Purchase Price</span>
                      <span>{cert.purchasePrice} KES</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Price</span>
                      <span>{cert.currentPrice} KES</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Value</span>
                      <span className="font-bold">{cert.value} KES</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transaction</span>
                      <a href="#" className="text-web3-purple flex items-center text-sm">
                        View <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-web3-purple border-web3-purple/30 hover:bg-web3-purple/10">
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
                <Button className="bg-web3-purple hover:bg-web3-dark-purple">
                  Transfer Ownership
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="bg-card-gradient border-web3-purple/20">
          <CardHeader>
            <CardTitle>About NFT Stock Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Each NFT certificate represents your ownership of specific stock tokens on the blockchain:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>NFT Certificates are immutable proof of your stock ownership</li>
                <li>The certificate information is recorded on the Hedera blockchain</li>
                <li>You can transfer ownership to another wallet address</li>
                <li>Certificates are automatically updated when you buy or sell shares</li>
                <li>Download your certificate as a digital asset for your records</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Certificates;
