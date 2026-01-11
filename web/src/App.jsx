import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateCardPage from './pages/CreateCardPage';
import CardViewerPage from './pages/CardViewerPage';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './guards/PrivateRoute';

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ver/:slug" element={<CardViewerPage />} />

        <Route
          path="/admin/create"
          element={
            <PrivateRoute role="admin">
              <CreateCardPage />
            </PrivateRoute>
          }
        />


      </Routes>
    </Layout>
  );
}

export default App;
