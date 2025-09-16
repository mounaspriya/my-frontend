"use client"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Verifying authentication...</p>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role-based access if required
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on user role
    const redirectPath = getRoleBasedRedirect(user?.role)
    return <Navigate to={redirectPath} replace />
  }

  // User is authenticated and has required role
  return children
}

// Helper function to get redirect path based on user role
const getRoleBasedRedirect = (userRole) => {
  switch (userRole) {
    case "admin":
      return "/admindashboard"
    case "viewer":
      return "/dashboardview"
    default:
      return "/dashboard"
  }
}

// Role-specific protected route components
export const AdminRoute = ({ children }) => <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>

export const ViewerRoute = ({ children }) => <ProtectedRoute requiredRole="viewer">{children}</ProtectedRoute>

export const UserRoute = ({ children }) => <ProtectedRoute requiredRole="user">{children}</ProtectedRoute>

const styles = {
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e3e3e3",
    borderTop: "4px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "16px",
    color: "#666",
    fontSize: "16px",
  },
}

// Add CSS animation for spinner
const styleSheet = document.createElement("style")
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
document.head.appendChild(styleSheet)

export default ProtectedRoute
