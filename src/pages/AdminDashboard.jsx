import React from "react";
import "../styles/AdminDashboard.css";
import Sidebar from "../component/Sidebar";

const AdminDashboard = () => {
  return (
       <div style={pageStyle}>
           <div className="admin-dashboard-container">
    <Sidebar />

      <div className="main-content">
        <header className="topbar">
          <input type="text" placeholder="Search..." />
          <div className="profile">
            <span>jamesbrown@example.com</span>
            <div className="avatar-circle">JB</div>
          </div>
        </header>

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
