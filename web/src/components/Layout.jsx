import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCreationPage = location.pathname.startsWith('/create') || location.pathname.startsWith('/edit');

  const isViewPage = location.pathname.startsWith('/ver/');
  
  return (
    <div className={`flex flex-col bg-slate-50 ${isCreationPage ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {!isViewPage && (isHome ? <Navbar /> : <Header />)}
      <main className={`grow flex flex-col ${isCreationPage ? 'overflow-hidden' : ''}`}>
        {children}
      </main>
      {!isCreationPage && !isViewPage && <Footer />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
