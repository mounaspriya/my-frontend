"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ViewerDashboard() {
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
    if (parsedUser.role !== "viewer") {
      navigate("/admin-dashboard")
      return
    }

    setUser(parsedUser)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  if (!user) {
    return <div style={loadingStyle}>Loading...</div>
  }

  return (
    <div style={pageStyle}>
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>👁️ Viewer Dashboard</h1>
        <div style={userInfoStyle}>
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      </header>

      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>📊 Your View</h2>
          <p style={textStyle}>Welcome to your viewer dashboard! You have read-only access to view data and reports.</p>

          <div style={featuresStyle}>
            <div style={featureItemStyle}>
              <h3 style={featureTitleStyle}>📈 Reports</h3>
              <p style={featureTextStyle}>View and download reports</p>
            </div>
            <div style={featureItemStyle}>
              <h3 style={featureTitleStyle}>📋 Data</h3>
              <p style={featureTextStyle}>Browse available data</p>
            </div>
            <div style={featureItemStyle}>
              <h3 style={featureTitleStyle}>📊 Analytics</h3>
              <p style={featureTextStyle}>View analytics and insights</p>
            </div>
          </div>
        </div>

        <div style={infoCardStyle}>
          <h3 style={infoTitleStyle}>ℹ️ Account Information</h3>
          <div style={infoItemStyle}>
            <strong>Name:</strong> {user.name}
          </div>
          <div style={infoItemStyle}>
            <strong>Email:</strong> {user.email}
          </div>
          <div style={infoItemStyle}>
            <strong>Role:</strong> <span style={roleTagStyle}>Viewer</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

// Styles
const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(to right, #dfe9f3, #ffffff)",
  padding: "20px",
  boxSizing: "border-box",
}
const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
}


const headerStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const titleStyle = {
  margin: 0,
  fontSize: "1.5rem",
}

const userInfoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
}

const logoutButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
}

const contentStyle = {
  padding: "2rem",
}

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "1.5rem",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  marginBottom: "2rem",
}

const cardTitleStyle = {
  marginTop: 0,
  marginBottom: "1rem",
  color: "#343a40",
}

const textStyle = {
  color: "#6c757d",
  marginBottom: "1.5rem",
}

const featuresStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
}

const featureItemStyle = {
  padding: "1rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "6px",
  textAlign: "center",
}

const featureTitleStyle = {
  margin: "0 0 0.5rem 0",
  color: "#28a745",
}

const featureTextStyle = {
  margin: 0,
  color: "#6c757d",
  fontSize: "0.9rem",
}

const infoCardStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "1.5rem",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}

const infoTitleStyle = {
  marginTop: 0,
  marginBottom: "1rem",
  color: "#343a40",
}

const infoItemStyle = {
  marginBottom: "0.5rem",
  color: "#495057",
}

const roleTagStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "0.25rem 0.5rem",
  borderRadius: "4px",
  fontSize: "0.875rem",
  fontWeight: "bold",
}

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "1.2rem",
}

export default ViewerDashboard
