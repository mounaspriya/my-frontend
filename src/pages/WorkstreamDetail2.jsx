// "use client"

// import { useState } from "react"
// import { Search, User, Filter, Download, Share, Plus, ArrowLeft, Settings } from "lucide-react"

// // Same styles as WorkstreamDetail1
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f9fafb",
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
//     maxWidth: "1400px",
//     margin: "0 auto",
//   },
//   backButton: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     background: "transparent",
//     border: "none",
//     color: "#6b7280",
//     cursor: "pointer",
//     fontSize: "14px",
//     marginBottom: "16px",
//     padding: "8px 0",
//   },
//   pageHeader: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: "24px",
//   },
//   pageTitle: {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#111827",
//   },
//   actionButtons: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//   },
//   actionButton: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     padding: "8px 16px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     backgroundColor: "white",
//     color: "#374151",
//     fontSize: "14px",
//     cursor: "pointer",
//     fontWeight: "500",
//   },
//   primaryButton: {
//     backgroundColor: "#3b82f6",
//     color: "white",
//     border: "1px solid #3b82f6",
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
//     borderBottom: "1px solid #e5e7eb",
//   },
//   tableCell: {
//     padding: "16px 24px",
//     fontSize: "14px",
//     whiteSpace: "nowrap",
//   },
// }

// export default function WorkstreamDetail2({ onBack }) {
//   const [searchQuery, setSearchQuery] = useState("")

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <header style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.headerLeft}>
//             <div style={styles.logo}>
//               <img src="/logo.png" alt="Gbit Logo" style={styles.logoImage} />
//             </div>
//             <nav style={styles.nav}>
//               <button style={{ ...styles.navButton, ...styles.navButtonActive }}>WORKSTREAM</button>
//               <button style={{ ...styles.navButton, ...styles.navButtonInactive }}>NEW RECORD</button>
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

//       {/* Main Content */}
//       <main style={styles.main}>
//         <button style={styles.backButton} onClick={onBack}>
//           <ArrowLeft size={16} />
//           Back to Dashboard
//         </button>

//         <div style={styles.pageHeader}>
//           <h1 style={styles.pageTitle}>Workstream 02</h1>
//           <div style={styles.actionButtons}>
//             <button style={styles.actionButton}>
//               <Filter size={16} />
//               Filter
//             </button>
//             <button style={styles.actionButton}>
//               <Settings size={16} />
//               Manage Columns
//             </button>
//             <button style={styles.actionButton}>
//               <Download size={16} />
//               Export (0)
//             </button>
//             <button style={styles.actionButton}>
//               <Share size={16} />
//               Share
//             </button>
//             <button style={{ ...styles.actionButton, ...styles.primaryButton }}>
//               <Plus size={16} />
//               Add New
//             </button>
//           </div>
//         </div>

//         {/* Data Table */}
//         <div style={styles.table}>
//           <table style={{ width: "100%" }}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th style={styles.tableHeaderCell}>ID</th>
//                 <th style={styles.tableHeaderCell}>Owner Name</th>
//                 <th style={styles.tableHeaderCell}>Registration Site</th>
//                 <th style={styles.tableHeaderCell}>Accessibility</th>
//                 <th style={styles.tableHeaderCell}>Review Date</th>
//                 <th style={styles.tableHeaderCell}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td colSpan="6" style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280", padding: "40px" }}>
//                   <div>
//                     <div style={{ fontSize: "16px", marginBottom: "8px" }}>No records found for Workstream 02</div>
//                     <div style={{ fontSize: "14px" }}>This workstream doesn't have any data yet</div>
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Search, User, Filter, Download, Share, Plus, ArrowLeft, Settings, Edit } from "lucide-react"

// Same styles as WorkstreamDetail1
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
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
  navButtonActive: {
    color: "#2563eb",
  },
  navButtonInactive: {
    color: "#6b7280",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  searchContainer: {
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    width: "16px",
    height: "16px",
  },
  searchInput: {
    paddingLeft: "40px",
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    width: "256px",
    fontSize: "14px",
    outline: "none",
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
    maxWidth: "1400px",
    margin: "0 auto",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "16px",
    padding: "8px 0",
  },
  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#111827",
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#374151",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "1px solid #3b82f6",
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
    borderBottom: "1px solid #e5e7eb",
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
}

const badgeVariants = {
  green: { backgroundColor: "#dcfce7", color: "#16a34a" },
  yellow: { backgroundColor: "#fef3c7", color: "#d97706" },
  red: { backgroundColor: "#fee2e2", color: "#dc2626" },
  gray: { backgroundColor: "#f3f4f6", color: "#374151" },
  blue: { backgroundColor: "#dbeafe", color: "#2563eb" },
}

export default function WorkstreamDetail2({ onBack }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [workstreamData, setWorkstreamData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data from Workstream 2 API
  useEffect(() => {
    const fetchWorkstreamData = async () => {
      try {
        setLoading(true)
        // Replace with your actual Workstream 2 API endpoint
        const response = await fetch("http://localhost:5000/api/open/workstream2")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        let workstreams = []

        if (Array.isArray(data)) {
          workstreams = data
        } else if (data && Array.isArray(data.data)) {
          workstreams = data.data
        } else if (data && Array.isArray(data.workstreams)) {
          workstreams = data.workstreams
        } else if (data && typeof data === "object") {
          workstreams = [data]
        }

        setWorkstreamData(workstreams)
        setError(null)
      } catch (err) {
        console.error("Error fetching workstream 2 data:", err)
        setError(`Failed to load workstream data: ${err.message}`)
        setWorkstreamData([])
      } finally {
        setLoading(false)
      }
    }

    fetchWorkstreamData()
  }, [])

  const getAccessibilityBadge = (level) => {
    const badgeStyle = { ...styles.badge }
    switch (level) {
      case "Yes":
        return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Yes</span>
      case "No":
        return <span style={{ ...badgeStyle, ...badgeVariants.red }}>No</span>
      case "N/A":
        return <span style={{ ...badgeStyle, ...badgeVariants.blue }}>N/A</span>
      default:
        return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{level || "N/A"}</span>
    }
  }

  const filteredData = workstreamData.filter(
    (record) =>
      (record.owner_name && record.owner_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.registration_site && record.registration_site.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div style={styles.container}>
    

      {/* Main Content */}
      <main style={styles.main}>
        <button style={styles.backButton} onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Workstream 02</h1>
          <div style={styles.actionButtons}>
            <button style={styles.actionButton}>
              <Filter size={16} />
              Filter
            </button>
            <button style={styles.actionButton}>
              <Settings size={16} />
              Manage Columns
            </button>
            <button style={styles.actionButton}>
              <Download size={16} />
              Export ({filteredData.length})
            </button>
            <button style={styles.actionButton}>
              <Share size={16} />
              Share
            </button>
            <button style={{ ...styles.actionButton, ...styles.primaryButton }}>
              <Plus size={16} />
              Add New
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div style={styles.table}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
              <div style={{ fontSize: "16px", marginBottom: "8px" }}>Loading Workstream 02...</div>
              <div style={{ fontSize: "14px" }}>Please wait while we fetch the data</div>
            </div>
          ) : error ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>
              <div style={{ fontSize: "16px", marginBottom: "8px" }}>Error loading Workstream 02</div>
              <div style={{ fontSize: "14px" }}>{error}</div>
            </div>
          ) : (
            <table style={{ width: "100%" }}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>ID</th>
                  <th style={styles.tableHeaderCell}>Owner Name</th>
                  <th style={styles.tableHeaderCell}>Registration Site</th>
                  <th style={styles.tableHeaderCell}>Accessibility</th>
                  <th style={styles.tableHeaderCell}>Review Date</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280", padding: "40px" }}
                    >
                      {searchQuery ? (
                        <div>
                          <div style={{ fontSize: "16px", marginBottom: "8px" }}>No matching records found</div>
                          <div style={{ fontSize: "14px" }}>Try adjusting your search criteria</div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: "16px", marginBottom: "8px" }}>
                            No records found for Workstream 02
                          </div>
                          <div style={{ fontSize: "14px" }}>This workstream doesn't have any data yet</div>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredData.map((record) => (
                    <tr
                      key={record.id}
                      style={styles.tableRow}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f9fafb"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                    >
                      <td style={styles.tableCell}>{record.id}</td>
                      <td style={styles.tableCell}>{record.owner_name || "N/A"}</td>
                      <td style={styles.tableCell}>{record.registration_site || "N/A"}</td>
                      <td style={styles.tableCell}>{getAccessibilityBadge(record.accessibility)}</td>
                      <td style={styles.tableCell}>{record.review_date ? record.review_date.split("T")[0] : "N/A"}</td>
                      <td style={styles.tableCell}>
                        <button
                          style={{
                            ...styles.button,
                            width: "32px",
                            height: "32px",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#f3f4f6"
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent"
                          }}
                          onClick={() => {
                            console.log("Edit record:", record)
                          }}
                          title="Edit Record"
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
      </main>
    </div>
  )
}
