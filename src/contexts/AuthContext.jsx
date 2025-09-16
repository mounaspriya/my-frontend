// "use client"

// import { createContext, useContext, useState, useEffect } from "react"
// import axios from "axios"

// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   // Check if user is authenticated on app load
//   useEffect(() => {
//     checkAuthStatus()
//   }, [])

//   const checkAuthStatus = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       const userData = localStorage.getItem("user")

//       if (!token || !userData) {
//         setLoading(false)
//         return
//       }

//       // Verify token with backend
//       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response.data.success) {
//         setUser(JSON.parse(userData))
//         setIsAuthenticated(true)
//       } else {
//         // Token is invalid, clear storage
//         logout()
//       }
//     } catch (error) {
//       console.error("Auth check failed:", error)
//       // Token is invalid or expired, clear storage
//       logout()
//     } finally {
//       setLoading(false)
//     }
//   }

//   const login = (userData, token) => {
//     localStorage.setItem("token", token)
//     localStorage.setItem("user", JSON.stringify(userData))
//     setUser(userData)
//     setIsAuthenticated(true)
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     setUser(null)
//     setIsAuthenticated(false)
//   }

//   const value = {
//     user,
//     isAuthenticated,
//     loading,
//     login,
//     logout,
//     checkAuthStatus,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }




"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      const userData = localStorage.getItem("user")

      if (!token || !userData) {
        setLoading(false)
        return
      }

      // Check if token is expired by parsing JWT
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]))
        const currentTime = Date.now() / 1000

        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
          // Token is expired
          logout()
          setLoading(false)
          return
        }
      } catch (error) {
        // Invalid token format
        logout()
        setLoading(false)
        return
      }

      // Token is valid, restore user session
      setUser(JSON.parse(userData))
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Auth check failed:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (userData, token) => {
    return new Promise((resolve) => {
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      setIsAuthenticated(true)

      // Use setTimeout to ensure state updates are processed
      setTimeout(() => {
        resolve()
      }, 0)
    })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
