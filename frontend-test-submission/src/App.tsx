import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import Redirector from './components/Redirector';
import StatsPage from './components/StatsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenerForm />} />
        <Route path="/:shortCode" element={<Redirector />} />
        <Route path="/stats/:shortCode" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}