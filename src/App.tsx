import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage, LoginPage } from '@pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
     <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
