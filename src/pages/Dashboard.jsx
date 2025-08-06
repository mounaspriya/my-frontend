// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // function Dashboard() {
// //   const navigate = useNavigate();

// //   const handleWorkspaceClick = (workspaceNumber) => {
// //     // Navigate to workspace page or do something else
// //     navigate(`/workspace/${workspaceNumber}`);
// //   };

// //   return (
// //     <div style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
// //       <h1>Dashboard</h1>
// //       <p>Select a workspace:</p>
// //       <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 30 }}>
// //         {[1, 2, 3, 4].map((num) => (
// //           <div
// //             key={num}
// //             onClick={() => handleWorkspaceClick(num)}
// //             style={{
// //               cursor: 'pointer',
// //               border: '1px solid #333',
// //               borderRadius: 8,
// //               padding: 20,
// //               width: 120,
// //               userSelect: 'none',
// //               boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
// //               transition: 'transform 0.1s',
// //             }}
// //             onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
// //             onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
// //           >
// //             Workspace {num}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dashboard;


// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Dashboard = () => {
// //   return (
// //     <div>
// //       <h2>Dashboard</h2>
// //       <Link to="/workspace/1/form">
// //         <button>Open Workspace 1 Form</button>
// //       </Link>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Dashboard = () => {
// //   return (
// //     <div style={pageStyle}>
// //       <div style={cardStyle}>
// //         <h2 style={headingStyle}>Welcome to Your Dashboard</h2>
// //         <p style={subtextStyle}>Select a workspace to get started:</p>
// //         <Link to="/workspace/1/form" style={linkStyle}>
// //           <button style={buttonStyle}>Open Workspace 1 Form</button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // const pageStyle = {
// //   minHeight: '100vh',
// //   width: '100vw',
// //   margin: 0,
// //   padding: '40px',
// //   boxSizing: 'border-box',
// //   background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// // };

// // const cardStyle = {
// //   width: '100%',
// //   maxWidth: '100%',
// //   padding: '60px 40px',
// //   background: '#fff',
// //   borderRadius: '16px',
// //   boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
// //   textAlign: 'center',
// // };

// // const headingStyle = {
// //   marginBottom: '20px',
// //   fontSize: '32px',
// //   color: '#333',
// // };

// // const subtextStyle = {
// //   fontSize: '18px',
// //   marginBottom: '30px',
// //   color: '#666',
// // };

// // const linkStyle = {
// //   textDecoration: 'none',
// // };

// // const buttonStyle = {
// //   padding: '14px 28px',
// //   backgroundColor: '#007BFF',
// //   color: '#fff',
// //   fontWeight: 'bold',
// //   fontSize: '16px',
// //   border: 'none',
// //   borderRadius: '8px',
// //   cursor: 'pointer',
// //   transition: 'background-color 0.3s',
// // };

// // export default Dashboard;


// import React from "react";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const workspaces = [1, 2, 3, 4];

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={headingStyle}>Welcome to Your Dashboard</h2>
//         <p style={subtextStyle}>Select a workspace to get started:</p>
//         <div style={buttonGridStyle}>
//           {workspaces.map((id) => (
//             <Link key={id} to={`/workspace/${id}/form`} style={linkStyle}>
//               <button style={buttonStyle}>Open Workspace {id} Form</button>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const pageStyle = {
//   minHeight: '100vh',
//   width: '100vw',
//   margin: 0,
//   padding: '40px',
//   boxSizing: 'border-box',
//   background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

// const cardStyle = {
//   width: '100%',
//   maxWidth: '600px',
//   padding: '60px 40px',
//   background: '#fff',
//   borderRadius: '16px',
//   boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
//   textAlign: 'center',
// };

// const headingStyle = {
//   marginBottom: '20px',
//   fontSize: '32px',
//   color: '#333',
// };

// const subtextStyle = {
//   fontSize: '18px',
//   marginBottom: '30px',
//   color: '#666',
// };

// const buttonGridStyle = {
//   display: 'grid',
//   gridTemplateColumns: '1fr 1fr',
//   gap: '20px',
// };

// const linkStyle = {
//   textDecoration: 'none',
// };

// const buttonStyle = {
//   padding: '14px 20px',
//   backgroundColor: '#007BFF',
//   color: '#fff',
//   fontWeight: 'bold',
//   fontSize: '16px',
//   border: 'none',
//   borderRadius: '8px',
//   cursor: 'pointer',
//   transition: 'background-color 0.3s',
//   width: '100%',
// };

// export default Dashboard;


// view all button
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"

const Dashboard = () => {
  const workspaces = [1, 2, 3, 4];
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      navigate("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      navigate("/dashboard")
      return
    }

    setUser(parsedUser)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    // <div style={pageStyle}>
    //   <div style={cardStyle}>
    //     <h2 style={headingStyle}>Welcome to Your Dashboard</h2>
    //     <p style={subtextStyle}>Select a workspace to get started:</p>
    //     <div style={buttonGridStyle}>
    //       {workspaces.map((id) =>
    //         id === 1 ? (
    //           <div key={id} style={workspaceBlockStyle}>
    //             <p style={{ marginBottom: '10px' }}>Workspace {id}</p>
    //               <button onClick={handleLogout} style={logoutButtonStyle}>
    //         Logout
    //       </button>
    //             <Link to={`/workspace/${id}/form`} style={linkStyle}>
    //               <button style={buttonStyle}>Add New Form</button>
    //             </Link>
    //             <Link to={`/workspace/${id}/view`} style={linkStyle}>
    //               <button style={{ ...buttonStyle, backgroundColor: "#28a745" }}>
    //                 View All Data
    //               </button>
    //             </Link>
    //           </div>
    //         ) : (
    //           <Link key={id} to={`/workspace/${id}/form`} style={linkStyle}>
    //             <button style={buttonStyle}>Open Workspace {id} Form</button>
    //           </Link>
    //         )
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div style={pageStyle}>
  <div style={{ ...cardStyle, position: 'relative' }}>
    
    {/* ✅ Logout button in top-right corner of card */}
    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
      <button onClick={handleLogout} style={{ 
        backgroundColor: '#dc3545', 
        color: 'white', 
        padding: '8px 16px', 
        border: 'none', 
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Logout
      </button>
    </div>

    {/* Card content */}
    <h2 style={headingStyle}>Welcome to Your Dashboard</h2>
    <p style={subtextStyle}>Select a workspace to get started:</p>
    <div style={buttonGridStyle}>
      {workspaces.map((id) =>
        id === 1 ? (
          <div key={id} style={workspaceBlockStyle}>
            <p style={{ marginBottom: '10px' }}>Workspace {id}</p>
            <Link to={`/workspace/${id}/form`} style={linkStyle}>
              <button style={buttonStyle}>Add New Form</button>
            </Link>
            <Link to={`/workspace/${id}/view`} style={linkStyle}>
              <button style={{ ...buttonStyle, backgroundColor: "#28a745" }}>
                View All Data
              </button>
            </Link>
          </div>
        ) : (
          <Link key={id} to={`/workspace/${id}/form`} style={linkStyle}>
            <button style={buttonStyle}>Open Workspace {id} Form</button>
          </Link>
        )
      )}
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

const cardStyle = {
  width: "100%",
  maxWidth: "700px",
  padding: "60px 40px",
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const headingStyle = {
  marginBottom: "20px",
  fontSize: "32px",
  color: "#333",
};

const subtextStyle = {
  fontSize: "18px",
  marginBottom: "30px",
  color: "#666",
};

const buttonGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const workspaceBlockStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const linkStyle = {
  textDecoration: "none",
  width: "100%",
};

const buttonStyle = {
  padding: "14px 20px",
  backgroundColor: "#007BFF",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  width: "100%",
};


const logoutButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
};


export default Dashboard;
