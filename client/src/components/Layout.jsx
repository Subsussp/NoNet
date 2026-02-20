import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
export default function Layout() {
  const location = useLocation(); // Get current path
  return (
    <div className="layout">
      <main className="content">
        <Outlet />
      </main>
    {(!['/admin','/dashboard','/users','/orders','/control','/analytics'].includes(location.pathname)) && <Footer/>}    
    </div>
  );
}