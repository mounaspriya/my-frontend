// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar" // Assuming this component exists
// import Topbar from "../component/TopBar" // Assuming this component exists
// import "../styles/Layout.css" // Assuming this CSS file exists
// import axios from "axios"
// import { FiEdit, FiTrash2 } from "react-icons/fi"
// import * as XLSX from "xlsx"
// //import EditWorkstream2Form from "./edit-workstream2-form-final.jsx" // Import the EditWorkstream2Form

// const WorkstreamPage = () => {
//   const [selectedWorkstream, setSelectedWorkstream] = useState("workstream1")
//   const [data, setData] = useState([])
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleteId, setDeleteId] = useState(null)
//   const [deleteWorkstreamType, setDeleteWorkstreamType] = useState(null) // To track which workstream type is being deleted
//   const [showSuccessModal, setShowSuccessModal] = useState(false)
//   const [showModal, setShowModal] = useState(false) // For adding new workstream
//   const [newWorkstreamName, setNewWorkstreamName] = useState("")
//   const [error, setError] = useState("")
//   const [dynamicWorkstreams, setDynamicWorkstreams] = useState([])
//   const [currentColumns, setCurrentColumns] = useState([]) // State to hold current table columns
//   const [editingRecordId, setEditingRecordId] = useState(null) // State to hold ID of record being edited
//   const [editingWorkstreamType, setEditingWorkstreamType] = useState(null) // State to hold type of workstream being edited

//   // Define column configurations for different workstreams
//   const columnConfigurations = {
//     workstream1: [
//       {
//         header: "Users Name",
//         key: "owner_name",
//         render: (item) => (
//           <div className="user-info">
//             <span>{item.owner_name}</span>
//           </div>
//         ),
//       },
//       { header: "Accessibility", key: "accessibility" },
//       { header: "Comments", key: "comments" },
//       {
//         header: "Review Date",
//         key: "review_date",
//         render: (item) => (item.review_date ? new Date(item.review_date).toLocaleDateString() : ""),
//       },
//     ],
//     workstream2: [
//       // Columns for Workstream 2 based on your form fields
//       { header: "Case No.", key: "case_no" },
//       { header: "Test Successful", key: "test_successful" },
//       { header: "Card No", key: "card_no" },
//       { header: "Card Country", key: "card_country" },
//       { header: "Expiry Date", key: "expiry_date" },
//       { header: "CVV", key: "cvv" },
//       { header: "Email", key: "email" },
//       { header: "Tested URL Homepage", key: "tested_url_homepage" },
//       { header: "Tested URL", key: "tested_url" },
//       {
//         header: "Tested on Date",
//         key: "tested_on_date",
//         render: (item) => (item.tested_on_date ? new Date(item.tested_on_date).toLocaleDateString() : ""),
//       },
//       { header: "Tested Amount", key: "tested_amount" },
//       { header: "Tested Currency", key: "tested_currency" },
//       { header: "Billing Address", key: "billing_address" },
//       { header: "Billing Phone Number", key: "billing_phone_number" },
//       { header: "Billing Name", key: "billing_name" },
//       { header: "Declined Message", key: "declined_message" },
//       { header: "Comments", key: "comments" },
//       { header: "Not Tested Breakup", key: "not_tested_breakup" },
//       { header: "ID Verification Required", key: "id_verification_required" },
//       { header: "Bypass ID Verification", key: "bypass_id_verification" },
//       { header: "Violation Tested Product", key: "violation_tested_product" },
//       { header: "Tested Product", key: "tested_product" },
//       { header: "Merchant Name", key: "merchant_name" },
//       { header: "Log Generated Y/N", key: "log_generated" },
//     ],
//     // Add more configurations for other dynamic workstreams if their columns differ
//   }

//   // Fetch dynamic workstreams
//   const fetchWorkstreams = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`, {
//         withCredentials: true,
//       })
//       if (res.data.success) {
//         setDynamicWorkstreams(res.data.data)
//       }
//     } catch (error) {
//       console.error("Error fetching workstreams:", error)
//     }
//   }

//   // Load dynamic workstreams on component mount
//   useEffect(() => {
//     fetchWorkstreams()
//   }, [])

//   // Fetch data based on selected workstream
//   useEffect(() => {
//     const fetchWorkstreamData = async () => {
//       try {
//         let endpoint = ""
//         let configKey = "" // Key to select column configuration

//         if (selectedWorkstream === "workstream1") {
//           endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`
//           configKey = "workstream1"
//         } else {
//           // Find the selected dynamic workstream by its ID
//           const ws = dynamicWorkstreams.find((w) => w.id === selectedWorkstream)
//           if (ws) {
//             if (ws.name === "Workstream 2") {
//               endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2` // Specific endpoint for Workstream 2
//               configKey = "workstream2"
//             } else {
//               // For other dynamic workstreams, use generic endpoint and default to workstream1 columns
//               endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${selectedWorkstream}`
//               configKey = "workstream1" // Fallback to generic columns
//             }
//           } else {
//             console.error("Selected workstream not found in dynamic list.")
//             setData([])
//             setCurrentColumns([])
//             return
//           }
//         }

//         const res = await axios.get(endpoint, { withCredentials: true })
//         if (res.data.success) {
//           setData(res.data.data)
//           setCurrentColumns(columnConfigurations[configKey])
//           setEditingWorkstreamType(configKey) // Set the type for edit/delete actions
//         } else {
//           console.error("Failed to load workstream data:", res.data.message)
//           setData([])
//           setCurrentColumns([])
//         }
//       } catch (error) {
//         console.error("Error fetching workstream data:", error)
//         setData([])
//         setCurrentColumns([])
//       }
//     }

//     // Only fetch data if dynamicWorkstreams are loaded or if it's workstream1
//     if (dynamicWorkstreams.length > 0 || selectedWorkstream === "workstream1") {
//       fetchWorkstreamData()
//     }
//   }, [selectedWorkstream, dynamicWorkstreams]) // Add dynamicWorkstreams to dependency array

//   const handleEdit = (id, type) => {
//     setEditingRecordId(id)
//     setEditingWorkstreamType(type)
//   }

//   const confirmDelete = (id, type) => {
//     setDeleteId(id)
//     setDeleteWorkstreamType(type) // Store the type for deletion
//     setShowDeleteModal(true)
//   }

//   const handleDelete = async () => {
//     try {
//       let endpoint = ""
//       if (deleteWorkstreamType === "workstream1") {
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${deleteId}`
//       } else if (deleteWorkstreamType === "workstream2") {
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2-record-by-id/${deleteId}` // Use ID-based delete for Workstream 2
//       } else {
//         // Fallback for other dynamic workstreams if needed
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${deleteId}`
//       }

//       const res = await axios.delete(endpoint, { withCredentials: true })
//       if (res.data.success) {
//         setData((prev) => prev.filter((item) => item.id !== deleteId))
//         setShowDeleteModal(false)
//         setDeleteId(null)
//         setDeleteWorkstreamType(null)
//         setShowSuccessModal(true)
//         setTimeout(() => setShowSuccessModal(false), 2000)
//       } else {
//         alert("Failed to delete")
//       }
//     } catch (error) {
//       console.error("Error deleting entry:", error)
//       alert("Error occurred")
//     }
//   }

//   const handleAddWorkstream = async () => {
//     if (!newWorkstreamName.trim()) {
//       setError("Workstream name is required")
//       return
//     }
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`,
//         {
//           name: newWorkstreamName.trim(),
//         },
//         {
//           withCredentials: true,
//         },
//       )
//       if (res.data.success) {
//         setShowModal(false)
//         setNewWorkstreamName("")
//         setError("")
//         fetchWorkstreams() // Reload workstream list after adding
//         setShowSuccessModal(true)
//         setTimeout(() => setShowSuccessModal(false), 2000)
//       } else {
//         setError(res.data.message || "Failed to add workstream")
//       }
//     } catch (err) {
//       console.error("Failed to add workstream", err)
//       setError("Error while adding workstream")
//     }
//   }

//   const exportToExcel = () => {
//     if (data.length === 0) {
//       alert("No data to export.")
//       return
//     }
//     const worksheet = XLSX.utils.json_to_sheet(data)
//     const workbook = XLSX.utils.book_new()
//     // Get workstream name for export
//     let workstreamName = selectedWorkstream
//     if (selectedWorkstream !== "workstream1") {
//       const workstream = dynamicWorkstreams.find((ws) => ws.id === selectedWorkstream)
//       workstreamName = workstream ? workstream.name : selectedWorkstream
//     }
//     XLSX.utils.book_append_sheet(workbook, worksheet, workstreamName)
//     XLSX.writeFile(workbook, `${workstreamName}_data.xlsx`)
//   }

//   const handleBackFromEdit = () => {
//     setEditingRecordId(null)
//     setEditingWorkstreamType(null)
//     // Re-fetch data for the currently selected workstream to ensure updates are reflected
//     // This will trigger the useEffect for fetchWorkstreamData
//     setSelectedWorkstream(selectedWorkstream)
//   }

//   // Conditional rendering for the edit form
//   if (editingRecordId && editingWorkstreamType === "workstream2") {
//     return <EditWorkstream2Form recordId={editingRecordId} onBack={handleBackFromEdit} onSave={handleBackFromEdit} />
//   }

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Workstreams</h2>
//           {/* Workstream Cards */}
//           <div className="workstream-cards">
//             {/* Original Workstream 1 - Always show this */}
//             <div
//               className={`workstream-card ${selectedWorkstream === "workstream1" ? "selected" : ""}`}
//               onClick={() => setSelectedWorkstream("workstream1")}
//             >
//               <span role="img" aria-label="clock" style={{ fontSize: 24 }}>
//                 ⏱
//               </span>
//               <h3>Workstream 1</h3>
//               <p>{selectedWorkstream === "workstream1" ? data.length : "0"} Rows</p>
//             </div>
//             {/* Dynamic Workstreams */}
//             {dynamicWorkstreams
//               .filter((workstream) => workstream.name !== "Workstream 1") // Filter out "Workstream 1" if it somehow appears in dynamic list
//               .map((workstream) => (
//                 <div
//                   key={workstream.id}
//                   className={`workstream-card ${selectedWorkstream === workstream.id ? "selected" : ""}`}
//                   onClick={() => setSelectedWorkstream(workstream.id)}
//                 >
//                   <span role="img" aria-label="clock" style={{ fontSize: 24 }}>
//                     ⏱
//                   </span>
//                   <h3>{workstream.name}</h3>
//                   <p>{selectedWorkstream === workstream.id ? data.length : "0"} Rows</p>
//                 </div>
//               ))}
//             {/* Add Workstream Card */}
//             <div className="workstream-card add-card">
//               <button
//                 onClick={() => setShowModal(true)}
//                 style={{
//                   padding: "8px 12px",
//                   background: "#2563eb",
//                   color: "white",
//                   borderRadius: "6px",
//                   border: "none",
//                   marginBottom: "1rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 + Add Workstream
//               </button>
//             </div>
//           </div>
//           {/* Actions */}
//           <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//             <button onClick={exportToExcel} disabled={data.length === 0}>
//               Export
//             </button>
//           </div>
//           {/* Data Table */}
//           {/* Added a wrapper div with overflow-x: auto for horizontal scrolling */}
//           <div className="workstream-table" style={{ overflowX: "auto" }}>
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" />
//                   </th>
//                   {currentColumns.map((col) => (
//                     <th key={col.key}>{col.header}</th>
//                   ))}
//                   <th>Action</th> {/* Action column is always present */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length === 0 ? (
//                   <tr>
//                     <td colSpan={currentColumns.length + 2} style={{ textAlign: "center" }}>
//                       No data found
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((item) => (
//                     <tr key={item.id}>
//                       <td>
//                         <input type="checkbox" />
//                       </td>
//                       {currentColumns.map((col) => (
//                         <td key={`${item.id}-${col.key}`}>{col.render ? col.render(item) : item[col.key]}</td>
//                       ))}
//                       <td>
//                         {editingWorkstreamType === "workstream2" ? (
//                           <FiEdit style={{ cursor: "pointer" }} onClick={() => handleEdit(item.id, "workstream2")} />
//                         ) : (
//                           // For workstream1 or other dynamic workstreams, you might have a different edit form or just disable/log
//                           <FiEdit style={{ cursor: "not-allowed", opacity: 0.5 }} title="No edit form available" />
//                         )}
//                         <FiTrash2
//                           onClick={() => confirmDelete(item.id, editingWorkstreamType)}
//                           style={{
//                             cursor: "pointer",
//                             color: "crimson",
//                             fontSize: "18px",
//                             marginLeft: "10px",
//                           }}
//                           title="Delete"
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <p style={{ marginTop: "10px" }}>{data.length} users</p>
//           </div>
//         </div>
//       </div>
//       {/* Modals remain the same */}
//       {showDeleteModal && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <button className="modal-close" onClick={() => setShowDeleteModal(false)}>
//               ×
//             </button>
//             <h3>Are you sure you want to delete this entry?</h3>
//             <div className="modal-buttons">
//               <button onClick={handleDelete}>Yes</button>
//               <button onClick={() => setShowDeleteModal(false)}>No</button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showSuccessModal && (
//         <div className="modal-overlay">
//           <div className="modal-box success">
//             <button className="modal-close" onClick={() => setShowSuccessModal(false)}>
//               ×
//             </button>
//             <h3>✅ Operation completed successfully</h3>
//           </div>
//         </div>
//       )}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.4)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "24px",
//               borderRadius: "8px",
//               width: "400px",
//               boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//             }}
//           >
//             <h3>Add New Workstream</h3>
//             <input
//               type="text"
//               placeholder="Workstream name"
//               value={newWorkstreamName}
//               onChange={(e) => setNewWorkstreamName(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "8px",
//                 marginTop: "10px",
//                 marginBottom: "10px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//               }}
//             />
//             {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
//             <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//               <button
//                 onClick={handleAddWorkstream}
//                 style={{
//                   padding: "8px 16px",
//                   background: "#2563eb",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 style={{
//                   padding: "8px 16px",
//                   background: "#eee",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* CSS styles remain the same */}
//       <style>{`
//         .workstream-cards {
//           display: flex;
//           gap: 16px;
//           margin: 20px 0;
//         }
//         .workstream-card {
//           flex: 1;
//           border: 2px solid #e5e7eb;
//           border-radius: 12px;
//           padding: 20px;
//           text-align: center;
//           cursor: pointer;
//           transition: 0.3s;
//           background: #fff;
//         }
//         .workstream-card.selected {
//           border-color: #8b5cf6;
//           background: #f5f3ff;
//         }
//         .workstream-card.add-card {
//           border-style: dashed;
//           color: #888;
//         }
//         .add-new {
//           background-color: #6d28d9;
//           color: white;
//           border: none;
//           padding: 8px 12px;
//           border-radius: 6px;
//           cursor: pointer;
//         }
//         .workstream-table table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 20px;
//           /* Ensure table content doesn't wrap */
//           white-space: nowrap; 
//         }
//         .workstream-table th, .workstream-table td {
//           padding: 12px;
//           border-bottom: 1px solid #ddd;
//           text-align: left;
//         }
//         .user-info {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }
//         .user-info img {
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//         }
//         .status {
//           padding: 4px 8px;
//           border-radius: 6px;
//           font-size: 12px;
//         }
//         .status.active {
//           background-color: #d1fae5;
//           color: #065f46;
//         }
//         .status.inactive {
//           background-color: #fee2e2;
//           color: #991b1b;
//         }
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0,0,0,0.4);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
//         .modal-box {
//           background: white;
//           padding: 24px;
//           border-radius: 12px;
//           text-align: center;
//           max-width: 700px;
//           width: 90%;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//           position: relative;
//         }
//         .modal-box.success {
//           border-left: 6px solid green;
//         }
//         .modal-buttons {
//           display: flex;
//           justify-content: center;
//           gap: 20px;
//           margin-top: 20px;
//         }
//         .modal-buttons button {
//           padding: 8px 16px;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           font-weight: bold;
//         }
//         .modal-buttons button:first-child {
//           background-color: crimson;
//           color: white;
//         }
//         .modal-buttons button:last-child {
//           background-color: #ccc;
//         }
//         .modal-close {
//           position: absolute;
//           top: 1px;
//           right: 3px;
//           background: transparent;
//           border: none;
//           font-size: 22px;
//           font-weight: bold;
//           color: #888;
//           cursor: pointer;
//         }
//         .modal-close:hover {
//           color: #000;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default WorkstreamPage








// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar" // Assuming this component exists
// import Topbar from "../component/TopBar" // Assuming this component exists
// import "../styles/Layout.css" // Assuming this CSS file exists
// import axios from "axios"
// import { FiEdit, FiTrash2 } from "react-icons/fi"
// import * as XLSX from "xlsx"
// //import EditWorkstream2Form from "./edit-workstream2-form-final.jsx" // Import the EditWorkstream2Form

// const WorkstreamPage = () => {
//   const [selectedWorkstream, setSelectedWorkstream] = useState("workstream1")
//   console.log(selectedWorkstream,"selectedWorkstream")
//   const [data, setData] = useState([])
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleteId, setDeleteId] = useState(null)
//   const [deleteWorkstreamType, setDeleteWorkstreamType] = useState(null)
//   const [showSuccessModal, setShowSuccessModal] = useState(false)
//   const [showModal, setShowModal] = useState(false)
//   const [newWorkstreamName, setNewWorkstreamName] = useState("")
//   const [error, setError] = useState("")
//   const [dynamicWorkstreams, setDynamicWorkstreams] = useState([])
//   const [currentColumns, setCurrentColumns] = useState([])
//   const [editingRecordId, setEditingRecordId] = useState(null)
//   const [editingWorkstreamType, setEditingWorkstreamType] = useState(null)

//   const columnConfigurations = {
//     workstream1: [
//       { header: "Users Name", key: "owner_name" },
//       { header: "Accessibility", key: "accessibility" },
//       { header: "Comments", key: "comments" },
//       {
//         header: "Review Date",
//         key: "review_date",
//         render: (item) => (item.review_date ? new Date(item.review_date).toLocaleDateString() : ""),
//       },
//     ],
//     workstream2: [
//       { header: "Case No.", key: "case_no" },
//       { header: "Test Successful", key: "test_successful" },
//       { header: "Card No", key: "card_no" },
//       { header: "Card Country", key: "card_country" },
//       { header: "Expiry Date", key: "expiry_date" },
//       { header: "CVV", key: "cvv" },
//       { header: "Email", key: "email" },
//       { header: "Tested URL Homepage", key: "tested_url_homepage" },
//       { header: "Tested URL", key: "tested_url" },
//       {
//         header: "Tested on Date",
//         key: "tested_on_date",
//         render: (item) => (item.tested_on_date ? new Date(item.tested_on_date).toLocaleDateString() : ""),
//       },
//       { header: "Tested Amount", key: "tested_amount" },
//       { header: "Tested Currency", key: "tested_currency" },
//       { header: "Billing Address", key: "billing_address" },
//       { header: "Billing Phone Number", key: "billing_phone_number" },
//       { header: "Billing Name", key: "billing_name" },
//       { header: "Declined Message", key: "declined_message" },
//       { header: "Comments", key: "comments" },
//       { header: "Not Tested Breakup", key: "not_tested_breakup" },
//       { header: "ID Verification Required", key: "id_verification_required" },
//       { header: "Bypass ID Verification", key: "bypass_id_verification" },
//       { header: "Violation Tested Product", key: "violation_tested_product" },
//       { header: "Tested Product", key: "tested_product" },
//       { header: "Merchant Name", key: "merchant_name" },
//       { header: "Log Generated Y/N", key: "log_generated" },
//     ],
//   }

//   const fetchWorkstreams = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`, {
//         withCredentials: true,
//       })
//       if (res.data.success) {
//         setDynamicWorkstreams(res.data.data)
//       }
//     } catch (error) {
//       console.error("Error fetching workstreams:", error)
//     }
//   }

//   useEffect(() => {
//     fetchWorkstreams()
//   }, [])

//   // useEffect(() => {
//   //   const fetchWorkstreamData = async () => {
//   //     try {
//   //       let endpoint = ""
//   //       let configKey = ""

//   //       if (selectedWorkstream === "workstream1") {
//   //         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`
//   //         configKey = "workstream1"
//   //       } else {
//   //         const ws = dynamicWorkstreams.find((w) => w.id === selectedWorkstream)
//   //         if (ws) {
//   //           if (ws.name === "Workstream 2") {
//   //             endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2`
//   //             configKey = "workstream2"
//   //           } else {
//   //             endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${selectedWorkstream}`
//   //             configKey = "workstream1"
//   //           }
//   //         } else {
//   //           setData([])
//   //           setCurrentColumns([])
//   //           return
//   //         }
//   //       }

//   //       const res = await axios.get(endpoint, { withCredentials: true })
//   //       if (res.data.success) {
//   //         setData(res.data.data)
//   //         setCurrentColumns(columnConfigurations[configKey])
//   //         setEditingWorkstreamType(configKey)
//   //       } else {
//   //         setData([])
//   //         setCurrentColumns([])
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching workstream data:", error)
//   //       setData([])
//   //       setCurrentColumns([])
//   //     }
//   //   }

//   //   if (dynamicWorkstreams.length > 0 || selectedWorkstream === "workstream1") {
//   //     fetchWorkstreamData()
//   //   }
//   // }, [selectedWorkstream, dynamicWorkstreams])

// useEffect(() => {
//   const fetchWorkstreamData = async () => {
//     try {
//       let endpoint = "";
//       let configKey = "";

//       if (selectedWorkstream === "workstream1") {
//         // Default Workstream 1
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`;
//         configKey = "workstream1";
//       } 
      // else if (selectedWorkstream === 5) {
      //   // Workstream 3 (ID = 5)
      //   endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3`;
      //   configKey = "workstream3";
      // } 
//       else if (selectedWorkstream === 2) {
//         // Workstream 2 (if ID = 2 or whatever your DB gives)
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2`;
//         configKey = "workstream2";
//       } 
//       else {
//         // fallback → dynamic workstream by ID
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${selectedWorkstream}`;
//         configKey = "workstream1";
//       }

//       const res = await axios.get(endpoint, { withCredentials: true });
//       if (res.data.success) {
//         setData(res.data.data);
//         setCurrentColumns(columnConfigurations[configKey] || []);
//         setEditingWorkstreamType(configKey);
//       } else {
//         setData([]);
//         setCurrentColumns([]);
//       }
//     } catch (error) {
//       console.error("Error fetching workstream data:", error);
//       setData([]);
//       setCurrentColumns([]);
//     }
//   };

//   if (dynamicWorkstreams.length > 0 || selectedWorkstream === "workstream1") {
//     fetchWorkstreamData();
//   }
// }, [selectedWorkstream, dynamicWorkstreams]);


//   const handleEdit = (id, type) => {
//     setEditingRecordId(id)
//     setEditingWorkstreamType(type)
//   }

//   const confirmDelete = (id, type) => {
//     setDeleteId(id)
//     setDeleteWorkstreamType(type)
//     setShowDeleteModal(true)
//   }

//   const handleDelete = async () => {
//     try {
//       let endpoint = ""
//       if (deleteWorkstreamType === "workstream1") {
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${deleteId}`
//       } else if (deleteWorkstreamType === "workstream2") {
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2-record-by-id/${deleteId}`
//       } else {
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${deleteId}`
//       }

//       const res = await axios.delete(endpoint, { withCredentials: true })
//       if (res.data.success) {
//         setData((prev) => prev.filter((item) => item.id !== deleteId))
//         setShowDeleteModal(false)
//         setDeleteId(null)
//         setDeleteWorkstreamType(null)
//         setShowSuccessModal(true)
//         setTimeout(() => setShowSuccessModal(false), 2000)
//       } else {
//         alert("Failed to delete")
//       }
//     } catch (error) {
//       console.error("Error deleting entry:", error)
//       alert("Error occurred")
//     }
//   }

//   const exportToExcel = () => {
//     if (data.length === 0) {
//       alert("No data to export.")
//       return
//     }
//     const worksheet = XLSX.utils.json_to_sheet(data)
//     const workbook = XLSX.utils.book_new()
//     let workstreamName = selectedWorkstream
//     if (selectedWorkstream !== "workstream1") {
//       const workstream = dynamicWorkstreams.find((ws) => ws.id === selectedWorkstream)
//       workstreamName = workstream ? workstream.name : selectedWorkstream
//     }
//     XLSX.utils.book_append_sheet(workbook, worksheet, workstreamName)
//     XLSX.writeFile(workbook, `${workstreamName}_data.xlsx`)
//   }

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Workstreams</h2>

//           {/* Workstream Cards */}
//           <div className="workstream-cards">
//             <div
//               className={`workstream-card ${selectedWorkstream === "workstream1" ? "selected" : ""}`}
//               onClick={() => setSelectedWorkstream("workstream1")}
//             >
//               <h3>Workstream 1</h3>
//               <p>{selectedWorkstream === "workstream1" ? data.length : "0"} Rows</p>
//             </div>
//             {dynamicWorkstreams
//               .filter((workstream) => workstream.name !== "Workstream 1")
//               .map((workstream) => (
//                 <div
//                   key={workstream.id}
//                   className={`workstream-card ${selectedWorkstream === workstream.id ? "selected" : ""}`}
//                   onClick={() => setSelectedWorkstream(workstream.id)}
//                 >
//                   <h3>{workstream.name}</h3>
//                   <p>{selectedWorkstream === workstream.id ? data.length : "0"} Rows</p>
//                 </div>
//               ))}
//           </div>

//           {/* Actions */}
//           <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//             <button onClick={exportToExcel} disabled={data.length === 0}>
//               Export
//             </button>
//           </div>

//           {/* Data Table with scroll + sticky header */}
//           <div
//             className="workstream-table"
//             style={{
//               overflowX: "auto",
//               overflowY: "auto",
//               maxHeight: "500px",
//               border: "1px solid #ddd",
//               marginTop: "20px",
//             }}
//           >
//             <table style={{ minWidth: "1200px" }}>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" />
//                   </th>
//                   {currentColumns.map((col) => (
//                     <th key={col.key}>{col.header}</th>
//                   ))}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length === 0 ? (
//                   <tr>
//                     <td colSpan={currentColumns.length + 2} style={{ textAlign: "center" }}>
//                       No data found
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((item) => (
//                     <tr key={item.id}>
//                       <td>
//                         <input type="checkbox" />
//                       </td>
//                       {currentColumns.map((col) => (
//                         <td key={`${item.id}-${col.key}`}>{col.render ? col.render(item) : item[col.key]}</td>
//                       ))}
//                       <td>
//                         {editingWorkstreamType === "workstream2" ? (
//                           <FiEdit style={{ cursor: "pointer" }} onClick={() => handleEdit(item.id, "workstream2")} />
//                         ) : (
//                           <FiEdit style={{ cursor: "not-allowed", opacity: 0.5 }} />
//                         )}
//                         <FiTrash2
//                           onClick={() => confirmDelete(item.id, editingWorkstreamType)}
//                           style={{ cursor: "pointer", color: "crimson", fontSize: "18px", marginLeft: "10px" }}
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <p style={{ marginTop: "10px" }}>{data.length} users</p>
//         </div>
//       </div>

//       <style>{`
//         .workstream-cards {
//           display: flex;
//           gap: 16px;
//           margin: 20px 0;
//         }
//         .workstream-card {
//           flex: 1;
//           border: 2px solid #e5e7eb;
//           border-radius: 12px;
//           padding: 20px;
//           text-align: center;
//           cursor: pointer;
//           background: #fff;
//         }
//         .workstream-card.selected {
//           border-color: #8b5cf6;
//           background: #f5f3ff;
//         }
//         .workstream-table table {
//           width: 100%;
//           border-collapse: collapse;
//           white-space: nowrap;
//         }
//         .workstream-table th, .workstream-table td {
//           padding: 12px;
//           border-bottom: 1px solid #ddd;
//           text-align: left;
//         }
//         .workstream-table thead th {
//           position: sticky;
//           top: 0;
//           background: #f9fafb;
//           z-index: 1;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default WorkstreamPage



// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar" // Assuming this component exists
// import Topbar from "../component/TopBar"   // Assuming this component exists
// import "../styles/Layout.css"
// import axios from "axios"
// import { FiEdit, FiTrash2 } from "react-icons/fi"
// import * as XLSX from "xlsx"

// const WorkstreamPage = () => {
//   const [selectedWorkstream, setSelectedWorkstream] = useState("workstream1")
//   const [data, setData] = useState([])
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleteId, setDeleteId] = useState(null)
//   const [deleteWorkstreamType, setDeleteWorkstreamType] = useState(null)
//   const [showSuccessModal, setShowSuccessModal] = useState(false)
//   const [dynamicWorkstreams, setDynamicWorkstreams] = useState([])
//   const [currentColumns, setCurrentColumns] = useState([])
//   const [editingRecordId, setEditingRecordId] = useState(null)
//   const [editingWorkstreamType, setEditingWorkstreamType] = useState(null)

//   const columnConfigurations = {
//     workstream1: [
//       { header: "Users Name", key: "owner_name" },
//       { header: "Accessibility", key: "accessibility" },
//       { header: "Comments", key: "comments" },
//       {
//         header: "Review Date",
//         key: "review_date",
//         render: (item) => (item.review_date ? new Date(item.review_date).toLocaleDateString() : ""),
//       },
//     ],
//     workstream2: [
//       { header: "Case No.", key: "case_no" },
//       { header: "Test Successful", key: "test_successful" },
//       { header: "Card No", key: "card_no" },
//       { header: "Card Country", key: "card_country" },
//       { header: "Expiry Date", key: "expiry_date" },
//       { header: "CVV", key: "cvv" },
//       { header: "Email", key: "email" },
//       { header: "Tested URL Homepage", key: "tested_url_homepage" },
//       { header: "Tested URL", key: "tested_url" },
//       {
//         header: "Tested on Date",
//         key: "tested_on_date",
//         render: (item) => (item.tested_on_date ? new Date(item.tested_on_date).toLocaleDateString() : ""),
//       },
//       { header: "Tested Amount", key: "tested_amount" },
//       { header: "Tested Currency", key: "tested_currency" },
//       { header: "Billing Address", key: "billing_address" },
//       { header: "Billing Phone Number", key: "billing_phone_number" },
//       { header: "Billing Name", key: "billing_name" },
//       { header: "Declined Message", key: "declined_message" },
//       { header: "Comments", key: "comments" },
//       { header: "Not Tested Breakup", key: "not_tested_breakup" },
//       { header: "ID Verification Required", key: "id_verification_required" },
//       { header: "Bypass ID Verification", key: "bypass_id_verification" },
//       { header: "Violation Tested Product", key: "violation_tested_product" },
//       { header: "Tested Product", key: "tested_product" },
//       { header: "Merchant Name", key: "merchant_name" },
//       { header: "Log Generated Y/N", key: "log_generated" },
//     ],
//   }

//   const fetchWorkstreams = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`, {
//         withCredentials: true,
//       })
//       if (res.data.success) {
//         setDynamicWorkstreams(res.data.data)
//       }
//     } catch (error) {
//       console.error("Error fetching workstreams:", error)
//     }
//   }

//   useEffect(() => {
//     fetchWorkstreams()
//   }, [])

//   useEffect(() => {
//     const fetchWorkstreamData = async () => {
//       try {
//         let endpoint = ""
//         let configKey = ""

//         if (selectedWorkstream === "workstream1") {
//           endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`
//           configKey = "workstream1"
//         } else if (selectedWorkstream === 2) {
//           endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2`
//           configKey = "workstream2"
//         } 
//             else if (selectedWorkstream === 5) {
//         // Workstream 3 (ID = 5)
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3`;
//         configKey = "workstream3";
//       } 
//       else {
//           // dynamic workstream
//           endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${selectedWorkstream}`
//           configKey = "dynamic"
//         }

//         const res = await axios.get(endpoint, { withCredentials: true })
//         if (res.data.success) {
//           const fetchedData = res.data.data

//           if (configKey === "dynamic") {
//             // collect all unique keys from submission objects
//             const allKeys = new Set()
//             fetchedData.forEach((item) => {
//               if (item.submission) {
//                 Object.keys(item.submission).forEach((k) => allKeys.add(k))
//               }
//             })

//             const dynamicColumns = Array.from(allKeys).map((key) => ({
//               header: key,
//               key: key,
//             }))

//             const flattened = fetchedData.map((item) => ({
//               id: item.id,
//               ...item.submission,
//             }))

//             setData(flattened)
//             setCurrentColumns(dynamicColumns)
//             setEditingWorkstreamType("dynamic")
//           } else {
//             setData(fetchedData)
//             setCurrentColumns(columnConfigurations[configKey] || [])
//             setEditingWorkstreamType(configKey)
//           }
//         } else {
//           setData([])
//           setCurrentColumns([])
//         }
//       } catch (error) {
//         console.error("Error fetching workstream data:", error)
//         setData([])
//         setCurrentColumns([])
//       }
//     }

//     if (dynamicWorkstreams.length > 0 || selectedWorkstream === "workstream1") {
//       fetchWorkstreamData()
//     }
//   }, [selectedWorkstream, dynamicWorkstreams])

//   const handleEdit = (id, type) => {
//     setEditingRecordId(id)
//     setEditingWorkstreamType(type)
//   }

//   const confirmDelete = (id, type) => {
//     setDeleteId(id)
//     setDeleteWorkstreamType(type)
//     setShowDeleteModal(true)
//   }

//   const handleDelete = async () => {
//     try {
//       let endpoint = ""
//       if (deleteWorkstreamType === "workstream1") {
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${deleteId}`
//       } else if (deleteWorkstreamType === "workstream2") {
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2-record-by-id/${deleteId}`
//       } else {
//         endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${deleteId}`
//       }

//       const res = await axios.delete(endpoint, { withCredentials: true })
//       if (res.data.success) {
//         setData((prev) => prev.filter((item) => item.id !== deleteId))
//         setShowDeleteModal(false)
//         setDeleteId(null)
//         setDeleteWorkstreamType(null)
//         setShowSuccessModal(true)
//         setTimeout(() => setShowSuccessModal(false), 2000)
//       } else {
//         alert("Failed to delete")
//       }
//     } catch (error) {
//       console.error("Error deleting entry:", error)
//       alert("Error occurred")
//     }
//   }

//   const exportToExcel = () => {
//     if (data.length === 0) {
//       alert("No data to export.")
//       return
//     }
//     const worksheet = XLSX.utils.json_to_sheet(data)
//     const workbook = XLSX.utils.book_new()
//     let workstreamName = selectedWorkstream
//     if (selectedWorkstream !== "workstream1") {
//       const workstream = dynamicWorkstreams.find((ws) => ws.id === selectedWorkstream)
//       workstreamName = workstream ? workstream.name : selectedWorkstream
//     }
//     XLSX.utils.book_append_sheet(workbook, worksheet, workstreamName)
//     XLSX.writeFile(workbook, `${workstreamName}_data.xlsx`)
//   }

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Workstreams</h2>

//           {/* Workstream Cards */}
//           <div className="workstream-cards">
//             <div
//               className={`workstream-card ${selectedWorkstream === "workstream1" ? "selected" : ""}`}
//               onClick={() => setSelectedWorkstream("workstream1")}
//             >
//               <h3>Workstream 1</h3>
//               <p>{selectedWorkstream === "workstream1" ? data.length : "0"} Rows</p>
//             </div>
//             {dynamicWorkstreams
//               .filter((workstream) => workstream.name !== "Workstream 1")
//               .map((workstream) => (
//                 <div
//                   key={workstream.id}
//                   className={`workstream-card ${selectedWorkstream === workstream.id ? "selected" : ""}`}
//                   onClick={() => setSelectedWorkstream(workstream.id)}
//                 >
//                   <h3>{workstream.name}</h3>
//                   <p>{selectedWorkstream === workstream.id ? data.length : "0"} Rows</p>
//                 </div>
//               ))}
//           </div>

//           {/* Actions */}
//           <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//             <button onClick={exportToExcel} disabled={data.length === 0}>
//               Export
//             </button>
//           </div>

//           {/* Data Table */}
//           <div
//             className="workstream-table"
//             style={{
//               overflowX: "auto",
//               overflowY: "auto",
//               maxHeight: "500px",
//               border: "1px solid #ddd",
//               marginTop: "20px",
//             }}
//           >
//             <table style={{ minWidth: "1200px" }}>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" />
//                   </th>
//                   {currentColumns.map((col) => (
//                     <th key={col.key}>{col.header}</th>
//                   ))}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length === 0 ? (
//                   <tr>
//                     <td colSpan={currentColumns.length + 2} style={{ textAlign: "center" }}>
//                       No data found
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((item) => (
//                     <tr key={item.id}>
//                       <td>
//                         <input type="checkbox" />
//                       </td>
//                       {currentColumns.map((col) => (
//                         <td key={`${item.id}-${col.key}`}>
//                           {col.render ? col.render(item) : item[col.key] || ""}
//                         </td>
//                       ))}
//                       <td>
//                         {editingWorkstreamType === "workstream2" ? (
//                           <FiEdit
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleEdit(item.id, "workstream2")}
//                           />
//                         ) : (
//                           <FiEdit style={{ cursor: "not-allowed", opacity: 0.5 }} />
//                         )}
//                         <FiTrash2
//                           onClick={() => confirmDelete(item.id, editingWorkstreamType)}
//                           style={{ cursor: "pointer", color: "crimson", fontSize: "18px", marginLeft: "10px" }}
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <p style={{ marginTop: "10px" }}>{data.length} users</p>
//         </div>
//       </div>

//       <style>{`
//         .workstream-cards {
//           display: flex;
//           gap: 16px;
//           margin: 20px 0;
//         }
//         .workstream-card {
//           flex: 1;
//           border: 2px solid #e5e7eb;
//           border-radius: 12px;
//           padding: 20px;
//           text-align: center;
//           cursor: pointer;
//           background: #fff;
//         }
//         .workstream-card.selected {
//           border-color: #8b5cf6;
//           background: #f5f3ff;
//         }
//         .workstream-table table {
//           width: 100%;
//           border-collapse: collapse;
//           white-space: nowrap;
//         }
//         .workstream-table th, .workstream-table td {
//           padding: 12px;
//           border-bottom: 1px solid #ddd;
//           text-align: left;
//         }
//         .workstream-table thead th {
//           position: sticky;
//           top: 0;
//           background: #f9fafb;
//           z-index: 1;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default WorkstreamPage













// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar" // Assuming this component exists
// // import Topbar from "../component/TopBar"   // Assuming this component exists
// import "../styles/Layout.css"
// import axios from "axios"
// import { FiEdit, FiTrash2 } from "react-icons/fi"
// import * as XLSX from "xlsx"

// const WorkstreamPage = () => {
//   const [selectedWorkstream, setSelectedWorkstream] = useState("workstream1")
//   const [data, setData] = useState([])
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleteId, setDeleteId] = useState(null)
//   const [deleteWorkstreamType, setDeleteWorkstreamType] = useState(null)
//   const [showSuccessModal, setShowSuccessModal] = useState(false)
//   const [dynamicWorkstreams, setDynamicWorkstreams] = useState([])
//   const [currentColumns, setCurrentColumns] = useState([])
//   const [editingRecordId, setEditingRecordId] = useState(null)
//   const [editingWorkstreamType, setEditingWorkstreamType] = useState(null)
//   const [workstream, setWorkstream] = useState("workstream1")


//   const columnConfigurations = {
//     workstream1: [
//       { header: "Users Name", key: "owner_name" },
//       { header: "Accessibility", key: "accessibility" },
//       { header: "Comments", key: "comments" },
//       {
//         header: "Review Date",
//         key: "review_date",
//         render: (item) => (item.review_date ? new Date(item.review_date).toLocaleDateString() : ""),
//       },
//     ],
//     workstream2: [
//       { header: "Case No.", key: "case_no" },
//       { header: "Test Successful", key: "test_successful" },
//       { header: "Card No", key: "card_no" },
//       { header: "Card Country", key: "card_country" },
//       { header: "Expiry Date", key: "expiry_date" },
//       { header: "CVV", key: "cvv" },
//       { header: "Email", key: "email" },
//       { header: "Tested URL Homepage", key: "tested_url_homepage" },
//       { header: "Tested URL", key: "tested_url" },
//       {
//         header: "Tested on Date",
//         key: "tested_on_date",
//         render: (item) => (item.tested_on_date ? new Date(item.tested_on_date).toLocaleDateString() : ""),
//       },
//       { header: "Tested Amount", key: "tested_amount" },
//       { header: "Tested Currency", key: "tested_currency" },
//       { header: "Billing Address", key: "billing_address" },
//       { header: "Billing Phone Number", key: "billing_phone_number" },
//       { header: "Billing Name", key: "billing_name" },
//       { header: "Declined Message", key: "declined_message" },
//       { header: "Comments", key: "comments" },
//       { header: "Not Tested Breakup", key: "not_tested_breakup" },
//       { header: "ID Verification Required", key: "id_verification_required" },
//       { header: "Bypass ID Verification", key: "bypass_id_verification" },
//       { header: "Violation Tested Product", key: "violation_tested_product" },
//       { header: "Tested Product", key: "tested_product" },
//       { header: "Merchant Name", key: "merchant_name" },
//       { header: "Log Generated Y/N", key: "log_generated" },
//     ],
//   }

//   const fetchWorkstreams = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`, {
//         withCredentials: true,
//       })
//       if (res.data.success) {
//         setDynamicWorkstreams(res.data.data)
//       }
//     } catch (error) {
//       console.error("Error fetching workstreams:", error)
//     }
//   }

//   useEffect(() => {
//     fetchWorkstreams()
//   }, [])

//   useEffect(() => {
//     const fetchWorkstreamData = async () => {
//       try {
//         let endpoint = ""
//         let configKey = ""

//         if (selectedWorkstream === "workstream1") {
//           endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`
//           configKey = "workstream1"
//         } else if (selectedWorkstream === 2) {
//           endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2`
//           configKey = "workstream2"
//         } else if (selectedWorkstream === 5) {
//           // Workstream 3 (ID = 5)
//           endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3`
//           configKey = "workstream3"
//         } else {
//           // dynamic workstream
//           endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${selectedWorkstream}`
//           configKey = "dynamic"
//         }

//         const res = await axios.get(endpoint, { withCredentials: true })
//         if (res.data.success) {
//           const fetchedData = res.data.data

//           if (configKey === "dynamic" || configKey === "workstream3") {
//             // collect all unique keys from submission objects
//             const allKeys = new Set()
//             fetchedData.forEach((item) => {
//               if (item.submission) {
//                 Object.keys(item.submission).forEach((k) => allKeys.add(k))
//               }
//             })

//             const dynamicColumns = Array.from(allKeys).map((key) => ({
//               header: key,
//               key: key,
//             }))

//             const flattened = fetchedData.map((item) => ({
//               id: item.id,
//               ...item.submission,
//             }))

//             setData(flattened)
//             setCurrentColumns(dynamicColumns)
//             setEditingWorkstreamType(configKey)
//           } else {
//             setData(fetchedData)
//             setCurrentColumns(columnConfigurations[configKey] || [])
//             setEditingWorkstreamType(configKey)
//           }
//         } else {
//           setData([])
//           setCurrentColumns([])
//         }
//       } catch (error) {
//         console.error("Error fetching workstream data:", error)
//         setData([])
//         setCurrentColumns([])
//       }
//     }

//     if (dynamicWorkstreams.length > 0 || selectedWorkstream === "workstream1") {
//       fetchWorkstreamData()
//     }
//   }, [selectedWorkstream, dynamicWorkstreams])

//   const handleEdit = (id, type) => {
//     setEditingRecordId(id)
//     setEditingWorkstreamType(type)
//   }

//   const confirmDelete = (id, type) => {
//     setDeleteId(id)
//     setDeleteWorkstreamType(type)
//     setShowDeleteModal(true)
//   }
//   // const handleDelete = async (id) => {
//   //   if (!confirm("Are you sure you want to delete this record?")) return

//   //   try {
//   //     const res = await fetch(`http://localhost:5000/${workstream}/${id}`, {
//   //       method: "DELETE",
//   //     })

//   //     if (!res.ok) throw new Error("Failed to delete record")

//   //     // Update UI without refetch
//   //     setData((prev) => prev.filter((item) => item.id !== id))
//   //   } catch (err) {
//   //     alert(err.message)
//   //   }
//   // }

// const handleDelete = async (id, selectedWorkstream) => {
//   console.log(selectedWorkstream,"woooo")
//   if (!confirm("Are you sure you want to delete this record?")) return

//   let deleteUrl = ""
//   if (selectedWorkstream === "workstream1") {
//     deleteUrl = `http://localhost:5000/api/workspace_data/${id}`
//   } else if (selectedWorkstream === 2) {
//     deleteUrl = `http://localhost:5000/api/open/workstream2-record-by-id/${id}`
//   } else if (selectedWorkstream === 5 || selectedWorkstream === "workstream3") {
//   deleteUrl = `http://localhost:5000/api/workstream3/${id}`
// }

//   try {
//     const res = await fetch(deleteUrl, { method: "DELETE" })
//     if (!res.ok) throw new Error("Failed to delete record")

//     setData((prev) => prev.filter((item) => item.id !== id))
//   } catch (err) {
//     alert(err.message)
//   }
// }



//   const exportToExcel = () => {
//     if (data.length === 0) {
//       alert("No data to export.")
//       return
//     }
//     const worksheet = XLSX.utils.json_to_sheet(data)
//     const workbook = XLSX.utils.book_new()
//     let workstreamName = selectedWorkstream
//     if (selectedWorkstream !== "workstream1") {
//       const workstream = dynamicWorkstreams.find((ws) => ws.id === selectedWorkstream)
//       workstreamName = workstream ? workstream.name : selectedWorkstream
//     }
//     XLSX.utils.book_append_sheet(workbook, worksheet, workstreamName)
//     XLSX.writeFile(workbook, `${workstreamName}_data.xlsx`)
//   }

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         {/* <Topbar /> */}
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Workstreams</h2>

//           {/* Workstream Cards */}
//           <div className="workstream-cards">
//             <div
//               className={`workstream-card ${selectedWorkstream === "workstream1" ? "selected" : ""}`}
//               onClick={() => setSelectedWorkstream("workstream1")}
//             >
//               <h3>Workstream 1</h3>
//               <p>{selectedWorkstream === "workstream1" ? data.length : "0"} Rows</p>
//             </div>
//             {dynamicWorkstreams
//               .filter((workstream) => workstream.name !== "Workstream 1")
//               .map((workstream) => (
//                 <div
//                   key={workstream.id}
//                   className={`workstream-card ${selectedWorkstream === workstream.id ? "selected" : ""}`}
//                   onClick={() => setSelectedWorkstream(workstream.id)}
//                 >
//                   <h3>{workstream.name}</h3>
//                   <p>{selectedWorkstream === workstream.id ? data.length : "0"} Rows</p>
//                 </div>
//               ))}
//           </div>

//           {/* Actions */}
//           <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//             <button onClick={exportToExcel} disabled={data.length === 0}>
//               Export
//             </button>
//           </div>

//           {/* Data Table */}
//           <div
//             className="workstream-table"
//             style={{
//               overflowX: "auto",
//               overflowY: "auto",
//               maxHeight: "500px",
//               border: "1px solid #ddd",
//               marginTop: "20px",
//             }}
//           >
//             <table style={{ minWidth: "1200px" }}>
//               <thead>
//                 <tr>
//                   {/* <th>
//                     <input type="checkbox" />
//                   </th> */}
//                   {currentColumns.map((col) => (
//                     <th key={col.key}>{col.header}</th>
//                   ))}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length === 0 ? (
//                   <tr>
//                     <td colSpan={currentColumns.length + 2} style={{ textAlign: "center" }}>
//                       No data found
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((item) => (
//                     <tr key={item.id}>
//                       {/* <td>
//                         <input type="checkbox" />
//                       </td> */}
//                       {/* {currentColumns.map((col) => (
//                         <td key={`${item.id}-${col.key}`}>
//                           {col.render ? col.render(item) : item[col.key] || ""}
//                         </td>
//                       ))} */}
//                       {currentColumns.map((col) => (
//   <td key={`${item.id}-${col.key}`}>
//     {col.render
//       ? col.render(item) || "N/A"
//       : item[col.key] !== undefined && item[col.key] !== null && item[col.key] !== ""
//         ? item[col.key]
//         : "N/A"}
//   </td>
// ))}
//                       <td>
//                         {/* {editingWorkstreamType === "workstream2" ? (
//                           <FiEdit
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleEdit(item.id, "workstream2")}
//                           />
//                         ) : (
//                           <FiEdit style={{ cursor: "not-allowed", opacity: 0.5 }} />
//                         )} */}
//                         <FiTrash2
//                        onClick={() => handleDelete(item.id, selectedWorkstream)}
//                           style={{ cursor: "pointer", color: "crimson", fontSize: "18px", marginLeft: "10px" }}
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <p style={{ marginTop: "10px" }}>{data.length} users</p>
//         </div>
//       </div>

//       <style>{`
//         .workstream-cards {
//           display: flex;
//           gap: 16px;
//           margin: 20px 0;
//         }
//         .workstream-card {
//           flex: 1;
//           border: 2px solid #e5e7eb;
//           border-radius: 12px;
//           padding: 20px;
//           text-align: center;
//           cursor: pointer;
//           background: #fff;
//         }
//         .workstream-card.selected {
//           border-color: #8b5cf6;
//           background: #f5f3ff;
//         }
//         .workstream-table table {
//           width: 100%;
//           border-collapse: collapse;
//           white-space: nowrap;
//         }
//         .workstream-table th, .workstream-table td {
//           padding: 12px;
//           border-bottom: 1px solid #ddd;
//           text-align: left;
//         }
//         .workstream-table thead th {
//           position: sticky;
//           top: 0;
//           background: #f9fafb;
//           z-index: 1;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default WorkstreamPage








"use client"

import { useState, useEffect } from "react"
import Sidebar from "../component/Sidebar"
import "../styles/Layout.css"
import axios from "axios"
import { FiTrash2 } from "react-icons/fi"
import * as XLSX from "xlsx"

const WorkstreamPage = () => {
  const [selectedWorkstream, setSelectedWorkstream] = useState("workstream1")
  const [data, setData] = useState([])
  const [dynamicWorkstreams, setDynamicWorkstreams] = useState([])
  const [currentColumns, setCurrentColumns] = useState([])

  const columnConfigurations = {
    workstream1: [
      { header: "Users Name", key: "owner_name" },
      { header: "Accessibility", key: "accessibility" },
      { header: "Comments", key: "comments" },
      {
        header: "Review Date",
        key: "review_date",
        render: (item) => (item.review_date ? new Date(item.review_date).toLocaleDateString() : "N/A"),
      },
    ],
    workstream2: [
      { header: "Case No.", key: "case_no" },
      { header: "Test Successful", key: "test_successful" },
      { header: "Card No", key: "card_no" },
      { header: "Card Country", key: "card_country" },
      { header: "Expiry Date", key: "expiry_date" },
      { header: "CVV", key: "cvv" },
      { header: "Email", key: "email" },
      { header: "Tested URL Homepage", key: "tested_url_homepage" },
      { header: "Tested URL", key: "tested_url" },
      {
        header: "Tested on Date",
        key: "tested_on_date",
        render: (item) => (item.tested_on_date ? new Date(item.tested_on_date).toLocaleDateString() : "N/A"),
      },
      { header: "Tested Amount", key: "tested_amount" },
      { header: "Tested Currency", key: "tested_currency" },
      { header: "Billing Address", key: "billing_address" },
      { header: "Billing Phone Number", key: "billing_phone_number" },
      { header: "Billing Name", key: "billing_name" },
      { header: "Declined Message", key: "declined_message" },
      { header: "Comments", key: "comments" },
      { header: "Not Tested Breakup", key: "not_tested_breakup" },
      { header: "ID Verification Required", key: "id_verification_required" },
      { header: "Bypass ID Verification", key: "bypass_id_verification" },
      { header: "Violation Tested Product", key: "violation_tested_product" },
      { header: "Tested Product", key: "tested_product" },
      { header: "Merchant Name", key: "merchant_name" },
      { header: "Log Generated Y/N", key: "log_generated" },
    ],
    workstream3: [
      { header: "ID", key: "id" },
      { header: "Submission", key: "submission" },
      // Additional columns can be added here dynamically
    ],
  }

  // Fetch workstream list
  const fetchWorkstreams = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream-list`, {
        withCredentials: true,
      })
      if (res.data.success) {
        setDynamicWorkstreams(res.data.data)
      }
    } catch (error) {
      console.error("Error fetching workstreams:", error)
    }
  }

  useEffect(() => {
    fetchWorkstreams()
  }, [])

  // Fetch data of selected workstream
  useEffect(() => {
    const fetchWorkstreamData = async () => {
      try {
        let endpoint = ""
        let configKey = ""

        if (selectedWorkstream === "workstream1") {
          endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`
          configKey = "workstream1"
        } else if (selectedWorkstream === "workstream2") {
          endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2`
          configKey = "workstream2"
        } else if (selectedWorkstream === "workstream3") {
          endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3`
          configKey = "workstream3"
        } else {
          // dynamic workstream
          const dynamicId = selectedWorkstream.replace("dynamic-", "")
          endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${dynamicId}`
          configKey = "dynamic"
        }

        const res = await axios.get(endpoint, { withCredentials: true })
        if (res.data.success) {
          const fetchedData = res.data.data

          if (configKey === "dynamic" || configKey === "workstream3") {
            const allKeys = new Set()
            fetchedData.forEach((item) => {
              if (item.submission) {
                Object.keys(item.submission).forEach((k) => allKeys.add(k))
              }
            })

            const dynamicColumns = Array.from(allKeys).map((key) => ({
              header: key,
              key: key,
            }))

            const flattened = fetchedData.map((item) => ({
              id: item.id,
              ...item.submission,
            }))

            setData(flattened)
            setCurrentColumns(dynamicColumns)
          } else {
            setData(fetchedData)
            setCurrentColumns(columnConfigurations[configKey] || [])
          }
        } else {
          setData([])
          setCurrentColumns([])
        }
      } catch (error) {
        console.error("Error fetching workstream data:", error)
        setData([])
        setCurrentColumns([])
      }
    }

    if (dynamicWorkstreams.length > 0 || selectedWorkstream === "workstream1") {
      fetchWorkstreamData()
    }
  }, [selectedWorkstream, dynamicWorkstreams])

  // Delete handler
  const handleDelete = async (id, wsType) => {
    if (!confirm("Are you sure you want to delete this record?")) return

    let deleteUrl = ""
    if (wsType === "workstream1") {
      deleteUrl = `${import.meta.env.VITE_API_BASE_URL}/api/workspace_data/${id}`
    } else if (wsType === "workstream2") {
      deleteUrl = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream2-record-by-id/${id}`
    } else if (wsType === "workstream3") {
      deleteUrl = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${id}`
    } else if (wsType.startsWith("dynamic-")) {
      const dynamicId = wsType.replace("dynamic-", "")
      deleteUrl = `${import.meta.env.VITE_API_BASE_URL}/api/open/workstream/${dynamicId}/record/${id}`
    }

    try {
      const res = await fetch(deleteUrl, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete record")

      setData((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error("Delete error:", err)
      alert(err.message)
    }
  }

  // Export to Excel
  const exportToExcel = () => {
    if (data.length === 0) {
      alert("No data to export.")
      return
    }
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    const workstreamName = selectedWorkstream
    XLSX.utils.book_append_sheet(workbook, worksheet, workstreamName)
    XLSX.writeFile(workbook, `${workstreamName}_data.xlsx`)
  }

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="page-content">
          <h2 style={{ textAlign: "center" }}>Workstreams</h2>

          {/* Workstream Cards */}
          <div className="workstream-cards">
            <div
              className={`workstream-card ${selectedWorkstream === "workstream1" ? "selected" : ""}`}
              onClick={() => setSelectedWorkstream("workstream1")}
            >
              <h3>Workstream 1</h3>
              <p>{selectedWorkstream === "workstream1" ? data.length : "0"} Rows</p>
            </div>

            <div
              className={`workstream-card ${selectedWorkstream === "workstream2" ? "selected" : ""}`}
              onClick={() => setSelectedWorkstream("workstream2")}
            >
              <h3>Workstream 2</h3>
              <p>{selectedWorkstream === "workstream2" ? data.length : "0"} Rows</p>
            </div>

            <div
              className={`workstream-card ${selectedWorkstream === "workstream3" ? "selected" : ""}`}
              onClick={() => setSelectedWorkstream("workstream3")}
            >
              <h3>Workstream 3</h3>
              <p>{selectedWorkstream === "workstream3" ? data.length : "0"} Rows</p>
            </div>

            {dynamicWorkstreams
              .filter((ws) => ws.name !== "Workstream 1" && ws.name !== "Workstream 2" && ws.name !== "Workstream 3")
              .map((ws) => (
                <div
                  key={ws.id}
                  className={`workstream-card ${selectedWorkstream === `dynamic-${ws.id}` ? "selected" : ""}`}
                  onClick={() => setSelectedWorkstream(`dynamic-${ws.id}`)}
                >
                  <h3>{ws.name}</h3>
                  <p>{selectedWorkstream === `dynamic-${ws.id}` ? data.length : "0"} Rows</p>
                </div>
              ))}
          </div>

          {/* Actions */}
          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button onClick={exportToExcel} disabled={data.length === 0}>
              Export
            </button>
          </div>

          {/* Data Table */}
          <div
            className="workstream-table"
            style={{
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: "500px",
              border: "1px solid #ddd",
              marginTop: "20px",
            }}
          >
            <table style={{ minWidth: "1200px" }}>
              <thead>
                <tr>
                  {currentColumns.map((col) => (
                    <th key={col.key}>{col.header}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={currentColumns.length + 1} style={{ textAlign: "center" }}>
                      No data found
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id}>
                      {currentColumns.map((col) => (
                        <td key={`${item.id}-${col.key}`}>
                          {col.render
                            ? col.render(item)
                            : item[col.key] !== undefined && item[col.key] !== null && item[col.key] !== ""
                              ? item[col.key]
                              : "N/A"}
                        </td>
                      ))}
                      <td>
                        <FiTrash2
                          onClick={() => handleDelete(item.id, selectedWorkstream)}
                          style={{ cursor: "pointer", color: "crimson", fontSize: "18px", marginLeft: "10px" }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: "10px" }}>{data.length} users</p>
        </div>
      </div>

      <style>{`
        .workstream-cards {
          display: flex;
          gap: 16px;
          margin: 20px 0;
        }
        .workstream-card {
          flex: 1;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          background: #fff;
        }
        .workstream-card.selected {
          border-color: #8b5cf6;
          background: #f5f3ff;
        }
        .workstream-table table {
          width: 100%;
          border-collapse: collapse;
          white-space: nowrap;
        }
        .workstream-table th, .workstream-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        .workstream-table thead th {
          position: sticky;
          top: 0;
          background: #f9fafb;
          z-index: 1;
        }
      `}</style>
    </div>
  )
}

export default WorkstreamPage
