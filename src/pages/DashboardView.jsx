// "use client"

// import { useState, useEffect } from "react"
// import { Search, User, Monitor, Edit } from "lucide-react"
// import { useNavigate, useLocation } from "react-router-dom"

// // Local workstream detail components
// import WorkstreamDetail1 from "./WorkstreamDetail1.jsx"
// import WorkstreamDetail2 from "./WorkstreamDetail2.jsx"
// import WorkstreamDetail3 from "./WorkstreamDetail3.jsx"
// import WorkstreamDetail4 from "./WorkstreamDetails4.jsx"

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f9fafb",
//     width: "100vw",
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
//   logoImage: {
//     height: "32px",
//     width: "auto",
//     objectFit: "contain",
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
//   headerRight: {
//     display: "flex",
//     alignItems: "center",
//     gap: "16px",
//   },
//   searchContainer: {
//     position: "relative",
//   },
//   searchInput: {
//     paddingLeft: "40px",
//     paddingRight: "16px",
//     paddingTop: "8px",
//     paddingBottom: "8px",
//     border: "1px solid #d1d5db",
//     borderRadius: "8px",
//     width: "256px",
//     outline: "none",
//     fontSize: "14px",
//   },
//   searchIcon: {
//     position: "absolute",
//     left: "12px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     color: "#9ca3af",
//   },
//   userIcon: {
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

//   navButtonActive: {
//     backgroundColor: "transparent",
//     color: "#0000FF",
//     borderBottom: "2px solid #0000FF",
//   },
//   navButtonInactive: {
//     backgroundColor: "transparent",
//     color: "#9ca3af",
//     borderBottom: "2px solid transparent",
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

// // Helper: normalize API item -> table row with sortable createdAt
// function normalizeRecord(item) {
//   const accessibility = item?.accessibility
//     ? item.accessibility.toLowerCase() === "yes"
//       ? "Yes"
//       : item.accessibility.toLowerCase() === "no"
//         ? "No"
//         : "N/A"
//     : "N/A"

//   const createdAtRaw = item?.created_at || item?.createdAt || item?.created_on || item?.date || null

//   return {
//     id: item?.id,
//     reviewsBy: item?.owner_name || "Unknown",
//     websiteUrl: item?.website_url || "N/A",
//     accessibility,
//     reviewDate: item?.review_date ? new Date(item.review_date).toLocaleDateString() : "N/A",
//     addedIn: item?.review_month && item?.review_year ? `${item.review_month} ${item.review_year}` : "N/A",
//     status:
//       item?.review_status === "completed"
//         ? "Complete"
//         : item?.review_status === "not-completed"
//           ? "Not Completed"
//           : "Unknown",
//     websiteType: item?.website_type || "N/A",
//     comments: item?.comments || "N/A",
//     websiteOperator: item?.website_operator || "N/A",
//     reviewTraffic: item?.review_traffic || "N/A",
//     conditionalResponse: item?.conditional_response,
//     thirdPartyContent: item?.third_party_content,
//     images: item?.images || [],
//     createdAt: createdAtRaw,
//     _createdAtMs: createdAtRaw ? new Date(createdAtRaw).getTime() : 0,
//     // carry through original source workstream id if present
//     workstreamId: item?._workstreamId ?? null,
//   }
// }

// // Build endpoint for a workstream id
// function endpointFor(base, id) {
//   // Workstream 1 uses "/workstream", others use "/workstream{n}"
//   return id === 1 ? `${base}/api/open/workstream` : `${base}/api/open/workstream${id}`
// }

// export default function DashboardView() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [recentRecordsData, setRecentRecordsData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [currentView, setCurrentView] = useState("dashboard")
//   const [quickAccessApiData, setQuickAccessApiData] = useState([])

//   const navigate = useNavigate()
//   const location = useLocation()
//   const currentPath = location.pathname
//   const isWorkstream = currentPath === "/dashboardview"
//   const isNewRecord = currentPath === "/new-record"

//   useEffect(() => {
//     async function fetchQuickAccessData() {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`)
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
//         const data = await response.json()

//         let workstreamList = []
//         if (Array.isArray(data)) workstreamList = data
//         else if (data && Array.isArray(data.data)) workstreamList = data.data
//         else if (data && Array.isArray(data.workstream_list)) workstreamList = data.workstream_list
//         else if (data && typeof data === "object") workstreamList = [data]
//         else throw new Error("Invalid data format received for workstream-list API")

//         const variants = ["blue", "purple", "green"]
//         const iconColors = ["#3b82f6", "#8b5cf6", "#10b981"]

//         const transformedQuickAccessData = workstreamList.map((item, index) => {
//           const variantIndex = index % variants.length
//           return {
//             id: item.id,
//             title: item.name || `Workstream ${item.id}`,
//             variant: variants[variantIndex],
//             iconColor: iconColors[variantIndex],
//           }
//         })
//         setQuickAccessApiData(transformedQuickAccessData)
//       } catch (err) {
//         console.error("Error fetching quick access workstream list:", err)
//       }
//     }
//     fetchQuickAccessData()
//   }, [])

//   useEffect(() => {
//     let isCancelled = false

//     async function fetchRecentRecords() {
//       try {
//         setLoading(true)
//         setError(null)

//         const base = import.meta.env.VITE_API_BASE_URL

//         // Prefer dynamic IDs from quick access, fallback to [1,2]
//         const ids =
//           quickAccessApiData && quickAccessApiData.length > 0
//             ? quickAccessApiData.map((w) => Number(w.id)).filter(Boolean)
//             : [1, 2]

//         // pair each endpoint with its workstream id
//         const endpoints = ids.map((id) => ({ id, url: endpointFor(base, id) }))

//         const results = await Promise.allSettled(
//           endpoints.map((ep) =>
//             fetch(ep.url)
//               .then((r) => {
//                 if (!r.ok) throw new Error(`HTTP ${r.status}`)
//                 return r.json()
//               })
//               .catch((e) => {
//                 console.error("Fetch failed:", ep.url, e)
//                 return null
//               }),
//           ),
//         )

//         const allItems = []
//         results.forEach((res, idx) => {
//           if (res.status === "fulfilled" && res.value) {
//             const data = res.value
//             const workstreamId = endpoints[idx].id

//             if (Array.isArray(data)) {
//               data.forEach((it) => allItems.push({ ...it, _workstreamId: workstreamId }))
//             } else if (data && Array.isArray(data.data)) {
//               data.data.forEach((it) => allItems.push({ ...it, _workstreamId: workstreamId }))
//             } else if (data && Array.isArray(data.workstreams)) {
//               data.workstreams.forEach((it) => allItems.push({ ...it, _workstreamId: workstreamId }))
//             } else if (data && typeof data === "object") {
//               allItems.push({ ...data, _workstreamId: workstreamId })
//             }
//           }
//         })

//         const transformed = allItems.map((item) => normalizeRecord(item))
//         transformed.sort((a, b) => (b._createdAtMs || 0) - (a._createdAtMs || 0))

//         if (!isCancelled) {
//           setRecentRecordsData(transformed)
//         }
//       } catch (err) {
//         console.error("Error fetching workstreams:", err)
//         if (!isCancelled) setError(`Failed to load workstream data: ${err.message}`)
//       } finally {
//         if (!isCancelled) setLoading(false)
//       }
//     }

//     fetchRecentRecords()
//     return () => {
//       isCancelled = true
//     }
//   }, [quickAccessApiData])

//   const getAccessibilityBadge = (level) => {
//     const badgeStyle = { ...styles.badge }
//     switch (level) {
//       case "Yes":
//         return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Yes</span>
//       case "No":
//         return <span style={{ ...badgeStyle, ...badgeVariants.yellow }}>No</span>
//       case "N/A":
//         return <span style={{ ...badgeStyle, ...badgeVariants.red }}>N/A</span>
//       default:
//         return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{level}</span>
//     }
//   }

//   const getStatusBadge = (status) => {
//     const badgeStyle = { ...styles.badge }
//     switch (status) {
//       case "Complete":
//         return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Complete</span>
//       case "Not Completed":
//         return <span style={{ ...badgeStyle, ...badgeVariants.red }}>Not Complete</span>
//       default:
//         return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{status}</span>
//     }
//   }

//   const renderWorkstreamDetail = () => {
//     console.log("[v0] Current view:", currentView) // Added debug logging to track view changes
//     switch (currentView) {
//       case "workstream1":
//         return <WorkstreamDetail1 onBack={() => setCurrentView("dashboard")} />
//       case "workstream2":
//         return <WorkstreamDetail2 onBack={() => setCurrentView("dashboard")} />
//       case "workstream3":
//         console.log("[v0] Rendering Workstream 3 component") // Added specific debug for workstream3
//         return <WorkstreamDetail3 onBack={() => setCurrentView("dashboard")} />
//       case "workstream4":
//         return <WorkstreamDetail4 onBack={() => setCurrentView("dashboard")} />
//       case "workstream5":
//         console.log("[v0] Rendering Workstream 5 component with dynamic form")
//         return <WorkstreamDetail3 onBack={() => setCurrentView("dashboard")} />
//       default:
//         console.log("[v0] No matching workstream view found for:", currentView) // Added debug for unmatched views
//         return null
//     }
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <header style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.headerLeft}>
//             <div style={styles.logo}>
//               <img
//                 src="/gBitLogo.png"
//                 alt="Gbit Logo"
//                 style={{ ...styles.logoImage, cursor: "pointer" }}
//                 onClick={() => navigate("/dashboardview")}
//               />
//             </div>
//             <nav style={styles.nav}>
//               {console.log("currentPath:", currentPath)}
//               <button
//                 style={{
//                   ...styles.navButton,
//                   ...(isWorkstream ? styles.navButtonActive : styles.navButtonInactive),
//                 }}
//                 onClick={() => navigate("/dashboardview")}
//               >
//                 WORKSTREAM
//               </button>
//               <button
//                 style={{
//                   ...styles.navButton,
//                   ...(isNewRecord ? styles.navButtonActive : styles.navButtonInactive),
//                 }}
//                 onClick={() => navigate("/new-record")}
//               >
//                 NEW RECORD
//               </button>
//             </nav>
//           </div>
//           <div style={styles.headerRight}>
//             <div style={styles.searchContainer}>
//               <Search style={styles.searchIcon} size={16} />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={styles.searchInput}
//               />
//             </div>
//             <div style={styles.userIcon}>
//               <User size={16} style={{ color: "#6b7280" }} />
//             </div>
//           </div>
//         </div>
//       </header>

//       {currentView === "dashboard" ? (
//         <main style={styles.main}>
//           {/* Quick Access */}
//           <section style={styles.section}>
//             <h2 style={styles.sectionTitle}>Quick Access</h2>
//             <div style={styles.grid}>
//               {quickAccessApiData.length === 0 ? (
//                 <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
//                   No quick access workstreams available.
//                 </div>
//               ) : (
//                 quickAccessApiData.map((item) => (
//                   <div
//                     key={item.id}
//                     style={{ ...styles.card, ...cardVariants[item.variant] }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
//                     }}
//                     onClick={() => {
//                       console.log("[v0] Workstream card clicked, setting view to:", `workstream${item.id}`) // Added debug logging for card clicks
//                       setCurrentView(`workstream${item.id}`)
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
//                 ))
//               )}
//             </div>
//           </section>

//           {/* Recent Records */}
//           <section>
//             <h2 style={styles.sectionTitle}>Recent Records</h2>
//             <div style={styles.table}>
//               {loading ? (
//                 <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading workstream data...</div>
//               ) : error ? (
//                 <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>
//               ) : (
//                 <table style={{ width: "100%" }}>
//                   <thead style={styles.tableHeader}>
//                     <tr>
//                       <th style={styles.tableHeaderCell}>ID</th>
//                       <th style={styles.tableHeaderCell}>Workstream</th>
//                       <th style={styles.tableHeaderCell}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentRecordsData.length === 0 ? (
//                       <tr>
//                         <td colSpan="9" style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
//                           No workstream data available
//                         </td>
//                       </tr>
//                     ) : (
//                       recentRecordsData.map((record) => (
//                         <tr key={`${record.id}-${record.createdAt}`} style={styles.tableRow}>
//                           {/* ID */}
//                           <td style={styles.tableCell}>{record.id || "N/A"}</td>

//                           {/* Workstream */}
//                           <td style={styles.tableCell}>{`Workstream ${record.workstreamId ?? "?"}`}</td>

//                           {/* Edit button */}
//                           <td style={styles.tableCell}>
//                             <button
//                               style={{ ...styles.button, width: "32px", height: "32px" }}
//                               onClick={() => {
//                                 const id = record.workstreamId || 1
//                                 setCurrentView(`workstream${id}`)
//                               }}
//                             >
//                               <Edit size={16} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </section>
//         </main>
//       ) : (
//         renderWorkstreamDetail()
//       )}
//     </div>
//   )
// }







// "use client"

// import { useState, useEffect } from "react"
// import { Search, User, Monitor, Edit } from "lucide-react"
// import { useNavigate, useLocation } from "react-router-dom"

// // Local workstream detail components
// import WorkstreamDetail1 from "./WorkstreamDetail1.jsx"
// import WorkstreamDetail2 from "./WorkstreamDetail2.jsx"
// import WorkstreamDetail3 from "./WorkstreamDetail3.jsx"
// import WorkstreamDetail4 from "./WorkstreamDetails4.jsx"

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f9fafb",
//     width: "100vw",
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
//   logoImage: {
//     height: "32px",
//     width: "auto",
//     objectFit: "contain",
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
//   headerRight: {
//     display: "flex",
//     alignItems: "center",
//     gap: "16px",
//   },
//   searchContainer: {
//     position: "relative",
//   },
//   searchInput: {
//     paddingLeft: "40px",
//     paddingRight: "16px",
//     paddingTop: "8px",
//     paddingBottom: "8px",
//     border: "1px solid #d1d5db",
//     borderRadius: "8px",
//     width: "256px",
//     outline: "none",
//     fontSize: "14px",
//   },
//   searchIcon: {
//     position: "absolute",
//     left: "12px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     color: "#9ca3af",
//   },
//   userIcon: {
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

//   navButtonActive: {
//     backgroundColor: "transparent",
//     color: "#0000FF",
//     borderBottom: "2px solid #0000FF",
//   },
//   navButtonInactive: {
//     backgroundColor: "transparent",
//     color: "#9ca3af",
//     borderBottom: "2px solid transparent",
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

// // Helper: normalize API item -> table row with sortable createdAt
// function normalizeRecord(item) {
//   const accessibility = item?.accessibility
//     ? item.accessibility.toLowerCase() === "yes"
//       ? "Yes"
//       : item.accessibility.toLowerCase() === "no"
//         ? "No"
//         : "N/A"
//     : "N/A"

//   const createdAtRaw = item?.created_at || item?.createdAt || item?.created_on || item?.date || null

//   return {
//     id: item?.id,
//     reviewsBy: item?.owner_name || "Unknown",
//     websiteUrl: item?.website_url || "N/A",
//     accessibility,
//     reviewDate: item?.review_date ? new Date(item.review_date).toLocaleDateString() : "N/A",
//     addedIn: item?.review_month && item?.review_year ? `${item.review_month} ${item.review_year}` : "N/A",
//     status:
//       item?.review_status === "completed"
//         ? "Complete"
//         : item?.review_status === "not-completed"
//           ? "Not Completed"
//           : "Unknown",
//     websiteType: item?.website_type || "N/A",
//     comments: item?.comments || "N/A",
//     websiteOperator: item?.website_operator || "N/A",
//     reviewTraffic: item?.review_traffic || "N/A",
//     conditionalResponse: item?.conditional_response,
//     thirdPartyContent: item?.third_party_content,
//     images: item?.images || [],
//     createdAt: createdAtRaw,
//     _createdAtMs: createdAtRaw ? new Date(createdAtRaw).getTime() : 0,
//     // carry through original source workstream id if present
//     workstreamId: item?._workstreamId ?? null,
//   }
// }

// // Build endpoint for a workstream id
// function endpointFor(base, id) {
//   console.log("[v0] Building endpoint for workstream ID:", id)
//   // Workstream 1 uses "/workstream", others use "/workstream{n}"
//   const endpoint = id === 1 ? `${base}/api/open/workstream` : `${base}/api/open/workstream${id}`
//   console.log("[v0] Generated endpoint:", endpoint)
//   return endpoint
// }

// export default function DashboardView() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [recentRecordsData, setRecentRecordsData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [currentView, setCurrentView] = useState("dashboard")
//   const [quickAccessApiData, setQuickAccessApiData] = useState([])

//   const navigate = useNavigate()
//   const location = useLocation()
//   const currentPath = location.pathname
//   const isWorkstream = currentPath === "/dashboardview"
//   const isNewRecord = currentPath === "/new-record"

//   useEffect(() => {
//     async function fetchQuickAccessData() {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`)
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
//         const data = await response.json()

//         let workstreamList = []
//         if (Array.isArray(data)) workstreamList = data
//         else if (data && Array.isArray(data.data)) workstreamList = data.data
//         else if (data && Array.isArray(data.workstream_list)) workstreamList = data.workstream_list
//         else if (data && typeof data === "object") workstreamList = [data]
//         else throw new Error("Invalid data format received for workstream-list API")

//         const variants = ["blue", "purple", "green"]
//         const iconColors = ["#3b82f6", "#8b5cf6", "#10b981"]

//         const transformedQuickAccessData = workstreamList.map((item, index) => {
//           const variantIndex = index % variants.length
//           return {
//             id: item.id,
//             title: item.name || `Workstream ${item.id}`,
//             variant: variants[variantIndex],
//             iconColor: iconColors[variantIndex],
//           }
//         })
//         setQuickAccessApiData(transformedQuickAccessData)
//       } catch (err) {
//         console.error("Error fetching quick access workstream list:", err)
//       }
//     }
//     fetchQuickAccessData()
//   }, [])

//   // useEffect(() => {
//   //   let isCancelled = false

//   //   async function fetchRecentRecords() {
//   //     try {
//   //       setLoading(true)
//   //       setError(null)

//   //       const base = import.meta.env.VITE_API_BASE_URL

//   //       // Prefer dynamic IDs from quick access, fallback to [1,2,3]
//   //       const ids =
//   //         quickAccessApiData && quickAccessApiData.length > 0
//   //           ? quickAccessApiData.map((w) => Number(w.id)).filter(Boolean)
//   //           : [1, 2, 3]

//   //       console.log("[v0] Fetching data for workstream IDs:", ids)

//   //       // pair each endpoint with its workstream id
//   //       const endpoints = ids.map((id) => ({ id, url: endpointFor(base, id) }))
//   //       console.log("[v0] All endpoints to fetch:", endpoints)

//   //       const results = await Promise.allSettled(
//   //         endpoints.map(async (ep) => {
//   //           console.log(`[v0] Starting fetch for workstream ${ep.id} at ${ep.url}`)
//   //           try {
//   //             const response = await fetch(ep.url)
//   //             console.log(`[v0] Workstream ${ep.id} response status:`, response.status)

//   //             if (!response.ok) {
//   //               console.error(`[v0] Workstream ${ep.id} failed with status ${response.status}`)
//   //               throw new Error(`HTTP ${response.status}`)
//   //             }

//   //             const data = await response.json()
//   //             console.log(`[v0] Workstream ${ep.id} data received:`, data)
//   //             return data
//   //           } catch (error) {
//   //             console.error(`[v0] Workstream ${ep.id} fetch error:`, error)
//   //             return null
//   //           }
//   //         }),
//   //       )

//   //       const allItems = []
//   //       results.forEach((res, idx) => {
//   //         const workstreamId = endpoints[idx].id
//   //         console.log(`[v0] Processing result for workstream ${workstreamId}, status: ${res.status}`)

//   //         if (res.status === "fulfilled" && res.value) {
//   //           const data = res.value
//   //           console.log(`[v0] Workstream ${workstreamId} processing data:`, data)

//   //           if (Array.isArray(data)) {
//   //             console.log(`[v0] Workstream ${workstreamId} has ${data.length} items in array format`)
//   //             data.forEach((it) => allItems.push({ ...it, _workstreamId: workstreamId }))
//   //           } else if (data && Array.isArray(data.data)) {
//   //             console.log(`[v0] Workstream ${workstreamId} has ${data.data.length} items in data.data format`)
//   //             data.data.forEach((it) => allItems.push({ ...it, _workstreamId: workstreamId }))
//   //           } else if (data && Array.isArray(data.workstreams)) {
//   //             console.log(
//   //               `[v0] Workstream ${workstreamId} has ${data.workstreams.length} items in data.workstreams format`,
//   //             )
//   //             data.workstreams.forEach((it) => allItems.push({ ...it, _workstreamId: workstreamId }))
//   //           } else if (data && typeof data === "object") {
//   //             console.log(`[v0] Workstream ${workstreamId} has single object format`)
//   //             allItems.push({ ...data, _workstreamId: workstreamId })
//   //           } else {
//   //             console.log(`[v0] Workstream ${workstreamId} data format not recognized:`, typeof data)
//   //           }
//   //         } else {
//   //           console.log(`[v0] Workstream ${workstreamId} result was rejected or null:`, res)
//   //         }
//   //       })

//   //       console.log("[v0] Total items collected from all workstreams:", allItems.length)
//   //       console.log(
//   //         "[v0] Items by workstream:",
//   //         allItems.reduce((acc, item) => {
//   //           acc[item._workstreamId] = (acc[item._workstreamId] || 0) + 1
//   //           return acc
//   //         }, {}),
//   //       )

//   //       const transformed = allItems.map((item) => normalizeRecord(item))
//   //       transformed.sort((a, b) => (b._createdAtMs || 0) - (a._createdAtMs || 0))

//   //       if (!isCancelled) {
//   //         setRecentRecordsData(transformed)
//   //       }
//   //     } catch (err) {
//   //       console.error("[v0] Error fetching workstreams:", err)
//   //       if (!isCancelled) setError(`Failed to load workstream data: ${err.message}`)
//   //     } finally {
//   //       if (!isCancelled) setLoading(false)
//   //     }
//   //   }

//   //   fetchRecentRecords()
//   //   return () => {
//   //     isCancelled = true
//   //   }
//   // }, [quickAccessApiData])


// //   useEffect(() => {
// //   let isCancelled = false

// //   async function fetchRecentRecords() {
// //     try {
// //       setLoading(true)
// //       setError(null)

// //       const base = import.meta.env.VITE_API_BASE_URL

// //       // Use dynamic workstream IDs from quick access, fallback to [1,2,3,4,5]
// //       const ids =
// //         quickAccessApiData && quickAccessApiData.length > 0
// //           ? quickAccessApiData.map((w) => Number(w.id)).filter(Boolean)
// //           : [1, 2, 3, 4, 5]

// //       // Build endpoints
// //       const endpoints = ids.map((id) => ({ id, url: endpointFor(base, id) }))

// //       // Fetch all endpoints
// //       const results = await Promise.allSettled(
// //         endpoints.map(async (ep) => {
// //           try {
// //             const response = await fetch(ep.url)
// //             if (!response.ok) throw new Error(`HTTP ${response.status}`)
// //             return await response.json()
// //           } catch (error) {
// //             console.error(`[v0] Workstream ${ep.id} fetch error:`, error)
// //             return null
// //           }
// //         })
// //       )

// //       const allItems = []

// //       results.forEach((res, idx) => {
// //         const workstreamId = endpoints[idx].id

// //         if (res.status === "fulfilled" && res.value) {
// //           const data = res.value

// //           // Normalize arrays from different API structures
// //           let itemsArray = []

// //           if (Array.isArray(data)) itemsArray = data
// //           else if (Array.isArray(data.data)) itemsArray = data.data
// //           else if (Array.isArray(data.workstreams)) itemsArray = data.workstreams
// //           else if (typeof data === "object") itemsArray = [data]

// //           itemsArray.forEach((item) => allItems.push({ ...item, _workstreamId: workstreamId }))
// //         }
// //       })

// //       console.log("[v0] Total items collected:", allItems.length)

// //       // Robust normalization
// //       const transformed = allItems.map((item) => {
// //         // Flatten submission if present (workstream3 case)
// //         const record = item.submission ? { ...item, ...item.submission } : item

// //         const createdAtRaw = record?.created_at || record?.createdAt || record?.created_on || record?.Date || null

// //         const accessibility = record?.accessibility
// //           ? record.accessibility.toLowerCase() === "yes"
// //             ? "Yes"
// //             : record.accessibility.toLowerCase() === "no"
// //               ? "No"
// //               : "N/A"
// //           : "N/A"

// //         return {
// //           id: record?.id || item?.id,
// //           reviewsBy: record?.owner_name || "Unknown",
// //           websiteUrl: record?.website_url || "N/A",
// //           accessibility,
// //           reviewDate: record?.review_date
// //             ? new Date(record.review_date).toLocaleDateString()
// //             : createdAtRaw
// //               ? new Date(createdAtRaw).toLocaleDateString()
// //               : "N/A",
// //           addedIn: record?.review_month && record?.review_year ? `${record.review_month} ${record.review_year}` : "N/A",
// //           status:
// //             record?.review_status === "completed"
// //               ? "Complete"
// //               : record?.review_status === "not-completed"
// //                 ? "Not Completed"
// //                 : "Unknown",
// //           websiteType: record?.website_type || "N/A",
// //           comments: record?.comments || "N/A",
// //           websiteOperator: record?.website_operator || "N/A",
// //           reviewTraffic: record?.review_traffic || "N/A",
// //           conditionalResponse: record?.conditional_response,
// //           thirdPartyContent: record?.third_party_content,
// //           images: record?.images || [],
// //           createdAt: createdAtRaw,
// //           _createdAtMs: createdAtRaw ? new Date(createdAtRaw).getTime() : 0,
// //           workstreamId: item._workstreamId || null,
// //         }
// //       })

// //       // Sort by newest first
// //       transformed.sort((a, b) => (b._createdAtMs || 0) - (a._createdAtMs || 0))

// //       if (!isCancelled) setRecentRecordsData(transformed)
// //     } catch (err) {
// //       console.error("[v0] Error fetching workstreams:", err)
// //       if (!isCancelled) setError(`Failed to load workstream data: ${err.message}`)
// //     } finally {
// //       if (!isCancelled) setLoading(false)
// //     }
// //   }

// //   fetchRecentRecords()
// //   return () => { isCancelled = true }
// // }, [quickAccessApiData])



// useEffect(() => {
//   let isCancelled = false;

//   async function fetchRecentRecords() {
//     try {
//       setLoading(true);
//       setError(null);

//       const base = import.meta.env.VITE_API_BASE_URL;

//       // Mapping: local ID -> API workstream ID
//       const workstreamApiMapping = {
//         1: 1, // workstream 1
//         2: 2, // workstream 2
//         5: 3, // map id 5 to workstream 3 API
//       };

//       // Use dynamic IDs from quickAccessApiData, fallback to [1,2,5]
//       const ids =
//         quickAccessApiData && quickAccessApiData.length > 0
//           ? quickAccessApiData.map((w) => Number(w.id)).filter(Boolean)
//           : [1, 2, 5];

//       // Build endpoints with mapping
//       const endpoints = ids.map((id) => ({
//         id,
//         url: endpointFor(base, workstreamApiMapping[id] || id),
//       }));

//       // Fetch all endpoints
//       const results = await Promise.allSettled(
//         endpoints.map(async (ep) => {
//           try {
//             const response = await fetch(ep.url);
//             if (!response.ok) throw new Error(`HTTP ${response.status}`);
//             return await response.json();
//           } catch (error) {
//             console.error(`[v0] Workstream ${ep.id} fetch error:`, error);
//             return null;
//           }
//         })
//       );

//       const allItems = [];

//       results.forEach((res, idx) => {
//         const workstreamId = endpoints[idx].id;

//         if (res.status === "fulfilled" && res.value) {
//           const data = res.value;

//           // Normalize arrays from different API structures
//           let itemsArray = [];

//           if (Array.isArray(data)) itemsArray = data;
//           else if (Array.isArray(data.data)) itemsArray = data.data;
//           else if (Array.isArray(data.workstreams)) itemsArray = data.workstreams;
//           else if (typeof data === "object") itemsArray = [data];

//           itemsArray.forEach((item) =>
//             allItems.push({ ...item, _workstreamId: workstreamId })
//           );
//         }
//       });

//       console.log("[v0] Total items collected:", allItems.length);

//       // Robust normalization
//       const transformed = allItems.map((item) => {
//         const record = item.submission ? { ...item, ...item.submission } : item;

//         const createdAtRaw =
//           record?.created_at ||
//           record?.createdAt ||
//           record?.created_on ||
//           record?.Date ||
//           null;

//         const accessibility = record?.accessibility
//           ? record.accessibility.toLowerCase() === "yes"
//             ? "Yes"
//             : record.accessibility.toLowerCase() === "no"
//             ? "No"
//             : "N/A"
//           : "N/A";

//         return {
//           id: record?.id || item?.id,
//           reviewsBy: record?.owner_name || "Unknown",
//           websiteUrl: record?.website_url || "N/A",
//           accessibility,
//           reviewDate: record?.review_date
//             ? new Date(record.review_date).toLocaleDateString()
//             : createdAtRaw
//             ? new Date(createdAtRaw).toLocaleDateString()
//             : "N/A",
//           addedIn:
//             record?.review_month && record?.review_year
//               ? `${record.review_month} ${record.review_year}`
//               : "N/A",
//           status:
//             record?.review_status === "completed"
//               ? "Complete"
//               : record?.review_status === "not-completed"
//               ? "Not Completed"
//               : "Unknown",
//           websiteType: record?.website_type || "N/A",
//           comments: record?.comments || "N/A",
//           websiteOperator: record?.website_operator || "N/A",
//           reviewTraffic: record?.review_traffic || "N/A",
//           conditionalResponse: record?.conditional_response,
//           thirdPartyContent: record?.third_party_content,
//           images: record?.images || [],
//           createdAt: createdAtRaw,
//           _createdAtMs: createdAtRaw ? new Date(createdAtRaw).getTime() : 0,
//           workstreamId: item._workstreamId || null,
//         };
//       });

//       // Sort by newest first
//       transformed.sort((a, b) => (b._createdAtMs || 0) - (a._createdAtMs || 0));

//       if (!isCancelled) setRecentRecordsData(transformed);
//     } catch (err) {
//       console.error("[v0] Error fetching workstreams:", err);
//       if (!isCancelled) setError(`Failed to load workstream data: ${err.message}`);
//     } finally {
//       if (!isCancelled) setLoading(false);
//     }
//   }

//   fetchRecentRecords();

//   return () => {
//     isCancelled = true;
//   };
// }, [quickAccessApiData]);



//   const getAccessibilityBadge = (level) => {
//     const badgeStyle = { ...styles.badge }
//     switch (level) {
//       case "Yes":
//         return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Yes</span>
//       case "No":
//         return <span style={{ ...badgeStyle, ...badgeVariants.yellow }}>No</span>
//       case "N/A":
//         return <span style={{ ...badgeStyle, ...badgeVariants.red }}>N/A</span>
//       default:
//         return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{level}</span>
//     }
//   }

//   const getStatusBadge = (status) => {
//     const badgeStyle = { ...styles.badge }
//     switch (status) {
//       case "Complete":
//         return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Complete</span>
//       case "Not Completed":
//         return <span style={{ ...badgeStyle, ...badgeVariants.red }}>Not Complete</span>
//       default:
//         return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{status}</span>
//     }
//   }

//   const renderWorkstreamDetail = () => {
//     console.log("[v0] Current view:", currentView) // Added debug logging to track view changes
//     switch (currentView) {
//       case "workstream1":
//         return <WorkstreamDetail1 onBack={() => setCurrentView("dashboard")} />
//       case "workstream2":
//         return <WorkstreamDetail2 onBack={() => setCurrentView("dashboard")} />
//       case "workstream3":
//         console.log("[v0] Rendering Workstream 3 component") // Added specific debug for workstream3
//         return <WorkstreamDetail3 onBack={() => setCurrentView("dashboard")} />
//       case "workstream4":
//         return <WorkstreamDetail4 onBack={() => setCurrentView("dashboard")} />
//       case "workstream5":
//         console.log("[v0] Rendering Workstream 5 component with dynamic form")
//         return <WorkstreamDetail3 onBack={() => setCurrentView("dashboard")} />
//       default:
//         console.log("[v0] No matching workstream view found for:", currentView) // Added debug for unmatched views
//         return null
//     }
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <header style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.headerLeft}>
//             <div style={styles.logo}>
//               <img
//                 src="/gBitLogo.png"
//                 alt="Gbit Logo"
//                 style={{ ...styles.logoImage, cursor: "pointer" }}
//                 onClick={() => navigate("/dashboardview")}
//               />
//             </div>
//             <nav style={styles.nav}>
//               {console.log("currentPath:", currentPath)}
//               <button
//                 style={{
//                   ...styles.navButton,
//                   ...(isWorkstream ? styles.navButtonActive : styles.navButtonInactive),
//                 }}
//                 onClick={() => navigate("/dashboardview")}
//               >
//                 WORKSTREAM
//               </button>
//               <button
//                 style={{
//                   ...styles.navButton,
//                   ...(isNewRecord ? styles.navButtonActive : styles.navButtonInactive),
//                 }}
//                 onClick={() => navigate("/new-record")}
//               >
//                 NEW RECORD
//               </button>
//             </nav>
//           </div>
//           {/* <div style={styles.headerRight}>
//             <div style={styles.searchContainer}>
//               <Search style={styles.searchIcon} size={16} />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={styles.searchInput}
//               />
//             </div>
//             <div style={styles.userIcon}>
//               <User size={16} style={{ color: "#6b7280" }} />
//             </div>
//           </div> */}
//         </div>
//       </header>

//       {currentView === "dashboard" ? (
//         <main style={styles.main}>
//           {/* Quick Access */}
//           <section style={styles.section}>
//             <h2 style={styles.sectionTitle}>Quick Access</h2>
//             <div style={styles.grid}>
//               {quickAccessApiData.length === 0 ? (
//                 <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
//                   No quick access workstreams available.
//                 </div>
//               ) : (
//                 quickAccessApiData.map((item) => (
//                   <div
//                     key={item.id}
//                     style={{ ...styles.card, ...cardVariants[item.variant] }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
//                     }}
//                     onClick={() => {
//                       console.log("[v0] Workstream card clicked, setting view to:", `workstream${item.id}`) // Added debug logging for card clicks
//                       setCurrentView(`workstream${item.id}`)
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
//                 ))
//               )}
//             </div>
//           </section>

//           {/* Recent Records */}
//           <section>
//             <h2 style={styles.sectionTitle}>Recent Records</h2>
//             <div style={styles.table}>
//               {loading ? (
//                 <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading workstream data...</div>
//               ) : error ? (
//                 <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>
//               ) : (
//                 <table style={{ width: "100%" }}>
//                   <thead style={styles.tableHeader}>
//                     <tr>
//                       <th style={styles.tableHeaderCell}>ID</th>
//                       <th style={styles.tableHeaderCell}>Workstream</th>
//                       <th style={styles.tableHeaderCell}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentRecordsData.length === 0 ? (
//                       <tr>
//                         <td colSpan="9" style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
//                           No workstream data available
//                         </td>
//                       </tr>
//                     ) : (
//                       recentRecordsData.map((record) => (
//                         <tr key={`${record.id}-${record.createdAt}`} style={styles.tableRow}>
//                           {/* ID */}
//                           <td style={styles.tableCell}>{record.id || "N/A"}</td>

//                           {/* Workstream */}
//                           {/* <td style={styles.tableCell}>{`Workstream ${record.workstreamId ?? "?"}`}</td> */}
                          
// <td style={styles.tableCell}>
//   {`Workstream ${record.workstreamId === 5 ? 3 : record.workstreamId}`}
// </td>
//                           {/* Edit button */}
//                           <td style={styles.tableCell}>
//                             <button
//                               style={{ ...styles.button, width: "32px", height: "32px" }}
//                               onClick={() => {
//                                 const id = record.workstreamId || 1
//                                 setCurrentView(`workstream${id}`)
//                               }}
//                             >
//                               <Edit size={16} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </section>
//         </main>
//       ) : (
//         renderWorkstreamDetail()
//       )}
//     </div>
//   )
// }











"use client"

import { useState, useEffect } from "react"
import { Search, User, Monitor, Edit, LogOut, ChevronDown } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

// Local workstream detail components
import WorkstreamDetail1 from "./WorkstreamDetail1.jsx"
import WorkstreamDetail2 from "./WorkstreamDetail2.jsx"
import WorkstreamDetail3 from "./WorkstreamDetail3.jsx"
import WorkstreamDetail4 from "./WorkstreamDetails4.jsx"

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    width: "100vw",
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
  },
  searchInput: {
    paddingLeft: "40px",
    paddingRight: "16px",
    paddingTop: "8px",
    paddingBottom: "8px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    width: "256px",
    outline: "none",
    fontSize: "14px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
  },
  userIcon: {
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
    backgroundColor: "transparent",
    color: "#0000FF",
    borderBottom: "2px solid #0000FF",
  },
  navButtonInactive: {
    backgroundColor: "transparent",
    color: "#9ca3af",
    borderBottom: "2px solid transparent",
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

// Helper: normalize API item -> table row with sortable createdAt
function normalizeRecord(item) {
  const accessibility = item?.accessibility
    ? item.accessibility.toLowerCase() === "yes"
      ? "Yes"
      : item.accessibility.toLowerCase() === "no"
        ? "No"
        : "N/A"
    : "N/A"

  const createdAtRaw = item?.created_at || item?.createdAt || item?.created_on || item?.date || null

  return {
    id: item?.id,
    reviewsBy: item?.owner_name || "Unknown",
    websiteUrl: item?.website_url || "N/A",
    accessibility,
    reviewDate: item?.review_date ? new Date(item.review_date).toLocaleDateString() : "N/A",
    addedIn: item?.review_month && item?.review_year ? `${item.review_month} ${item.review_year}` : "N/A",
    status:
      item?.review_status === "completed"
        ? "Complete"
        : item?.review_status === "not-completed"
          ? "Not Completed"
          : "Unknown",
    websiteType: item?.website_type || "N/A",
    comments: item?.comments || "N/A",
    websiteOperator: item?.website_operator || "N/A",
    reviewTraffic: item?.review_traffic || "N/A",
    conditionalResponse: item?.conditional_response,
    thirdPartyContent: item?.third_party_content,
    images: item?.images || [],
    createdAt: createdAtRaw,
    _createdAtMs: createdAtRaw ? new Date(createdAtRaw).getTime() : 0,
    // carry through original source workstream id if present
    workstreamId: item?._workstreamId ?? null,
  }
}

// Build endpoint for a workstream id
function endpointFor(base, id) {
  console.log("[v0] Building endpoint for workstream ID:", id)
  // Workstream 1 uses "/workstream", others use "/workstream{n}"
  const endpoint = id === 1 ? `${base}/api/open/workstream` : `${base}/api/open/workstream${id}`
  console.log("[v0] Generated endpoint:", endpoint)
  return endpoint
}

export default function DashboardView() {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [recentRecordsData, setRecentRecordsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentView, setCurrentView] = useState("dashboard")
  const [quickAccessApiData, setQuickAccessApiData] = useState([])
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const isWorkstream = currentPath === "/dashboardview"
  const isNewRecord = currentPath === "/new-record"

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  useEffect(() => {
    let isCancelled = false

    async function fetchRecentRecords() {
      try {
        setLoading(true)
        setError(null)

        const base = import.meta.env.VITE_API_BASE_URL

        // Mapping: local ID -> API workstream ID
        const workstreamApiMapping = {
          1: 1, // workstream 1
          2: 2, // workstream 2
          5: 3, // map id 5 to workstream 3 API
        }

        // Use dynamic IDs from quickAccessApiData, fallback to [1,2,5]
        const ids =
          quickAccessApiData && quickAccessApiData.length > 0
            ? quickAccessApiData.map((w) => Number(w.id)).filter(Boolean)
            : [1, 2, 5]

        // Build endpoints with mapping
        const endpoints = ids.map((id) => ({
          id,
          url: endpointFor(base, workstreamApiMapping[id] || id),
        }))

        // Fetch all endpoints
        const results = await Promise.allSettled(
          endpoints.map(async (ep) => {
            try {
              const response = await fetch(ep.url)
              if (!response.ok) throw new Error(`HTTP ${response.status}`)
              return await response.json()
            } catch (error) {
              console.error(`[v0] Workstream ${ep.id} fetch error:`, error)
              return null
            }
          }),
        )

        const allItems = []

        results.forEach((res, idx) => {
          const workstreamId = endpoints[idx].id

          if (res.status === "fulfilled" && res.value) {
            const data = res.value

            // Normalize arrays from different API structures
            let itemsArray = []

            if (Array.isArray(data)) itemsArray = data
            else if (Array.isArray(data.data)) itemsArray = data.data
            else if (Array.isArray(data.workstreams)) itemsArray = data.workstreams
            else if (typeof data === "object") itemsArray = [data]

            itemsArray.forEach((item) => allItems.push({ ...item, _workstreamId: workstreamId }))
          }
        })

        console.log("[v0] Total items collected:", allItems.length)

        // Robust normalization
        const transformed = allItems.map((item) => {
          const record = item.submission ? { ...item, ...item.submission } : item

          const createdAtRaw = record?.created_at || record?.createdAt || record?.created_on || record?.Date || null

          const accessibility = record?.accessibility
            ? record.accessibility.toLowerCase() === "yes"
              ? "Yes"
              : record.accessibility.toLowerCase() === "no"
                ? "No"
                : "N/A"
            : "N/A"

          return {
            id: record?.id || item?.id,
            reviewsBy: record?.owner_name || "Unknown",
            websiteUrl: record?.website_url || "N/A",
            accessibility,
            reviewDate: record?.review_date
              ? new Date(record.review_date).toLocaleDateString()
              : createdAtRaw
                ? new Date(createdAtRaw).toLocaleDateString()
                : "N/A",
            addedIn:
              record?.review_month && record?.review_year ? `${record.review_month} ${record.review_year}` : "N/A",
            status:
              record?.review_status === "completed"
                ? "Complete"
                : record?.review_status === "not-completed"
                  ? "Not Completed"
                  : "Unknown",
            websiteType: record?.website_type || "N/A",
            comments: record?.comments || "N/A",
            websiteOperator: record?.website_operator || "N/A",
            reviewTraffic: record?.review_traffic || "N/A",
            conditionalResponse: record?.conditional_response,
            thirdPartyContent: record?.third_party_content,
            images: record?.images || [],
            createdAt: createdAtRaw,
            _createdAtMs: createdAtRaw ? new Date(createdAtRaw).getTime() : 0,
            workstreamId: item._workstreamId || null,
          }
        })

        // Sort by newest first
        transformed.sort((a, b) => (b._createdAtMs || 0) - (a._createdAtMs || 0))

        if (!isCancelled) setRecentRecordsData(transformed)
      } catch (err) {
        console.error("[v0] Error fetching workstreams:", err)
        if (!isCancelled) setError(`Failed to load workstream data: ${err.message}`)
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    fetchRecentRecords()

    return () => {
      isCancelled = true
    }
  }, [quickAccessApiData])

  useEffect(() => {
    async function fetchQuickAccessData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()

        let workstreamList = []
        if (Array.isArray(data)) workstreamList = data
        else if (data && Array.isArray(data.data)) workstreamList = data.data
        else if (data && Array.isArray(data.workstream_list)) workstreamList = data.workstream_list
        else if (data && typeof data === "object") workstreamList = [data]
        else throw new Error("Invalid data format received for workstream-list API")

        const variants = ["blue", "purple", "green"]
        const iconColors = ["#3b82f6", "#8b5cf6", "#10b981"]

        const transformedQuickAccessData = workstreamList.map((item, index) => {
          const variantIndex = index % variants.length
          return {
            id: item.id,
            title: item.name || `Workstream ${item.id}`,
            variant: variants[variantIndex],
            iconColor: iconColors[variantIndex],
          }
        })
        setQuickAccessApiData(transformedQuickAccessData)
      } catch (err) {
        console.error("Error fetching quick access workstream list:", err)
      }
    }
    fetchQuickAccessData()
  }, [])

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
    console.log("[v0] Current view:", currentView) // Added debug logging to track view changes
    switch (currentView) {
      case "workstream1":
        return <WorkstreamDetail1 onBack={() => setCurrentView("dashboard")} />
      case "workstream2":
        return <WorkstreamDetail2 onBack={() => setCurrentView("dashboard")} />
      case "workstream3":
        console.log("[v0] Rendering Workstream 3 component") // Added specific debug for workstream3
        return <WorkstreamDetail3 onBack={() => setCurrentView("dashboard")} />
      case "workstream4":
        return <WorkstreamDetail4 onBack={() => setCurrentView("dashboard")} />
      case "workstream5":
        console.log("[v0] Rendering Workstream 5 component with dynamic form")
        return <WorkstreamDetail3 onBack={() => setCurrentView("dashboard")} />
      default:
        console.log("[v0] No matching workstream view found for:", currentView) // Added debug for unmatched views
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
              <img
                src="/gBitLogo.png"
                alt="Gbit Logo"
                style={{ ...styles.logoImage, cursor: "pointer" }}
                onClick={() => navigate("/dashboardview")}
              />
            </div>
            <nav style={styles.nav}>
              {console.log("currentPath:", currentPath)}
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
              <Search style={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div> */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#374151",
                }}
              >
                <div style={styles.userIcon}>
                  <User size={16} style={{ color: "#6b7280" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{ fontWeight: "500", fontSize: "13px" }}>{user?.name || "User"}</span>
                  <span style={{ fontSize: "11px", color: "#6b7280", textTransform: "capitalize" }}>
                    {user?.role || "viewer"}
                  </span>
                </div>
                <ChevronDown size={14} style={{ color: "#6b7280" }} />
              </button>
              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    marginTop: "4px",
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    minWidth: "160px",
                    zIndex: 50,
                  }}
                >
                  <div style={{ padding: "8px" }}>
                    <div
                      style={{
                        padding: "8px 12px",
                        borderBottom: "1px solid #f3f4f6",
                        marginBottom: "4px",
                      }}
                    >
                      <div style={{ fontSize: "13px", fontWeight: "500", color: "#111827" }}>
                        {user?.name || "User"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#6b7280" }}>{user?.email || "user@example.com"}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        background: "transparent",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                        color: "#dc2626",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#fef2f2"
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent"
                      }}
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showUserMenu && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {currentView === "dashboard" ? (
        <main style={styles.main}>
          {/* Quick Access */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Quick Access</h2>
            <div style={styles.grid}>
              {quickAccessApiData.length === 0 ? (
                <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
                  No quick access workstreams available.
                </div>
              ) : (
                quickAccessApiData.map((item) => (
                  <div
                    key={item.id}
                    style={{ ...styles.card, ...cardVariants[item.variant] }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
                    }}
                    onClick={() => {
                      console.log("[v0] Workstream card clicked, setting view to:", `workstream${item.id}`) // Added debug logging for card clicks
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
                ))
              )}
            </div>
          </section>

          {/* Recent Records */}
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
                     
                      <th style={styles.tableHeaderCell}>Workstream</th>
                       <th style={styles.tableHeaderCell}>Date/Time Submitted</th>
                        <th style={styles.tableHeaderCell}>Submitted By</th>
                      <th style={styles.tableHeaderCell}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
              {      console.log(recentRecordsData,"recentRecordsData")}
                    {recentRecordsData.length === 0 ? (
                      
                      <tr>
                        <td colSpan="9" style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                          No workstream data available
                        </td>
                      </tr>
                    ) : (
                      recentRecordsData.map((record) => (
                        <tr key={`${record.id}-${record.createdAt}`} style={styles.tableRow}>
                          {/* ID */}
                         

                          {/* Workstream */}
                          <td style={styles.tableCell}>
                            {`Workstream ${record.workstreamId === 5 ? 3 : record.workstreamId}`}
                          </td>
                           <td style={styles.tableCell}>{record.createdAt || "N/A"}</td>
                            <td style={styles.tableCell}>Viewer</td>
                          {/* Edit button */}
                          <td style={styles.tableCell}>
                            <button
                              style={{ ...styles.button, width: "32px", height: "32px" }}
                              onClick={() => {
                                const id = record.workstreamId || 1
                                setCurrentView(`workstream${id}`)
                              }}
                            >
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
      ) : (
        renderWorkstreamDetail()
      )}
    </div>
  )
}
