// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         name,
//         email,
//         password,
//       });
//       // On success, redirect to login page
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '100px auto' }}>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: 10 }}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: 10 }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: 10 }}
//         />
//         <button type="submit">Register</button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default Register;

// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';  // Import Link

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         name,
//         email,
//         password,
//       });
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '100px auto' }}>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: 10 }}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: 10 }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: 10 }}
//         />
//         <button type="submit">Register</button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>

//       {/* Add login link below */}
//       <p style={{ marginTop: 20 }}>
//         Already have an account? <Link to="/login">Login here</Link>
//       </p>
//     </div>
//   );
// }

// export default Register;


// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         name,
//         email,
//         password,
//       });
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={headingStyle}>Create Your Account ✨</h2>
//         <p style={subtextStyle}>Sign up to get started</p>
//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <button type="submit" style={buttonStyle}>Register</button>
//           {error && <p style={errorStyle}>{error}</p>}
//         </form>
//         <p style={footerTextStyle}>
//           Already have an account?{' '}
//           <Link to="/login" style={linkStyle}>Login here</Link>
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

// export default Register;




// wit acl

// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "viewer", // Default role
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

  // const handleRegister = async (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   setError("")

  //   // Validate passwords match
  //   if (formData.password !== formData.confirmPassword) {
  //     setError("Passwords do not match")
  //     setLoading(false)
  //     return
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/register", {
  //       name: formData.name,
  //       email: formData.email,
  //       password: formData.password,
  //       // role: formData.role,
  //       role:"viewer",
  //     })

  //     if (response.data.success) {
  //       localStorage.setItem("token", response.data.token)
  //       localStorage.setItem("user", JSON.stringify(response.data.user))

  //       // Redirect based on role
  //       if (response.data.user.role === "admin") {
  //         navigate("/login")
  //       } else {
  //         navigate("/login")
  //       }
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Registration failed")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={headingStyle}>Create Account 🚀</h2>
//         <p style={subtextStyle}>Join our platform today</p>

//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//             disabled={loading}
//           />

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

//           {/* <select name="role" value={formData.role} onChange={handleChange} style={inputStyle} disabled={loading}>
//             <option value="viewer">Viewer</option>
//             <option value="admin">Admin</option>
//           </select> */}

//           <select name="role" value="viewer" style={inputStyle} disabled>
//   <option value="viewer">Viewer</option>
// </select>


//           <input
//             type="password"
//             name="password"
//             placeholder="Password (min 6 characters)"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             minLength={6}
//             style={inputStyle}
//             disabled={loading}
//           />

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
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
//             {loading ? "Creating Account..." : "Register"}
//           </button>

//           {error && <p style={errorStyle}>{error}</p>}
//         </form>

//         <p style={footerTextStyle}>
//           Already have an account?{" "}
//           <Link to="/login" style={linkStyle}>
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// // Styles (same as login)
// // const pageStyle = {
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   minHeight: "100vh",
// //   background: "linear-gradient(to right, #dfe9f3, #ffffff)",
// //   padding: "20px",
// // }
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
//   backgroundColor: "#28a745",
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

// export default Register




//new ui 

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // ✅ Important!

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     role: 'Viewer',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false); // ✅ Added
//   const [error, setError] = useState('');         // ✅ Added

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
//         name: formData.fullName, // ✅ Corrected
//         email: formData.email,
//         password: formData.password,
//         role: formData.role.toLowerCase(), // optional: lowercase for consistency
//       });

//       if (response.data.success) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//         navigate('/login');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- All styles defined below ----------
//   const styles = {
//     container: {
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
//     logo: {
//       height: 40,
//     },
//     loginBtn: {
//       backgroundColor: '#805ad5',
//       color: '#fff',
//       border: 'none',
//       padding: '8px 18px',
//       borderRadius: 6,
//       fontWeight: 500,
//       cursor: 'pointer',
//     },
//     content: {
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
//       fontSize: '2rem',
//       fontWeight: 'bold',
//       marginBottom: 10,
//       color:'#fff'
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
//     rightPanel: {
//       width: '50%',
//       backgroundColor: '#fff',
//       padding: '60px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     formWrapper: {
//       width: '100%',
//       maxWidth: 400,
//     },
//     formTitle: {
//       fontSize: '1.8rem',
//       marginBottom: 10,
//     },
//     idataColor: {
//       color: '#805ad5',
//     },
//     formDesc: {
//       marginBottom: 30,
//       color: '#333',
//     },
//     input: {
//       width: '100%',
//       padding: '12px',
//       marginBottom: '15px',
//       borderRadius: '6px',
//       border: '1px solid #ccc',
//       fontSize: '1rem',
//     },
//     button: {
//       width: '100%',
//       padding: '12px',
//       backgroundColor: '#805ad5',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '6px',
//       fontSize: '1rem',
//       fontWeight: 600,
//       cursor: 'pointer',
//       marginTop: 10,
//     },
//     loginLink: {
//       marginTop: 15,
//       textAlign: 'center',
//     },
//     loginAnchor: {
//       color: '#805ad5',
//       textDecoration: 'none',
//       fontWeight: 500,
//     },
//   };

// //   return (
// //     <div style={styles.container}>
// //       {/* Header */}
// //       <div style={styles.header}>
// //         <img src="/gBitLogo.png" alt="GBIT Logo" style={styles.logo} />
// //         <button style={styles.loginBtn} onClick={() => navigate('/login')}>
// //           Login
// //         </button>
// //       </div>

// //       <div style={styles.content}>
// //         {/* Left Panel */}
// //         <div style={styles.leftPanel}>
// //           <div style={styles.overlayText}>
// //             <h2 style={styles.overlayTitle}>
// //               Built Exclusively for <span>GBIT</span>
// //             </h2>
// //             <p style={styles.overlayParagraph}>
// //               Smart, secure, and centralized data tracking—right from day one.
// //             </p>
// //           </div>
// //           <div style={styles.bottomLinks}>
// //             <a href="#">Terms & Conditions</a>
// //             <a href="#">Privacy Policy</a>
// //           </div>
// //         </div>

// //         {/* Right Panel */}
// //         <div style={styles.rightPanel}>
// //           <div style={styles.formWrapper}>
// //             <h2 style={styles.formTitle}>
// //               Welcome to <span style={styles.idataColor}>iData!</span>
// //             </h2>
// //             <p style={styles.formDesc}>Sign Up to Get Started</p>

// //             <form onSubmit={handleSubmit}>
// //               <input
// //                 type="text"
// //                 name="fullName"
// //                 placeholder="Full Name"
// //                 value={formData.fullName}
// //                 onChange={handleChange}
// //                 style={styles.input}
// //                 required
// //               />
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="Email Address"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 style={styles.input}
// //                 required
// //               />
// //               <select
// //                 name="role"
// //                 value={formData.role}
// //                 onChange={handleChange}
// //                 style={styles.input}
// //                 required
// //               >
// //                 <option value="Viewer">Viewer</option>
// //                 <option value="Admin">Admin</option>
// //               </select>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 placeholder="Password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 style={styles.input}
// //                 required
// //               />
// //               <input
// //                 type="password"
// //                 name="confirmPassword"
// //                 placeholder="Confirm Password"
// //                 value={formData.confirmPassword}
// //                 onChange={handleChange}
// //                 style={styles.input}
// //                 required
// //               />
// //               <button type="submit" style={styles.button}>Register</button>
// //             </form>

// //             <p style={styles.loginLink}>
// //               Already have an account?{' '}
// //               <a href="/login" style={styles.loginAnchor}>Login here</a>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
//  return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <img src="/gBitLogo.png" alt="GBIT Logo" style={styles.logo} />
//         <button style={styles.loginBtn} onClick={() => navigate('/login')}>
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
//         <div style={styles.rightPanel}>
//           <div style={styles.formWrapper}>
//             <h2 style={styles.formTitle}>
//               Welcome to <span style={styles.idataColor}>iData!</span>
//             </h2>
//             <p style={styles.formDesc}>Sign Up to Get Started</p>

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//                {/* <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               >
//                 <option value="Viewer">Viewer</option>
//                 <option value="Admin">Admin</option>
//               </select>  */}
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />

//               {error && (
//                 <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
//               )}

//               <button type="submit" style={styles.button} disabled={loading}>
//                 {loading ? 'Registering...' : 'Register'}
//               </button>
//             </form>

//             <p style={styles.loginLink}>
//               {/* Already have an account?{' '}
//               <a href="/login" style={styles.loginAnchor}>Login here</a> */}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
















"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios" // ✅ Important!

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Viewer",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false) // ✅ Added
  const [error, setError] = useState("") // ✅ Added

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        name: formData.fullName, // ✅ Corrected
        email: formData.email,
        password: formData.password,
        role: formData.role.toLowerCase(), // optional: lowercase for consistency
      })

      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/login")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  // ---------- All styles defined below ----------
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
      height: 40,
    },
    loginBtn: {
      backgroundColor: "#805ad5",
      color: "#fff",
      border: "none",
      padding: "8px 18px",
      borderRadius: 6,
      fontWeight: 500,
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
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: 10,
      color: "#fff",
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
    rightPanel: {
      width: "50%",
      backgroundColor: "#fff",
      padding: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    formWrapper: {
      width: "100%",
      maxWidth: 400,
    },
    formTitle: {
      fontSize: "1.8rem",
      marginBottom: 10,
    },
    idataColor: {
      color: "#805ad5",
    },
    formDesc: {
      marginBottom: 30,
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#805ad5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      marginTop: 10,
    },
    loginLink: {
      marginTop: 15,
      textAlign: "center",
    },
    loginAnchor: {
      color: "#805ad5",
      textDecoration: "none",
      fontWeight: 500,
    },
  }

  //   return (
  //     <div style={styles.container}>
  //       {/* Header */}
  //       <div style={styles.header}>
  //         <img src="/gBitLogo.png" alt="GBIT Logo" style={styles.logo} />
  //         <button style={styles.loginBtn} onClick={() => navigate('/login')}>
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
  //         <div style={styles.rightPanel}>
  //           <div style={styles.formWrapper}>
  //             <h2 style={styles.formTitle}>
  //               Welcome to <span style={styles.idataColor}>iData!</span>
  //             </h2>
  //             <p style={styles.formDesc}>Sign Up to Get Started</p>

  //             <form onSubmit={handleSubmit}>
  //               <input
  //                 type="text"
  //                 name="fullName"
  //                 placeholder="Full Name"
  //                 value={formData.fullName}
  //                 onChange={handleChange}
  //                 style={styles.input}
  //                 required
  //               />
  //               <input
  //                 type="email"
  //                 name="email"
  //                 placeholder="Email Address"
  //                 value={formData.email}
  //                 onChange={handleChange}
  //                 style={styles.input}
  //                 required
  //               />
  //               <select
  //                 name="role"
  //                 value={formData.role}
  //                 onChange={handleChange}
  //                 style={styles.input}
  //                 required
  //               >
  //                 <option value="Viewer">Viewer</option>
  //                 <option value="Admin">Admin</option>
  //               </select>
  //               <input
  //                 type="password"
  //                 name="password"
  //                 placeholder="Password"
  //                 value={formData.password}
  //                 onChange={handleChange}
  //                 style={styles.input}
  //                 required
  //               />
  //               <input
  //                 type="password"
  //                 name="confirmPassword"
  //                 placeholder="Confirm Password"
  //                 value={formData.confirmPassword}
  //                 onChange={handleChange}
  //                 style={styles.input}
  //                 required
  //               />
  //               <button type="submit" style={styles.button}>Register</button>
  //             </form>

  //             <p style={styles.loginLink}>
  //               Already have an account?{' '}
  //               <a href="/login" style={styles.loginAnchor}>Login here</a>
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src="/gBitLogo.png" alt="GBIT Logo" style={styles.logo} />
        <button style={styles.loginBtn} onClick={() => navigate("/login")}>
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
        <div style={styles.rightPanel}>
          <div style={styles.formWrapper}>
            <h2 style={styles.formTitle}>
              Welcome to <span style={styles.idataColor}>iData!</span>
            </h2>
            <p style={styles.formDesc}>Sign Up to Get Started</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
              {/* <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
              </select>  */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                required
              />

              {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p style={styles.loginLink}>
              {/* Already have an account?{' '}
              <a href="/login" style={styles.loginAnchor}>Login here</a> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage


