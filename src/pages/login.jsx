// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await axios.post('http://localhost:5000/api/auth/login', {
//   //       email,
//   //       password
//   //     });
//   //     localStorage.setItem('token', res.data.token);
//   //     navigate('/dashboard');
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || 'Login failed');
//   //   }
//   // };


// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post('http://localhost:5000/api/auth/login', {
//       email,
//       password
//     }, {
//       withCredentials: true // only needed if backend is using cookies
//     });

//     console.log('Login response:', res.data); // for debugging

//     localStorage.setItem('token', res.data.token);
//     navigate('/dashboard');
//   } catch (err) {
//     console.error('Login error:', err); // helpful in debugging
//     setError(err.response?.data?.message || 'Login failed');
//   }
// };


//   return (
//     <div style={{ maxWidth: '400px', margin: '100px auto' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: 10 }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: 10 }}
//         />
//         <button type="submit">Login</button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default Login;


// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password
//       }, {
//         withCredentials: true
//       });

//       console.log('Login response:', res.data);
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={headingStyle}>Welcome Back 👋</h2>
//         <p style={subtextStyle}>Please login to continue</p>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <button type="submit" style={buttonStyle}>Login</button>
//           {error && <p style={errorStyle}>{error}</p>}
//         </form>
//         <p style={footerTextStyle}>
//           Don't have an account?{' '}
//           <Link to="/register" style={linkStyle}>Register here</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const pageStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '100vh',
//   width: '100vw',
//   background: 'linear-gradient(to right, #dfe9f3, #ffffff)',
//   padding: '20px',
//   boxSizing: 'border-box',
// };

// const cardStyle = {
//   background: '#ffffff',
//   padding: '40px 30px',
//   borderRadius: '16px',
//   boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
//   width: '100%',
//   maxWidth: '400px',
// };

// const headingStyle = {
//   fontSize: '26px',
//   fontWeight: 'bold',
//   color: '#333',
//   textAlign: 'center',
//   marginBottom: '10px',
// };

// const subtextStyle = {
//   fontSize: '14px',
//   textAlign: 'center',
//   color: '#666',
//   marginBottom: '25px',
// };

// const inputStyle = {
//   width: '100%',
//   padding: '12px 14px',
//   marginBottom: '15px',
//   borderRadius: '8px',
//   border: '1px solid #ccc',
//   fontSize: '15px',
//   boxSizing: 'border-box',
// };

// const buttonStyle = {
//   width: '100%',
//   padding: '12px',
//   backgroundColor: '#007BFF',
//   color: '#fff',
//   fontWeight: 'bold',
//   border: 'none',
//   borderRadius: '8px',
//   cursor: 'pointer',
//   fontSize: '16px',
//   transition: 'background 0.3s',
// };

// const errorStyle = {
//   color: 'red',
//   marginTop: '12px',
//   textAlign: 'center',
// };

// const footerTextStyle = {
//   textAlign: 'center',
//   marginTop: '20px',
//   fontSize: '14px',
// };

// const linkStyle = {
//   color: '#007BFF',
//   textDecoration: 'none',
//   fontWeight: 'bold',
// };

// export default Login;



// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//     // Clear error when user starts typing
//     if (error) setError("")
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       console.log("🔐 Attempting login...")

//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email: formData.email,
//           password: formData.password,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       console.log("✅ Login response:", response.data)

//       if (response.data.success) {
//         // Store token and user data
//         localStorage.setItem("token", response.data.token)
//         localStorage.setItem("user", JSON.stringify(response.data.user))

//         console.log("✅ Login successful, redirecting to dashboard...")
//         navigate("/dashboard")
//       } else {
//         setError(response.data.message || "Login failed")
//       }
//     } catch (err) {
//       console.error("❌ Login error:", err)

//       if (err.response) {
//         // Server responded with error status
//         setError(err.response.data.message || "Login failed")
//       } else if (err.request) {
//         // Request was made but no response received
//         setError("Unable to connect to server. Please check if the server is running.")
//       } else {
//         // Something else happened
//         setError("An unexpected error occurred")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={headingStyle}>Welcome Back 👋</h2>
//         <p style={subtextStyle}>Please login to continue</p>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//             disabled={loading}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//             disabled={loading}
//             minLength={6}
//           />

//           <button
//             type="submit"
//             style={{
//               ...buttonStyle,
//               opacity: loading ? 0.7 : 1,
//               cursor: loading ? "not-allowed" : "pointer",
//             }}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {error && <p style={errorStyle}>{error}</p>}
//         </form>

//         <p style={footerTextStyle}>
//           Don't have an account?{" "}
//           <Link to="/register" style={linkStyle}>
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// // Styles
// const pageStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   minHeight: "100vh",
//   width: "100vw",
//   background: "linear-gradient(to right, #dfe9f3, #ffffff)",
//   padding: "20px",
//   boxSizing: "border-box",
// }

// const cardStyle = {
//   background: "#ffffff",
//   padding: "40px 30px",
//   borderRadius: "16px",
//   boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
//   width: "100%",
//   maxWidth: "400px",
// }

// const headingStyle = {
//   fontSize: "26px",
//   fontWeight: "bold",
//   color: "#333",
//   textAlign: "center",
//   marginBottom: "10px",
// }

// const subtextStyle = {
//   fontSize: "14px",
//   textAlign: "center",
//   color: "#666",
//   marginBottom: "25px",
// }

// const inputStyle = {
//   width: "100%",
//   padding: "12px 14px",
//   marginBottom: "15px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "15px",
//   boxSizing: "border-box",
//   transition: "border-color 0.3s",
// }

// const buttonStyle = {
//   width: "100%",
//   padding: "12px",
//   backgroundColor: "#007BFF",
//   color: "#fff",
//   fontWeight: "bold",
//   border: "none",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontSize: "16px",
//   transition: "background 0.3s",
// }

// const errorStyle = {
//   color: "#dc3545",
//   marginTop: "12px",
//   textAlign: "center",
//   fontSize: "14px",
//   padding: "8px",
//   backgroundColor: "#f8d7da",
//   border: "1px solid #f5c6cb",
//   borderRadius: "4px",
// }

// const footerTextStyle = {
//   textAlign: "center",
//   marginTop: "20px",
//   fontSize: "14px",
//   color: "#666",
// }

// const linkStyle = {
//   color: "#007BFF",
//   textDecoration: "none",
//   fontWeight: "bold",
// }

// export default Login




// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//     if (error) setError("")
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       })

//       if (response.data.success) {
//         // Store token and user data
//         localStorage.setItem("token", response.data.token)
//         localStorage.setItem("user", JSON.stringify(response.data.user))

//         console.log("✅ Login successful, user role:", response.data.user.role)

//         // Redirect based on user role
//         if (response.data.user.role === "admin") {
//           navigate("/admindashboard")
//         } else if (response.data.user.role === "viewer") {
//           navigate("/dashboardview")
//         } else {
//           navigate("/dashboard") // fallback
//         }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={headingStyle}>Welcome Back 👋</h2>
//         <p style={subtextStyle}>Please login to continue</p>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//             disabled={loading}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//             disabled={loading}
//           />

//           <button
//             type="submit"
//             style={{
//               ...buttonStyle,
//               opacity: loading ? 0.7 : 1,
//               cursor: loading ? "not-allowed" : "pointer",
//             }}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {error && <p style={errorStyle}>{error}</p>}
//         </form>

//         <div style={demoAccountsStyle}>
//           <p style={demoTitleStyle}>Demo Accounts:</p>
//           <p style={demoTextStyle}>
//             <strong>Admin:</strong> psjan71@gmail.com / test@123
//           </p>
//           <p style={demoTextStyle}>
//             <strong>Viewer:</strong> psjan96@gmail.com / test@123
//           </p>
//         </div>

//         <p style={footerTextStyle}>
//           Don't have an account?{" "}
//           <Link to="/register" style={linkStyle}>
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }


// const pageStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   minHeight: "100vh",
//   width: "100vw",
//   background: "linear-gradient(to right, #dfe9f3, #ffffff)",
//   padding: "20px",
//   boxSizing: "border-box",
// }

// const cardStyle = {
//   background: "#ffffff",
//   padding: "40px 30px",
//   borderRadius: "16px",
//   boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
//   width: "100%",
//   maxWidth: "400px",
// }

// const headingStyle = {
//   fontSize: "26px",
//   fontWeight: "bold",
//   color: "#333",
//   textAlign: "center",
//   marginBottom: "10px",
// }

// const subtextStyle = {
//   fontSize: "14px",
//   textAlign: "center",
//   color: "#666",
//   marginBottom: "25px",
// }

// const inputStyle = {
//   width: "100%",
//   padding: "12px 14px",
//   marginBottom: "15px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "15px",
//   boxSizing: "border-box",
// }

// const buttonStyle = {
//   width: "100%",
//   padding: "12px",
//   backgroundColor: "#007BFF",
//   color: "#fff",
//   fontWeight: "bold",
//   border: "none",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontSize: "16px",
// }

// const errorStyle = {
//   color: "#dc3545",
//   marginTop: "12px",
//   textAlign: "center",
//   fontSize: "14px",
//   padding: "8px",
//   backgroundColor: "#f8d7da",
//   border: "1px solid #f5c6cb",
//   borderRadius: "4px",
// }

// const demoAccountsStyle = {
//   marginTop: "20px",
//   padding: "15px",
//   backgroundColor: "#f8f9fa",
//   borderRadius: "8px",
//   border: "1px solid #e9ecef",
// }

// const demoTitleStyle = {
//   fontSize: "14px",
//   fontWeight: "bold",
//   color: "#495057",
//   marginBottom: "8px",
// }

// const demoTextStyle = {
//   fontSize: "12px",
//   color: "#6c757d",
//   margin: "4px 0",
// }

// const footerTextStyle = {
//   textAlign: "center",
//   marginTop: "20px",
//   fontSize: "14px",
//   color: "#666",
// }

// const linkStyle = {
//   color: "#007BFF",
//   textDecoration: "none",
//   fontWeight: "bold",
// }

// export default Login


//new ui

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // const response = await axios.post("http://localhost:5000/api/auth/login", {
      //   email: formData.email,
      //   password: formData.password,
      // });
      const response = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
  {
    email: formData.email,
    password: formData.password,
  }
)


      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (response.data.user.role === "admin") navigate("/admindashboard");
        else if (response.data.user.role === "viewer") navigate("/dashboardview");
        else navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
            <p style={styles.overlayParagraph}>
              Smart, secure, and centralized data tracking—right from day one.
            </p>
          </div>
          <div style={styles.bottomLinks}>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.right}>
          <div style={styles.card}>
            <h2 style={styles.welcome}>Hello <span style={styles.again}>Again!</span></h2>
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
  );
}

const styles = {
   container: {
      fontFamily: 'Segoe UI, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
        width: "100vw",
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      borderBottom: '1px solid #eee',
      backgroundColor: '#fff',
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
      display: 'flex',
      flex: 1,
    },
    leftPanel: {
      width: '50%',
      backgroundImage: 'url(/bgImage.png)', // Replace with your path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '60px 40px',
    },
    overlayText: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: '40px',
      borderRadius: 8,
    },
    overlayTitle: {
      color:'#fff',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    overlayParagraph: {
      fontSize: '1rem',
      color: '#ddd',
    },
    bottomLinks: {
      position: 'absolute',
      bottom: 20,
      left: 40,
      right: 40,
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.85rem',
      color: '#ccc',
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
};

export default Login;
