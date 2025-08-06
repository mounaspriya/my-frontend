// import React from 'react'
// import '../styles/TopBar.css'

// const TopBar = () => {
//   return (
//     <div className="topbar">
//       <div className="logo">📊 iData GBIT</div>
//       <div className="search-profile">
//         <input type="text" placeholder="Search..." />
//         <div className="profile-circle">P</div>
//       </div>
//     </div>
//   )
// }

// export default TopBar

// Topbar.jsx
import React from "react";
import "../styles/Layout.css";

const Topbar = ({ onSearch }) => (
  <header className="topbar">
    <input
      type="text"
      placeholder="Search by name, role, or email..."
      onChange={(e) => onSearch(e.target.value.toLowerCase())}
    />
    <div className="profile">
      <span>jamesbrown@example.com</span>
      <div className="avatar-circle">JB</div>
    </div>
  </header>
);

export default Topbar;
