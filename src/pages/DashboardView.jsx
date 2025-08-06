// import React from 'react'
// import TopBar from '../component/TopBar'
// import WorkstreamGrid from '../component/WorkstreamGrid'
// import '../styles/dashboard.css'
// import UserTable from '../component/UserTable'

// const AdminDashboard = () => {
//   return (
//     <div style={{ backgroundColor: "#f8f9fa" }}>
//   <TopBar />
//    <div style={wrapperStyle}>
//     <div className="dashboard-container">

//       <div className="dashboard-content">
//         <div className="tabs">
//           <span className="tab active">Workstreams</span>
//           <span className="tab">New Record</span>
//         </div>

//         <div className="workstreams-header">
//           <h2>Workstreams</h2>
//           <div className="action-buttons">
//             <button className="btn">Export</button>
//             <button className="btn">Filter</button>
//             <button className="btn primary">+ Add New</button>
//           </div>
//         </div>
//         </div>

//         <WorkstreamGrid />
//         <UserTable />

//         <div className="footer-note">
//           <span>2,490 users</span>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }
// const wrapperStyle = {

//   justifyContent: "center",
//   alignItems: "center",
//   minHeight: "100vh",
//   width: "100vw",
//   backgroundColor: "#f8f9fa",
//   padding: "30px 20px",
//   boxSizing: "border-box",
// }



// export default AdminDashboard

// "use client"
// import { useState, useEffect } from "react"
// import { Search, User, Monitor, Edit } from "lucide-react"
// import WorkstreamDetail from "./WorkstreamDetail1"

// // Inline styles object
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f9fafb",
//       width: '100vw',
//   },
//   header: {
//     backgroundColor: "white",
//     borderBottom: "1px solid #e5e7eb",
//     padding: "16px 24px",
//   },
//   headerContent: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   headerLeft: {
//     display: "flex",
//     alignItems: "center",
//     gap: "32px",
//   },
//   logo: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },
//   logoIcon: {
//     width: "32px",
//     height: "32px",
//     backgroundColor: "#3b82f6",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//     fontWeight: "bold",
//     fontSize: "14px",
//   },
//   logoText: {
//     fontSize: "20px",
//     fontWeight: "600",
//     color: "#111827",
//   },
//   nav: {
//     display: "flex",
//     alignItems: "center",
//     gap: "24px",
//   },
//   navButton: {
//     background: "transparent",
//     border: "none",
//     padding: "8px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "500",
//     fontSize: "14px",
//   },
//   navButtonActive: {
//     color: "#2563eb",
//   },
//   navButtonInactive: {
//     color: "#6b7280",
//   },
//   headerRight: {
//     display: "flex",
//     alignItems: "center",
//     gap: "16px",
//   },
//   searchContainer: {
//     position: "relative",
//   },
//   searchIcon: {
//     position: "absolute",
//     left: "12px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     color: "#9ca3af",
//     width: "16px",
//     height: "16px",
//   },
//   searchInput: {
//     paddingLeft: "40px",
//     padding: "8px 12px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     width: "256px",
//     fontSize: "14px",
//     outline: "none",
//   },
//   avatar: {
//     width: "32px",
//     height: "32px",
//     backgroundColor: "#e5e7eb",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   main: {
//     padding: "24px",
//     maxWidth: "1280px",
//     margin: "0 auto",
//   },
//   section: {
//     marginBottom: "32px",
//   },
//   sectionTitle: {
//     fontSize: "18px",
//     fontWeight: "600",
//     color: "#111827",
//     marginBottom: "16px",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "16px",
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: "8px",
//     boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//     border: "1px solid #e5e7eb",
//     cursor: "pointer",
//     transition: "box-shadow 0.2s",
//   },
//   cardContent: {
//     padding: "24px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   cardIcon: {
//     width: "48px",
//     height: "48px",
//     borderRadius: "8px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "12px",
//   },
//   cardTitle: {
//     fontWeight: "500",
//     fontSize: "14px",
//   },
//   table: {
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: "8px",
//     overflow: "hidden",
//     boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//   },
//   tableHeader: {
//     backgroundColor: "#f9fafb",
//   },
//   tableHeaderCell: {
//     padding: "12px 24px",
//     textAlign: "left",
//     fontSize: "12px",
//     fontWeight: "500",
//     color: "#374151",
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//   },
//   tableRow: {
//     borderBottom: "1px solid #f3f4f6",
//   },
//   tableCell: {
//     padding: "16px 24px",
//     fontSize: "14px",
//     whiteSpace: "nowrap",
//   },
//   badge: {
//     display: "inline-flex",
//     alignItems: "center",
//     padding: "2px 10px",
//     borderRadius: "9999px",
//     fontSize: "12px",
//     fontWeight: "500",
//   },
//   button: {
//     background: "transparent",
//     border: "none",
//     padding: "4px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//    logoImage: {
//     height: "32px",
//     width: "auto",
//     objectFit: "contain",
//   },
// }

// // Color variants for cards
// const cardVariants = {
//   blue: { backgroundColor: "#dbeafe", color: "#1d4ed8" },
//   purple: { backgroundColor: "#e9d5ff", color: "#7c3aed" },
//   green: { backgroundColor: "#dcfce7", color: "#16a34a" },
// }

// // Color variants for badges
// const badgeVariants = {
//   green: { backgroundColor: "#dcfce7", color: "#16a34a" },
//   yellow: { backgroundColor: "#fef3c7", color: "#d97706" },
//   red: { backgroundColor: "#fee2e2", color: "#dc2626" },
//   gray: { backgroundColor: "#f3f4f6", color: "#374151" },
// }

// const quickAccessData = [
//   { id: 1, title: "Workstream 01", variant: "blue", iconColor: "#3b82f6" },
//   { id: 2, title: "Workstream 02", variant: "purple", iconColor: "#8b5cf6" },
//   { id: 3, title: "Workstream 03", variant: "purple", iconColor: "#8b5cf6" },
//   { id: 4, title: "Workstream 04", variant: "green", iconColor: "#10b981" },
// ]



// export default function DashboardView() {
//     const [searchQuery, setSearchQuery] = useState("")
//   const [recentRecordsData, setRecentRecordsData] = useState([])
//     const [currentView, setCurrentView] = useState("dashboard")
//   const [selectedWorkstream, setSelectedWorkstream] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   // Fetch workstream data from API
//   useEffect(() => {
//     const fetchWorkstreams = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("http://localhost:5000/api/open/workstream")

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         console.log("API Response:", data) // Debug log to see the actual structure

//         // Handle different possible response structures
//         let workstreams = []

//         if (Array.isArray(data)) {
//           // If data is directly an array
//           workstreams = data
//         } else if (data && Array.isArray(data.data)) {
//           // If data is wrapped in an object with a 'data' property
//           workstreams = data.data
//         } else if (data && Array.isArray(data.workstreams)) {
//           // If data is wrapped in an object with a 'workstreams' property
//           workstreams = data.workstreams
//         } else if (data && typeof data === "object") {
//           // If it's a single object, wrap it in an array
//           workstreams = [data]
//         } else {
//           throw new Error("Invalid data format received from API")
//         }

//         // Transform API data to match table structure
//         const transformedData = workstreams.map((item) => ({
//           id: item.id,
//           reviewsBy: item.owner_name || "Unknown",
//           websiteUrl: item.registration_site || "N/A",
//           accessibility: item.accessibility === "Yes" ? "high" : item.accessibility === "No" ? "low" : "medium",
//           reviewDate: item.review_date ? new Date(item.review_date).toLocaleDateString() : "N/A",
//           addedIn: `${item.review_month} ${item.review_year}` || "N/A",
//           status: item.a_checks ? "Complete" : "Not Started",
//           // Additional data that might be useful
//           websiteType: item.website_type,
//           comments: item.comments,
//           websiteOperator: item.website_operator,
//           reviewTraffic: item.review_traffic,
//           conditionalResponse: item.conditional_response,
//           thirdPartyContent: item.third_party_content,
//           images: item.images || [],
//           createdAt: item.created_at,
//           calculatedFriday: item.calculated_friday,
//         }))

//         setRecentRecordsData(transformedData)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching workstreams:", err)
//         setError(`Failed to load workstream data: ${err.message}`)
//         setRecentRecordsData([]) // Set empty array instead of fallback data
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchWorkstreams()
//   }, [])

//   const getAccessibilityBadge = (level) => {
//     const badgeStyle = { ...styles.badge }
//     switch (level) {
//       case "high":
//         return <span style={{ ...badgeStyle, ...badgeVariants.green }}>High</span>
//       case "medium":
//         return <span style={{ ...badgeStyle, ...badgeVariants.yellow }}>Medium</span>
//       case "low":
//         return <span style={{ ...badgeStyle, ...badgeVariants.red }}>Low</span>
//       default:
//         return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{level}</span>
//     }
//   }

//   const getStatusBadge = (status) => {
//     const badgeStyle = { ...styles.badge }
//     switch (status) {
//       case "Complete":
//         return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Complete</span>
//       case "Not Started":
//         return <span style={{ ...badgeStyle, ...badgeVariants.red }}>Not Started</span>
//       default:
//         return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{status}</span>
//     }
//   }

//   // return (
//   //   <div style={styles.container}>
//   //     {/* Header */}
//   //     <header style={styles.header}>
//   //       <div style={styles.headerContent}>
//   //         <div style={styles.headerLeft}>
//   //            <div style={styles.logo}>
//   //             <img src="/gBitLogo.png" alt="Gbit Logo" style={styles.logoImage} />
//   //           </div>

//   //           <nav style={styles.nav}>
//   //             <button
//   //               style={{
//   //                 ...styles.navButton,
//   //                 ...styles.navButtonActive,
//   //               }}
//   //             >
//   //               WORKSTREAM
//   //             </button>
//   //             <button
//   //               style={{
//   //                 ...styles.navButton,
//   //                 ...styles.navButtonInactive,
//   //               }}
//   //             >
//   //               NEW RECORD
//   //             </button>
//   //           </nav>
//   //         </div>

//   //         <div style={styles.headerRight}>
//   //           <div style={styles.searchContainer}>
//   //             <Search style={styles.searchIcon} />
//   //             <input
//   //               style={styles.searchInput}
//   //               placeholder="Search..."
//   //               value={searchQuery}
//   //               onChange={(e) => setSearchQuery(e.target.value)}
//   //             />
//   //           </div>
//   //           <div style={styles.avatar}>
//   //             <User size={16} />
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </header>

//   //     {/* Main Content */}
//   //     <main style={styles.main}>
//   //       {/* Quick Access Section */}
//   //       <section style={styles.section}>
//   //         <h2 style={styles.sectionTitle}>Quick Access</h2>
//   //         <div style={styles.grid}>
//   //           {quickAccessData.map((item) => (
//   //             <div
//   //               key={item.id}
//   //               style={{
//   //                 ...styles.card,
//   //                 ...cardVariants[item.variant],
//   //               }}
//   //               onMouseEnter={(e) => {
//   //                 e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
//   //               }}
//   //               onMouseLeave={(e) => {
//   //                 e.target.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
//   //               }}
//   //             >
//   //               <div style={styles.cardContent}>
//   //                 <div
//   //                   style={{
//   //                     ...styles.cardIcon,
//   //                     backgroundColor: item.iconColor,
//   //                   }}
//   //                 >
//   //                   <Monitor size={24} color="white" />
//   //                 </div>
//   //                 <h3 style={styles.cardTitle}>{item.title}</h3>
//   //               </div>
//   //             </div>
//   //           ))}
//   //         </div>
//   //       </section>

//   //       {/* Recent Records Section */}
//   //       <section>
//   //         <h2 style={styles.sectionTitle}>Recent Records</h2>
//   //         <div style={styles.table}>
//   //           <table style={{ width: "100%" }}>
//   //             <thead style={styles.tableHeader}>
//   //               <tr>
//   //                 <th style={styles.tableHeaderCell}>Reviews By</th>
//   //                 <th style={styles.tableHeaderCell}>Website URL</th>
//   //                 <th style={styles.tableHeaderCell}>Accessibility</th>
//   //                 <th style={styles.tableHeaderCell}>Review Date</th>
//   //                 <th style={styles.tableHeaderCell}>Added In</th>
//   //                 <th style={styles.tableHeaderCell}>Status</th>
//   //                 <th style={styles.tableHeaderCell}>Edit</th>
//   //               </tr>
//   //             </thead>
//   //             <tbody>
//   //               {recentRecordsData.map((record) => (
//   //                 <tr
//   //                   key={record.id}
//   //                   style={styles.tableRow}
//   //                   onMouseEnter={(e) => {
//   //                     e.target.style.backgroundColor = "#f9fafb"
//   //                   }}
//   //                   onMouseLeave={(e) => {
//   //                     e.target.style.backgroundColor = "transparent"
//   //                   }}
//   //                 >
//   //                   <td style={{ ...styles.tableCell, fontWeight: "500" }}>{record.reviewsBy}</td>
//   //                   <td style={{ ...styles.tableCell, color: "#2563eb" }}>{record.websiteUrl}</td>
//   //                   <td style={styles.tableCell}>{getAccessibilityBadge(record.accessibility)}</td>
//   //                   <td style={styles.tableCell}>{record.reviewDate}</td>
//   //                   <td style={styles.tableCell}>{record.addedIn}</td>
//   //                   <td style={styles.tableCell}>{getStatusBadge(record.status)}</td>
//   //                   <td style={styles.tableCell}>
//   //                     <button
//   //                       style={{
//   //                         ...styles.button,
//   //                         width: "32px",
//   //                         height: "32px",
//   //                       }}
//   //                       onMouseEnter={(e) => {
//   //                         e.target.style.backgroundColor = "#f3f4f6"
//   //                       }}
//   //                       onMouseLeave={(e) => {
//   //                         e.target.style.backgroundColor = "transparent"
//   //                       }}
//   //                     >
//   //                       <Edit size={16} />
//   //                     </button>
//   //                   </td>
//   //                 </tr>
//   //               ))}
//   //             </tbody>
//   //           </table>
//   //         </div>
//   //       </section>
//   //     </main>
//   //   </div>
//   // )

//    return (
//     <div style={styles.container}>
//       {/* Header */}
//       <header style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.headerLeft}>
//             <div style={styles.logo}>
//               <img src="/gBitLogo.png" alt="Gbit Logo" style={styles.logoImage} />
//             </div>

//             <nav style={styles.nav}>
//               <button
//                 style={{
//                   ...styles.navButton,
//                   ...styles.navButtonActive,
//                 }}
//               >
//                 WORKSTREAM
//               </button>
//               <button
//                 style={{
//                   ...styles.navButton,
//                   ...styles.navButtonInactive,
//                 }}
//               >
//                 NEW RECORD
//               </button>
//             </nav>
//           </div>

//           <div style={styles.headerRight}>
//             <div style={styles.searchContainer}>
//               <Search style={styles.searchIcon} />
//               <input
//                 style={styles.searchInput}
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div style={styles.avatar}>
//               <User size={16} />
//             </div>
//           </div>
//         </div>
//       </header>

//       {currentView === "dashboard" && (
//         <>
//           {/* All existing main content goes here */}
//           <main style={styles.main}>
//             {/* Quick Access Section */}
//             <section style={styles.section}>
//               <h2 style={styles.sectionTitle}>Quick Access</h2>
//               <div style={styles.grid}>
//                 {quickAccessData.map((item) => (
//                   <div
//                     key={item.id}
//                     style={{
//                       ...styles.card,
//                       ...cardVariants[item.variant],
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
//                     }}
//                     onClick={() => {
//                       setSelectedWorkstream(item.id.toString().padStart(2, "0"))
//                       setCurrentView("workstream")
//                     }}
//                   >
//                     <div style={styles.cardContent}>
//                       <div
//                         style={{
//                           ...styles.cardIcon,
//                           backgroundColor: item.iconColor,
//                         }}
//                       >
//                         <Monitor size={24} color="white" />
//                       </div>
//                       <h3 style={styles.cardTitle}>{item.title}</h3>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Recent Records Section */}
//             <section>
//               <h2 style={styles.sectionTitle}>Recent Records</h2>
//               <div style={styles.table}>
//                 {loading ? (
//                   <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
//                     Loading workstream data...
//                   </div>
//                 ) : error ? (
//                   <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>
//                 ) : (
//                   <table style={{ width: "100%" }}>
//                     <thead style={styles.tableHeader}>
//                       <tr>
//                         <th style={styles.tableHeaderCell}>Owner Name</th>
//                         <th style={styles.tableHeaderCell}>Registration Site</th>
//                         <th style={styles.tableHeaderCell}>Accessibility</th>
//                         <th style={styles.tableHeaderCell}>Review Date</th>
//                         <th style={styles.tableHeaderCell}>Review Period</th>
//                         <th style={styles.tableHeaderCell}>Status</th>
//                         <th style={styles.tableHeaderCell}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {recentRecordsData.length === 0 ? (
//                         <tr>
//                           <td colSpan="7" style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
//                             No workstream data available
//                           </td>
//                         </tr>
//                       ) : (
//                         recentRecordsData.map((record) => (
//                           <tr
//                             key={record.id}
//                             style={styles.tableRow}
//                             onMouseEnter={(e) => {
//                               e.target.style.backgroundColor = "#f9fafb"
//                             }}
//                             onMouseLeave={(e) => {
//                               e.target.style.backgroundColor = "transparent"
//                             }}
//                           >
//                             <td style={{ ...styles.tableCell, fontWeight: "500" }}>{record.reviewsBy}</td>
//                             <td style={{ ...styles.tableCell, color: "#2563eb" }}>
//                               {record.websiteUrl.length > 30
//                                 ? `${record.websiteUrl.substring(0, 30)}...`
//                                 : record.websiteUrl}
//                             </td>
//                             <td style={styles.tableCell}>{getAccessibilityBadge(record.accessibility)}</td>
//                             <td style={styles.tableCell}>{record.reviewDate}</td>
//                             <td style={styles.tableCell}>{record.addedIn}</td>
//                             <td style={styles.tableCell}>{getStatusBadge(record.status)}</td>
//                             <td style={styles.tableCell}>
//                               <div style={{ display: "flex", gap: "8px" }}>
//                                 <button
//                                   style={{
//                                     ...styles.button,
//                                     width: "32px",
//                                     height: "32px",
//                                   }}
//                                   onMouseEnter={(e) => {
//                                     e.target.style.backgroundColor = "#f3f4f6"
//                                   }}
//                                   onMouseLeave={(e) => {
//                                     e.target.style.backgroundColor = "transparent"
//                                   }}
//                                   onClick={() => {
//                                     console.log("Edit record:", record)
//                                   }}
//                                   title="Edit Record"
//                                 >
//                                   <Edit size={16} />
//                                 </button>
//                                 {record.images && record.images.length > 0 && (
//                                   <button
//                                     style={{
//                                       ...styles.button,
//                                       width: "32px",
//                                       height: "32px",
//                                     }}
//                                     onMouseEnter={(e) => {
//                                       e.target.style.backgroundColor = "#f3f4f6"
//                                     }}
//                                     onMouseLeave={(e) => {
//                                       e.target.style.backgroundColor = "transparent"
//                                     }}
//                                     onClick={() => {
//                                       console.log("View images:", record.images)
//                                     }}
//                                     title={`View ${record.images.length} image(s)`}
//                                   >
//                                     📷
//                                   </button>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </section>
//           </main>
//         </>
//       )}
//       {currentView === "workstream" && (
//         <WorkstreamDetail workstreamId={selectedWorkstream} onBack={() => setCurrentView("dashboard")} />
//       )}
//     </div>
//   )
// }







"use client"

import { useState, useEffect } from "react"
import { Search, User, Monitor, Edit } from "lucide-react"
import WorkstreamDetail1 from "./WorkstreamDetail1"
import WorkstreamDetail2 from "./WorkstreamDetail2"
import WorkstreamDetail3 from "./WorkstreamDetails3"
import WorkstreamDetail4 from "./WorkstreamDetails4"
import { useNavigate, useLocation } from "react-router-dom";

// Same styles as before...
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    width:"100vw"
  },
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #e5e7eb",
    padding: "16px 24px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoImage: {
    height: "32px",
    width: "auto",
    objectFit: "contain",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  navButton: {
    background: "transparent",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
  },
 
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    width: "16px",
    height: "16px",
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: "44px",
    paddingRight: "12px",
    padding: "10px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    width: "280px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#f9fafb",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  avatar: {
    width: "32px",
    height: "32px",
    backgroundColor: "#e5e7eb",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    padding: "24px",
    maxWidth: "1280px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
     maxWidth: "400px", 
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "box-shadow 0.2s",
  },
  cardContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  cardIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  },
  cardTitle: {
    fontWeight: "500",
    fontSize: "14px",
  },
  table: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
  },
  tableHeaderCell: {
    padding: "12px 24px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "500",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tableRow: {
    borderBottom: "1px solid #f3f4f6",
  },
  tableCell: {
    padding: "16px 24px",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 10px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "500",
  },
  button: {
    background: "transparent",
    border: "none",
    padding: "4px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
      navButtonActive: {
      backgroundColor: "#fff",
      color: "#0000FF",
    },
    navButtonInactive: {
      backgroundColor: "#eee",
      color: "#999",
    },
  
}

// Color variants for cards
const cardVariants = {
  blue: { backgroundColor: "#dbeafe", color: "#1d4ed8" },
  purple: { backgroundColor: "#e9d5ff", color: "#7c3aed" },
  green: { backgroundColor: "#dcfce7", color: "#16a34a" },
}

// Color variants for badges
const badgeVariants = {
  green: { backgroundColor: "#dcfce7", color: "#16a34a" },
  yellow: { backgroundColor: "#fef3c7", color: "#d97706" },
  red: { backgroundColor: "#fee2e2", color: "#dc2626" },
  gray: { backgroundColor: "#f3f4f6", color: "#374151" },
}

const quickAccessData = [
  { id: 1, title: "Workstream 01", variant: "blue", iconColor: "#3b82f6" },
  // { id: 2, title: "Workstream 02", variant: "purple", iconColor: "#8b5cf6" },
  // { id: 3, title: "Workstream 03", variant: "purple", iconColor: "#8b5cf6" },
  // { id: 4, title: "Workstream 04", variant: "green", iconColor: "#10b981" },
]

export default function DashboardView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentRecordsData, setRecentRecordsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentView, setCurrentView] = useState("dashboard")
    const navigate = useNavigate();
  // const location = useLocation();

  const location = useLocation();
const currentPath = location.pathname;

  //  const isWorkstream = location.pathname === "/dashboardview";
  // const isNewRecord = location.pathname === "/new-record";

  const isWorkstream = currentPath === "/dashboardview";
const isNewRecord = currentPath === "/new-record";

  // Fetch workstream data from API
  // useEffect(() => {
  //   const fetchWorkstreams = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await fetch("http://localhost:5000/api/open/workstream")

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`)
  //       }

  //       const data = await response.json()
  //       let workstreams = []

  //       if (Array.isArray(data)) {
  //         workstreams = data
  //       } else if (data && Array.isArray(data.data)) {
  //         workstreams = data.data
  //       } else if (data && Array.isArray(data.workstreams)) {
  //         workstreams = data.workstreams
  //       } else if (data && typeof data === "object") {
  //         workstreams = [data]
  //       } else {
  //         throw new Error("Invalid data format received from API")
  //       }

  //       // Transform API data to match table structure
  //       const transformedData = workstreams.map((item) => ({
  //         id: item.id,
  // reviewsBy: item.owner_name || "Unknown",
  // websiteUrl: item.website_url || "N/A",
  // accessibility: item.accessibility
  //   ? item.accessibility.toLowerCase() === "yes"
  //     ? "Yes"
  //     : item.accessibility.toLowerCase() === "no"
  //     ? "No"
  //     : "N/A"
  //   : "N/A",
  // reviewDate: item.review_date ? new Date(item.review_date).toLocaleDateString() : "N/A",
  // addedIn: item.review_month && item.review_year ? `${item.review_month} ${item.review_year}` : "N/A",
  //  status:
  //   item.review_status === "completed"
  //     ? "Complete"
  //     : item.review_status === "not-completed"
  //     ? "Not Completed"
  //     : "Unknown",
  // websiteType: item.website_type || "N/A",
  // comments: item.comments || "N/A",
  // websiteOperator: item.website_operator || "N/A",
  // reviewTraffic: item.review_traffic || "N/A",
  // conditionalResponse: item.conditional_response,
  // thirdPartyContent: item.third_party_content || "N/A",
  // images: item.images || [],
  // createdAt: item.created_at,
  // calculatedFriday: item.calculated_friday,
  //       }))

  //       setRecentRecordsData(transformedData)
  //       setError(null)
  //     } catch (err) {
  //       console.error("Error fetching workstreams:", err)
  //       setError(`Failed to load workstream data: ${err.message}`)
  //       setRecentRecordsData([])
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchWorkstreams()
  // }, [])

  useEffect(() => {
  const fetchWorkstreams = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let workstreams = [];

      if (Array.isArray(data)) {
        workstreams = data;
      } else if (data && Array.isArray(data.data)) {
        workstreams = data.data;
      } else if (data && Array.isArray(data.workstreams)) {
        workstreams = data.workstreams;
      } else if (data && typeof data === "object") {
        workstreams = [data];
      } else {
        throw new Error("Invalid data format received from API");
      }

      const transformedData = workstreams.map((item) => ({
        id: item.id,
        reviewsBy: item.owner_name || "Unknown",
        websiteUrl: item.website_url || "N/A",
        accessibility: item.accessibility
          ? item.accessibility.toLowerCase() === "yes"
            ? "Yes"
            : item.accessibility.toLowerCase() === "no"
            ? "No"
            : "N/A"
          : "N/A",
        reviewDate: item.review_date ? new Date(item.review_date).toLocaleDateString() : "N/A",
        addedIn:
          item.review_month && item.review_year
            ? `${item.review_month} ${item.review_year}`
            : "N/A",
        status:
          item.review_status === "completed"
            ? "Complete"
            : item.review_status === "not-completed"
            ? "Not Completed"
            : "Unknown",
        websiteType: item.website_type || "N/A",
        comments: item.comments || "N/A",
        websiteOperator: item.website_operator || "N/A",
        reviewTraffic: item.review_traffic || "N/A",
        conditionalResponse: item.conditional_response,
        thirdPartyContent: item.third_party_content || "N/A",
        images: item.images || [],
        createdAt: item.created_at,
        calculatedFriday: item.calculated_friday,
      }));

      setRecentRecordsData(transformedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching workstreams:", err);
      setError(`Failed to load workstream data: ${err.message}`);
      setRecentRecordsData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchWorkstreams();
}, []);


  const getAccessibilityBadge = (level) => {
    const badgeStyle = { ...styles.badge }
    switch (level) {
      case "Yes":
        return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Yes</span>
      case "No":
        return <span style={{ ...badgeStyle, ...badgeVariants.yellow }}>No</span>
      case "N/A":
        return <span style={{ ...badgeStyle, ...badgeVariants.red }}>N/A</span>
      default:
        return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{level}</span>
    }
  }

  const getStatusBadge = (status) => {
    const badgeStyle = { ...styles.badge }
    switch (status) {
      case "Complete":
        return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Complete</span>
      case "Not Completed":
        return <span style={{ ...badgeStyle, ...badgeVariants.red }}>Not Complete</span>
      default:
        return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{status}</span>
    }
  }

  const renderWorkstreamDetail = () => {
    switch (currentView) {
      case "workstream1":
        return <WorkstreamDetail1 onBack={() => setCurrentView("dashboard")} />
      case "workstream2":
        return <WorkstreamDetail2 onBack={() => setCurrentView("dashboard")} />
      case "workstream3":
        return <WorkstreamDetail3 onBack={() => setCurrentView("dashboard")} />
      case "workstream4":
        return <WorkstreamDetail4 onBack={() => setCurrentView("dashboard")} />
      default:
        return null
    }
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>
              <img src="/gBitLogo.png" alt="Gbit Logo" style={styles.logoImage} />
            </div>

            {/* <nav style={styles.nav}>
              <button style={{ ...styles.navButton, ...styles.navButtonActive }}>WORKSTREAM</button>
              <button style={{ ...styles.navButton, ...styles.navButtonInactive }}>NEW RECORD</button>
            </nav> */}
                  <nav style={styles.nav}>
                {    console.log("currentPath:", currentPath)}

            <button
              style={{
                ...styles.navButton,
                ...(isWorkstream ? styles.navButtonActive : styles.navButtonInactive),
              }}
              onClick={() => navigate("/dashboardview")}
            >
              WORKSTREAM
            </button>
            <button
              style={{
                ...styles.navButton,
                ...(isNewRecord ? styles.navButtonActive : styles.navButtonInactive),
              }}
              onClick={() => navigate("/new-record")}
            >
              NEW RECORD
            </button>
          </nav>
          </div>

          <div style={styles.headerRight}>
            {/* <div style={styles.searchContainer}>
              <Search style={styles.searchIcon} />
              <input
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}
             <div style={styles.searchContainer}>
              {/* <Search style={styles.searchIcon} /> */}
              <input
                style={styles.searchInput}
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "white"
                  e.target.style.borderColor = "#3b82f6"
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "#f9fafb"
                  e.target.style.borderColor = "#e5e7eb"
                  e.target.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                }}
              />
            </div>
            <div style={styles.avatar}>
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      {currentView === "dashboard" && (
        <main style={styles.main}>
          {/* Quick Access Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Quick Access</h2>
            <div style={styles.grid}>
              {quickAccessData.map((item) => (
                <div
                  key={item.id}
                style={{
  ...styles.card,
  ...cardVariants[item.variant],

}}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
                  }}
                  onClick={() => {
                    setCurrentView(`workstream${item.id}`)
                  }}
                >
                  <div style={styles.cardContent}>
                    <div
                      style={{
                        ...styles.cardIcon,
                        backgroundColor: item.iconColor,
                      }}
                    >
                      <Monitor size={24} color="white" />
                    </div>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Records Section */}
          <section>
            <h2 style={styles.sectionTitle}>Recent Records</h2>
            <div style={styles.table}>
              {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading workstream data...</div>
              ) : error ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>
              ) : (
                <table style={{ width: "100%" }}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Reviews By</th>
                      <th style={styles.tableHeaderCell}>Website Url</th>
                      <th style={styles.tableHeaderCell}>Accessibility</th>
                      <th style={styles.tableHeaderCell}>Review Date</th>
                      <th style={styles.tableHeaderCell}>Added In</th>
                      <th style={styles.tableHeaderCell}>Status</th>
                      <th style={styles.tableHeaderCell}>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRecordsData.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                          No workstream data available
                        </td>
                      </tr>
                    ) : (
                      recentRecordsData.map((record) => (
                        <tr key={record.id} style={styles.tableRow}>
                          <td style={{ ...styles.tableCell, fontWeight: "500" }}>{record.reviewsBy}</td>
                          <td style={{ ...styles.tableCell, color: "#2563eb" }}>
                            {record.websiteUrl.length > 30
                              ? `${record.websiteUrl.substring(0, 30)}...`
                              : record.websiteUrl}
                          </td>
                          <td style={styles.tableCell}>{getAccessibilityBadge(record.accessibility)}</td>
                          <td style={styles.tableCell}>{record.reviewDate}</td>
                          <td style={styles.tableCell}>{record.addedIn}</td>
                          <td style={styles.tableCell}>{getStatusBadge(record.status)}</td>
                          <td style={styles.tableCell}>
                            <button style={{ ...styles.button, width: "32px", height: "32px" }}>
                              <Edit size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      )}

      {/* Render specific workstream detail components */}
      {currentView !== "dashboard" && renderWorkstreamDetail()}
    </div>
  )
}
