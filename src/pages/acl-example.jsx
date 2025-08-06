"use client"

import { useState, useEffect } from "react"
import axios from "axios"

function ACLExample() {
  const [permissions, setPermissions] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUserPermissions()
  }, [])

  const fetchUserPermissions = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:5000/api/auth/permissions", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setPermissions(response.data.permissions)
      setUser(response.data.user)
    } catch (error) {
      console.error("Error fetching permissions:", error)
    }
  }

  const canAccess = (resource, permission) => {
    return permissions?.[resource]?.[permission] || false
  }

  if (!permissions) return <div>Loading permissions...</div>

  return (
    <div style={{ padding: "20px" }}>
      <h2>ACL Permission System Demo</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>User Info:</h3>
        <p>Name: {user?.name}</p>
        <p>Role: {user?.role}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Permissions:</h3>

        {/* Admin-only features */}
        {canAccess("users", "read") && (
          <button onClick={() => console.log("Fetching users...")}>👥 View All Users (Admin Only)</button>
        )}

        {canAccess("users", "create") && (
          <button onClick={() => console.log("Creating user...")}>➕ Create User (Admin Only)</button>
        )}

        {/* Workstream features */}
        {canAccess("workstream", "read") && (
          <button onClick={() => console.log("Reading workstream...")}>📋 View Workstreams</button>
        )}

        {canAccess("workstream", "create") && (
          <button onClick={() => console.log("Creating workstream...")}>➕ Create Workstream (Admin Only)</button>
        )}

        {/* Dashboard access */}
        {canAccess("dashboard", "admin-view") && (
          <button onClick={() => console.log("Admin dashboard...")}>🔧 Admin Dashboard</button>
        )}

        {canAccess("dashboard", "viewer-view") && (
          <button onClick={() => console.log("Viewer dashboard...")}>👁️ Viewer Dashboard</button>
        )}
      </div>

      <div>
        <h3>Permission Matrix:</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Create</th>
              <th>Read</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Admin View</th>
              <th>Viewer View</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(permissions).map(([resource, perms]) => (
              <tr key={resource}>
                <td>{resource}</td>
                <td>{perms.create ? "✅" : "❌"}</td>
                <td>{perms.read ? "✅" : "❌"}</td>
                <td>{perms.update ? "✅" : "❌"}</td>
                <td>{perms.delete ? "✅" : "❌"}</td>
                <td>{perms["admin-view"] ? "✅" : "❌"}</td>
                <td>{perms["viewer-view"] ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ACLExample
