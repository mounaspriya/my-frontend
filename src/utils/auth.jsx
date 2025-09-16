// Utility functions for authentication
export const getToken = () => {
  return localStorage.getItem("token")
}

export const getUser = () => {
  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

export const isTokenExpired = (token) => {
  if (!token) return true

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch (error) {
    return true
  }
}

export const hasValidToken = () => {
  const token = getToken()
  return token && !isTokenExpired(token)
}
