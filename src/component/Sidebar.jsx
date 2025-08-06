// import React from 'react';

// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-white shadow-md p-4">
//       <div className="text-2xl font-bold mb-8">AdminJS</div>
//       <nav className="flex flex-col gap-4 text-gray-700">
//         <a href="#" className="hover:text-blue-500">Dashboard</a>
//         <a href="#">Products</a>
//         <a href="#">Blog</a>
//         <a href="#">Transactions</a>
//         <a href="#">Users</a>
//         <a href="#">Analysis</a>
//         <a href="#">Reports</a>
//         <a href="#">Investment</a>
//         <a href="#">Settings</a>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Layout.css";

// const Sidebar = () => (
//   <aside className="sidebar">
//     <h2>AdminJS</h2>
//     <nav>
//       <Link to="/admindashboard">Dashboard</Link>
//       <Link to="/workstream">WorkStream</Link>
//       <Link to="/users">Users</Link>
//       <Link to="/settings">Settings</Link>
//     </nav>
//   </aside>
// );

// export default Sidebar;


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Layout.css";

const Sidebar = () => {
  const location = useLocation();
  const [isWorkstreamOpen, setIsWorkstreamOpen] = useState(false);

  return (
    <aside className="sidebar">
      <h2>AdminJS</h2>
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
        <Link to="/settings">Settings</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

