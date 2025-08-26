// "use client"

// import { useState, useEffect } from "react"
// import { Filter, Download, Share, Plus, Edit, ArrowLeft, Settings, X, Check } from 'lucide-react'
// import EditWorkstream2Form from "../component/EditWorkstream2"
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

// export default function Workstream2Detail({ workstreamId = "02", onBack }) {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [workstreamData, setWorkstreamData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
  
//   // Edit functionality states
//   const [editingRecordId, setEditingRecordId] = useState(null)
//   const [showEditForm, setShowEditForm] = useState(false)
  
//   // Column customization state
//   const [showFieldSelector, setShowFieldSelector] = useState(false)
//   const [selectedFields, setSelectedFields] = useState([
//     "case_no",
//     "test_successful",
//     "card_no",
//     "card_country",
//     "expiry_date",
//     "email",
//     "tested_on_date",
//   ])
//   const [tempSelectedFields, setTempSelectedFields] = useState([])

//   // Always visible fields that cannot be hidden
//   const alwaysVisibleFields = ["case_no", "test_successful"]

//   // Define all available fields with their display names for Workstream 2
//   const allFields = {
//     case_no: "Case No.",
//     test_successful: "Test Successful",
//     card_no: "Card No",
//     card_country: "Card Country",
//     expiry_date: "Expiry Date",
//     cvv: "CVV",
//     email: "Email",
//     tested_url_homepage: "Tested URL Homepage",
//     tested_url: "Tested URL",
//     tested_on_date: "Tested on Date",
//     tested_amount: "Tested Amount",
//     tested_currency: "Tested Currency",
//     billing_address: "Billing Address",
//     billing_phone_number: "Billing Phone Number",
//     billing_name: "Billing Name",
//     declined_message: "Declined Message",
//     not_tested_breakup: "Not Tested Breakup",
//     comments: "Comments",
//     id_verification_required: "ID Verification Required",
//     bypass_id_verification: "Bypass ID Verification",
//     violation_tested_product: "Violation Tested Product",
//     merchant_name: "Merchant Name",
//     log_generated: "Log Generated Y/N",
//     created_at: "Created At",
//   }

//   // Fetch workstream data from API
//   const fetchWorkstreamData = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2`)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       console.log("Workstream 2 API Response:", data)
      
//       // Handle the new response structure with summary
//       if (data.success && data.data) {
//         setWorkstreamData(data.data)
//         console.log("📊 Workstream2 Summary:", data.summary)
//       } else {
//         setWorkstreamData([])
//       }
      
//       setError(null)
//     } catch (err) {
//       console.error("Error fetching workstream 2 data:", err)
//       setError(`Failed to load workstream 2 data: ${err.message}`)
//       setWorkstreamData([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchWorkstreamData()
//   }, [workstreamId])

//   // Edit functionality
//   const handleEditRecord = (recordId) => {
//     console.log("🔧 Edit record:", recordId)
//     setEditingRecordId(recordId)
//     setShowEditForm(true)
//   }

//   const handleBackToList = () => {
//     setShowEditForm(false)
//     setEditingRecordId(null)
//     // Refresh data after edit
//     fetchWorkstreamData()
//   }

//   const handleSaveRecord = (updatedRecord) => {
//     console.log("💾 Record saved:", updatedRecord)
//     // Update the local data
//     setWorkstreamData((prev) => prev.map((record) => (record.case_no === updatedRecord.case_no ? updatedRecord : record)))
//   }

//   const handleSingleRecordExport = async (recordId) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2-record/${recordId}`)
//       if (!response.ok) {
//         throw new Error("Failed to fetch the record")
//       }
//       const result = await response.json()
//       if (!result?.data || result.data.length === 0) {
//         alert("No data found for this record.")
//         return
//       }
//       const record = result.data[0]
      
//       // Prepare record data for export with selected fields
//       const exportRecord = {}
//       for (const key in record) {
//         const displayName = allFields?.[key] || key // fallback to key name if no display name
//         exportRecord[displayName] = formatFieldValue(record, key)
//       }

//       // Convert record to worksheet and then to CSV
//       const worksheet = XLSX.utils.json_to_sheet([exportRecord])
//       const csvContent = XLSX.utils.sheet_to_csv(worksheet)

//       // Create a Blob and trigger download
//       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
//       const url = URL.createObjectURL(blob)
//       const link = document.createElement("a")
//       const currentDate = new Date().toISOString().split("T")[0]
//       link.href = url
//       link.setAttribute("download", `Workstream2_${workstreamId}_Record_${recordId}_${currentDate}.csv`)
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//       console.log(`✅ Record ${recordId} exported successfully.`)
//     } catch (error) {
//       console.error("Export failed:", error)
//       alert("Export failed. Please try again.")
//     }
//   }

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
//       case "expiry_date":
//       case "tested_on_date":
//       case "created_at":
//         return value ? value.split("T")[0] : "N/A"
//       case "tested_amount":
//         return value ? `$${parseFloat(value).toFixed(2)}` : "N/A"
//       case "card_no":
//         // Mask card number for security
//         return value ? `****-****-****-${value.toString().slice(-4)}` : "N/A"
//       case "cvv":
//         // Mask CVV for security
//         return value ? "***" : "N/A"
//       case "billing_address":
//       case "not_tested_breakup":
//         // Truncate long text fields
//         return value ? (value.length > 50 ? `${value.substring(0, 50)}...` : value) : "N/A"
//       default:
//         return value || "N/A"
//     }
//   }

//   const exportToExcel = () => {
//     try {
//       // Prepare data for export with only selected fields
//       const exportData = filteredData.map((record) => {
//         const exportRecord = {}
//         selectedFields.forEach((fieldKey) => {
//           const displayName = allFields[fieldKey]
//           if (fieldKey === "test_successful") {
//             // For test_successful, export the raw value instead of badge
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
//       const filename = `Workstream2_${workstreamId}_${currentDate}.xlsx`

//       // Save the file
//       XLSX.writeFile(workbook, filename)
//       console.log(`Exported ${exportData.length} records to ${filename}`)
//     } catch (error) {
//       console.error("Export failed:", error)
//       alert("Export failed. Please try again.")
//     }
//   }

//   const getTestSuccessfulBadge = (status) => {
//     const badgeStyle = { ...styles.badge }
//     switch (status?.toLowerCase()) {
//       case "yes":
//       case "successful":
//       case "passed":
//         return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Successful</span>
//       case "no":
//       case "failed":
//       case "unsuccessful":
//         return <span style={{ ...badgeStyle, ...badgeVariants.red }}>Failed</span>
//       case "pending":
//         return <span style={{ ...badgeStyle, ...badgeVariants.yellow }}>Pending</span>
//       default:
//         return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{status || "N/A"}</span>
//     }
//   }

//   // Filter data based on search query
//   const filteredData = workstreamData.filter(
//     (record) =>
//       (record.merchant_name && record.merchant_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (record.card_country && record.card_country.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (record.email && record.email.toLowerCase().includes(searchQuery.toLowerCase())),
//   )

//   // Show edit form if editing
//   if (showEditForm && editingRecordId) {
//     return <EditWorkstream2Form recordId={editingRecordId} onBack={handleBackToList} onSave={handleSaveRecord} />
//   }

//   return (
//     <div style={styles.container}>
//       {/* Main Content */}
//       <main style={styles.main}>
//         {/* Back Button */}
//         <button style={styles.backButton} onClick={onBack}>
//           <ArrowLeft size={16} />
//           Back to Dashboard
//         </button>

//         {/* Page Header */}
//         <div style={styles.pageHeader}>
//           <h1 style={styles.pageTitle}>Workstream {workstreamId} - Payment Testing</h1>
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
//             <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading workstream 2 data...</div>
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
//                       {searchQuery ? "No matching records found" : "No workstream 2 data available"}
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredData.map((record) => (
//                     <tr
//                       key={record.case_no}
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
//                           {fieldKey === "test_successful"
//                             ? getTestSuccessfulBadge(record[fieldKey])
//                             : formatFieldValue(record, fieldKey)}
//                         </td>
//                       ))}
//                       <td style={styles.tableCell}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                           {/* Edit Button */}
//                           <button
//                             style={{
//                               ...styles.button,
//                               width: "32px",
//                               height: "32px",
//                             }}
//                             onMouseEnter={(e) => {
//                               e.target.style.backgroundColor = "#f3f4f6"
//                             }}
//                             onMouseLeave={(e) => {
//                               e.target.style.backgroundColor = "transparent"
//                             }}
//                             onClick={() => handleEditRecord(record.case_no)}
//                             title="Edit Record"
//                           >
//                             <Edit size={16} />
//                           </button>
//                           {/* Download Button */}
//                           <button
//                             style={{
//                               ...styles.button,
//                               width: "32px",
//                               height: "32px",
//                             }}
//                             onClick={() => handleSingleRecordExport(record.case_no)}
//                             title="Download Record"
//                           >
//                             <Download size={16} />
//                           </button>
//                         </div>
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
import { Filter, Download, Share, Plus, Edit, ArrowLeft, Settings, X, Check, Eye } from "lucide-react"
import EditWorkstream2Form from "../component/EditWorkstream2"
import * as XLSX from "xlsx"

// Inline styles object
const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f9fafb" },
  main: { padding: "24px", maxWidth: "1400px", margin: "0 auto" },
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
  pageTitle: { fontSize: "24px", fontWeight: "600", color: "#111827" },
  actionButtons: { display: "flex", alignItems: "center", gap: "12px" },
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
  primaryButton: { backgroundColor: "#3b82f6", color: "white", border: "1px solid #3b82f6" },
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
  table: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  },
  tableHeader: { backgroundColor: "#f9fafb" },
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
  tableRow: { borderBottom: "1px solid #f3f4f6" },
  tableCell: { padding: "16px 24px", fontSize: "14px", whiteSpace: "nowrap" },
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
  modalBox: {
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "800px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "10px",
  },
  closeButton: { background: "transparent", border: "none", cursor: "pointer", padding: "4px" },
}

// Badge colors
const badgeVariants = {
  green: { backgroundColor: "#dcfce7", color: "#16a34a" },
  yellow: { backgroundColor: "#fef3c7", color: "#d97706" },
  red: { backgroundColor: "#fee2e2", color: "#dc2626" },
  gray: { backgroundColor: "#f3f4f6", color: "#374151" },
}

export default function Workstream2Detail({ workstreamId = "02", onBack }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [workstreamData, setWorkstreamData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Edit states
  const [editingRecordId, setEditingRecordId] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)

  // View states
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewRecord, setViewRecord] = useState(null)

  // Column customization
  const [showFieldSelector, setShowFieldSelector] = useState(false)
  const [selectedFields, setSelectedFields] = useState([
    "case_no",
    "test_successful",
    "card_no",
    "card_country",
    "expiry_date",
    "email",
    "tested_on_date",
  ])
  const [tempSelectedFields, setTempSelectedFields] = useState([])
  const alwaysVisibleFields = ["case_no", "test_successful"]

  const allFields = {
    case_no: "Case No.",
    test_successful: "Test Successful",
    card_no: "Card No",
    card_country: "Card Country",
    expiry_date: "Expiry Date",
    cvv: "CVV",
    email: "Email",
    tested_url_homepage: "Tested URL Homepage",
    tested_url: "Tested URL",
    tested_on_date: "Tested on Date",
    tested_amount: "Tested Amount",
    tested_currency: "Tested Currency",
    billing_address: "Billing Address",
    billing_phone_number: "Billing Phone Number",
    billing_name: "Billing Name",
    declined_message: "Declined Message",
    not_tested_breakup: "Not Tested Breakup",
    comments: "Comments",
    id_verification_required: "ID Verification Required",
    bypass_id_verification: "Bypass ID Verification",
    violation_tested_product: "Violation Tested Product",
    merchant_name: "Merchant Name",
    log_generated: "Log Generated Y/N",
    created_at: "Created At",
  }

  // Fetch workstream2 data
  const fetchWorkstreamData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2`)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (data.success && data.data) {
        setWorkstreamData(data.data)
      } else {
        setWorkstreamData([])
      }
      setError(null)
    } catch (err) {
      setError(`Failed to load workstream 2 data: ${err.message}`)
      setWorkstreamData([])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchWorkstreamData()
  }, [workstreamId])

  // --- Edit ---
  const handleEditRecord = (recordId) => {
    setEditingRecordId(recordId)
    setShowEditForm(true)
  }
  const handleBackToList = () => {
    setShowEditForm(false)
    setEditingRecordId(null)
    fetchWorkstreamData()
  }
  const handleSaveRecord = (updatedRecord) => {
    setWorkstreamData((prev) => prev.map((r) => (r.case_no === updatedRecord.case_no ? updatedRecord : r)))
  }

  // --- View ---
  const handleViewRecord = (record) => {
    setViewRecord(record)
    setShowViewModal(true)
  }
  const handleCloseViewModal = () => {
    setViewRecord(null)
    setShowViewModal(false)
  }

  // Format field value
  const formatFieldValue = (item, fieldKey) => {
    const value = item[fieldKey]
    switch (fieldKey) {
      case "expiry_date":
      case "tested_on_date":
      case "created_at":
        return value ? value.split("T")[0] : "N/A"
      case "tested_amount":
        return value ? `$${parseFloat(value).toFixed(2)}` : "N/A"
      case "card_no":
        return value ? `****-****-****-${value.toString().slice(-4)}` : "N/A"
      case "cvv":
        return value ? "***" : "N/A"
      case "billing_address":
      case "not_tested_breakup":
        return value ? (value.length > 50 ? `${value.substring(0, 50)}...` : value) : "N/A"
      default:
        return value || "N/A"
    }
  }

  const getTestSuccessfulBadge = (status) => {
    const badgeStyle = { ...styles.badge }
    switch (status?.toLowerCase()) {
      case "yes":
      case "successful":
      case "passed":
        return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Successful</span>
      case "no":
      case "failed":
      case "unsuccessful":
        return <span style={{ ...badgeStyle, ...badgeVariants.red }}>Failed</span>
      case "pending":
        return <span style={{ ...badgeStyle, ...badgeVariants.yellow }}>Pending</span>
      default:
        return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{status || "N/A"}</span>
    }
  }

  const filteredData = workstreamData.filter(
    (record) =>
      (record.merchant_name && record.merchant_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.card_country && record.card_country.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.email && record.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Show edit form
  if (showEditForm && editingRecordId) {
    return <EditWorkstream2Form recordId={editingRecordId} onBack={handleBackToList} onSave={handleSaveRecord} />
  }

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {/* Back Button */}
        <button style={styles.backButton} onClick={onBack}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Page Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Workstream {workstreamId} - Payment Testing</h1>
        </div>

        {/* Data Table */}
        <div style={styles.table}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>
          ) : error ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>
          ) : (
            <table style={{ width: "100%" }}>
              <thead style={styles.tableHeader}>
                <tr>
                  {selectedFields.map((f) => (
                    <th key={f} style={styles.tableHeaderCell}>
                      {allFields[f]}
                    </th>
                  ))}
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={selectedFields.length + 1} style={{ textAlign: "center", padding: "20px" }}>
                      No data
                    </td>
                  </tr>
                ) : (
                  filteredData.map((record) => (
                    <tr key={record.case_no} style={styles.tableRow}>
                      {selectedFields.map((f) => (
                        <td key={f} style={styles.tableCell}>
                          {f === "test_successful" ? getTestSuccessfulBadge(record[f]) : formatFieldValue(record, f)}
                        </td>
                      ))}
                      <td style={styles.tableCell}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button style={styles.button} onClick={() => handleViewRecord(record)} title="View">
                            <Eye size={16} />
                          </button>
                          <button style={styles.button} onClick={() => handleEditRecord(record.case_no)} title="Edit">
                            <Edit size={16} />
                          </button>
                          <button
                            style={styles.button}
                            onClick={() => handleSingleRecordExport(record.case_no)}
                            title="Download"
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

      {/* View Modal */}
      {showViewModal && viewRecord && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <h3>Record Details</h3>
              <button onClick={handleCloseViewModal} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {Object.entries(allFields).map(([key, label]) => (
                  <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ fontWeight: "600", padding: "8px", width: "40%" }}>{label}</td>
                    <td style={{ padding: "8px" }}>
                      {key === "test_successful"
                        ? getTestSuccessfulBadge(viewRecord[key])
                        : formatFieldValue(viewRecord, key)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

