


// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "../styles/Layout.css";

// const Sidebar = () => {
//   const location = useLocation();
//   const [isWorkstreamOpen, setIsWorkstreamOpen] = useState(false);

//   return (
//     <aside className="sidebar">
//       <h2>AdminJS</h2>
//       <nav className="nav-links">
//         <Link to="/admindashboard">Dashboard</Link>

//         {/* WorkStream Dropdown */}
//         <div className="submenu">
//           <div
//             className="menu-title"
//             onClick={() => setIsWorkstreamOpen(!isWorkstreamOpen)}
//             style={{ cursor: "pointer", userSelect: "none" }}
//           >
//             WorkStream {isWorkstreamOpen ? "▲" : "▼"}
//           </div>

//           {isWorkstreamOpen && (
//             <div className="submenu-links">
//               <Link
//                 to="/workstream"
//                 className={location.pathname === "/workstream" ? "active" : ""}
//               >
//                 Overview
//               </Link>
//               <Link
//                 to="/workstream/configure"
//                 className={location.pathname === "/workstream/configure" ? "active" : ""}
//               >
//                 Configure
//               </Link>
//             </div>
//           )}
//         </div>

//         <Link to="/users">Users</Link>
//         <Link to="/settings">Settings</Link>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Layout.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isWorkstreamOpen, setIsWorkstreamOpen] = useState(false);

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="logo-container" onClick={() => navigate("/dashboardview")}>
        <img
          src="/gBitLogo.png"
          alt="Gbit Logo"
          className="logo-image"
        />
      </div>



      <nav className="nav-links">
        <Link to="/admindashboard">Dashboard</Link>

        {/* WorkStream Dropdown */}
        <div className="submenu">
          <div
            className="menu-title"
            onClick={() => setIsWorkstreamOpen(!isWorkstreamOpen)}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            WorkStream {isWorkstreamOpen ? "▲" : "▼"}
          </div>

          {isWorkstreamOpen && (
            <div className="submenu-links">
              <Link
                to="/workstream"
                className={location.pathname === "/workstream" ? "active" : ""}
              >
                Overview
              </Link>
              <Link
                to="/workstream/configure"
                className={location.pathname === "/workstream/configure" ? "active" : ""}
              >
                Configure
              </Link>
            </div>
          )}
        </div>

        <Link to="/users">Users</Link>
        {/* <Link to="/settings">Settings</Link> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
