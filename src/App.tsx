import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SimulateTrade from './pages/SimulateTrade';
import PricePrediction from './pages/PricePrediction';
import EContracts from './pages/EContracts';
import LearningCenter from './pages/LearningCenter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/simulate-trade" element={<SimulateTrade />} />
        <Route path="/price-prediction" element={<PricePrediction />} />
        <Route path="/e-contracts" element={<EContracts />} />
        <Route path="/learning-center" element={<LearningCenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
