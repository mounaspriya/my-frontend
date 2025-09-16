//new ui

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (error) setError("");
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // const response = await axios.post("http://localhost:5000/api/auth/login", {
//       //   email: formData.email,
//       //   password: formData.password,
//       // });
//       const response = await axios.post(
//   `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
//   {
//     email: formData.email,
//     password: formData.password,
//   }
// )


//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         if (response.data.user.role === "admin") navigate("/admindashboard");
//         else if (response.data.user.role === "viewer") navigate("/dashboardview");
//         else navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <img src="/gBitLogo.png" alt="GBIT Logo" style={styles.logo} />
//         <button style={styles.headerBtn} onClick={() => navigate("/login")}>
//           Login
//         </button>
//       </div>

//       <div style={styles.content}>
//         {/* Left Panel */}
//         <div style={styles.leftPanel}>
//           <div style={styles.overlayText}>
//             <h2 style={styles.overlayTitle}>
//               Built Exclusively for <span>GBIT</span>
//             </h2>
//             <p style={styles.overlayParagraph}>
//               Smart, secure, and centralized data tracking—right from day one.
//             </p>
//           </div>
//           <div style={styles.bottomLinks}>
//             <a href="#">Terms & Conditions</a>
//             <a href="#">Privacy Policy</a>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div style={styles.right}>
//           <div style={styles.card}>
//             <h2 style={styles.welcome}>Hello <span style={styles.again}>Again!</span></h2>
//             <p style={styles.instruction}>Login to Get Started</p>

//             <form onSubmit={handleLogin}>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 style={styles.input}
//                 disabled={loading}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 style={styles.input}
//                 disabled={loading}
//                 required
//               />

//               <button
//                 type="submit"
//                 style={{
//                   ...styles.button,
//                   opacity: loading ? 0.7 : 1,
//                   cursor: loading ? "not-allowed" : "pointer",
//                 }}
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>

//               {error && <div style={styles.error}>{error}</div>}
//             </form>

          
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//    container: {
//       fontFamily: 'Segoe UI, sans-serif',
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//         width: "100vw",
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '20px 40px',
//       borderBottom: '1px solid #eee',
//       backgroundColor: '#fff',
//     },
//   logo: {
//     height: "35px",
//   },
//   headerBtn: {
//     padding: "8px 16px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     fontWeight: "bold",
//     cursor: "pointer",
//   },
//    content: {
//       display: 'flex',
//       flex: 1,
//     },
//     leftPanel: {
//       width: '50%',
//       backgroundImage: 'url(/bgImage.png)', // Replace with your path
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       position: 'relative',
//       color: '#fff',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       padding: '60px 40px',
//     },
//     overlayText: {
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       padding: '40px',
//       borderRadius: 8,
//     },
//     overlayTitle: {
//       color:'#fff',
//       fontSize: '2rem',
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     overlayParagraph: {
//       fontSize: '1rem',
//       color: '#ddd',
//     },
//     bottomLinks: {
//       position: 'absolute',
//       bottom: 20,
//       left: 40,
//       right: 40,
//       display: 'flex',
//       justifyContent: 'space-between',
//       fontSize: '0.85rem',
//       color: '#ccc',
//     },
//   right: {
//     flex: 1,
//     backgroundColor: "#fff",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//   },
//   card: {
//     width: "100%",
//     maxWidth: "380px",
//   },
//   welcome: {
//     fontSize: "28px",
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: "8px",
//   },
//   again: {
//     color: "rebeccapurple",
//   },
//   instruction: {
//     fontSize: "14px",
//     color: "#666",
//     marginBottom: "20px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "15px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//     boxSizing: "border-box",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     fontWeight: "bold",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     marginTop: "10px",
//   },
//   error: {
//     color: "#dc3545",
//     backgroundColor: "#f8d7da",
//     border: "1px solid #f5c6cb",
//     borderRadius: "6px",
//     padding: "10px",
//     marginTop: "12px",
//     textAlign: "center",
//     fontSize: "14px",
//   },
//   demo: {
//     marginTop: "20px",
//     backgroundColor: "#f1f1f1",
//     padding: "12px",
//     borderRadius: "6px",
//     fontSize: "13px",
//     color: "#444",
//   },
//   registerText: {
//     textAlign: "center",
//     fontSize: "14px",
//     marginTop: "20px",
//     color: "#555",
//   },
//   link: {
//     color: "#007bff",
//     fontWeight: "bold",
//     textDecoration: "none",
//   },
// };

// export default Login;





"use client"

//new ui

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      })

      if (response.data.success) {
        login(response.data.user, response.data.token)

        if (response.data.user.role === "admin") navigate("/admindashboard")
        else if (response.data.user.role === "viewer") navigate("/dashboardview")
        else navigate("/dashboard")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src="/gBitLogo.png" alt="GBIT Logo" style={styles.logo} />
        <button style={styles.headerBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>

      <div style={styles.content}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <div style={styles.overlayText}>
            <h2 style={styles.overlayTitle}>
              Built Exclusively for <span>GBIT</span>
            </h2>
            <p style={styles.overlayParagraph}>Smart, secure, and centralized data tracking—right from day one.</p>
          </div>
          <div style={styles.bottomLinks}>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.right}>
          <div style={styles.card}>
            <h2 style={styles.welcome}>
              Hello <span style={styles.again}>Again!</span>
            </h2>
            <p style={styles.instruction}>Login to Get Started</p>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                disabled={loading}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                disabled={loading}
                required
              />

              <button
                type="submit"
                style={{
                  ...styles.button,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {error && <div style={styles.error}>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
  },
  logo: {
    height: "35px",
  },
  headerBtn: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flex: 1,
  },
  leftPanel: {
    width: "50%",
    backgroundImage: "url(/bgImage.png)", // Replace with your path
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px 40px",
  },
  overlayText: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "40px",
    borderRadius: 8,
  },
  overlayTitle: {
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: 10,
  },
  overlayParagraph: {
    fontSize: "1rem",
    color: "#ddd",
  },
  bottomLinks: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.85rem",
    color: "#ccc",
  },
  right: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
  },
  welcome: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  again: {
    color: "rebeccapurple",
  },
  instruction: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    marginTop: "10px",
  },
  error: {
    color: "#dc3545",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    borderRadius: "6px",
    padding: "10px",
    marginTop: "12px",
    textAlign: "center",
    fontSize: "14px",
  },
  demo: {
    marginTop: "20px",
    backgroundColor: "#f1f1f1",
    padding: "12px",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#444",
  },
  registerText: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "20px",
    color: "#555",
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
    textDecoration: "none",
  },
}

export default Login
