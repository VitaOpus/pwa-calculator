import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Main } from './main';
import { ExchangeRateCalculation } from './exchange-rate-calculation';

export { Main, ExchangeRateCalculation };

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/exchange-rate-calculation" element={<ExchangeRateCalculation />} />
      </Routes>
    </BrowserRouter>
  );
}
