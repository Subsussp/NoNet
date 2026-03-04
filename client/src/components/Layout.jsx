import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
export default function Layout({textLeave,textEnter}) {
  const location = useLocation(); // Get current path
  return (
    <div className="layout">
      <main className="content">
        <Outlet />
      </main>
    {(!['/admin','/dashboard','/users','/orders','/control','/analytics','/login','/signup'].includes(location.pathname)) && <Footer textEnter={textEnter} textLeave={textLeave}/>}    
    </div>
  );
}