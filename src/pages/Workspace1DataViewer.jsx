// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const WorkspaceDataViewer = () => {
//   const [data, setData] = useState([]);
//   console.log(data,"data")
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/workspace_data")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         setError("Error fetching data");
//         console.error("Error fetching workspace data:", err);
//       });
//   }, []);

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Workspace 1 Data</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {data.length === 0 ? (
//         <p>No data found.</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//           <thead>
//             <tr>
//               {Object.keys(data[0]).map((key) => (
//                 <th key={key} style={{ border: "1px solid #ccc", padding: "10px" }}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, idx) => (
//               <tr key={idx}>
//               {Object.values(row).map((value, i) => (
//   <td key={i}>
//     {typeof value === "object" && value !== null
//       ? JSON.stringify(value)  // Convert object to string
//       : value}
//   </td>
// ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default WorkspaceDataViewer;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // if using routing

// const WorkspaceTable = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // used for Edit navigation

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/workspace_data")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         setError("Error fetching data");
//         console.error("Error fetching workspace data:", err);
//       });
//   }, []);

//   // ✅ Optional: Filter only the columns you need
//   const displayedData = data.map((item) => ({
//     id: item.id,
//     accessibility: item.accessibility,
//     review_date: item.review_date?.split("T")[0],
//     created_at: item.created_at?.split("T")[0],
//     website_source_id: item.website_source_id || "N/A",
//   }));

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Workspace 1 Data</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {displayedData.length === 0 ? (
//         <p>No data found.</p>
//       ) : (
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             marginTop: "20px",
//             fontFamily: "Arial",
//           }}
//         >
//           <thead style={{ backgroundColor: "#f4f4f4" }}>
//             <tr>
//               <th style={thStyle}>ID</th>
//               <th style={thStyle}>Accessibility</th>
//               <th style={thStyle}>Review Date</th>
//               <th style={thStyle}>Created At</th>
//               <th style={thStyle}>Website Source ID</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedData.map((row, idx) => (
//               <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
//                 <td style={tdStyle}>{row.id}</td>
//                 <td style={tdStyle}>{row.accessibility}</td>
//                 <td style={tdStyle}>{row.review_date}</td>
//                 <td style={tdStyle}>{row.created_at}</td>
//                 <td style={tdStyle}>{row.website_source_id}</td>
//                 <td style={tdStyle}>
//                   <button
//                     onClick={() => navigate(`/edit/${row.id}`)}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       color: "#007bff",
//                     }}
//                     title="Edit"
//                   >
//                     ✏️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const thStyle = {
//   border: "1px solid #ccc",
//   padding: "10px",
//   textAlign: "left",
// };

// const tdStyle = {
//   border: "1px solid #ccc",
//   padding: "10px",
// };

// export default WorkspaceTable;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const WorkspaceTable = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");
//   const [editRow, setEditRow] = useState(null); // store selected row
//   const [showModal, setShowModal] = useState(false);
//     const navigate = useNavigate();

//   // Fetch data on load
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axios
//       .get("http://localhost:5000/api/workspace_data")
//       .then((res) => setData(res.data))
//       .catch((err) => {
//         setError("Error fetching data");
//         console.error(err);
//       });
//   };

//   // Handle input change in modal
//   const handleChange = (e) => {
//     setEditRow({ ...editRow, [e.target.name]: e.target.value });
//   };

//   // Update API call
//   const handleUpdate = () => {
//     axios
//       .put(`http://localhost:5000/api/workspace_data/${editRow.id}`, editRow)
//       .then(() => {
//         setShowModal(false);
//         setEditRow(null);
//         fetchData(); // Refresh table
//       })
//       .catch((err) => {
//         console.error("Update error:", err);
//       });
//   };

//   // Filter fields to show
//   const displayedData = data.map((item) => ({
//     id: item.id,
//     accessibility: item.accessibility,
//     review_date: item.review_date?.split("T")[0],
//     created_at: item.created_at?.split("T")[0],
//     website_source_id: item.website_source_id || "N/A",
//   }));

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Workspace 1 Data</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {displayedData.length === 0 ? (
//         <p>No data found.</p>
//       ) : (
//         <table style={tableStyle}>
//           <thead style={{ backgroundColor: "#f4f4f4" }}>
//             <tr>
//               <th style={thStyle}>ID</th>
//               <th style={thStyle}>Accessibility</th>
//               <th style={thStyle}>Review Date</th>
//               <th style={thStyle}>Created At</th>
//               <th style={thStyle}>Website Source ID</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedData.map((row, idx) => (
//               <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
//                 <td style={tdStyle}>{row.id}</td>
//                 <td style={tdStyle}>{row.accessibility}</td>
//                 <td style={tdStyle}>{row.review_date}</td>
//                 <td style={tdStyle}>{row.created_at}</td>
//                 <td style={tdStyle}>{row.website_source_id}</td>
//                 <td style={tdStyle}>
//                   <button
//   onClick={() => navigate(`/edit/${row.id}`)}
//   style={editButtonStyle}
// >
//   ✏️
// </button>
//                   {/* <button
//                     onClick={() => {
//                       const fullData = data.find((item) => item.id === row.id);
//                       setEditRow(fullData);
//                       setShowModal(true);
//                     }}
//                     style={editButtonStyle}
//                   >
//                     ✏️
//                   </button> */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Modal */}
//       {showModal && editRow && (
//         <div style={modalOverlay}>
//           <div style={modalContent}>
//             <h3>Edit Row (ID: {editRow.id})</h3>
//             <label>
//               Accessibility:
//               <input
//                 type="text"
//                 name="accessibility"
//                 value={editRow.accessibility || ""}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </label>
//             <label>
//               Review Date:
//               <input
//                 type="date"
//                 name="review_date"
//                 value={editRow.review_date?.split("T")[0] || ""}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </label>
//             <label>
//               Website Source ID:
//               <input
//                 type="text"
//                 name="website_source_id"
//                 value={editRow.website_source_id || ""}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </label>

//             <div style={{ marginTop: "20px" }}>
//               <button onClick={handleUpdate} style={saveButtonStyle}>
//                 Save
//               </button>
//               <button onClick={() => setShowModal(false)} style={cancelButtonStyle}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles
// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px",
//   fontFamily: "Arial",
// };
// const thStyle = {
//   border: "1px solid #ccc",
//   padding: "10px",
//   textAlign: "left",
// };
// const tdStyle = {
//   border: "1px solid #ccc",
//   padding: "10px",
// };
// const editButtonStyle = {
//   background: "none",
//   border: "none",
//   cursor: "pointer",
//   color: "#007bff",
// };

// const modalOverlay = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000,
// };

// const modalContent = {
//   background: "white",
//   padding: "30px",
//   borderRadius: "10px",
//   width: "400px",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "8px",
//   marginTop: "5px",
//   marginBottom: "15px",
// };

// const saveButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#007bff",
//   color: "white",
//   border: "none",
//   marginRight: "10px",
//   cursor: "pointer",
// };

// const cancelButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#ccc",
//   color: "black",
//   border: "none",
//   cursor: "pointer",
// };

// export default WorkspaceTable;

//serach functionality
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Settings, X, Check } from "lucide-react";

const EnhancedWorkspaceTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [editRow, setEditRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    id: null,
    name: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const alwaysVisibleFields = ["id", "accessibility", "created_at"];

  // NEW: Field selection state
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [selectedFields, setSelectedFields] = useState([
    "id",
    "accessibility",
    "review_date",
    "created_at",
    "website_url",
  ]);
  const [tempSelectedFields, setTempSelectedFields] = useState([]);

  const navigate = useNavigate();

  // Define all available fields with their display names
  const allFields = {
    id: "ID",
    accessibility: "Accessibility",
    review_date: "Review Date",
    created_at: "Created At",
    website_url: "Website URL",
    website_source_id: "Website Source ID",
    third_party_content: "Third Party Content",
    conditional_response: "Conditional Response",
    website_type: "Website Type",
    registration_site: "Registration Site",
    comments: "Comments",
    website_operator: "Website Operator",
    owner_name: "Owner Name",
    review_traffic: "Review Traffic",
    calculated_friday: "Calculated Friday",
    review_month: "Review Month",
    review_year: "Review Year",
    images: "Images Count",
    a_checks: "A-Checks",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/workspace_data`)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError("Error fetching data");
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setEditRow({ ...editRow, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(`${import.meta.env.VITE_API_BASE_URL}/api/workspace_data/${editRow.id}`, editRow)
      .then(() => {
        setShowModal(false);
        setEditRow(null);
        fetchData();
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  };

  const handleDeleteClick = (row) => {
    setDeleteConfirm({
      show: true,
      id: row.id,
      name: row.website_url || `Record ${row.id}`,
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/workspace_data/${deleteConfirm.id}`
      );
      setDeleteConfirm({ show: false, id: null, name: "" });
      fetchData();
      alert("Record deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete record. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, id: null, name: "" });
  };

  // NEW: Field selection functions
  const openFieldSelector = () => {
    setTempSelectedFields([...selectedFields]);
    setShowFieldSelector(true);
  };

  // const handleFieldToggle = (fieldKey) => {
  //   setTempSelectedFields((prev) => {
  //     if (prev.includes(fieldKey)) {
  //       return prev.filter((f) => f !== fieldKey)
  //     } else if (prev.length < 10) {
  //       return [...prev, fieldKey]
  //     }
  //     return prev
  //   })
  // }

  const handleFieldToggle = (fieldKey) => {
    if (alwaysVisibleFields.includes(fieldKey)) return; // 🚫 Don't allow toggle of required fields

    setTempSelectedFields((prev) => {
      if (prev.includes(fieldKey)) {
        return prev.filter((f) => f !== fieldKey);
      } else if (prev.length < 10) {
        return [...prev, fieldKey];
      }
      return prev;
    });
  };

  // const applyFieldSelection = () => {
  //   if (tempSelectedFields.length === 0) {
  //     alert("Please select at least one field to display.")
  //     return
  //   }
  //   setSelectedFields([...tempSelectedFields])
  //   setShowFieldSelector(false)
  // }

  const applyFieldSelection = () => {
    if (tempSelectedFields.length === 0) {
      alert("Please select at least one field to display.");
      return;
    }
    const finalFields = Array.from(
      new Set([...alwaysVisibleFields, ...tempSelectedFields])
    );
    setSelectedFields(finalFields);
    setShowFieldSelector(false);
  };

  const cancelFieldSelection = () => {
    setTempSelectedFields([]);
    setShowFieldSelector(false);
  };

  // NEW: Format field value for display
  const formatFieldValue = (item, fieldKey) => {
    const value = item[fieldKey];

    switch (fieldKey) {
      case "review_date":
      case "created_at":
      case "calculated_friday":
        return value ? value.split("T")[0] : "N/A";
      case "images":
        try {
          const images = typeof value === "string" ? JSON.parse(value) : value;
          return Array.isArray(images) ? images.length : 0;
        } catch {
          return 0;
        }
      case "a_checks":
        try {
          const checks = typeof value === "string" ? JSON.parse(value) : value;
          return Array.isArray(checks)
            ? `${checks.filter((c) => c.checked).length}/${checks.length}`
            : "0/0";
        } catch {
          return "0/0";
        }
      case "website_url":
      case "website_source_id":
        return value || "N/A";
      default:
        return value || "N/A";
    }
  };

  // Filter data based on selected fields
  const displayedData = data.map((item) => {
    const filteredItem = {};
    selectedFields.forEach((field) => {
      filteredItem[field] = item[field];
    });
    return filteredItem;
  });

  return (
    <div style={{ padding: "40px" }}>
      <div style={headerStyle}>
        <h2>Workspace Data</h2>
        <button
          onClick={openFieldSelector}
          style={fieldSelectorButtonStyle}
          title="Customize Columns"
        >
          <Settings size={16} style={{ marginRight: "8px" }} />
          Customize Columns ({selectedFields.length}/10)
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {displayedData.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead style={{ backgroundColor: "#f4f4f4" }}>
              <tr>
                {selectedFields.map((fieldKey) => (
                  <th key={fieldKey} style={thStyle}>
                    {allFields[fieldKey]}
                  </th>
                ))}
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
                  {selectedFields.map((fieldKey) => (
                    <td key={fieldKey} style={tdStyle}>
                      {formatFieldValue(data[idx], fieldKey)}
                    </td>
                  ))}
                  <td style={tdStyle}>
                    <div style={actionButtonsStyle}>
                      <button
                        onClick={() => navigate(`/edit/${row.id}`)}
                        style={editButtonStyle}
                        title="Edit Record"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteClick(row)}
                        style={deleteButtonStyle}
                        title="Delete Record"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* NEW: Field Selection Modal */}
      {showFieldSelector && (
        <div style={modalOverlay}>
          <div style={fieldSelectorModalStyle}>
            <div style={modalHeaderStyle}>
              <h3>Customize Table Columns</h3>
              <button onClick={cancelFieldSelection} style={closeButtonStyle}>
                <X size={20} />
              </button>
            </div>

            <div style={fieldSelectorContentStyle}>
              <p style={instructionTextStyle}>
                Select up to 10 fields to display in the table (
                {tempSelectedFields.length}/10 selected)
              </p>

              <div style={fieldGridStyle}>
               
                  {Object.entries(allFields).map(([fieldKey, displayName]) => {
  const isAlwaysVisible = alwaysVisibleFields.includes(fieldKey);
  const isChecked = tempSelectedFields.includes(fieldKey);
  const isDisabled = isAlwaysVisible || (!isChecked && tempSelectedFields.length >= 10);

  return (
    <label key={fieldKey} style={fieldCheckboxLabelStyle}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleFieldToggle(fieldKey)}
        disabled={isDisabled}
        style={checkboxStyle}
      />
      <span style={fieldNameStyle}>
        {displayName}
        {isAlwaysVisible && (
          <span style={{ fontSize: "12px", color: "#888", marginLeft: "4px" }}>
            (required)
          </span>
        )}
      </span>
      {isChecked && <Check size={16} style={checkIconStyle} />}
    </label>
  );
})}

               
              </div>
            </div>

            <div style={modalFooterStyle}>
              <button
                onClick={applyFieldSelection}
                style={applyButtonStyle}
                disabled={tempSelectedFields.length === 0}
              >
                Apply Changes
              </button>
              <button onClick={cancelFieldSelection} style={cancelButtonStyle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editRow && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Edit Row (ID: {editRow.id})</h3>
            <label>
              Accessibility:
              <input
                type="text"
                name="accessibility"
                value={editRow.accessibility || ""}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
            <label>
              Review Date:
              <input
                type="date"
                name="review_date"
                value={editRow.review_date?.split("T")[0] || ""}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
            <label>
              Website Source ID:
              <input
                type="text"
                name="website_source_id"
                value={editRow.website_source_id || ""}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>

            <div style={{ marginTop: "20px" }}>
              <button onClick={handleUpdate} style={saveButtonStyle}>
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div style={modalOverlay}>
          <div style={deleteModalContent}>
            <h3>⚠️ Confirm Delete</h3>
            <p>Are you sure you want to delete this record?</p>
            <div style={deleteInfoStyle}>
              <strong>ID:</strong> {deleteConfirm.id}
              <br />
              <strong>URL:</strong> {deleteConfirm.name}
            </div>
            <p style={warningTextStyle}>
              This action cannot be undone. All associated data and images will
              be permanently deleted.
            </p>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleDelete}
                style={{
                  ...deleteConfirmButtonStyle,
                  opacity: isDeleting ? 0.7 : 1,
                  cursor: isDeleting ? "not-allowed" : "pointer",
                }}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={handleDeleteCancel}
                style={cancelButtonStyle}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Existing styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  fontFamily: "Arial",
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f8f9fa",
  fontWeight: "600",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const actionButtonsStyle = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const editButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#007bff",
  fontSize: "16px",
  padding: "4px 8px",
  borderRadius: "4px",
  transition: "background-color 0.2s ease",
};

const deleteButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#dc3545",
  fontSize: "16px",
  padding: "4px 8px",
  borderRadius: "4px",
  transition: "background-color 0.2s ease",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContent = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "400px",
};

const deleteModalContent = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "450px",
  textAlign: "center",
};

const deleteInfoStyle = {
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "8px",
  margin: "15px 0",
  textAlign: "left",
  border: "1px solid #e9ecef",
};

const warningTextStyle = {
  color: "#dc3545",
  fontSize: "14px",
  fontStyle: "italic",
  margin: "15px 0",
};

const deleteConfirmButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  marginRight: "10px",
  cursor: "pointer",
  borderRadius: "4px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  marginBottom: "15px",
};

const saveButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  marginRight: "10px",
  cursor: "pointer",
  borderRadius: "4px",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
};

// NEW: Field selector styles
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const fieldSelectorButtonStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background-color 0.2s ease",
};

const tableContainerStyle = {
  overflowX: "auto",
  maxWidth: "100%",
};

const fieldSelectorModalStyle = {
  background: "white",
  borderRadius: "12px",
  width: "600px",
  maxHeight: "80vh",
  display: "flex",
  flexDirection: "column",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 24px",
  borderBottom: "1px solid #e9ecef",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#6c757d",
  padding: "4px",
  borderRadius: "4px",
};

const fieldSelectorContentStyle = {
  padding: "24px",
  flex: 1,
  overflowY: "auto",
};

const instructionTextStyle = {
  color: "#6c757d",
  fontSize: "14px",
  marginBottom: "20px",
};

const fieldGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "12px",
};

const fieldCheckboxLabelStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px",
  border: "1px solid #e9ecef",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: "#f8f9fa",
};

const checkboxStyle = {
  marginRight: "8px",
  cursor: "pointer",
};

const fieldNameStyle = {
  flex: 1,
  fontSize: "14px",
  color: "#333",
};

const checkIconStyle = {
  color: "#28a745",
  marginLeft: "8px",
};

const modalFooterStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  padding: "20px 24px",
  borderTop: "1px solid #e9ecef",
};

const applyButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

export default EnhancedWorkspaceTable;

// "use client"

// import { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// const WorkspaceTable = () => {
//   const [data, setData] = useState([])
//   const [error, setError] = useState("")
//   const [editRow, setEditRow] = useState(null) // store selected row
//   const [showModal, setShowModal] = useState(false)
//   const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, name: "" })
//   const [isDeleting, setIsDeleting] = useState(false)
//   const navigate = useNavigate()

//   // Fetch data on load
//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = () => {
//     axios
//       .get("http://localhost:5000/api/workspace_data")
//       .then((res) => setData(res.data))
//       .catch((err) => {
//         setError("Error fetching data")
//         console.error(err)
//       })
//   }

//   // Handle input change in modal
//   const handleChange = (e) => {
//     setEditRow({ ...editRow, [e.target.name]: e.target.value })
//   }

//   // Update API call
//   const handleUpdate = () => {
//     axios
//       .put(`http://localhost:5000/api/workspace_data/${editRow.id}`, editRow)
//       .then(() => {
//         setShowModal(false)
//         setEditRow(null)
//         fetchData() // Refresh table
//       })
//       .catch((err) => {
//         console.error("Update error:", err)
//       })
//   }

//   // NEW: Handle delete confirmation
//   const handleDeleteClick = (row) => {
//     setDeleteConfirm({
//       show: true,
//       id: row.id,
//       name: row.website_url || `Record ${row.id}`,
//     })
//   }

//   // NEW: Execute delete
//   const handleDelete = async () => {
//     setIsDeleting(true)
//     try {
//       await axios.delete(`http://localhost:5000/api/workspace_data/${deleteConfirm.id}`)

//       // Close confirmation modal
//       setDeleteConfirm({ show: false, id: null, name: "" })

//       // Refresh table data
//       fetchData()

//       // Show success message
//       alert("Record deleted successfully!")
//     } catch (err) {
//       console.error("Delete error:", err)
//       alert("Failed to delete record. Please try again.")
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   // NEW: Cancel delete
//   const handleDeleteCancel = () => {
//     setDeleteConfirm({ show: false, id: null, name: "" })
//   }

//   // Filter fields to show
//   const displayedData = data.map((item) => ({
//     id: item.id,
//     accessibility: item.accessibility,
//     review_date: item.review_date?.split("T")[0],
//     created_at: item.created_at?.split("T")[0],
//     website_source_id: item.website_source_id || "N/A",
//     website_url: item.website_url || "N/A", // NEW: Include website_url for display
//   }))

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Workspace 1 Data</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {displayedData.length === 0 ? (
//         <p>No data found.</p>
//       ) : (
//         <table style={tableStyle}>
//           <thead style={{ backgroundColor: "#f4f4f4" }}>
//             <tr>
//               <th style={thStyle}>ID</th>
//               <th style={thStyle}>Accessibility</th>
//               <th style={thStyle}>Review Date</th>
//               <th style={thStyle}>Created At</th>
//               <th style={thStyle}>Website URL</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedData.map((row, idx) => (
//               <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
//                 <td style={tdStyle}>{row.id}</td>
//                 <td style={tdStyle}>{row.accessibility}</td>
//                 <td style={tdStyle}>{row.review_date}</td>
//                 <td style={tdStyle}>{row.created_at}</td>
//                 <td style={tdStyle}>{row.website_url}</td>
//                 <td style={tdStyle}>
//                   <div style={actionButtonsStyle}>
//                     {/* Edit Button */}
//                     <button onClick={() => navigate(`/edit/${row.id}`)} style={editButtonStyle} title="Edit Record">
//                       ✏️
//                     </button>

//                     {/* NEW: Delete Button */}
//                     <button onClick={() => handleDeleteClick(row)} style={deleteButtonStyle} title="Delete Record">
//                       🗑️
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Edit Modal */}
//       {showModal && editRow && (
//         <div style={modalOverlay}>
//           <div style={modalContent}>
//             <h3>Edit Row (ID: {editRow.id})</h3>
//             <label>
//               Accessibility:
//               <input
//                 type="text"
//                 name="accessibility"
//                 value={editRow.accessibility || ""}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </label>
//             <label>
//               Review Date:
//               <input
//                 type="date"
//                 name="review_date"
//                 value={editRow.review_date?.split("T")[0] || ""}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </label>
//             <label>
//               Website Source ID:
//               <input
//                 type="text"
//                 name="website_source_id"
//                 value={editRow.website_source_id || ""}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </label>

//             <div style={{ marginTop: "20px" }}>
//               <button onClick={handleUpdate} style={saveButtonStyle}>
//                 Save
//               </button>
//               <button onClick={() => setShowModal(false)} style={cancelButtonStyle}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* NEW: Delete Confirmation Modal */}
//       {deleteConfirm.show && (
//         <div style={modalOverlay}>
//           <div style={deleteModalContent}>
//             <h3>⚠️ Confirm Delete</h3>
//             <p>Are you sure you want to delete this record?</p>
//             <div style={deleteInfoStyle}>
//               <strong>ID:</strong> {deleteConfirm.id}
//               <br />
//               <strong>URL:</strong> {deleteConfirm.name}
//             </div>
//             <p style={warningTextStyle}>
//               This action cannot be undone. All associated data and images will be permanently deleted.
//             </p>

//             <div style={{ marginTop: "20px" }}>
//               <button
//                 onClick={handleDelete}
//                 style={{
//                   ...deleteConfirmButtonStyle,
//                   opacity: isDeleting ? 0.7 : 1,
//                   cursor: isDeleting ? "not-allowed" : "pointer",
//                 }}
//                 disabled={isDeleting}
//               >
//                 {isDeleting ? "Deleting..." : "Yes, Delete"}
//               </button>
//               <button onClick={handleDeleteCancel} style={cancelButtonStyle} disabled={isDeleting}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // Styles
// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px",
//   fontFamily: "Arial",
// }

// const thStyle = {
//   border: "1px solid #ccc",
//   padding: "10px",
//   textAlign: "left",
// }

// const tdStyle = {
//   border: "1px solid #ccc",
//   padding: "10px",
// }

// // NEW: Action buttons container
// const actionButtonsStyle = {
//   display: "flex",
//   gap: "8px",
//   alignItems: "center",
// }

// const editButtonStyle = {
//   background: "none",
//   border: "none",
//   cursor: "pointer",
//   color: "#007bff",
//   fontSize: "16px",
//   padding: "4px 8px",
//   borderRadius: "4px",
//   transition: "background-color 0.2s ease",
// }

// // NEW: Delete button style
// const deleteButtonStyle = {
//   background: "none",
//   border: "none",
//   cursor: "pointer",
//   color: "#dc3545",
//   fontSize: "16px",
//   padding: "4px 8px",
//   borderRadius: "4px",
//   transition: "background-color 0.2s ease",
// }

// const modalOverlay = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000,
// }

// const modalContent = {
//   background: "white",
//   padding: "30px",
//   borderRadius: "10px",
//   width: "400px",
// }

// // NEW: Delete modal styles
// const deleteModalContent = {
//   background: "white",
//   padding: "30px",
//   borderRadius: "10px",
//   width: "450px",
//   textAlign: "center",
// }

// const deleteInfoStyle = {
//   backgroundColor: "#f8f9fa",
//   padding: "15px",
//   borderRadius: "8px",
//   margin: "15px 0",
//   textAlign: "left",
//   border: "1px solid #e9ecef",
// }

// const warningTextStyle = {
//   color: "#dc3545",
//   fontSize: "14px",
//   fontStyle: "italic",
//   margin: "15px 0",
// }

// const deleteConfirmButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#dc3545",
//   color: "white",
//   border: "none",
//   marginRight: "10px",
//   cursor: "pointer",
//   borderRadius: "4px",
//   fontWeight: "bold",
// }

// const inputStyle = {
//   width: "100%",
//   padding: "8px",
//   marginTop: "5px",
//   marginBottom: "15px",
// }

// const saveButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#007bff",
//   color: "white",
//   border: "none",
//   marginRight: "10px",
//   cursor: "pointer",
// }

// const cancelButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#6c757d",
//   color: "white",
//   border: "none",
//   cursor: "pointer",
//   borderRadius: "4px",
// }

// export default WorkspaceTable
