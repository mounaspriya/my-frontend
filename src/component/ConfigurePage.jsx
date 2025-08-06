// import React, { useState, useEffect } from "react";
// import Sidebar from "../component/Sidebar";
// import Topbar from "../component/TopBar";
// import axios from "axios";
// import "../styles/Layout.css";

// const ConfigurePage = () => {
//   const [activeTab, setActiveTab] = useState("workstream1");
//   const [data, setData] = useState([]);
//   const [fieldConfig, setFieldConfig] = useState([]);

//   // useEffect(() => {
//   //   const fetchTabData = async () => {
//   //     try {
//   //       const res = await axios.get(`http://localhost:5000/api/open/${activeTab}`, {
//   //         withCredentials: true,
//   //       });

//   //       if (res.data.success) {
//   //         setData(res.data.data);
//   //       } else {
//   //         console.error("Failed to fetch data:", res.data.message);
//   //       }

//   //       if (activeTab === "workstream1") {
//   //         const configRes = await axios.get("http://localhost:5000/api/admin/field-config");
//   //         if (configRes.data.success) {
//   //           setFieldConfig(configRes.data.data); // was `fields` before, now fixed
//   //         }
//   //       } else {
//   //         setFieldConfig([]);
//   //       }
//   //     } catch (err) {
//   //       console.error("Error:", err);
//   //     }
//   //   };

//   //   fetchTabData();
//   // }, [activeTab]);

//   useEffect(() => {
//     const fetchTabData = async () => {
//       try {
//         setData([]); // Clear previous tab data

//         // Fetch workstream data
//         const res = await axios.get(
//           `http://localhost:5000/api/open/${activeTab}`,
//           {
//             withCredentials: true,
//           }
//         );

//         if (res.data.success) {
//           setData(res.data.data);
//         } else {
//           console.error("Failed to fetch data:", res.data.message);
//         }

//         // Only fetch field config for Workstream 1
//         if (activeTab === "workstream1") {
//           const configRes = await axios.get(
//             "http://localhost:5000/api/admin/field-config"
//           );
//           if (configRes.data.success) {
//             setFieldConfig(configRes.data.data); // Fixed key from `.fields` to `.data`
//           } else {
//             setFieldConfig([]);
//           }
//         } else {
//           setFieldConfig([]); // Reset field config for other tabs
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setData([]);
//         setFieldConfig([]);
//       }
//     };

//     fetchTabData();
//   }, [activeTab]);

//   const handleToggleField = async (fieldName, currentStatus) => {
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/admin/field-config/toggle",
//         {
//           field_name: fieldName,
//           is_active: !currentStatus,
//         }
//       );

//       if (res.data.success) {
//         const updatedConfig = fieldConfig.map((field) =>
//           field.field_name === fieldName
//             ? { ...field, is_active: !currentStatus }
//             : field
//         );
//         setFieldConfig(updatedConfig);
//       }
//     } catch (err) {
//       console.error("Error toggling field:", err);
//     }
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Configure Workstreams</h2>

//           {/* Tabs */}
//           <div className="tabs">
//             {["workstream1", "workstream2", "workstream3", "workstream4"].map(
//               (tab, idx) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={activeTab === tab ? "active" : ""}
//                 >
//                   Workstream {idx + 1}
//                 </button>
//               )
//             )}
//           </div>

//           {/* Data Table */}
//           {/* <div className="tab-content">
//             {data.length === 0 ? (
//               <p>No data found for {activeTab}</p>
//             ) : (
//               <table className="config-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Owner</th>
//                     <th>Accessibility</th>
//                     <th>Comments</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.id}</td>
//                       <td>{item.owner_name}</td>
//                       <td>{item.accessibility ? "Yes" : "No"}</td>
//                       <td>{item.comments}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div> */}

//           {/* Field Configuration (Only for Workstream1) */}
//           {/* {activeTab === "workstream1" && (
//             <div style={{ marginTop: "40px" }}>
//               <h3>Field Configuration</h3>
//               <table className="config-table">
//                 <thead>
//                   <tr>
//                     <th>Field Name</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {fieldConfig.map((field) => (
//                     <tr key={field.field_name}>
//                       <td>{field.field_name}</td>
//                       <td>{field.is_active ? "Active" : "Disabled"}</td>
//                       <td>
//                         <button
//                           onClick={() => handleToggleField(field.field_name, field.is_active)}
//                           style={{
//                             backgroundColor: field.is_active ? "#dc2626" : "#16a34a",
//                             color: "#fff",
//                             padding: "6px 12px",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {field.is_active ? "Disable" : "Enable"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )} */}

//           <div className="tab-content">
//             {/* Only show Field Configuration for Workstream 1 */}
//             {activeTab === "workstream1" ? (
//               <div style={{ marginTop: "40px" }}>
//                 <h3>Field Configuration</h3>
//                 <table className="config-table">
//                   <thead>
//                     <tr>
//                       <th>Field Name</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {fieldConfig.map((field) => (
//                       <tr key={field.field_name}>
//                         <td>{field.field_name}</td>
//                         <td>{field.is_active ? "Active" : "Disabled"}</td>
//                         <td>
//                           <button
//                             onClick={() =>
//                               handleToggleField(
//                                 field.field_name,
//                                 field.is_active
//                               )
//                             }
//                             style={{
//                               backgroundColor: field.is_active
//                                 ? "#dc2626"
//                                 : "#16a34a",
//                               color: "#fff",
//                               padding: "6px 12px",
//                               border: "none",
//                               borderRadius: "4px",
//                               cursor: "pointer",
//                             }}
//                           >
//                             {field.is_active ? "Disable" : "Enable"}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No field configuration for {activeTab}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Styles */}
//       <style>{`
//         .tabs {
//           display: flex;
//           gap: 12px;
//           margin: 20px 0;
//         }

//         .tabs button {
//           padding: 8px 16px;
//           border: none;
//           border-bottom: 2px solid transparent;
//           background: none;
//           cursor: pointer;
//           font-weight: bold;
//         }

//         .tabs button.active {
//           border-bottom: 2px solid #6d28d9;
//           color: #6d28d9;
//         }

//         .config-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 16px;
//         }

//         .config-table th,
//         .config-table td {
//           border: 1px solid #ddd;
//           padding: 10px;
//           text-align: left;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ConfigurePage;




// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "../component/Sidebar"
// import Topbar from "../component/TopBar"
// import axios from "axios"
// import "../styles/Layout.css"

// const ConfigurePage = () => {
//   const [activeTab, setActiveTab] = useState("workstream1")
//   const [fieldConfig, setFieldConfig] = useState([])
//   const [availableFields, setAvailableFields] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [showAddField, setShowAddField] = useState(false)

//   useEffect(() => {
//     fetchFieldConfig()
//     fetchAvailableFields()
//   }, [activeTab])

//   const fetchFieldConfig = async () => {
//     try {
//       setLoading(true)
//       const res = await axios.get(`http://localhost:5000/api/admin/workstream/${activeTab}/field-config`, {
//         withCredentials: true,
//       })
//       if (res.data.success) {
//         setFieldConfig(res.data.data)
//       } else {
//         console.error("Failed to fetch field config:", res.data.message)
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
//       const res = await axios.get("http://localhost:5000/api/admin/field-definitions")
//       if (res.data.success) {
//         setAvailableFields(res.data.data)
//       }
//     } catch (err) {
//       console.error("Error fetching available fields:", err)
//     }
//   }

//   const handleToggleField = async (fieldName, currentStatus) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/admin/workstream/${activeTab}/field-config/toggle`, {
//         field_name: fieldName,
//         is_active: !currentStatus,
//       })
//       if (res.data.success) {
//         // Refresh the field config
//         fetchFieldConfig()
//       }
//     } catch (err) {
//       console.error("Error toggling field:", err)
//       alert("Error updating field status")
//     }
//   }

//   const handleAddField = async (fieldId) => {
//     try {
//       const res = await axios.post(`http://localhost:5000/api/admin/workstream/${activeTab}/field-config/add`, {
//         field_id: fieldId,
//       })
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
//     if (!confirm("Are you sure you want to remove this field from the configuration?")) {
//       return
//     }

//     try {
//       const res = await axios.delete(`http://localhost:5000/api/admin/workstream/${activeTab}/field-config/${fieldId}`)
//       if (res.data.success) {
//         fetchFieldConfig()
//       }
//     } catch (err) {
//       console.error("Error removing field:", err)
//       alert("Error removing field")
//     }
//   }

//   // Get fields that are not yet added to this workstream
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
//             <div style={{ marginTop: "20px" }}>
//               <div
//                 style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}
//               >
//                 <h3>Field Configuration for {activeTab.toUpperCase()}</h3>
//                 <button
//                   onClick={() => setShowAddField(!showAddField)}
//                   style={{
//                     padding: "8px 16px",
//                     backgroundColor: "#16a34a",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {showAddField ? "Cancel" : "Add Field"}
//                 </button>
//               </div>

//               {/* Add Field Section */}
//               {showAddField && (
//                 <div
//                   style={{
//                     backgroundColor: "#f8f9fa",
//                     padding: "15px",
//                     borderRadius: "8px",
//                     marginBottom: "20px",
//                     border: "1px solid #e9ecef",
//                   }}
//                 >
//                   <h4>Available Fields to Add:</h4>
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//                       gap: "10px",
//                     }}
//                   >
//                     {getAvailableFieldsToAdd().map((field) => (
//                       <div
//                         key={field.id}
//                         style={{
//                           padding: "10px",
//                           backgroundColor: "white",
//                           border: "1px solid #ddd",
//                           borderRadius: "4px",
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                       >
//                         <div>
//                           <strong>{field.field_label}</strong>
//                           <br />
//                           <small style={{ color: "#666" }}>
//                             {field.field_name} ({field.field_type})
//                           </small>
//                         </div>
//                         <button
//                           onClick={() => handleAddField(field.id)}
//                           style={{
//                             padding: "4px 8px",
//                             backgroundColor: "#2563eb",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                             fontSize: "12px",
//                           }}
//                         >
//                           Add
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   {getAvailableFieldsToAdd().length === 0 && (
//                     <p style={{ color: "#666", fontStyle: "italic" }}>
//                       All available fields have been added to this workstream.
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Field Configuration Table */}
//               {loading ? (
//                 <p>Loading field configuration...</p>
//               ) : fieldConfig.length === 0 ? (
//                 <p>No fields configured for {activeTab}. Click "Add Field" to get started.</p>
//               ) : (
//                 <table className="config-table">
//                   <thead>
//                     <tr>
//                       <th>Field Name</th>
//                       <th>Field Label</th>
//                       <th>Type</th>
//                       <th>Required</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {fieldConfig.map((field) => (
//                       <tr key={field.field_id}>
//                         <td>
//                           <code style={{ backgroundColor: "#f1f5f9", padding: "2px 4px", borderRadius: "3px" }}>
//                             {field.field_name}
//                           </code>
//                         </td>
//                         <td>{field.field_label}</td>
//                         <td>
//                           <span
//                             style={{
//                               backgroundColor: "#e0e7ff",
//                               color: "#3730a3",
//                               padding: "2px 6px",
//                               borderRadius: "12px",
//                               fontSize: "12px",
//                             }}
//                           >
//                             {field.field_type}
//                           </span>
//                         </td>
//                         <td>{field.is_required ? "Yes" : "No"}</td>
//                         <td>
//                           <span
//                             style={{
//                               color: field.is_active ? "#16a34a" : "#dc2626",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             {field.is_active ? "Active" : "Disabled"}
//                           </span>
//                         </td>
//                         <td>
//                           <div style={{ display: "flex", gap: "8px" }}>
//                             <button
//                               onClick={() => handleToggleField(field.field_name, field.is_active)}
//                               style={{
//                                 backgroundColor: field.is_active ? "#dc2626" : "#16a34a",
//                                 color: "#fff",
//                                 padding: "4px 8px",
//                                 border: "none",
//                                 borderRadius: "4px",
//                                 cursor: "pointer",
//                                 fontSize: "12px",
//                               }}
//                             >
//                               {field.is_active ? "Disable" : "Enable"}
//                             </button>
//                             <button
//                               onClick={() => handleRemoveField(field.field_id)}
//                               style={{
//                                 backgroundColor: "#6b7280",
//                                 color: "#fff",
//                                 padding: "4px 8px",
//                                 border: "none",
//                                 borderRadius: "4px",
//                                 cursor: "pointer",
//                                 fontSize: "12px",
//                               }}
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Styles */}
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

const ConfigurePage = () => {
  const [activeTab, setActiveTab] = useState("workstream1")
  const [fieldConfig, setFieldConfig] = useState([])
  const [availableFields, setAvailableFields] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAddField, setShowAddField] = useState(false)

  useEffect(() => {
    fetchFieldConfig()
    fetchAvailableFields()
  }, [activeTab])

  const fetchFieldConfig = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config`, {
        withCredentials: true,
      })
      if (res.data.success) {
        setFieldConfig(res.data.data)
      } else {
        console.error("Failed to fetch field config:", res.data.message)
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

  // FIXED: Toggle field function with proper request format
  const handleToggleField = async (fieldName, currentStatus) => {
    try {
      console.log(`🔄 Toggling field: ${fieldName} from ${currentStatus} to ${!currentStatus}`)

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/toggle`,
        {
          field_name: fieldName, // Changed from fieldName to field_name
          is_active: !currentStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.data.success) {
        console.log(`✅ Successfully toggled ${fieldName}`)
        // Refresh the field configuration
        fetchFieldConfig()
        alert(`Field "${fieldName}" has been ${!currentStatus ? "enabled" : "disabled"} successfully!`)
      } else {
        console.error("❌ Toggle failed:", response.data.message)
        alert(`Failed to toggle field: ${response.data.message}`)
      }
    } catch (error) {
      console.error("❌ Error toggling field:", error)
      if (error.response) {
        console.error("Response data:", error.response.data)
        alert(`Error: ${error.response.data.message || "Unknown error"}`)
      } else {
        alert("Network error occurred")
      }
    }
  }

  const handleAddField = async (fieldId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/add`, {
        field_id: fieldId,
      })
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
    if (!confirm("Are you sure you want to remove this field from the configuration?")) {
      return
    }

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/${activeTab}/field-config/${fieldId}`)
      if (res.data.success) {
        fetchFieldConfig()
      }
    } catch (err) {
      console.error("Error removing field:", err)
      alert("Error removing field")
    }
  }

  // Get fields that are not yet added to this workstream
  const getAvailableFieldsToAdd = () => {
    const configuredFieldIds = fieldConfig.map((f) => f.field_id)
    return availableFields.filter((field) => !configuredFieldIds.includes(field.id))
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
            <div style={{ marginTop: "20px" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}
              >
                <h3>Field Configuration for {activeTab.toUpperCase()}</h3>
                {/* <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={fetchFieldConfig}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#17a2b8",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Refresh
                  </button>
                  <button
                    onClick={() => setShowAddField(!showAddField)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#16a34a",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {showAddField ? "Cancel" : "Add Field"}
                  </button>
                </div> */}
                
              </div>

              {/* Add Field Section */}
              {showAddField && (
                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <h4>Available Fields to Add:</h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {getAvailableFieldsToAdd().map((field) => (
                      <div
                        key={field.id}
                        style={{
                          padding: "10px",
                          backgroundColor: "white",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <strong>{field.field_label}</strong>
                          <br />
                          <small style={{ color: "#666" }}>
                            {field.field_name} ({field.field_type})
                          </small>
                        </div>
                        <button
                          onClick={() => handleAddField(field.id)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                  {getAvailableFieldsToAdd().length === 0 && (
                    <p style={{ color: "#666", fontStyle: "italic" }}>
                      All available fields have been added to this workstream.
                    </p>
                  )}
                </div>
              )}

              {/* Field Configuration Table */}
              {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <p>Loading field configuration...</p>
                </div>
              ) : fieldConfig.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                  <p>No fields configured for {activeTab}. Click "Add Field" to get started.</p>
                </div>
              ) : (
                <table className="config-table">
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Field Label</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldConfig.map((field) => (
                      <tr key={field.field_id || field.id}>
                        <td>
                          <code style={{ backgroundColor: "#f1f5f9", padding: "2px 4px", borderRadius: "3px" }}>
                            {field.field_name}
                          </code>
                        </td>
                        <td>{field.field_label || field.display_name}</td>
                        <td>
                          <span
                            style={{
                              backgroundColor: "#e0e7ff",
                              color: "#3730a3",
                              padding: "2px 6px",
                              borderRadius: "12px",
                              fontSize: "12px",
                            }}
                          >
                            {field.field_type}
                          </span>
                        </td>
                        <td>{field.is_required ? "Yes" : "No"}</td>
                        <td>
                          <span
                            style={{
                              color: field.is_active ? "#16a34a" : "#dc2626",
                              fontWeight: "bold",
                            }}
                          >
                            {field.is_active ? "Active" : "Disabled"}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
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
                            </button>
                            {/* <button
                              onClick={() => handleRemoveField(field.field_id || field.id)}
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
                              Remove
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Summary Section */}
              {fieldConfig.length > 0 && (
                <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                  <h4>Configuration Summary for {activeTab.toUpperCase()}</h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <strong>Total Fields:</strong> {fieldConfig.length}
                    </div>
                    <div>
                      <strong>Active Fields:</strong> {fieldConfig.filter((f) => f.is_active).length}
                    </div>
                    <div>
                      <strong>Inactive Fields:</strong> {fieldConfig.filter((f) => !f.is_active).length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
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
