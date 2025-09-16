// import React from "react";
// import "../styles/AdminDashboard.css";
// import Sidebar from "../component/Sidebar";

// const AdminDashboard = () => {
//   return (
//        <div style={pageStyle}>
//            <div className="admin-dashboard-container">
//     <Sidebar />

//       <div className="main-content">
//         <header className="topbar">
//           <input type="text" placeholder="Search..." />
//           <div className="profile">
//             <span>jamesbrown@example.com</span>
//             <div className="avatar-circle">JB</div>
//           </div>
//         </header>

//         <section className="cards">
//           <div className="card">
//             <h4>Daily Income</h4>
//             <p>$345</p>
//           </div>
//           <div className="card">
//             <h4>Daily Expense</h4>
//             <p>$380</p>
//           </div>
//           <div className="card">
//             <h4>Weekly Income</h4>
//             <p>$5380</p>
//           </div>
//           <div className="card">
//             <h4>Weekly Expense</h4>
//             <p>$4320</p>
//           </div>
//         </section>

//         <div className="bottom-section">
//           <div className="chart-box">
//             <h3>Sales Overview</h3>
//             SalesOverviewChart
//           </div>
//           <div className="chart-box">
//             <h3>Top Selling Categories</h3>
//             RadarChart
//           </div>
//         </div>

//         <div className="bottom-section">
//           <div className="chart-box" style={{ gridColumn: "1 / span 2" }}>
//             <h3>Latest Added Products</h3>
//             ProductTable
//           </div>
//         </div>
//       </div>
//     </div>
//        </div>
 
//   );
// };

// const pageStyle = {
//   minHeight: "100vh",
//   width: "100vw",
//   margin: 0,
//   padding: "40px",
//   boxSizing: "border-box",
//   background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// export default AdminDashboard;


import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import Sidebar from "../component/Sidebar";
import { useAuth } from "../contexts/AuthContext"; // ✅ import useAuth
import { ChevronDown, LogOut, User } from "lucide-react"; // icons

const AdminDashboard = () => {
  const { user, logout } = useAuth(); // ✅ get user + logout
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <div style={pageStyle}>
      <div className="admin-dashboard-container">
        <Sidebar />

        <div className="main-content">
          <header className="topbar">
            <input type="text" placeholder="Search..." />

            {/* Profile Section */}
            <div className="profile">
              <button
                className="profile-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="avatar-circle">
                  {user?.name ? user.name[0].toUpperCase() : "A"}
                </div>
                <span>{user?.email || "admin@example.com"}</span>
                <ChevronDown size={16} />
              </button>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <p className="name">{user?.name || "Admin User"}</p>
                    <p className="email">{user?.email || "admin@example.com"}</p>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Cards Section */}
          <section className="cards">
            <div className="card">
              <h4>Daily Income</h4>
              <p>$345</p>
            </div>
            <div className="card">
              <h4>Daily Expense</h4>
              <p>$380</p>
            </div>
            <div className="card">
              <h4>Weekly Income</h4>
              <p>$5380</p>
            </div>
            <div className="card">
              <h4>Weekly Expense</h4>
              <p>$4320</p>
            </div>
          </section>

          {/* Bottom Sections */}
          <div className="bottom-section">
            <div className="chart-box">
              <h3>Sales Overview</h3>
              SalesOverviewChart
            </div>
            <div className="chart-box">
              <h3>Top Selling Categories</h3>
              RadarChart
            </div>
          </div>

          <div className="bottom-section">
            <div className="chart-box" style={{ gridColumn: "1 / span 2" }}>
              <h3>Latest Added Products</h3>
              ProductTable
            </div>
          </div>
        </div>
      </div>

      {/* Inline quick styles for dropdown */}
      <style>{`
        .profile {
          position: relative;
        }
        .profile-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          cursor: pointer;
        }
        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          min-width: 200px;
          z-index: 50;
        }
        .profile-info {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .profile-info .name {
          font-weight: 600;
          font-size: 0.9rem;
        }
        .profile-info .email {
          font-size: 0.8rem;
          color: #6b7280;
        }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #dc2626;
        }
        .logout-btn:hover {
          background: #fef2f2;
        }
      `}</style>
    </div>
  );
};

const pageStyle = {
  minHeight: "100vh",
  width: "100vw",
  margin: 0,
  padding: "40px",
  boxSizing: "border-box",
  background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default AdminDashboard;
