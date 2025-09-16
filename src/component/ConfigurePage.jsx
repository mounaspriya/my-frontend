// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar"
// import Topbar from "../component/TopBar"
// import axios from "axios"
// import "../styles/Layout.css"
// import FormBuilder from "../component/FormBuilder"   // ✅ Import FormBuilder

// const ConfigurePage = () => {
//   const [activeTab, setActiveTab] = useState("workstream1")
//   const [fieldConfig, setFieldConfig] = useState([])
//   const [availableFields, setAvailableFields] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [showAddField, setShowAddField] = useState(false)

//   useEffect(() => {
//     if (activeTab !== "workstream3") {
//       fetchFieldConfig()
//       fetchAvailableFields()
//     }
//   }, [activeTab])

//   const fetchFieldConfig = async () => {
//     try {
//       setLoading(true)
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config`,
//         { withCredentials: true }
//       )
//       if (res.data.success) {
//         setFieldConfig(res.data.data)
//       } else {
//         setFieldConfig([])
//       }
//     } catch (err) {
//       console.error("Error fetching field config:", err)
//       setFieldConfig([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchAvailableFields = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/field-definitions`)
//       if (res.data.success) {
//         setAvailableFields(res.data.data)
//       }
//     } catch (err) {
//       console.error("Error fetching available fields:", err)
//     }
//   }

//   const handleToggleField = async (fieldName, currentStatus) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/toggle`,
//         { field_name: fieldName, is_active: !currentStatus },
//         { headers: { "Content-Type": "application/json" } }
//       )

//       if (response.data.success) {
//         fetchFieldConfig()
//         alert(`Field "${fieldName}" has been ${!currentStatus ? "enabled" : "disabled"} successfully!`)
//       } else {
//         alert(`Failed to toggle field: ${response.data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error toggling field:", error)
//       alert("Error toggling field")
//     }
//   }

//   const handleAddField = async (fieldId) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/add`,
//         { field_id: fieldId }
//       )
//       if (res.data.success) {
//         fetchFieldConfig()
//         setShowAddField(false)
//       } else {
//         alert(res.data.message)
//       }
//     } catch (err) {
//       console.error("Error adding field:", err)
//       alert("Error adding field")
//     }
//   }

//   const handleRemoveField = async (fieldId) => {
//     if (!confirm("Are you sure you want to remove this field?")) return
//     try {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/${fieldId}`
//       )
//       if (res.data.success) {
//         fetchFieldConfig()
//       }
//     } catch (err) {
//       console.error("Error removing field:", err)
//       alert("Error removing field")
//     }
//   }

//   const getAvailableFieldsToAdd = () => {
//     const configuredFieldIds = fieldConfig.map((f) => f.field_id)
//     return availableFields.filter((field) => !configuredFieldIds.includes(field.id))
//   }

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Configure Workstreams</h2>

//           {/* Tabs */}
//           <div className="tabs">
//             {["workstream1", "workstream2", "workstream3", "workstream4"].map((tab, idx) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={activeTab === tab ? "active" : ""}
//               >
//                 Workstream {idx + 1}
//               </button>
//             ))}
//           </div>

//           <div className="tab-content">
//             {/* ✅ If Workstream 3 → show FormBuilder, else keep existing UI */}
//             {activeTab === "workstream3" ? (
//               <FormBuilder workstream={activeTab} />
//             ) : (
//               <div style={{ marginTop: "20px" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//                   <h3>Field Configuration for {activeTab.toUpperCase()}</h3>
//                 </div>

//                 {loading ? (
//                   <div style={{ textAlign: "center", padding: "20px" }}>
//                     <p>Loading field configuration...</p>
//                   </div>
//                 ) : fieldConfig.length === 0 ? (
//                   <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
//                     <p>No fields configured for {activeTab}.</p>
//                   </div>
//                 ) : (
//                   <table className="config-table">
//                     <thead>
//                       <tr>
//                         <th>Field Name</th>
//                         <th>Field Label</th>
//                         <th>Type</th>
//                         <th>Required</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {fieldConfig.map((field) => (
//                         <tr key={field.field_id || field.id}>
//                           <td>
//                             <code style={{ backgroundColor: "#f1f5f9", padding: "2px 4px", borderRadius: "3px" }}>
//                               {field.field_name}
//                             </code>
//                           </td>
//                           <td>{field.field_label || field.display_name}</td>
//                           <td>{field.field_type}</td>
//                           <td>{field.is_required ? "Yes" : "No"}</td>
//                           <td>{field.is_active ? "Active" : "Disabled"}</td>
//                           <td>
//                             <button
//                               onClick={() => handleToggleField(field.field_name, field.is_active)}
//                               style={{
//                                 backgroundColor: field.is_active ? "#dc2626" : "#16a34a",
//                                 color: "#fff",
//                                 padding: "4px 8px",
//                                 border: "none",
//                                 borderRadius: "4px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               {field.is_active ? "Disable" : "Enable"}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//        <style>{`
//         .tabs {
//           display: flex;
//           gap: 12px;
//           margin: 20px 0;
//           border-bottom: 1px solid #e5e7eb;
//         }
//         .tabs button {
//           padding: 12px 20px;
//           border: none;
//           border-bottom: 3px solid transparent;
//           background: none;
//           cursor: pointer;
//           font-weight: 600;
//           color: #6b7280;
//           transition: all 0.2s;
//         }
//         .tabs button:hover {
//           color: #374151;
//           background-color: #f9fafb;
//         }
//         .tabs button.active {
//           border-bottom: 3px solid #6d28d9;
//           color: #6d28d9;
//           background-color: #f5f3ff;
//         }
//         .config-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 16px;
//           background: white;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }
//         .config-table th {
//           background-color: #f8fafc;
//           border: 1px solid #e2e8f0;
//           padding: 12px;
//           text-align: left;
//           font-weight: 600;
//           color: #374151;
//         }
//         .config-table td {
//           border: 1px solid #e2e8f0;
//           padding: 12px;
//           text-align: left;
//         }
//         .config-table tr:hover {
//           background-color: #f9fafb;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default ConfigurePage



// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar"
// import Topbar from "../component/TopBar"
// import axios from "axios"
// import "../styles/Layout.css"
// import FormBuilder from "../component/FormBuilder" // ✅ Import FormBuilder

// const ConfigurePage = () => {
//   const [activeTab, setActiveTab] = useState("workstream1")
//   const [fieldConfig, setFieldConfig] = useState([])
//   const [availableFields, setAvailableFields] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [showAddField, setShowAddField] = useState(false)

//   useEffect(() => {
//     if (activeTab !== "workstream3") {
//       fetchFieldConfig()
//       fetchAvailableFields()
//     }
//   }, [activeTab])

//   const fetchFieldConfig = async () => {
//     try {
//       setLoading(true)
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config`,
//         { withCredentials: true },
//       )
//       if (res.data.success) {
//         setFieldConfig(res.data.data)
//       } else {
//         setFieldConfig([])
//       }
//     } catch (err) {
//       console.error("Error fetching field config:", err)
//       setFieldConfig([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchAvailableFields = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/field-definitions`)
//       if (res.data.success) {
//         setAvailableFields(res.data.data)
//       }
//     } catch (err) {
//       console.error("Error fetching available fields:", err)
//     }
//   }

//   const handleToggleField = async (fieldName, currentStatus) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/toggle`,
//         { field_name: fieldName, is_active: !currentStatus },
//         { headers: { "Content-Type": "application/json" } },
//       )

//       if (response.data.success) {
//         fetchFieldConfig()
//         alert(`Field "${fieldName}" has been ${!currentStatus ? "enabled" : "disabled"} successfully!`)
//       } else {
//         alert(`Failed to toggle field: ${response.data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error toggling field:", error)
//       alert("Error toggling field")
//     }
//   }

//   const handleAddField = async (fieldId) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/add`,
//         { field_id: fieldId },
//       )
//       if (res.data.success) {
//         fetchFieldConfig()
//         setShowAddField(false)
//       } else {
//         alert(res.data.message)
//       }
//     } catch (err) {
//       console.error("Error adding field:", err)
//       alert("Error adding field")
//     }
//   }

//   const handleRemoveField = async (fieldId) => {
//     if (!confirm("Are you sure you want to remove this field?")) return
//     try {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/${fieldId}`,
//       )
//       if (res.data.success) {
//         fetchFieldConfig()
//       }
//     } catch (err) {
//       console.error("Error removing field:", err)
//       alert("Error removing field")
//     }
//   }

//   const getAvailableFieldsToAdd = () => {
//     const configuredFieldIds = fieldConfig.map((f) => f.field_id)
//     return availableFields.filter((field) => !configuredFieldIds.includes(field.id))
//   }

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Configure Workstreams</h2>

//           {/* Tabs */}
//           <div className="tabs">
//             {["workstream1", "workstream2", "workstream3", "workstream4"].map((tab, idx) => (
//               <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>
//                 Workstream {idx + 1}
//               </button>
//             ))}
//           </div>

//           <div className="tab-content">
//             {/* ✅ If Workstream 3 → show FormBuilder, else keep existing UI */}
//             {activeTab === "workstream3" ? (
//               <FormBuilder workstream={activeTab} />
//             ) : (
//               <div style={{ marginTop: "20px" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <h3>Field Configuration for {activeTab.toUpperCase()}</h3>
//                 </div>

//                 {loading ? (
//                   <div style={{ textAlign: "center", padding: "20px" }}>
//                     <p>Loading field configuration...</p>
//                   </div>
//                 ) : fieldConfig.length === 0 ? (
//                   <div
//                     style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}
//                   >
//                     <p>No fields configured for {activeTab}.</p>
//                   </div>
//                 ) : (
//                   <table className="config-table">
//                     <thead>
//                       <tr>
//                         <th>Field Name</th>
//                         <th>Field Label</th>
                       
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {fieldConfig.map((field) => (
//                         <tr key={field.field_id || field.id}>
//                           <td>
//                             <code style={{ backgroundColor: "#f1f5f9", padding: "2px 4px", borderRadius: "3px" }}>
//                               {field.field_name}
//                             </code>
//                           </td>
//                           <td>{field.field_label || field.display_name || field.label || field.field_name}</td>
//                           {/* <td>{field.field_type}</td>
//                           <td>{field.is_required ? "Yes" : "No"}</td>
//                           <td>{field.is_active ? "Active" : "Disabled"}</td> */}
//                           <td>
//                             <button
//                               onClick={() => handleToggleField(field.field_name, field.is_active)}
//                               style={{
//                                 backgroundColor: field.is_active ? "#dc2626" : "#16a34a",
//                                 color: "#fff",
//                                 padding: "4px 8px",
//                                 border: "none",
//                                 borderRadius: "4px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               {field.is_active ? "Disable" : "Enable"}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <style>{`
//         .tabs {
//           display: flex;
//           gap: 12px;
//           margin: 20px 0;
//           border-bottom: 1px solid #e5e7eb;
//         }
//         .tabs button {
//           padding: 12px 20px;
//           border: none;
//           border-bottom: 3px solid transparent;
//           background: none;
//           cursor: pointer;
//           font-weight: 600;
//           color: #6b7280;
//           transition: all 0.2s;
//         }
//         .tabs button:hover {
//           color: #374151;
//           background-color: #f9fafb;
//         }
//         .tabs button.active {
//           border-bottom: 3px solid #6d28d9;
//           color: #6d28d9;
//           background-color: #f5f3ff;
//         }
//         .config-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 16px;
//           background: white;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }
//         .config-table th {
//           background-color: #f8fafc;
//           border: 1px solid #e2e8f0;
//           padding: 12px;
//           text-align: left;
//           font-weight: 600;
//           color: #374151;
//         }
//         .config-table td {
//           border: 1px solid #e2e8f0;
//           padding: 12px;
//           text-align: left;
//         }
//         .config-table tr:hover {
//           background-color: #f9fafb;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default ConfigurePage



//xfchdsjs

// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar"
// import Topbar from "../component/TopBar"
// import axios from "axios"
// import "../styles/Layout.css"
// import FormBuilder from "../component/FormBuilder" // ✅ Import FormBuilder

// const ConfigurePage = () => {
//   const [activeTab, setActiveTab] = useState("workstream1")
//   const [fieldConfig, setFieldConfig] = useState([])
//   const [availableFields, setAvailableFields] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [showAddField, setShowAddField] = useState(false)
//   const [editingFieldId, setEditingFieldId] = useState(null)
//   const [editedLabel, setEditedLabel] = useState("")

//   useEffect(() => {
//     if (activeTab !== "workstream3") {
//       fetchFieldConfig()
//       fetchAvailableFields()
//     }
//   }, [activeTab])

//   const fetchFieldConfig = async () => {
//     try {
//       setLoading(true)
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config`,
//         { withCredentials: true },
//       )
//       if (res.data.success) {
//         setFieldConfig(res.data.data)
//       } else {
//         setFieldConfig([])
//       }
//     } catch (err) {
//       console.error("Error fetching field config:", err)
//       setFieldConfig([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchAvailableFields = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/field-definitions`)
//       if (res.data.success) {
//         setAvailableFields(res.data.data)
//       }
//     } catch (err) {
//       console.error("Error fetching available fields:", err)
//     }
//   }

//   const handleToggleField = async (fieldName, currentStatus) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/toggle`,
//         { field_name: fieldName, is_active: !currentStatus },
//         { headers: { "Content-Type": "application/json" } },
//       )

//       if (response.data.success) {
//         fetchFieldConfig()
//         alert(`Field "${fieldName}" has been ${!currentStatus ? "enabled" : "disabled"} successfully!`)
//       } else {
//         alert(`Failed to toggle field: ${response.data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error toggling field:", error)
//       alert("Error toggling field")
//     }
//   }

//   const handleAddField = async (fieldId) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/add`,
//         { field_id: fieldId },
//       )
//       if (res.data.success) {
//         fetchFieldConfig()
//         setShowAddField(false)
//       } else {
//         alert(res.data.message)
//       }
//     } catch (err) {
//       console.error("Error adding field:", err)
//       alert("Error adding field")
//     }
//   }

//   const handleRemoveField = async (fieldId) => {
//     if (!confirm("Are you sure you want to remove this field?")) return
//     try {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/${fieldId}`,
//       )
//       if (res.data.success) {
//         fetchFieldConfig()
//       }
//     } catch (err) {
//       console.error("Error removing field:", err)
//       alert("Error removing field")
//     }
//   }

//   const getAvailableFieldsToAdd = () => {
//     const configuredFieldIds = fieldConfig.map((f) => f.field_id)
//     return availableFields.filter((field) => !configuredFieldIds.includes(field.id))
//   }

//   const handleEditLabel = (field) => {
//     setEditingFieldId(field.field_id || field.id)
//     const currentLabel = field.label || field.field_label || field.display_name || field.field_name
//     setEditedLabel(currentLabel)
//   }

//   const handleSaveLabel = async (fieldId, fieldName) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/update-label`,
//         {
//           field_id: fieldId,
//           field_name: fieldName,
//           label: editedLabel,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         },
//       )

//       if (response.data.success) {
//         // Update the local state
//         setFieldConfig((prev) =>
//           prev.map((field) =>
//             (field.field_id || field.id) === fieldId
//               ? { ...field, field_label: editedLabel, display_name: editedLabel }
//               : field,
//           ),
//         )
//         setEditingFieldId(null)
//         setEditedLabel("")
//         alert("Label updated successfully!")
//       } else {
//         alert(`Failed to update label: ${response.data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error updating label:", error)
//       alert("Error updating label")
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditingFieldId(null)
//     setEditedLabel("")
//   }

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Configure Workstreams</h2>

//           {/* Tabs */}
//           <div className="tabs">
//             {["workstream1", "workstream2", "workstream3", "workstream4"].map((tab, idx) => (
//               <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>
//                 Workstream {idx + 1}
//               </button>
//             ))}
//           </div>

//           <div className="tab-content">
//             {/* ✅ If Workstream 3 → show FormBuilder, else keep existing UI */}
//             {activeTab === "workstream3" ? (
//               <FormBuilder workstream={activeTab} />
//             ) : (
//               <div style={{ marginTop: "20px" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <h3>Field Configuration for {activeTab.toUpperCase()}</h3>
//                 </div>

//                 {loading ? (
//                   <div style={{ textAlign: "center", padding: "20px" }}>
//                     <p>Loading field configuration...</p>
//                   </div>
//                 ) : fieldConfig.length === 0 ? (
//                   <div
//                     style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}
//                   >
//                     <p>No fields configured for {activeTab}.</p>
//                   </div>
//                 ) : (
//                   <table className="config-table">
//                     <thead>
//                       <tr>
//                         <th>Field Name</th>
//                         <th>Field Label</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {fieldConfig.map((field) => {
//                         const fieldId = field.field_id || field.id
//                         const isEditing = editingFieldId === fieldId
//                         const currentLabel = field.label || field.field_label || field.display_name || field.field_name

//                         return (
//                           <tr key={fieldId}>
//                             <td>
//                               <code style={{ backgroundColor: "#f1f5f9", padding: "2px 4px", borderRadius: "3px" }}>
//                                 {field.field_name}
//                               </code>
//                             </td>
//                             <td>
//                               {isEditing ? (
//                                 <input
//                                   type="text"
//                                   value={editedLabel}
//                                   onChange={(e) => setEditedLabel(e.target.value)}
//                                   style={{
//                                     width: "100%",
//                                     padding: "4px 8px",
//                                     border: "1px solid #d1d5db",
//                                     borderRadius: "4px",
//                                     fontSize: "14px",
//                                   }}
//                                   autoFocus
//                                 />
//                               ) : (
//                                 currentLabel
//                               )}
//                             </td>
//                             <td>
//                               <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//                                 {isEditing ? (
//                                   <>
//                                     <button
//                                       onClick={() => handleSaveLabel(fieldId, field.field_name)}
//                                       style={{
//                                         backgroundColor: "#16a34a",
//                                         color: "#fff",
//                                         padding: "4px 8px",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       Save
//                                     </button>
//                                     <button
//                                       onClick={handleCancelEdit}
//                                       style={{
//                                         backgroundColor: "#6b7280",
//                                         color: "#fff",
//                                         padding: "4px 8px",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       Cancel
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <button
//                                       onClick={() => handleEditLabel(field)}
//                                       style={{
//                                         backgroundColor: "#2563eb",
//                                         color: "#fff",
//                                         padding: "4px 8px",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       Edit
//                                     </button>
//                                     <button
//                                       onClick={() => handleToggleField(field.field_name, field.is_active)}
//                                       style={{
//                                         backgroundColor: field.is_active ? "#dc2626" : "#16a34a",
//                                         color: "#fff",
//                                         padding: "4px 8px",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       {field.is_active ? "Disable" : "Enable"}
//                                     </button>
//                                   </>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         )
//                       })}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <style>{`
//         .tabs {
//           display: flex;
//           gap: 12px;
//           margin: 20px 0;
//           border-bottom: 1px solid #e5e7eb;
//         }
//         .tabs button {
//           padding: 12px 20px;
//           border: none;
//           border-bottom: 3px solid transparent;
//           background: none;
//           cursor: pointer;
//           font-weight: 600;
//           color: #6b7280;
//           transition: all 0.2s;
//         }
//         .tabs button:hover {
//           color: #374151;
//           background-color: #f9fafb;
//         }
//         .tabs button.active {
//           border-bottom: 3px solid #6d28d9;
//           color: #6d28d9;
//           background-color: #f5f3ff;
//         }
//         .config-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 16px;
//           background: white;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }
//         .config-table th {
//           background-color: #f8fafc;
//           border: 1px solid #e2e8f0;
//           padding: 12px;
//           text-align: left;
//           font-weight: 600;
//           color: #374151;
//         }
//         .config-table td {
//           border: 1px solid #e2e8f0;
//           padding: 12px;
//           text-align: left;
//         }
//         .config-table tr:hover {
//           background-color: #f9fafb;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default ConfigurePage













// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar"
// import Topbar from "../component/TopBar"
// import axios from "axios"
// import "../styles/Layout.css"
// import FormBuilder from "../component/FormBuilder"

// const ConfigurePage = () => {
//   const [activeTab, setActiveTab] = useState("workstream1")
//   const [fieldConfig, setFieldConfig] = useState([])
//   const [availableFields, setAvailableFields] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [showAddField, setShowAddField] = useState(false)
//   const [editingFieldId, setEditingFieldId] = useState(null)
//   const [editedLabel, setEditedLabel] = useState("")

//   useEffect(() => {
//     if (activeTab !== "workstream3") {
//       fetchFieldConfig()
//       fetchAvailableFields()
//     }
//   }, [activeTab])

//   const fetchFieldConfig = async () => {
//     try {
//       setLoading(true)
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config`,
//         { withCredentials: true },
//       )
//       if (res.data.success) {
//         setFieldConfig(res.data.data)
//       } else {
//         setFieldConfig([])
//       }
//     } catch (err) {
//       console.error("Error fetching field config:", err)
//       setFieldConfig([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchAvailableFields = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/field-definitions`)
//       if (res.data.success) {
//         setAvailableFields(res.data.data)
//       }
//     } catch (err) {
//       console.error("Error fetching available fields:", err)
//     }
//   }

//   const handleToggleField = async (fieldName, currentStatus) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/toggle`,
//         { field_name: fieldName, is_active: !currentStatus },
//         { headers: { "Content-Type": "application/json" } },
//       )

//       if (response.data.success) {
//         fetchFieldConfig()
//         alert(`Field "${fieldName}" has been ${!currentStatus ? "enabled" : "disabled"} successfully!`)
//       } else {
//         alert(`Failed to toggle field: ${response.data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error toggling field:", error)
//       alert("Error toggling field")
//     }
//   }

//   const handleAddField = async (fieldId) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/add`,
//         { field_id: fieldId },
//       )
//       if (res.data.success) {
//         fetchFieldConfig()
//         setShowAddField(false)
//       } else {
//         alert(res.data.message)
//       }
//     } catch (err) {
//       console.error("Error adding field:", err)
//       alert("Error adding field")
//     }
//   }

//   const handleRemoveField = async (fieldId) => {
//     if (!confirm("Are you sure you want to remove this field?")) return
//     try {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/${fieldId}`,
//       )
//       if (res.data.success) {
//         fetchFieldConfig()
//       }
//     } catch (err) {
//       console.error("Error removing field:", err)
//       alert("Error removing field")
//     }
//   }

//   const getAvailableFieldsToAdd = () => {
//     const configuredFieldIds = fieldConfig.map((f) => f.field_id)
//     return availableFields.filter((field) => !configuredFieldIds.includes(field.id))
//   }

//   const handleEditLabel = (field) => {
//     setEditingFieldId(field.field_id || field.id)
//     const currentLabel = field.label || field.field_label || field.display_name || field.field_name
//     setEditedLabel(currentLabel)
//   }

//   const handleSaveLabel = async (fieldId, fieldName) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/update-label`,
//         {
//           field_id: fieldId,
//           field_name: fieldName,
//           label: editedLabel,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         },
//       )

//       if (response.data.success) {
//         await fetchFieldConfig()
//         setEditingFieldId(null)
//         setEditedLabel("")
//         alert("Label updated successfully!")
//       } else {
//         alert(`Failed to update label: ${response.data.message}`)
//       }
//     } catch (error) {
//       console.error("❌ Error updating label:", error)
//       alert("Error updating label")
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditingFieldId(null)
//     setEditedLabel("")
//   }

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Configure Workstreams</h2>

//           {/* Tabs */}
//           <div className="tabs">
//             {["workstream1", "workstream2", "workstream3", "workstream4"].map((tab, idx) => (
//               <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>
//                 Workstream {idx + 1}
//               </button>
//             ))}
//           </div>

//           <div className="tab-content">
//             {/* ✅ If Workstream 3 → show FormBuilder, else keep existing UI */}
//             {activeTab === "workstream3" ? (
//               <FormBuilder workstream={activeTab} />
//             ) : (
//               <div style={{ marginTop: "20px" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <h3>Field Configuration for {activeTab.toUpperCase()}</h3>
//                 </div>

//                 {loading ? (
//                   <div style={{ textAlign: "center", padding: "20px" }}>
//                     <p>Loading field configuration...</p>
//                   </div>
//                 ) : fieldConfig.length === 0 ? (
//                   <div
//                     style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}
//                   >
//                     <p>No fields configured for {activeTab}.</p>
//                   </div>
//                 ) : (
//                   <table className="config-table">
//                     <thead>
//                       <tr>
//                         <th>Field Name</th>
//                         <th>Field Label</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {fieldConfig.map((field) => {
//                         const fieldId = field.field_id || field.id
//                         const isEditing = editingFieldId === fieldId
//                         const currentLabel = field.label || field.display_name || field.field_label || field.field_name

//                         return (
//                           <tr key={fieldId}>
//                             <td>
//                               <code style={{ backgroundColor: "#f1f5f9", padding: "2px 4px", borderRadius: "3px" }}>
//                                 {field.field_name}
//                               </code>
//                             </td>
//                             <td>
//                               {isEditing ? (
//                                 <input
//                                   type="text"
//                                   value={editedLabel}
//                                   onChange={(e) => setEditedLabel(e.target.value)}
//                                   style={{
//                                     width: "100%",
//                                     padding: "4px 8px",
//                                     border: "1px solid #d1d5db",
//                                     borderRadius: "4px",
//                                     fontSize: "14px",
//                                   }}
//                                   autoFocus
//                                 />
//                               ) : (
//                                 currentLabel
//                               )}
//                             </td>
//                             <td>
//                               <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//                                 {isEditing ? (
//                                   <>
//                                     <button
//                                       onClick={() => handleSaveLabel(fieldId, field.field_name)}
//                                       style={{
//                                         backgroundColor: "#16a34a",
//                                         color: "#fff",
//                                         padding: "4px 8px",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       Save
//                                     </button>
//                                     <button
//                                       onClick={handleCancelEdit}
//                                       style={{
//                                         backgroundColor: "#6b7280",
//                                         color: "#fff",
//                                         padding: "4px 8px",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       Cancel
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <button
//                                       onClick={() => handleEditLabel(field)}
//                                       style={{
//                                         backgroundColor: "#2563eb",
//                                         color: "#fff",
//                                         padding: "4px 8px",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       Edit
//                                     </button>
//                                     {/* <button
//                                       onClick={() => handleToggleField(field.field_name, field.is_active)}
//                                       style={{
//                                         backgroundColor: field.is_active ? "#dc2626" : "#16a34a",
//                                         color: "#fff",
//                                         padding: "4px 8px",
//                                         border: "none",
//                                         borderRadius: "4px",
//                                         cursor: "pointer",
//                                         fontSize: "12px",
//                                       }}
//                                     >
//                                       {field.is_active ? "Disable" : "Enable"}
//                                     </button> */}
//                                   </>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         )
//                       })}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* ... existing styles ... */}
//       <style>{`
//         .tabs {
//           display: flex;
//           gap: 12px;
//           margin: 20px 0;
//           border-bottom: 1px solid #e5e7eb;
//         }
//         .tabs button {
//           padding: 12px 20px;
//           border: none;
//           border-bottom: 3px solid transparent;
//           background: none;
//           cursor: pointer;
//           font-weight: 600;
//           color: #6b7280;
//           transition: all 0.2s;
//         }
//         .tabs button:hover {
//           color: #374151;
//           background-color: #f9fafb;
//         }
//         .tabs button.active {
//           border-bottom: 3px solid #6d28d9;
//           color: #6d28d9;
//           background-color: #f5f3ff;
//         }
//         .config-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 16px;
//           background: white;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }
//         .config-table th {
//           background-color: #f8fafc;
//           border: 1px solid #e2e8f0;
//           padding: 12px;
//           text-align: left;
//           font-weight: 600;
//           color: #374151;
//         }
//         .config-table td {
//           border: 1px solid #e2e8f0;
//           padding: 12px;
//           text-align: left;
//         }
//         .config-table tr:hover {
//           background-color: #f9fafb;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default ConfigurePage










"use client"

import { useState, useEffect } from "react"
import Sidebar from "../component/Sidebar"
import Topbar from "../component/TopBar"
import axios from "axios"
import "../styles/Layout.css"
import FormBuilder from "../component/FormBuilder"

const ConfigurePage = () => {
  const [activeTab, setActiveTab] = useState("workstream1")
  const [fieldConfig, setFieldConfig] = useState([])
  const [availableFields, setAvailableFields] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAddField, setShowAddField] = useState(false)
  const [editingFieldId, setEditingFieldId] = useState(null)
  const [editedLabel, setEditedLabel] = useState("")

  useEffect(() => {
    if (activeTab !== "workstream3") {
      fetchFieldConfig()
      fetchAvailableFields()
    }
  }, [activeTab])

  const fetchFieldConfig = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config`,
        { withCredentials: true },
      )
      if (res.data.success) {
        setFieldConfig(res.data.data)
      } else {
        setFieldConfig([])
      }
    } catch (err) {
      console.error("Error fetching field config:", err)
      setFieldConfig([])
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableFields = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/field-definitions`)
      if (res.data.success) {
        setAvailableFields(res.data.data)
      }
    } catch (err) {
      console.error("Error fetching available fields:", err)
    }
  }

  const handleToggleField = async (fieldName, currentStatus) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/toggle`,
        { field_name: fieldName, is_active: !currentStatus },
        { headers: { "Content-Type": "application/json" } },
      )

      if (response.data.success) {
        fetchFieldConfig()
        alert(`Field "${fieldName}" has been ${!currentStatus ? "enabled" : "disabled"} successfully!`)
      } else {
        alert(`Failed to toggle field: ${response.data.message}`)
      }
    } catch (error) {
      console.error("❌ Error toggling field:", error)
      alert("Error toggling field")
    }
  }

  const handleAddField = async (fieldId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/add`,
        { field_id: fieldId },
      )
      if (res.data.success) {
        fetchFieldConfig()
        setShowAddField(false)
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      console.error("Error adding field:", err)
      alert("Error adding field")
    }
  }

  const handleRemoveField = async (fieldId) => {
    if (!confirm("Are you sure you want to remove this field?")) return
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/${fieldId}`,
      )
      if (res.data.success) {
        fetchFieldConfig()
      }
    } catch (err) {
      console.error("Error removing field:", err)
      alert("Error removing field")
    }
  }

  const getAvailableFieldsToAdd = () => {
    const configuredFieldIds = fieldConfig.map((f) => f.field_id)
    return availableFields.filter((field) => !configuredFieldIds.includes(field.id))
  }

  const handleEditLabel = (field) => {
    setEditingFieldId(field.field_id || field.id)
    const currentLabel = field.label || field.field_label || field.display_name || field.field_name
    setEditedLabel(currentLabel)
  }

  const handleSaveLabel = async (fieldId, fieldName) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/update-label`,
        {
          field_id: fieldId,
          field_name: fieldName,
          label: editedLabel,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )

      if (response.data.success) {
        await fetchFieldConfig()
        setEditingFieldId(null)
        setEditedLabel("")
        alert("Label updated successfully!")
      } else {
        alert(`Failed to update label: ${response.data.message}`)
      }
    } catch (error) {
      console.error("❌ Error updating label:", error)
      console.error("Error details:", error.response?.data)
      alert(`Error updating label: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleCancelEdit = () => {
    setEditingFieldId(null)
    setEditedLabel("")
  }

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content">
          <h2 style={{ textAlign: "center" }}>Configure Workstreams</h2>

          {/* Tabs */}
          <div className="tabs">
            {["workstream1", "workstream2", "workstream3", "workstream4"].map((tab, idx) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>
                Workstream {idx + 1}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {/* ✅ If Workstream 3 → show FormBuilder, else keep existing UI */}
            {activeTab === "workstream3" ? (
              <FormBuilder workstream={activeTab} />
            ) : (
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3>Field Configuration for {activeTab.toUpperCase()}</h3>
                </div>

                {loading ? (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <p>Loading field configuration...</p>
                  </div>
                ) : fieldConfig.length === 0 ? (
                  <div
                    style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}
                  >
                    <p>No fields configured for {activeTab}.</p>
                  </div>
                ) : (
                  <table className="config-table">
                    <thead>
                      <tr>
                        <th>Field Name</th>
                        <th>Field Label</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fieldConfig.map((field) => {
                        const fieldId = field.field_id || field.id
                        const isEditing = editingFieldId === fieldId
                        const currentLabel = field.label || field.display_name || field.field_label || field.field_name

                        return (
                          <tr key={fieldId}>
                            <td>
                              <code style={{ backgroundColor: "#f1f5f9", padding: "2px 4px", borderRadius: "3px" }}>
                                {field.field_name}
                              </code>
                            </td>
                            <td>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editedLabel}
                                  onChange={(e) => setEditedLabel(e.target.value)}
                                  style={{
                                    width: "100%",
                                    padding: "4px 8px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    fontSize: "14px",
                                  }}
                                  autoFocus
                                />
                              ) : (
                                currentLabel
                              )}
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                {isEditing ? (
                                  <>
                                    <button
                                      onClick={() => handleSaveLabel(fieldId, field.field_name)}
                                      style={{
                                        backgroundColor: "#16a34a",
                                        color: "#fff",
                                        padding: "4px 8px",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      style={{
                                        backgroundColor: "#6b7280",
                                        color: "#fff",
                                        padding: "4px 8px",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleEditLabel(field)}
                                      style={{
                                        backgroundColor: "#2563eb",
                                        color: "#fff",
                                        padding: "4px 8px",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                    {/* <button
                                      onClick={() => handleToggleField(field.field_name, field.is_active)}
                                      style={{
                                        backgroundColor: field.is_active ? "#dc2626" : "#16a34a",
                                        color: "#fff",
                                        padding: "4px 8px",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {field.is_active ? "Disable" : "Enable"}
                                    </button> */}
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ... existing styles ... */}
      <style>{`
        .tabs {
          display: flex;
          gap: 12px;
          margin: 20px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .tabs button {
          padding: 12px 20px;
          border: none;
          border-bottom: 3px solid transparent;
          background: none;
          cursor: pointer;
          font-weight: 600;
          color: #6b7280;
          transition: all 0.2s;
        }
        .tabs button:hover {
          color: #374151;
          background-color: #f9fafb;
        }
        .tabs button.active {
          border-bottom: 3px solid #6d28d9;
          color: #6d28d9;
          background-color: #f5f3ff;
        }
        .config-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .config-table th {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #374151;
        }
        .config-table td {
          border: 1px solid #e2e8f0;
          padding: 12px;
          text-align: left;
        }
        .config-table tr:hover {
          background-color: #f9fafb;
        }
      `}</style>
    </div>
  )
}

export default ConfigurePage
