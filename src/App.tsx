import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import TermoPage from "./pages/TermoPage";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import DireitosUsuario from "./pages/DireitosUsuario";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CookieBanner />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/termo" element={<TermoPage />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/direitos-usuario" element={<DireitosUsuario />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
