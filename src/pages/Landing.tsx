
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Wallet,
  FileCheck,
  Brain,
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { hc } from '@/services/hashconnect';

const Landing = () => {
  const navigate = useNavigate();
  const { address } = useAccount()

  const handleGetStarted = async () => {
    navigate("/dashboard")
  };

  const features = [
    {
      icon: Wallet,
      title: 'Buy & Sell Kenyan Stocks Instantly',
      description: 'Trade tokenized stocks in seconds using your crypto wallet.'
    },
    {
      icon: FileCheck,
      title: 'NFT Stock Certificates',
      description: 'Secure ownership with blockchain-verified stock certificates.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Trading Insights',
      description: 'Make smarter investment decisions with predictive analytics.'
    },
    {
      icon: ShieldCheck,
      title: 'Fast & Secure Transactions',
      description: 'Built on Hedera for speed, security and transparency.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Connect your wallet',
      description: 'Link your Hedera, MetaMask or HashPack wallet to get started.'
    },
    {
      number: '02',
      title: 'Buy tokenized stocks',
      description: 'Purchase fractional shares of Kenyan companies using crypto.'
    },
    {
      number: '03',
      title: 'Receive NFT ownership certificate',
      description: 'Get a blockchain-backed certificate for your stock ownership.'
    },
    {
      number: '04',
      title: 'Sell or transfer stocks anytime',
      description: 'Trade your stocks or transfer ownership whenever you want.'
    }
  ];

  return (
    <div className="min-h-screen bg-web3-dark-blue text-white">
      {/* Navigation */}
      <nav className="container mx-auto py-6 px-6 flex justify-between items-center sticky top-0 bg-web3-dark-blue/80 backdrop-blur-lg z-50">
        <div className="flex items-center">
          <img src="/logo.png" alt="Hirex" width="50" height="50" />
          <div className="text-2xl font-bold gradient-text">Hivex</div>
        </div>
        {
          address ?
            <ul className="flex items-center gap-2.5">
              <li>
                <ConnectButton showBalance={false} />
              </li>
              <li>
                <Button onClick={handleGetStarted} className="bg-web3-purple hover:bg-web3-dark-purple text-white">
                  Go to Dashboard
                </Button>
              </li>
            </ul> :
            <ul className="flex items-center gap-2.5">
              <li><ConnectButton label="Login" /></li>
              <li><ConnectButton label="Create Account" /></li>
              <li><Button onClick={() => hc.openPairingModal()}>Connect Hashpack Wallet</Button></li>
            </ul>
        }
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-hero-pattern bg-cover bg-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Invest in <span className="gradient-text">Kenyan Stocks</span> with Crypto –<br />
            <span className="text-shadow">The Future of Trading!</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Buy, sell, and manage tokenized stocks securely with blockchain technology and AI-powered insights
          </p>
          <Button
            onClick={handleGetStarted}
            className="px-8 py-6 text-lg bg-web3-purple hover:bg-web3-dark-purple text-white rounded-xl animate-pulse-glow"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-web3-dark-blue to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Revolutionary <span className="gradient-text">Web3 Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl card-hover"
              >
                <div className="bg-web3-purple/20 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="text-web3-purple" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            How <span className="gradient-text">Hivex</span> Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative glass-card p-6 rounded-xl card-hover"
              >
                <span className="absolute -top-4 -left-4 bg-web3-purple text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-web3-dark-purple/30 to-web3-purple/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start <span className="gradient-text">Trading?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already trading Kenyan stocks on the blockchain
          </p>
          <Button
            onClick={handleGetStarted}
            className="px-8 py-6 text-lg bg-web3-purple hover:bg-web3-dark-purple text-white rounded-xl"
          >
            Connect Wallet & Trade Now
            <Wallet className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-2xl font-bold gradient-text mb-4 md:mb-0">Hivex</div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-web3-purple">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-web3-purple">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-web3-purple">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <hr className="border-gray-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between text-gray-500 text-sm">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Hivex. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <a href="#" className="hover:text-web3-purple">Terms of Service</a>
              <a href="#" className="hover:text-web3-purple">Privacy Policy</a>
              <a href="#" className="hover:text-web3-purple">Web3 Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
