import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SVCardPage from './pages/SVCardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import CreateCardPage from './pages/CreateCardPage';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/SVcards" element={<SVCardPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/create-card" element={<CreateCardPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
