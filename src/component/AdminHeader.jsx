"use client"

import { useAuth } from "../contexts/AuthContext"
import { ChevronDown, LogOut } from "lucide-react"

const AdminHeader = ({ title = "Admin Dashboard" }) => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        </div>

        {/* Right side - User Profile */}
        <div className="relative group">
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name || "Admin"}</span>
            <ChevronDown className="w-4 h-4 text-gray-400 transition-transform group-hover:rotate-180" />
          </button>

          <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-gray-500">{user?.email || "admin@example.com"}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full mt-1 capitalize">
                    {user?.role || "admin"}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
