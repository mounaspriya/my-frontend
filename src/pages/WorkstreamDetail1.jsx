// "use client"

// import { useState, useEffect } from "react"
// import { Search, User, Filter, Download, Share, Plus, Edit, ArrowLeft, Settings, X, Check } from "lucide-react"

// // Add this import at the top (you'll need to install xlsx library)
// // npm install xlsx

// import * as XLSX from "xlsx"

// // Inline styles object
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
//   // Modal styles
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//   },
//   fieldSelectorModal: {
//     backgroundColor: "white",
//     borderRadius: "8px",
//     padding: "24px",
//     maxWidth: "600px",
//     width: "90%",
//     maxHeight: "80vh",
//     overflow: "auto",
//   },
//   modalHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px",
//     borderBottom: "1px solid #e5e7eb",
//     paddingBottom: "16px",
//   },
//   closeButton: {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     padding: "4px",
//   },
//   fieldSelectorContent: {
//     marginBottom: "20px",
//   },
//   instructionText: {
//     color: "#6b7280",
//     fontSize: "14px",
//     marginBottom: "16px",
//   },
//   fieldGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "12px",
//   },
//   fieldCheckboxLabel: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     padding: "8px 12px",
//     border: "1px solid #e5e7eb",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "background-color 0.2s",
//   },
//   checkbox: {
//     margin: 0,
//   },
//   fieldName: {
//     flex: 1,
//     fontSize: "14px",
//   },
//   checkIcon: {
//     color: "#10b981",
//   },
//   modalFooter: {
//     display: "flex",
//     justifyContent: "flex-end",
//     gap: "12px",
//     borderTop: "1px solid #e5e7eb",
//     paddingTop: "16px",
//   },
//   applyButton: {
//     padding: "8px 16px",
//     backgroundColor: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "500",
//   },
//   cancelButton: {
//     padding: "8px 16px",
//     backgroundColor: "white",
//     color: "#374151",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "500",
//   },
//   actionButtonDisabled: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     padding: "8px 16px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     backgroundColor: "#f9fafb",
//     color: "#9ca3af",
//     fontSize: "14px",
//     cursor: "not-allowed",
//     fontWeight: "500",
//     opacity: 0.6,
//   },
// }

// // Color variants for badges
// const badgeVariants = {
//   green: { backgroundColor: "#dcfce7", color: "#16a34a" },
//   yellow: { backgroundColor: "#fef3c7", color: "#d97706" },
//   red: { backgroundColor: "#fee2e2", color: "#dc2626" },
//   gray: { backgroundColor: "#f3f4f6", color: "#374151" },
//   blue: { backgroundColor: "#dbeafe", color: "#2563eb" },
// }

// export default function WorkstreamDetail({ workstreamId = "01", onBack }) {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [workstreamData, setWorkstreamData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   // Column customization state
//   const [showFieldSelector, setShowFieldSelector] = useState(false)
//   const [selectedFields, setSelectedFields] = useState([
//     "id",
//     "owner_name",
//     "registration_site",
//     "accessibility",
//     "review_date",
//     "review_month",
//     "review_year",
//   ])
//   const [tempSelectedFields, setTempSelectedFields] = useState([])

//   // Always visible fields that cannot be hidden
//   const alwaysVisibleFields = ["id", "accessibility"]

//   // Define all available fields with their display names
//   const allFields = {
//     id: "ID",
//     owner_name: "Owner Name",
//     registration_site: "Registration Site",
//     accessibility: "Accessibility",
//     review_date: "Review Date",
//     review_month: "Review Month",
//     review_year: "Review Year",
//     website_source_id: "Website Source ID",
//     third_party_content: "Third Party Content",
//     conditional_response: "Conditional Response",
//     website_type: "Website Type",
//     comments: "Comments",
//     website_operator: "Website Operator",
//     review_traffic: "Review Traffic",
//     calculated_friday: "Calculated Friday",
//     images: "Images Count",
//     a_checks: "A-Checks",
//     created_at: "Created At",
//   }

//   // Fetch workstream data from API
//   useEffect(() => {
//     const fetchWorkstreamData = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("http://localhost:5000/api/open/workstream")

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         console.log("Workstream API Response:", data)

//         // Handle different possible response structures
//         let workstreams = []
//         if (Array.isArray(data)) {
//           workstreams = data
//         } else if (data && Array.isArray(data.data)) {
//           workstreams = data.data
//         } else if (data && Array.isArray(data.workstreams)) {
//           workstreams = data.workstreams
//         } else if (data && typeof data === "object") {
//           workstreams = [data]
//         }

//         setWorkstreamData(workstreams)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching workstream data:", err)
//         setError(`Failed to load workstream data: ${err.message}`)
//         setWorkstreamData([])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchWorkstreamData()
//   }, [workstreamId])

//   // Column customization functions
//   const openFieldSelector = () => {
//     setTempSelectedFields([...selectedFields])
//     setShowFieldSelector(true)
//   }

//   const handleFieldToggle = (fieldKey) => {
//     if (alwaysVisibleFields.includes(fieldKey)) return // Don't allow toggle of required fields

//     setTempSelectedFields((prev) => {
//       if (prev.includes(fieldKey)) {
//         return prev.filter((f) => f !== fieldKey)
//       } else if (prev.length < 10) {
//         return [...prev, fieldKey]
//       }
//       return prev
//     })
//   }

//   const applyFieldSelection = () => {
//     if (tempSelectedFields.length === 0) {
//       alert("Please select at least one field to display.")
//       return
//     }
//     const finalFields = Array.from(new Set([...alwaysVisibleFields, ...tempSelectedFields]))
//     setSelectedFields(finalFields)
//     setShowFieldSelector(false)
//   }

//   const cancelFieldSelection = () => {
//     setTempSelectedFields([])
//     setShowFieldSelector(false)
//   }

//   // Format field value for display
//   const formatFieldValue = (item, fieldKey) => {
//     const value = item[fieldKey]
//     switch (fieldKey) {
//       case "review_date":
//       case "created_at":
//       case "calculated_friday":
//         return value ? value.split("T")[0] : "N/A"
//       case "images":
//         try {
//           const images = typeof value === "string" ? JSON.parse(value) : value
//           return Array.isArray(images) ? images.length : 0
//         } catch {
//           return 0
//         }
//       case "a_checks":
//         try {
//           const checks = typeof value === "string" ? JSON.parse(value) : value
//           return Array.isArray(checks) ? `${checks.filter((c) => c.checked).length}/${checks.length}` : "0/0"
//         } catch {
//           return "0/0"
//         }
//       default:
//         return value || "N/A"
//     }
//   }

//   // Add this function after the formatFieldValue function:
//   const exportToExcel = () => {
//     try {
//       // Prepare data for export with only selected fields
//       const exportData = filteredData.map((record) => {
//         const exportRecord = {}
//         selectedFields.forEach((fieldKey) => {
//           const displayName = allFields[fieldKey]
//           if (fieldKey === "accessibility") {
//             // For accessibility, export the raw value instead of badge
//             exportRecord[displayName] = record[fieldKey] || "N/A"
//           } else {
//             exportRecord[displayName] = formatFieldValue(record, fieldKey)
//           }
//         })
//         return exportRecord
//       })

//       // Create workbook and worksheet
//       const workbook = XLSX.utils.book_new()
//       const worksheet = XLSX.utils.json_to_sheet(exportData)

//       // Set column widths for better formatting
//       const columnWidths = selectedFields.map((fieldKey) => {
//         const displayName = allFields[fieldKey]
//         return { wch: Math.max(displayName.length, 15) }
//       })
//       worksheet["!cols"] = columnWidths

//       // Add worksheet to workbook
//       XLSX.utils.book_append_sheet(workbook, worksheet, `Workstream ${workstreamId}`)

//       // Generate filename with current date
//       const currentDate = new Date().toISOString().split("T")[0]
//       const filename = `Workstream_${workstreamId}_${currentDate}.xlsx`

//       // Save the file
//       XLSX.writeFile(workbook, filename)

//       console.log(`Exported ${exportData.length} records to ${filename}`)
//     } catch (error) {
//       console.error("Export failed:", error)
//       alert("Export failed. Please try again.")
//     }
//   }

//   const getAccessibilityBadge = (level) => {
//     const badgeStyle = { ...styles.badge }
//     switch (level) {
//       case "Yes":
//         return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Yes</span>
//       case "No":
//         return <span style={{ ...badgeStyle, ...badgeVariants.red }}>No</span>
//       case "N/A":
//         return <span style={{ ...badgeStyle, ...badgeVariants.blue }}>N/A</span>
//       default:
//         return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{level || "N/A"}</span>
//     }
//   }

//   // Filter data based on search query
//   const filteredData = workstreamData.filter(
//     (record) =>
//       (record.owner_name && record.owner_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (record.registration_site && record.registration_site.toLowerCase().includes(searchQuery.toLowerCase())),
//   )

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       {/* <header style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.headerLeft}>
//             <div style={styles.logo}>
//               <img src="/logo.png" alt="Gbit Logo" style={styles.logoImage} />
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
//       </header> */}

//       {/* Main Content */}
//       <main style={styles.main}>
//         {/* Back Button */}
//         <button style={styles.backButton} onClick={onBack}>
//           <ArrowLeft size={16} />
//           Back to Dashboard
//         </button>

//         {/* Page Header */}
//         <div style={styles.pageHeader}>
//           <h1 style={styles.pageTitle}>Workstream {workstreamId}</h1>
//           <div style={styles.actionButtons}>
//             <button style={styles.actionButton}>
//               <Filter size={16} />
//               Filter
//             </button>
//             <button style={styles.actionButton} onClick={openFieldSelector}>
//               <Settings size={16} />
//               Manage Columns ({selectedFields.length}/10)
//             </button>
//             <button
//               style={loading || filteredData.length === 0 ? styles.actionButtonDisabled : styles.actionButton}
//               onClick={exportToExcel}
//               disabled={loading || filteredData.length === 0}
//               title={filteredData.length === 0 ? "No data to export" : `Export ${filteredData.length} records to Excel`}
//             >
//               <Download size={16} />
//               Export 
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
//           {loading ? (
//             <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading workstream data...</div>
//           ) : error ? (
//             <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>
//           ) : (
//             <table style={{ width: "100%" }}>
//               <thead style={styles.tableHeader}>
//                 <tr>
//                   {selectedFields.map((fieldKey) => (
//                     <th key={fieldKey} style={styles.tableHeaderCell}>
//                       {allFields[fieldKey]}
//                     </th>
//                   ))}
//                   <th style={styles.tableHeaderCell}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={selectedFields.length + 1}
//                       style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}
//                     >
//                       {searchQuery ? "No matching records found" : "No workstream data available"}
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredData.map((record) => (
//                     <tr
//                       key={record.id}
//                       style={styles.tableRow}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = "#f9fafb"
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = "transparent"
//                       }}
//                     >
//                       {selectedFields.map((fieldKey) => (
//                         <td key={fieldKey} style={styles.tableCell}>
//                           {fieldKey === "accessibility"
//                             ? getAccessibilityBadge(record[fieldKey])
//                             : formatFieldValue(record, fieldKey)}
//                         </td>
//                       ))}
//                       <td style={styles.tableCell}>
//                         <button
//                           style={{
//                             ...styles.button,
//                             width: "32px",
//                             height: "32px",
//                           }}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = "#f3f4f6"
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = "transparent"
//                           }}
//                           onClick={() => {
//                             console.log("Edit record:", record)
//                           }}
//                           title="Edit Record"
//                         >
//                           <Edit size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </main>

//       {/* Field Selection Modal */}
//       {showFieldSelector && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.fieldSelectorModal}>
//             <div style={styles.modalHeader}>
//               <h3>Customize Table Columns</h3>
//               <button onClick={cancelFieldSelection} style={styles.closeButton}>
//                 <X size={20} />
//               </button>
//             </div>
//             <div style={styles.fieldSelectorContent}>
//               <p style={styles.instructionText}>
//                 Select up to 10 fields to display in the table ({tempSelectedFields.length}/10 selected)
//               </p>
//               <div style={styles.fieldGrid}>
//                 {Object.entries(allFields).map(([fieldKey, displayName]) => {
//                   const isAlwaysVisible = alwaysVisibleFields.includes(fieldKey)
//                   const isChecked = tempSelectedFields.includes(fieldKey)
//                   const isDisabled = isAlwaysVisible || (!isChecked && tempSelectedFields.length >= 10)

//                   return (
//                     <label
//                       key={fieldKey}
//                       style={{
//                         ...styles.fieldCheckboxLabel,
//                         backgroundColor: isChecked ? "#f0f9ff" : "white",
//                         borderColor: isChecked ? "#3b82f6" : "#e5e7eb",
//                         opacity: isDisabled && !isAlwaysVisible ? 0.5 : 1,
//                         cursor: isDisabled && !isAlwaysVisible ? "not-allowed" : "pointer",
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={isChecked}
//                         onChange={() => handleFieldToggle(fieldKey)}
//                         disabled={isDisabled}
//                         style={styles.checkbox}
//                       />
//                       <span style={styles.fieldName}>
//                         {displayName}
//                         {isAlwaysVisible && (
//                           <span style={{ fontSize: "12px", color: "#888", marginLeft: "4px" }}>(required)</span>
//                         )}
//                       </span>
//                       {isChecked && <Check size={16} style={styles.checkIcon} />}
//                     </label>
//                   )
//                 })}
//               </div>
//             </div>
//             <div style={styles.modalFooter}>
//               <button
//                 onClick={applyFieldSelection}
//                 style={{
//                   ...styles.applyButton,
//                   opacity: tempSelectedFields.length === 0 ? 0.5 : 1,
//                   cursor: tempSelectedFields.length === 0 ? "not-allowed" : "pointer",
//                 }}
//                 disabled={tempSelectedFields.length === 0}
//               >
//                 Apply Changes
//               </button>
//               <button onClick={cancelFieldSelection} style={styles.cancelButton}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Filter, Download, Share, Plus, Edit, ArrowLeft, Settings, X, Check } from "lucide-react"
import EditReviewerForm from "../component/EditWorkstream1"
// Add this import at the top (you'll need to install xlsx library)
// npm install xlsx
import * as XLSX from "xlsx"

// Inline styles object
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
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  fieldSelectorModal: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflow: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "16px",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  fieldSelectorContent: {
    marginBottom: "20px",
  },
  instructionText: {
    color: "#6b7280",
    fontSize: "14px",
    marginBottom: "16px",
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
  },
  fieldCheckboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  checkbox: {
    margin: 0,
  },
  fieldName: {
    flex: 1,
    fontSize: "14px",
  },
  checkIcon: {
    color: "#10b981",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "16px",
  },
  applyButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  actionButtonDisabled: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    backgroundColor: "#f9fafb",
    color: "#9ca3af",
    fontSize: "14px",
    cursor: "not-allowed",
    fontWeight: "500",
    opacity: 0.6,
  },
}

// Color variants for badges
const badgeVariants = {
  green: { backgroundColor: "#dcfce7", color: "#16a34a" },
  yellow: { backgroundColor: "#fef3c7", color: "#d97706" },
  red: { backgroundColor: "#fee2e2", color: "#dc2626" },
  gray: { backgroundColor: "#f3f4f6", color: "#374151" },
  blue: { backgroundColor: "#dbeafe", color: "#2563eb" },
}

export default function WorkstreamDetail({ workstreamId = "01", onBack }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [workstreamData, setWorkstreamData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Edit functionality states
  const [editingRecordId, setEditingRecordId] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)

  // Column customization state
  const [showFieldSelector, setShowFieldSelector] = useState(false)

  const [selectedFields, setSelectedFields] = useState([
    "id",
    "owner_name",
    "registration_site",
    "accessibility",
    "review_date",
    "review_month",
    "review_year",
  ])
  const [tempSelectedFields, setTempSelectedFields] = useState([])


  // Always visible fields that cannot be hidden
  const alwaysVisibleFields = ["id", "accessibility"]

  // Define all available fields with their display names
  const allFields = {
    id: "ID",
    owner_name: "Owner Name",
    registration_site: "Registration Site",
    accessibility: "Accessibility",
    review_date: "Review Date",
    review_month: "Review Month",
    review_year: "Review Year",
    website_source_id: "Website Source ID",
    third_party_content: "Third Party Content",
    conditional_response: "Conditional Response",
    website_type: "Website Type",
    comments: "Comments",
    website_operator: "Website Operator",
    review_traffic: "Review Traffic",
    calculated_friday: "Calculated Friday",
    images: "Images Count",
    a_checks: "A-Checks",
    created_at: "Created At",
  }

  // Fetch workstream data from API
  const fetchWorkstreamData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Workstream API Response:", data)
      // Handle different possible response structures
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
      console.error("Error fetching workstream data:", err)
      setError(`Failed to load workstream data: ${err.message}`)
      setWorkstreamData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkstreamData()
  }, [workstreamId])

  // Edit functionality
  const handleEditRecord = (recordId) => {
    console.log("🔧 Edit record:", recordId)
    setEditingRecordId(recordId)
    setShowEditForm(true)
  }

  const handleBackToList = () => {
    setShowEditForm(false)
    setEditingRecordId(null)
    // Refresh data after edit
    fetchWorkstreamData()
  }

  const handleSaveRecord = (updatedRecord) => {
    console.log("💾 Record saved:", updatedRecord)
    // Update the local data
    setWorkstreamData((prev) => prev.map((record) => (record.id === updatedRecord.id ? updatedRecord : record)))
  }


  // download
// const handleSingleRecordExport = async (recordId) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/open/workstream-record/${recordId}`)
//     if (!response.ok) {
//       throw new Error("Failed to fetch the record")
//     }

//     const result = await response.json()

//     if (!result?.data || result.data.length === 0) {
//       alert("No data found for this record.")
//       return
//     }

//     const record = result.data[0]

//     // Prepare record data for export with selected fields
//     // const exportRecord = {}
//     // selectedFields.forEach((fieldKey) => {
//     //   const displayName = allFields[fieldKey]
//     //   exportRecord[displayName] =
//     //     fieldKey === "accessibility" ? record[fieldKey] || "N/A" : formatFieldValue(record, fieldKey)
//     // })
//     const exportRecord = {}

// for (const key in record) {
//   const displayName = allFields?.[key] || key // fallback to key name if no displayName
//   exportRecord[displayName] = formatFieldValue(record, key)
// }


//     // Create Excel workbook
//     const workbook = XLSX.utils.book_new()
//     const worksheet = XLSX.utils.json_to_sheet([exportRecord])
//     worksheet["!cols"] = selectedFields.map((fieldKey) => ({
//       wch: Math.max(allFields[fieldKey].length, 15),
//     }))

//     XLSX.utils.book_append_sheet(workbook, worksheet, `Record_${recordId}`)
//     const currentDate = new Date().toISOString().split("T")[0]
//     XLSX.writeFile(workbook, `Workstream_${workstreamId}_Record_${recordId}_${currentDate}.xlsx`)

//     console.log(`✅ Record ${recordId} exported successfully.`)
//   } catch (error) {
//     console.error("Export failed:", error)
//     alert("Export failed. Please try again.")
//   }
// }

const handleSingleRecordExport = async (recordId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-record/${recordId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch the record")
    }

    const result = await response.json()

    if (!result?.data || result.data.length === 0) {
      alert("No data found for this record.")
      return
    }

    const record = result.data[0]

    // Prepare record data for export with selected fields
    const exportRecord = {}
    for (const key in record) {
      const displayName = allFields?.[key] || key // fallback to key name if no display name
      exportRecord[displayName] = formatFieldValue(record, key)
    }

    // Convert record to worksheet and then to CSV
    const worksheet = XLSX.utils.json_to_sheet([exportRecord])
    const csvContent = XLSX.utils.sheet_to_csv(worksheet)

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    const currentDate = new Date().toISOString().split("T")[0]
    link.href = url
    link.setAttribute("download", `Workstream_${workstreamId}_Record_${recordId}_${currentDate}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    console.log(`✅ Record ${recordId} exported successfully.`)
  } catch (error) {
    console.error("Export failed:", error)
    alert("Export failed. Please try again.")
  }
}




  // Column customization functions
  const openFieldSelector = () => {
    setTempSelectedFields([...selectedFields])
    setShowFieldSelector(true)
  }

  const handleFieldToggle = (fieldKey) => {
    if (alwaysVisibleFields.includes(fieldKey)) return // Don't allow toggle of required fields
    setTempSelectedFields((prev) => {
      if (prev.includes(fieldKey)) {
        return prev.filter((f) => f !== fieldKey)
      } else if (prev.length < 10) {
        return [...prev, fieldKey]
      }
      return prev
    })
  }

  const applyFieldSelection = () => {
    if (tempSelectedFields.length === 0) {
      alert("Please select at least one field to display.")
      return
    }
    const finalFields = Array.from(new Set([...alwaysVisibleFields, ...tempSelectedFields]))
    setSelectedFields(finalFields)
    setShowFieldSelector(false)
  }

  const cancelFieldSelection = () => {
    setTempSelectedFields([])
    setShowFieldSelector(false)
  }

  // Format field value for display
  const formatFieldValue = (item, fieldKey) => {
    const value = item[fieldKey]
    switch (fieldKey) {
      case "review_date":
      case "created_at":
      case "calculated_friday":
        return value ? value.split("T")[0] : "N/A"
      case "images":
        try {
          const images = typeof value === "string" ? JSON.parse(value) : value
          return Array.isArray(images) ? images.length : 0
        } catch {
          return 0
        }
      case "a_checks":
        try {
          const checks = typeof value === "string" ? JSON.parse(value) : value
          return Array.isArray(checks) ? `${checks.filter((c) => c.checked).length}/${checks.length}` : "0/0"
        } catch {
          return "0/0"
        }
      default:
        return value || "N/A"
    }
  }

  // Add this function after the formatFieldValue function:
  const exportToExcel = () => {
    try {
      // Prepare data for export with only selected fields
      const exportData = filteredData.map((record) => {
        const exportRecord = {}
        selectedFields.forEach((fieldKey) => {
          const displayName = allFields[fieldKey]
          if (fieldKey === "accessibility") {
            // For accessibility, export the raw value instead of badge
            exportRecord[displayName] = record[fieldKey] || "N/A"
          } else {
            exportRecord[displayName] = formatFieldValue(record, fieldKey)
          }
        })
        return exportRecord
      })
      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      // Set column widths for better formatting
      const columnWidths = selectedFields.map((fieldKey) => {
        const displayName = allFields[fieldKey]
        return { wch: Math.max(displayName.length, 15) }
      })
      worksheet["!cols"] = columnWidths
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, `Workstream ${workstreamId}`)
      // Generate filename with current date
      const currentDate = new Date().toISOString().split("T")[0]
      const filename = `Workstream_${workstreamId}_${currentDate}.xlsx`
      // Save the file
      XLSX.writeFile(workbook, filename)
      console.log(`Exported ${exportData.length} records to ${filename}`)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    }
  }

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

  // Filter data based on search query
  const filteredData = workstreamData.filter(
    (record) =>
      (record.owner_name && record.owner_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.registration_site && record.registration_site.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Show edit form if editing
  if (showEditForm && editingRecordId) {
    return <EditReviewerForm recordId={editingRecordId} onBack={handleBackToList} onSave={handleSaveRecord} />
  }

  return (
    <div style={styles.container}>
      {/* Main Content */}
      <main style={styles.main}>
        {/* Back Button */}
        <button style={styles.backButton} onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Workstream {workstreamId}</h1>
          <div style={styles.actionButtons}>
            <button style={styles.actionButton}>
              <Filter size={16} />
              Filter
            </button>
            <button style={styles.actionButton} onClick={openFieldSelector}>
              <Settings size={16} />
              Manage Columns ({selectedFields.length}/10)
            </button>
            <button
              style={loading || filteredData.length === 0 ? styles.actionButtonDisabled : styles.actionButton}
              onClick={exportToExcel}
              disabled={loading || filteredData.length === 0}
              title={filteredData.length === 0 ? "No data to export" : `Export ${filteredData.length} records to Excel`}
            >
              <Download size={16} />
              Export
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
            <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading workstream data...</div>
          ) : error ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>
          ) : (
            <table style={{ width: "100%" }}>
              <thead style={styles.tableHeader}>
                <tr>
                  {selectedFields.map((fieldKey) => (
                    <th key={fieldKey} style={styles.tableHeaderCell}>
                      {allFields[fieldKey]}
                    </th>
                  ))}
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={selectedFields.length + 1}
                      style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}
                    >
                      {searchQuery ? "No matching records found" : "No workstream data available"}
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
                      {selectedFields.map((fieldKey) => (
                        <td key={fieldKey} style={styles.tableCell}>
                          {fieldKey === "accessibility"
                            ? getAccessibilityBadge(record[fieldKey])
                            : formatFieldValue(record, fieldKey)}
                        </td>
                      ))}
                       {  console.log(record,"record")}
                      {/* <td style={styles.tableCell}>
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
                          onClick={() => handleEditRecord(record.id)}
                          title="Edit Record"
                        >
                          <Edit size={16} />
                        </button>
                          <button
    style={{
      ...styles.button,
      width: "32px",
      height: "32px",
      marginLeft: "8px",
    }}
    onClick={() => handleSingleRecordExport(record.id)}
    title="Download Record"
  >
    <Download size={16} />
  </button>
                      </td> */}
<td style={styles.tableCell}>
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    {/* Edit Button */}
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
      onClick={() => handleEditRecord(record.id)}
      title="Edit Record"
    >
      <Edit size={16} />
    </button>

    {/* Download Button */}
    <button
      style={{
        ...styles.button,
        width: "32px",
        height: "32px",
      }}
      onClick={() => handleSingleRecordExport(record.id)}
      title="Download Record"
    >
      <Download size={16} />
    </button>
  </div>
</td>


                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Field Selection Modal */}
      {showFieldSelector && (
        <div style={styles.modalOverlay}>
          <div style={styles.fieldSelectorModal}>
            <div style={styles.modalHeader}>
              <h3>Customize Table Columns</h3>
              <button onClick={cancelFieldSelection} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.fieldSelectorContent}>
              <p style={styles.instructionText}>
                Select up to 10 fields to display in the table ({tempSelectedFields.length}/10 selected)
              </p>
              <div style={styles.fieldGrid}>
                {Object.entries(allFields).map(([fieldKey, displayName]) => {
                  const isAlwaysVisible = alwaysVisibleFields.includes(fieldKey)
                  const isChecked = tempSelectedFields.includes(fieldKey)
                  const isDisabled = isAlwaysVisible || (!isChecked && tempSelectedFields.length >= 10)
                  return (
                    <label
                      key={fieldKey}
                      style={{
                        ...styles.fieldCheckboxLabel,
                        backgroundColor: isChecked ? "#f0f9ff" : "white",
                        borderColor: isChecked ? "#3b82f6" : "#e5e7eb",
                        opacity: isDisabled && !isAlwaysVisible ? 0.5 : 1,
                        cursor: isDisabled && !isAlwaysVisible ? "not-allowed" : "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleFieldToggle(fieldKey)}
                        disabled={isDisabled}
                        style={styles.checkbox}
                      />
                      <span style={styles.fieldName}>
                        {displayName}
                        {isAlwaysVisible && (
                          <span style={{ fontSize: "12px", color: "#888", marginLeft: "4px" }}>(required)</span>
                        )}
                      </span>
                      {isChecked && <Check size={16} style={styles.checkIcon} />}
                    </label>
                  )
                })}
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                onClick={applyFieldSelection}
                style={{
                  ...styles.applyButton,
                  opacity: tempSelectedFields.length === 0 ? 0.5 : 1,
                  cursor: tempSelectedFields.length === 0 ? "not-allowed" : "pointer",
                }}
                disabled={tempSelectedFields.length === 0}
              >
                Apply Changes
              </button>
              <button onClick={cancelFieldSelection} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
