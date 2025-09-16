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

// export default function WorkstreamDetail3({ onBack }) {
//   const [searchQuery, setSearchQuery] = useState("")

//   return (
//     <div style={styles.container}>
//       {/* Header */}
     

//       {/* Main Content */}
//       <main style={styles.main}>
//         <button style={styles.backButton} onClick={onBack}>
//           <ArrowLeft size={16} />
//           Back to Dashboard
//         </button>

//         <div style={styles.pageHeader}>
//           <h1 style={styles.pageTitle}>Workstreamsssssssssss 03</h1>
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
//                     <div style={{ fontSize: "16px", marginBottom: "8px" }}>No records found for Workstream 03</div>
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










// "use client"

// import { useState, useEffect } from "react"
// import {
//   Filter,
//   Download,
//   Share,
//   Plus,
//   ArrowLeft,
//   Settings,
//   Eye,
//   Edit,
//   Trash2,
//   X,
//   Save,
// } from "lucide-react"

// // --- Styles ---
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f9fafb" },
//   main: { padding: "24px", maxWidth: "1400px", margin: "0 auto" },
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
//   pageTitle: { fontSize: "24px", fontWeight: "600", color: "#111827" },
//   actionButtons: { display: "flex", alignItems: "center", gap: "12px" },
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
//   primaryButton: { backgroundColor: "#3b82f6", color: "white", border: "1px solid #3b82f6" },
//   table: {
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: "8px",
//     overflow: "hidden",
//     boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//   },
//   tableHeader: { backgroundColor: "#f9fafb" },
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
//   tableCell: { padding: "16px 24px", fontSize: "14px", whiteSpace: "nowrap" },
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
//   // Modal
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0,0,0,0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     background: "white",
//     borderRadius: "8px",
//     padding: "24px",
//     maxWidth: "600px",
//     width: "90%",
//     maxHeight: "80vh",
//     overflowY: "auto",
//     position: "relative",
//   },
//   modalHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "16px",
//   },
//   modalTitle: { fontSize: "18px", fontWeight: "600", color: "#111827" },
//   closeButton: {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     color: "#6b7280",
//   },
//   fieldRow: { marginBottom: "12px" },
//   fieldLabel: { fontWeight: "500", color: "#374151", marginRight: "6px" },
//   fieldValue: { color: "#111827" },
//   // Edit form
//   formGroup: { marginBottom: "16px" },
//   label: { fontWeight: "600", marginBottom: "4px", display: "block" },
//   input: { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" },
//   saveBtn: {
//     backgroundColor: "#3b82f6",
//     color: "white",
//     padding: "10px 16px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//   },
// }

// // ---------------- MAIN COMPONENT -----------------
// export default function WorkstreamDetail3({ onBack }) {
//   const [submissions, setSubmissions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const [selectedSubmission, setSelectedSubmission] = useState(null) // for View Modal
//   const [editingRecordId, setEditingRecordId] = useState(null) // for Edit Page
//   const [formData, setFormData] = useState({}) // dynamic form

//   useEffect(() => {
//     fetchSubmissions()
//   }, [])

//   const fetchSubmissions = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3`)
//       const result = await response.json()
//       if (result.success) setSubmissions(result.data)
//       else setError("Failed to load submissions")
//     } catch (err) {
//       console.error("Error fetching submissions:", err)
//       setError("Failed to load submissions")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Parse JSON safely
//   const parseSubmission = (submission) => {
//     try {
//       return typeof submission === "string" ? JSON.parse(submission) : submission
//     } catch {
//       return {}
//     }
//   }

//   // ---------------- Handlers -----------------
//   const handleView = (submission) => setSelectedSubmission(submission)

//   const handleEdit = async (id) => {
//     setEditingRecordId(id)
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${id}`)
//       const data = await res.json()
//       if (data.success) {
//         setFormData(parseSubmission(data.data.submission))
//       }
//     } catch (err) {
//       console.error("Error fetching record:", err)
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${id}`, {
//         method: "DELETE",
//       })
//       const result = await response.json()
//       if (result.success) {
//         setSubmissions((prev) => prev.filter((s) => s.id !== id))
//       } else {
//         alert("Failed to delete record")
//       }
//     } catch (err) {
//       console.error("Delete error:", err)
//       alert("Error deleting record")
//     }
//   }

//   const handleFormChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }))
//   }

//   const handleSave = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${editingRecordId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ submission: formData }),
//       })
//       const result = await res.json()
//       if (result.success) {
//         alert("Record updated successfully")
//         setEditingRecordId(null)
//         fetchSubmissions()
//       } else {
//         alert("Failed to update record")
//       }
//     } catch (err) {
//       console.error("Update error:", err)
//       alert("Error updating record")
//     }
//   }

//   // ---------------- Render -----------------
//   if (editingRecordId) {
//     return (
//       <div style={styles.container}>
//         <main style={styles.main}>
//           <button style={styles.backButton} onClick={() => setEditingRecordId(null)}>
//             <ArrowLeft size={16} /> Back
//           </button>
//           <h2>Edit Workstream 3 Record</h2>

//           {Object.entries(formData).map(([key, value]) => (
//             <div key={key} style={styles.formGroup}>
//               <label style={styles.label}>{key}</label>
//               <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => handleFormChange(key, e.target.value)}
//                 style={styles.input}
//               />
//             </div>
//           ))}

//           <button onClick={handleSave} style={styles.saveBtn}>
//             <Save size={16} /> Save Changes
//           </button>
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div style={styles.container}>
//       <main style={styles.main}>
//         {/* Back Button */}
//         <button style={styles.backButton} onClick={onBack}>
//           <ArrowLeft size={16} /> Back to Dashboard
//         </button>

//         {/* Page Header */}
//         <div style={styles.pageHeader}>
//           <h1 style={styles.pageTitle}>Workstream 03</h1>
//           <div style={styles.actionButtons}>
//             <button style={styles.actionButton}>
//               <Filter size={16} /> Filter
//             </button>
//             <button style={styles.actionButton}>
//               <Settings size={16} /> Manage Columns
//             </button>
//             <button style={styles.actionButton}>
//               <Download size={16} /> Export ({submissions.length})
//             </button>
//             <button style={styles.actionButton}>
//               <Share size={16} /> Share
//             </button>
//             <button style={{ ...styles.actionButton, ...styles.primaryButton }}>
//               <Plus size={16} /> Add New
//             </button>
//           </div>
//         </div>

//         {/* Data Table */}
//         <div style={styles.table}>
//           <table style={{ width: "100%" }}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th style={styles.tableHeaderCell}>ID</th>
//                 <th style={styles.tableHeaderCell}>Created At</th>
//                 <th style={styles.tableHeaderCell}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="3" style={{ ...styles.tableCell, textAlign: "center", padding: "40px" }}>
//                     Loading submissions...
//                   </td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan="3" style={{ ...styles.tableCell, textAlign: "center", color: "#ef4444", padding: "40px" }}>
//                     {error}
//                   </td>
//                 </tr>
//               ) : submissions.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" style={{ ...styles.tableCell, textAlign: "center", padding: "40px" }}>
//                     No records found for Workstream 03
//                   </td>
//                 </tr>
//               ) : (
//                 submissions.map((submission, index) => (
//                   <tr key={submission.id} style={{ borderBottom: index < submissions.length - 1 ? "1px solid #f3f4f6" : "none" }}>
//                     <td style={styles.tableCell}>{submission.id}</td>
//                     <td style={styles.tableCell}>{new Date(submission.created_at).toLocaleString()}</td>
//                     <td style={styles.tableCell}>
//                       <div style={{ display: "flex", gap: "8px" }}>
//                         <button style={styles.button} onClick={() => handleView(submission)} title="View">
//                           <Eye size={16} />
//                         </button>
//                         <button style={styles.button} onClick={() => handleEdit(submission.id)} title="Edit">
//                           <Edit size={16} />
//                         </button>
//                         <button style={styles.button} onClick={() => handleDelete(submission.id)} title="Delete">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* View Modal */}
//         {selectedSubmission && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <div style={styles.modalHeader}>
//                 <h2 style={styles.modalTitle}>Submission Details</h2>
//                 <button style={styles.closeButton} onClick={() => setSelectedSubmission(null)}>
//                   <X size={20} />
//                 </button>
//               </div>
//               <div>
//                 {Object.entries(parseSubmission(selectedSubmission.submission)).map(([key, value]) => (
//                   <div key={key} style={styles.fieldRow}>
//                     <span style={styles.fieldLabel}>{key}:</span>
//                     <span style={styles.fieldValue}>{String(value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }




// "use client"

// import { useState, useEffect } from "react"
// import { Filter, Download, Share, Plus, ArrowLeft, Settings, Eye, Edit, Trash2, X, Save } from "lucide-react"

// // --- Styles ---
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f9fafb" },
//   main: { padding: "24px", maxWidth: "1400px", margin: "0 auto" },
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
//   pageTitle: { fontSize: "24px", fontWeight: "600", color: "#111827" },
//   actionButtons: { display: "flex", alignItems: "center", gap: "12px" },
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
//   primaryButton: { backgroundColor: "#3b82f6", color: "white", border: "1px solid #3b82f6" },
//   table: {
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: "8px",
//     overflow: "hidden",
//     boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//   },
//   tableHeader: { backgroundColor: "#f9fafb" },
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
//   tableCell: { padding: "16px 24px", fontSize: "14px", whiteSpace: "nowrap" },
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
//   // Modal
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0,0,0,0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     background: "white",
//     borderRadius: "8px",
//     padding: "24px",
//     maxWidth: "600px",
//     width: "90%",
//     maxHeight: "80vh",
//     overflowY: "auto",
//     position: "relative",
//   },
//   modalHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "16px",
//   },
//   modalTitle: { fontSize: "18px", fontWeight: "600", color: "#111827" },
//   closeButton: {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     color: "#6b7280",
//   },
//   fieldRow: { marginBottom: "12px" },
//   fieldLabel: { fontWeight: "500", color: "#374151", marginRight: "6px" },
//   fieldValue: { color: "#111827" },
//   // Edit form
//   formGroup: { marginBottom: "16px" },
//   label: { fontWeight: "600", marginBottom: "4px", display: "block" },
//   input: { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" },
//   saveBtn: {
//     backgroundColor: "#3b82f6",
//     color: "white",
//     padding: "10px 16px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//   },
// }

// // ---------------- MAIN COMPONENT -----------------
// export default function WorkstreamDetail3({ onBack }) {
//   const [submissions, setSubmissions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const [selectedSubmission, setSelectedSubmission] = useState(null) // for View Modal
//   const [editingRecordId, setEditingRecordId] = useState(null) // for Edit Page
//   const [formData, setFormData] = useState({}) // dynamic form
//   const [formSchema, setFormSchema] = useState([])
//   const [editFormLoading, setEditFormLoading] = useState(false)

//   useEffect(() => {
//     fetchSubmissions()
//   }, [])

//   const fetchSubmissions = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3`)
//       const result = await response.json()
//       if (result.success) setSubmissions(result.data)
//       else setError("Failed to load submissions")
//     } catch (err) {
//       console.error("Error fetching submissions:", err)
//       setError("Failed to load submissions")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchFormSchema = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream3/field-config`)
//       if (response.ok) {
//         const result = await response.json()
//         if (result.success) {
//           setFormSchema(result.data)
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching form schema:", error)
//     }
//   }

//   const parseSubmission = (submission) => {
//     try {
//       return typeof submission === "string" ? JSON.parse(submission) : submission
//     } catch {
//       return {}
//     }
//   }

//   const handleView = (submission) => setSelectedSubmission(submission)

//   const handleEdit = async (id) => {
//     setEditingRecordId(id)
//     setEditFormLoading(true)
//     try {
//       await fetchFormSchema()
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${id}`)
//       const data = await res.json()
//       if (data.success) {
//         setFormData(parseSubmission(data.data.submission))
//       }
//     } catch (err) {
//       console.error("Error fetching record:", err)
//     } finally {
//       setEditFormLoading(false)
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${id}`, {
//         method: "DELETE",
//       })
//       const result = await response.json()
//       if (result.success) {
//         setSubmissions((prev) => prev.filter((s) => s.id !== id))
//       } else {
//         alert("Failed to delete record")
//       }
//     } catch (err) {
//       console.error("Delete error:", err)
//       alert("Error deleting record")
//     }
//   }

//   const handleFormChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }))
//   }

//   const handleCheckboxGroupChange = (fieldLabel, optionValue, checked) => {
//     setFormData((prev) => {
//       const currentValues = prev[fieldLabel] || []
//       if (checked) {
//         return { ...prev, [fieldLabel]: [...currentValues, optionValue] }
//       } else {
//         return { ...prev, [fieldLabel]: currentValues.filter((v) => v !== optionValue) }
//       }
//     })
//   }

//   const handleExpiryDateChange = (fieldLabel, value) => {
//     let cleaned = value.replace(/\D/g, "")
//     if (cleaned.length >= 2) {
//       cleaned = cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4)
//     }
//     if (cleaned.length > 5) {
//       cleaned = cleaned.substring(0, 5)
//     }
//     handleFormChange(fieldLabel, cleaned)
//   }

//   const renderField = (field, index) => {
//     const { label, type, required, options } = field
//     const value = formData[label] || ""

//     const isExpiryField = label.toLowerCase().includes("expiry") && type === "text"

//     const parseOptions = (optionsData) => {
//       if (!optionsData) return []
//       if (Array.isArray(optionsData)) return optionsData
//       const optionsString = String(optionsData)
//       try {
//         const parsed = JSON.parse(optionsString)
//         return Array.isArray(parsed) ? parsed : []
//       } catch (error) {
//         return optionsString
//           .split(",")
//           .map((option) => option.trim())
//           .filter((option) => option.length > 0)
//       }
//     }

//     const fieldStyles = {
//       formGroup: { marginBottom: "16px" },
//       label: { fontWeight: "600", marginBottom: "4px", display: "block", color: "#374151" },
//       input: {
//         width: "100%",
//         padding: "12px",
//         border: "2px solid #e9ecef",
//         borderRadius: "8px",
//         fontSize: "14px",
//         fontFamily: "inherit",
//       },
//       select: {
//         width: "100%",
//         padding: "12px",
//         border: "2px solid #e9ecef",
//         borderRadius: "8px",
//         fontSize: "14px",
//         fontFamily: "inherit",
//         backgroundColor: "white",
//       },
//       textarea: {
//         width: "100%",
//         padding: "12px",
//         border: "2px solid #e9ecef",
//         borderRadius: "8px",
//         fontSize: "14px",
//         fontFamily: "inherit",
//         resize: "vertical",
//         minHeight: "80px",
//       },
//       radioGroup: { display: "flex", flexDirection: "column", gap: "8px" },
//       radioOption: { display: "flex", alignItems: "center", gap: "8px" },
//       helpText: { fontSize: "12px", color: "#6b7280", marginTop: "4px" },
//     }

//     switch (type) {
//       case "text":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="text"
//               placeholder={`Enter ${label.toLowerCase()}`}
//               value={value}
//               onChange={(e) =>
//                 isExpiryField ? handleExpiryDateChange(label, e.target.value) : handleFormChange(label, e.target.value)
//               }
//               required={required}
//               style={fieldStyles.input}
//               {...(isExpiryField && {
//                 pattern: "^(0[1-9]|1[0-2])\\/([0-9]{2})$",
//                 maxLength: "5",
//                 title: "Enter expiry date in MM/YY format",
//               })}
//             />
//             {isExpiryField && <div style={fieldStyles.helpText}>Enter in MM/YY format (e.g., 09/25)</div>}
//           </div>
//         )

//       case "textarea":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <textarea
//               placeholder={`Enter ${label.toLowerCase()}`}
//               value={value}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.textarea}
//             />
//           </div>
//         )

//       case "number":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="number"
//               placeholder={`Enter ${label.toLowerCase()}`}
//               value={value}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.input}
//               {...(label.toLowerCase().includes("amount") && { step: "0.01" })}
//             />
//           </div>
//         )

//       case "date":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="date"
//               value={value}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.input}
//             />
//           </div>
//         )

//       case "email":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="email"
//               placeholder={`Enter ${label.toLowerCase()}`}
//               value={value}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.input}
//             />
//           </div>
//         )

//       case "url":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="url"
//               placeholder={`Enter ${label.toLowerCase()}`}
//               value={value}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.input}
//             />
//           </div>
//         )

//       case "password":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="password"
//               placeholder={`Enter ${label.toLowerCase()}`}
//               value={value}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.input}
//             />
//           </div>
//         )

//       case "select":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <select
//               value={value}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.select}
//             >
//               <option value="">Select {label.toLowerCase()}</option>
//               {parseOptions(options).map((option, optIndex) => (
//                 <option key={optIndex} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )

//       case "radio":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <div style={fieldStyles.radioGroup}>
//               {parseOptions(options).map((option, optIndex) => (
//                 <label key={optIndex} style={fieldStyles.radioOption}>
//                   <input
//                     type="radio"
//                     name={`field-${index}`}
//                     value={option}
//                     checked={value === option}
//                     onChange={(e) => handleFormChange(label, e.target.value)}
//                     required={required}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           </div>
//         )

//       case "checkbox":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.radioOption}>
//               <input
//                 type="checkbox"
//                 checked={value === true || value === "true"}
//                 onChange={(e) => handleFormChange(label, e.target.checked)}
//                 required={required}
//               />
//               {label} {required && "*"}
//             </label>
//           </div>
//         )

//       case "checkbox-group":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <div style={fieldStyles.radioGroup}>
//               {parseOptions(options).map((option, optIndex) => (
//                 <label key={optIndex} style={fieldStyles.radioOption}>
//                   <input
//                     type="checkbox"
//                     checked={(value || []).includes(option)}
//                     onChange={(e) => handleCheckboxGroupChange(label, option, e.target.checked)}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           </div>
//         )

//       case "file":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="file"
//               onChange={(e) => handleFormChange(label, e.target.files[0])}
//               required={required}
//               style={fieldStyles.input}
//             />
//           </div>
//         )

//       case "color":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="color"
//               value={value || "#000000"}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.input}
//             />
//           </div>
//         )

//       case "range":
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"} (Value: {value || 0})
//             </label>
//             <input
//               type="range"
//               value={value || 0}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               min="0"
//               max="100"
//               style={fieldStyles.input}
//             />
//           </div>
//         )

//       default:
//         return (
//           <div style={fieldStyles.formGroup} key={index}>
//             <label style={fieldStyles.label}>
//               {label} {required && "*"}
//             </label>
//             <input
//               type="text"
//               placeholder={`Enter ${label.toLowerCase()}`}
//               value={value}
//               onChange={(e) => handleFormChange(label, e.target.value)}
//               required={required}
//               style={fieldStyles.input}
//             />
//           </div>
//         )
//     }
//   }

//   const handleSave = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${editingRecordId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ submission: formData }),
//       })
//       const result = await res.json()
//       if (result.success) {
//         alert("Record updated successfully")
//         setEditingRecordId(null)
//         fetchSubmissions()
//       } else {
//         alert("Failed to update record")
//       }
//     } catch (err) {
//       console.error("Update error:", err)
//       alert("Error updating record")
//     }
//   }

//   if (editingRecordId) {
//     return (
//       <div style={styles.container}>
//         <main style={styles.main}>
//           <button style={styles.backButton} onClick={() => setEditingRecordId(null)}>
//             <ArrowLeft size={16} /> Back
//           </button>
//           <h2 style={styles.pageTitle}>Edit Workstream 3 Record</h2>

//           {editFormLoading ? (
//             <div style={{ textAlign: "center", padding: "40px" }}>
//               <p>Loading form configuration...</p>
//             </div>
//           ) : formSchema.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "40px" }}>
//               <p>No form fields configured. Please contact administrator.</p>
//             </div>
//           ) : (
//             <div
//               style={{
//                 backgroundColor: "white",
//                 padding: "24px",
//                 borderRadius: "8px",
//                 boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               {formSchema.map((field, index) => renderField(field, index))}

//               <button onClick={handleSave} style={styles.saveBtn}>
//                 <Save size={16} /> Save Changes
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div style={styles.container}>
//       <main style={styles.main}>
//         {/* Back Button */}
//         <button style={styles.backButton} onClick={onBack}>
//           <ArrowLeft size={16} /> Back to Dashboard
//         </button>

//         {/* Page Header */}
//         <div style={styles.pageHeader}>
//           <h1 style={styles.pageTitle}>Workstream 03</h1>
//           <div style={styles.actionButtons}>
//             <button style={styles.actionButton}>
//               <Filter size={16} /> Filter
//             </button>
//             <button style={styles.actionButton}>
//               <Settings size={16} /> Manage Columns
//             </button>
//             <button style={styles.actionButton}>
//               <Download size={16} /> Export ({submissions.length})
//             </button>
//             <button style={styles.actionButton}>
//               <Share size={16} /> Share
//             </button>
//             <button style={{ ...styles.actionButton, ...styles.primaryButton }}>
//               <Plus size={16} /> Add New
//             </button>
//           </div>
//         </div>

//         {/* Data Table */}
//         <div style={styles.table}>
//           <table style={{ width: "100%" }}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th style={styles.tableHeaderCell}>ID</th>
//                 <th style={styles.tableHeaderCell}>Created At</th>
//                 <th style={styles.tableHeaderCell}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="3" style={{ ...styles.tableCell, textAlign: "center", padding: "40px" }}>
//                     Loading submissions...
//                   </td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td
//                     colSpan="3"
//                     style={{ ...styles.tableCell, textAlign: "center", color: "#ef4444", padding: "40px" }}
//                   >
//                     {error}
//                   </td>
//                 </tr>
//               ) : submissions.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" style={{ ...styles.tableCell, textAlign: "center", padding: "40px" }}>
//                     No records found for Workstream 03
//                   </td>
//                 </tr>
//               ) : (
//                 submissions.map((submission, index) => (
//                   <tr
//                     key={submission.id}
//                     style={{ borderBottom: index < submissions.length - 1 ? "1px solid #f3f4f6" : "none" }}
//                   >
//                     <td style={styles.tableCell}>{submission.id}</td>
//                     <td style={styles.tableCell}>{new Date(submission.created_at).toLocaleString()}</td>
//                     <td style={styles.tableCell}>
//                       <div style={{ display: "flex", gap: "8px" }}>
//                         <button style={styles.button} onClick={() => handleView(submission)} title="View">
//                           <Eye size={16} />
//                         </button>
//                         <button style={styles.button} onClick={() => handleEdit(submission.id)} title="Edit">
//                           <Edit size={16} />
//                         </button>
//                         <button style={styles.button} onClick={() => handleDelete(submission.id)} title="Delete">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* View Modal */}
//         {selectedSubmission && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <div style={styles.modalHeader}>
//                 <h2 style={styles.modalTitle}>Submission Details</h2>
//                 <button style={styles.closeButton} onClick={() => setSelectedSubmission(null)}>
//                   <X size={20} />
//                 </button>
//               </div>
//               <div>
//                 {Object.entries(parseSubmission(selectedSubmission.submission)).map(([key, value]) => (
//                   <div key={key} style={styles.fieldRow}>
//                     <span style={styles.fieldLabel}>{key}:</span>
//                     <span style={styles.fieldValue}>{String(value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }








"use client"

import { useState, useEffect } from "react"
import {
  Filter,
  Download,
  Share,
  Plus,
  ArrowLeft,
  Settings,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react"
import EditWorkstream3 from "../component/EditWorkstream3" // ✅ new import

// --- Styles ---
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
  tableCell: { padding: "16px 24px", fontSize: "14px", whiteSpace: "nowrap" },
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
  // Modal
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  modalTitle: { fontSize: "18px", fontWeight: "600", color: "#111827" },
  closeButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#6b7280",
  },
  fieldRow: { marginBottom: "12px" },
  fieldLabel: { fontWeight: "500", color: "#374151", marginRight: "6px" },
  fieldValue: { color: "#111827" },
}

export default function WorkstreamDetail3({ onBack }) {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedSubmission, setSelectedSubmission] = useState(null) // View Modal
  const [editingRecordId, setEditingRecordId] = useState(null) // Edit Page toggle

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3`)
      const result = await response.json()
      if (result.success) setSubmissions(result.data)
      else setError("Failed to load submissions")
    } catch (err) {
      console.error("Error fetching submissions:", err)
      setError("Failed to load submissions")
    } finally {
      setLoading(false)
    }
  }

  const parseSubmission = (submission) => {
    try {
      return typeof submission === "string" ? JSON.parse(submission) : submission
    } catch {
      return {}
    }
  }

  const handleView = (submission) => setSelectedSubmission(submission)

  const handleDownload = (submission) => {
  try {
    const parsed = parseSubmission(submission.submission)
    const csvRows = []

    // Add headers
    csvRows.push(Object.keys(parsed).join(","))

    // Add values
    csvRows.push(Object.values(parsed).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `workstream3_record_${submission.id}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error("CSV Download Error:", err)
    alert("Failed to download CSV")
  }
}


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()
      if (result.success) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id))
      } else {
        alert("Failed to delete record")
      }
    } catch (err) {
      console.error("Delete error:", err)
      alert("Error deleting record")
    }
  }

  // ✅ Show EditWorkstream3 if editing
  if (editingRecordId) {
    return (
      <EditWorkstream3
        recordId={editingRecordId}
        onBack={() => setEditingRecordId(null)}
        onSave={fetchSubmissions}
      />
    )
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
          <h1 style={styles.pageTitle}>Workstream 03</h1>
          {/* <div style={styles.actionButtons}>
            <button style={styles.actionButton}>
              <Filter size={16} /> Filter
            </button>
            <button style={styles.actionButton}>
              <Settings size={16} /> Manage Columns
            </button>
            <button style={styles.actionButton}>
              <Download size={16} /> Export ({submissions.length})
            </button>
            <button style={styles.actionButton}>
              <Share size={16} /> Share
            </button>
            <button style={{ ...styles.actionButton, ...styles.primaryButton }}>
              <Plus size={16} /> Add New
            </button>
          </div> */}
        </div>

        {/* Data Table */}
        <div style={styles.table}>
          <table style={{ width: "100%" }}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>ID</th>
                <th style={styles.tableHeaderCell}>Created At</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" style={{ ...styles.tableCell, textAlign: "center", padding: "40px" }}>
                    Loading submissions...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="3"
                    style={{ ...styles.tableCell, textAlign: "center", color: "#ef4444", padding: "40px" }}
                  >
                    {error}
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ ...styles.tableCell, textAlign: "center", padding: "40px" }}>
                    No records found for Workstream 03
                  </td>
                </tr>
              ) : (
                submissions.map((submission, index) => (
                  <tr
                    key={submission.id}
                    style={{ borderBottom: index < submissions.length - 1 ? "1px solid #f3f4f6" : "none" }}
                  >
                    <td style={styles.tableCell}>{submission.id}</td>
                    <td style={styles.tableCell}>{new Date(submission.created_at).toLocaleString()}</td>
                    <td style={styles.tableCell}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button style={styles.button} onClick={() => handleView(submission)} title="View">
                          <Eye size={16} />
                        </button>
                        <button style={styles.button} onClick={() => setEditingRecordId(submission.id)} title="Edit">
                          <Edit size={16} />
                        </button>
                            <button style={styles.button} onClick={() => handleDownload(submission)} title="Download">
      <Download size={16} />
    </button>
                    
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {selectedSubmission && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Submission Details</h2>
                <button style={styles.closeButton} onClick={() => setSelectedSubmission(null)}>
                  <X size={20} />
                </button>
              </div>
              <div>
                {Object.entries(parseSubmission(selectedSubmission.submission)).map(([key, value]) => (
                  <div key={key} style={styles.fieldRow}>
                    <span style={styles.fieldLabel}>{key}:</span>
                    <span style={styles.fieldValue}>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

