"use client"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const LogoutButton = ({ style = {} }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "14px",
        ...style,
      }}
    >
      Logout
    </button>
  )
}

export default LogoutButton
