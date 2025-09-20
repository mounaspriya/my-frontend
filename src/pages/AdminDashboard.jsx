// import React, { useState } from "react";
// import "../styles/AdminDashboard.css";
// import Sidebar from "../component/Sidebar";
// import { useAuth } from "../contexts/AuthContext"; // ✅ import useAuth
// import { ChevronDown, LogOut, User } from "lucide-react"; // icons

// const AdminDashboard = () => {
//   const { user, logout } = useAuth(); // ✅ get user + logout
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogout = () => {
//     logout();
//     setShowDropdown(false);
//   };

//   return (
//     <div style={pageStyle}>
//       <div className="admin-dashboard-container">
//         <Sidebar />

//         <div className="main-content">
//           <header className="topbar">
//             <input type="text" placeholder="Search..." />

//             {/* Profile Section */}
//             <div className="profile">
//               <button
//                 className="profile-btn"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 <div className="avatar-circle">
//                   {user?.name ? user.name[0].toUpperCase() : "A"}
//                 </div>
//                 <span>{user?.email || "admin@example.com"}</span>
//                 <ChevronDown size={16} />
//               </button>

//               {showDropdown && (
//                 <div className="profile-dropdown">
//                   <div className="profile-info">
//                     <p className="name">{user?.name || "Admin User"}</p>
//                     <p className="email">{user?.email || "admin@example.com"}</p>
//                   </div>
//                   <button className="logout-btn" onClick={handleLogout}>
//                     <LogOut size={16} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </header>

//           {/* Cards Section */}
//           <section className="cards">
//             <div className="card">
//               <h4>Daily Income</h4>
//               <p>$345</p>
//             </div>
//             <div className="card">
//               <h4>Daily Expense</h4>
//               <p>$380</p>
//             </div>
//             <div className="card">
//               <h4>Weekly Income</h4>
//               <p>$5380</p>
//             </div>
//             <div className="card">
//               <h4>Weekly Expense</h4>
//               <p>$4320</p>
//             </div>
//           </section>

//           {/* Bottom Sections */}
//           <div className="bottom-section">
//             <div className="chart-box">
//               <h3>Sales Overview</h3>
//               SalesOverviewChart
//             </div>
//             <div className="chart-box">
//               <h3>Top Selling Categories</h3>
//               RadarChart
//             </div>
//           </div>

//           <div className="bottom-section">
//             <div className="chart-box" style={{ gridColumn: "1 / span 2" }}>
//               <h3>Latest Added Products</h3>
//               ProductTable
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Inline quick styles for dropdown */}
//       <style>{`
//         .profile {
//           position: relative;
//         }
//         .profile-btn {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.5rem 1rem;
//           background: #f9fafb;
//           border: 1px solid #e5e7eb;
//           border-radius: 0.5rem;
//           cursor: pointer;
//         }
//         .avatar-circle {
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           background: #2563eb;
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: bold;
//         }
//         .profile-dropdown {
//           position: absolute;
//           top: 100%;
//           right: 0;
//           margin-top: 0.5rem;
//           background: white;
//           border: 1px solid #e5e7eb;
//           border-radius: 0.5rem;
//           box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//           min-width: 200px;
//           z-index: 50;
//         }
//         .profile-info {
//           padding: 0.75rem;
//           border-bottom: 1px solid #e5e7eb;
//         }
//         .profile-info .name {
//           font-weight: 600;
//           font-size: 0.9rem;
//         }
//         .profile-info .email {
//           font-size: 0.8rem;
//           color: #6b7280;
//         }
//         .logout-btn {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.75rem 1rem;
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #dc2626;
//         }
//         .logout-btn:hover {
//           background: #fef2f2;
//         }
//       `}</style>
//     </div>
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












// import React, { useState, useEffect } from "react";
// import "../styles/AdminDashboard.css";
// import Sidebar from "../component/Sidebar";
// import { useAuth } from "../contexts/AuthContext";
// import { ChevronDown, LogOut } from "lucide-react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const { user, logout } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);

//   // ✅ Dashboard stats
//   const [stats, setStats] = useState({
//     totalRecords: 0,
//     todayRecords: 0,
//     monthRecords: 0,
//     reviewers: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const handleLogout = () => {
//     logout();
//     setShowDropdown(false);
//   };

//   // ✅ Fetch stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const baseUrl = import.meta.env.VITE_API_BASE_URL;

//         const [totalRes, todayRes, monthRes, reviewersRes] = await Promise.all([
//           axios.get(`${baseUrl}/api/admin/records/total`, { withCredentials: true }),
//           axios.get(`${baseUrl}/api/admin/records/today`, { withCredentials: true }),
//           axios.get(`${baseUrl}/api/admin/records/month`, { withCredentials: true }),
//           axios.get(`${baseUrl}/api/admin/reviewers/count`, { withCredentials: true }),
//         ]);

//         setStats({
//           totalRecords: totalRes.data.count || 0,
//           todayRecords: todayRes.data.count || 0,
//           monthRecords: monthRes.data.count || 0,
//           reviewers: reviewersRes.data.count || 0,
//         });
//       } catch (err) {
//         console.error("❌ Error fetching dashboard stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div style={pageStyle}>
//       <div className="admin-dashboard-container">
//         <Sidebar />

//         <div className="main-content">
//           <header className="topbar">
//             <input type="text" placeholder="Search..." />

//             {/* Profile Section */}
//             <div className="profile">
//               <button
//                 className="profile-btn"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 <div className="avatar-circle">
//                   {user?.name ? user.name[0].toUpperCase() : "A"}
//                 </div>
//                 <span>{user?.email || "admin@example.com"}</span>
//                 <ChevronDown size={16} />
//               </button>

//               {showDropdown && (
//                 <div className="profile-dropdown">
//                   <div className="profile-info">
//                     <p className="name">{user?.name || "Admin User"}</p>
//                     <p className="email">{user?.email || "admin@example.com"}</p>
//                   </div>
//                   <button className="logout-btn" onClick={handleLogout}>
//                     <LogOut size={16} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </header>

//           {/* Cards Section */}
//           <section className="cards">
//             <div className="card">
//               <h4>Total Records</h4>
//               <p>{loading ? "Loading..." : stats.totalRecords}</p>
//             </div>
//             <div className="card">
//               <h4>Records Submitted Today</h4>
//               <p>{loading ? "Loading..." : stats.todayRecords}</p>
//             </div>
//             <div className="card">
//               <h4>Records Submitted This Month</h4>
//               <p>{loading ? "Loading..." : stats.monthRecords}</p>
//             </div>
//             <div className="card">
//               <h4>Total Reviewers</h4>
//               <p>{loading ? "Loading..." : stats.reviewers}</p>
//             </div>
//           </section>

//           {/* Bottom Sections */}
//           <div className="bottom-section">
//             <div className="chart-box">
//               <h3>Sales Overview</h3>
//               SalesOverviewChart
//             </div>
//             <div className="chart-box">
//               <h3>Top Selling Categories</h3>
//               RadarChart
//             </div>
//           </div>

//           <div className="bottom-section">
//             <div className="chart-box" style={{ gridColumn: "1 / span 2" }}>
//               <h3>Latest Added Products</h3>
//               ProductTable
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
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











// import React, { useState, useEffect } from "react";
// import "../styles/AdminDashboard.css";
// import Sidebar from "../component/Sidebar";
// import { useAuth } from "../contexts/AuthContext";
// import { ChevronDown, LogOut } from "lucide-react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const { user, logout } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [stats, setStats] = useState({
//     totalRecords: 0,
//     todayRecords: 0,
//     monthRecords: 0,
//     totalWorkstreams: 0,
//     reviewers: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const handleLogout = () => {
//     logout();
//     setShowDropdown(false);
//   };

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const baseUrl = import.meta.env.VITE_API_BASE_URL;

//         // fetch all 3 core workstreams + dynamic workstreams + reviewers
//         const [ws1Res, ws2Res, ws3Res, wsListRes, reviewersRes] = await Promise.all([
//           axios.get(`${baseUrl}/api/open/workstream`, { withCredentials: true }),
//           axios.get(`${baseUrl}/api/open/workstream2`, { withCredentials: true }),
//           axios.get(`${baseUrl}/api/open/workstream3`, { withCredentials: true }),
//           axios.get(`${baseUrl}/api/open/workstream-list`, { withCredentials: true }),
//           axios.get(`${baseUrl}/api/open/users`, { withCredentials: true }), // reviewers
//         ]);

//         // ✅ Safe defaults (avoid undefined)
//         const ws1Data = ws1Res.data?.data ?? [];
//         const ws2Data = ws2Res.data?.data ?? [];
//         const ws3Data = ws3Res.data?.data ?? [];
//         const dynamicWorkstreams = wsListRes.data?.data ?? [];
//         const reviewersData = reviewersRes.data?.data ?? [];

//         // 🔍 Debug logs
//         console.log("ws1Data:", ws1Data);
//         console.log("ws2Data:", ws2Data);
//         console.log("ws3Data:", ws3Data);
//         console.log("dynamicWorkstreams:", dynamicWorkstreams);
//         console.log("reviewersData:", reviewersData);

//         // merge records with a unified "date" field
//         const allRecords = [
//           ...(ws1Data || []).map((item) => ({ date: item.review_date })),
//           ...(ws2Data || []).map((item) => ({ date: item.tested_on_date })),
//           ...(ws3Data || []).map((item) => ({ date: item.created_at })),
//         ];

//         const today = new Date();
//         const todayStr = today.toLocaleDateString();
//         const currentMonth = today.getMonth();
//         const currentYear = today.getFullYear();

//         const todayCount = allRecords.filter((r) => {
//           if (!r.date) return false;
//           const d = new Date(r.date);
//           return d.toLocaleDateString() === todayStr;
//         }).length;

//         const monthCount = allRecords.filter((r) => {
//           if (!r.date) return false;
//           const d = new Date(r.date);
//           return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
//         }).length;

//         setStats({
//           totalRecords: allRecords.length,
//           todayRecords: todayCount,
//           monthRecords: monthCount,
//           totalWorkstreams: 3 + dynamicWorkstreams.length,
//           reviewers: reviewersData.length,
//         });
//       } catch (err) {
//         console.error("❌ Error fetching dashboard stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div style={pageStyle}>
//       <div className="admin-dashboard-container">
//         <Sidebar />

//         <div className="main-content">
//           <header className="topbar">
//             <input type="text" placeholder="Search..." />

//             <div className="profile">
//               <button
//                 className="profile-btn"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 <div className="avatar-circle">
//                   {user?.name ? user.name[0].toUpperCase() : "A"}
//                 </div>
//                 <span>{user?.email || "admin@example.com"}</span>
//                 <ChevronDown size={16} />
//               </button>

//               {showDropdown && (
//                 <div className="profile-dropdown">
//                   <div className="profile-info">
//                     <p className="name">{user?.name || "Admin User"}</p>
//                     <p className="email">{user?.email || "admin@example.com"}</p>
//                   </div>
//                   <button className="logout-btn" onClick={handleLogout}>
//                     <LogOut size={16} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </header>

//           {/* Cards Section */}
//           <section className="cards">
//             <div className="card">
//               <h4>Total Records</h4>
//               <p>{loading ? "Loading..." : stats.totalRecords}</p>
//             </div>
//             <div className="card">
//               <h4>Records Submitted Today</h4>
//               <p>{loading ? "Loading..." : stats.todayRecords}</p>
//             </div>
//             <div className="card">
//               <h4>Records Submitted This Month</h4>
//               <p>{loading ? "Loading..." : stats.monthRecords}</p>
//             </div>
//             <div className="card">
//               <h4>Total Workstreams</h4>
//               <p>{loading ? "Loading..." : stats.totalWorkstreams}</p>
//             </div>
//             <div className="card">
//               <h4>Reviewers</h4>
//               <p>{loading ? "Loading..." : stats.reviewers}</p>
//             </div>
//           </section>

//           {/* Bottom Sections */}
//           <div className="bottom-section">
//             <div className="chart-box">
//               <h3>Sales Overview</h3>
//               SalesOverviewChart
//             </div>
//             <div className="chart-box">
//               <h3>Top Selling Categories</h3>
//               RadarChart
//             </div>
//           </div>

//           <div className="bottom-section">
//             <div className="chart-box" style={{ gridColumn: "1 / span 2" }}>
//               <h3>Latest Added Products</h3>
//               ProductTable
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
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




import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";
import Sidebar from "../component/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { ChevronDown, LogOut } from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const [stats, setStats] = useState({
    totalRecords: 0,
    todayRecords: 0,
    monthRecords: 0,
    totalWorkstreams: 0,
    reviewers: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        // fetch all 3 core workstreams + dynamic workstreams + users
        const [ws1Res, ws2Res, ws3Res, wsListRes, usersRes] = await Promise.all([
          axios.get(`${baseUrl}/api/open/workstream`, { withCredentials: true }),
          axios.get(`${baseUrl}/api/open/workstream2`, { withCredentials: true }),
          axios.get(`${baseUrl}/api/open/workstream3`, { withCredentials: true }),
          axios.get(`${baseUrl}/api/open/workstream-list`, { withCredentials: true }),
          axios.get(`${baseUrl}/api/open/users`, { withCredentials: true }), // all users
        ]);
        console.log(usersRes,"usersRes")

        // ✅ Safe defaults
        const ws1Data = ws1Res.data?.data ?? [];
        const ws2Data = ws2Res.data?.data ?? [];
        const ws3Data = ws3Res.data?.data ?? [];
        const dynamicWorkstreams = wsListRes.data?.data ?? [];
        const usersData = usersRes.data?.users ?? [];
         console.log(usersData,"usersData")

        // 🔍 Debug logs
        console.log("ws1Data:", ws1Data);
        console.log("ws2Data:", ws2Data);
        console.log("ws3Data:", ws3Data);
        console.log("dynamicWorkstreams:", dynamicWorkstreams);
        console.log("usersData:", usersData);

        // reviewers = users with role "viewer"
        const reviewersCount = usersData.filter(
          (u) => u.role?.toLowerCase() === "viewer"
        ).length;

        // merge records with a unified "date" field
        const allRecords = [
          ...(ws1Data || []).map((item) => ({ date: item.review_date })),
          ...(ws2Data || []).map((item) => ({ date: item.tested_on_date })),
          ...(ws3Data || []).map((item) => ({ date: item.created_at })),
        ];

        const today = new Date();
        const todayStr = today.toLocaleDateString();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const todayCount = allRecords.filter((r) => {
          if (!r.date) return false;
          const d = new Date(r.date);
          return d.toLocaleDateString() === todayStr;
        }).length;

        const monthCount = allRecords.filter((r) => {
          if (!r.date) return false;
          const d = new Date(r.date);
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        }).length;

        setStats({
          totalRecords: allRecords.length,
          todayRecords: todayCount,
          monthRecords: monthCount,
          totalWorkstreams: 3 + dynamicWorkstreams.length,
          reviewers: reviewersCount, // ✅ now only counts role:"viewer"
        });
      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={pageStyle}>
      <div className="admin-dashboard-container">
        <Sidebar />

        <div className="main-content">
          <header className="topbar">
            <h2>Admin JS</h2>

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
              <h4>Total Records</h4>
              <p>{loading ? "Loading..." : stats.totalRecords}</p>
            </div>
            <div className="card">
              <h4>Records Submitted Today</h4>
              <p>{loading ? "Loading..." : stats.todayRecords}</p>
            </div>
            <div className="card">
              <h4>Records Submitted This Month</h4>
              <p>{loading ? "Loading..." : stats.monthRecords}</p>
            </div>
            <div className="card">
              <h4>Total Workstreams</h4>
              <p>{loading ? "Loading..." : stats.totalWorkstreams}</p>
            </div>
            <div className="card">
              <h4>Reviewers</h4>
              <p>{loading ? "Loading..." : stats.reviewers}</p>
            </div>
          </section>

        
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
