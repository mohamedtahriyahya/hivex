
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import BuyStocks from "@/pages/BuyStocks";
import SellStocks from "@/pages/SellStocks";
import TransferStocks from "@/pages/TransferStocks";
import Certificates from "@/pages/Certificates";
import AIInsights from "@/pages/AIInsights";
import Settings from "@/pages/Settings";
import Admin from "@/pages/Admin";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/NotFound";
import { Providers } from "@/components/ui/providers";
import { Toaster } from "react-hot-toast"

const App = () => (
  <Providers>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/buy" element={<BuyStocks />} />
        <Route path="/sell" element={<SellStocks />} />
        <Route path="/transfer" element={<TransferStocks />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/insights" element={<AIInsights />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Providers>
);

export default App;
