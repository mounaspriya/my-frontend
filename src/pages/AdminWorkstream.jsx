// import React from "react";
// import Sidebar from "../component/Sidebar";
// import Topbar from "../component/TopBar";
// import "../styles/Layout.css"; // required for layout structure

// const WorkstreamPage = () => {
//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />

//         {/* Workstream Content */}
//         <div className="page-content">
//           <h2>Workstream Dashboard</h2>
//           {/* Your table/form goes here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkstreamPage;


// import React, { useState, useEffect } from "react";
// import Sidebar from "../component/Sidebar";
// import Topbar from "../component/TopBar";
// import "../styles/Layout.css";
// import axios from "axios";
// import { FiEdit } from "react-icons/fi";
// import * as XLSX from "xlsx";
// import { FiTrash2 } from "react-icons/fi";



// const WorkstreamPage = () => {
//   const [selectedWorkstream, setSelectedWorkstream] = useState("workstream1");
//   const [data, setData] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
// const [deleteId, setDeleteId] = useState(null);
// const [showSuccessModal, setShowSuccessModal] = useState(false);
// const [showModal, setShowModal] = useState(false);
// const [newWorkstreamName, setNewWorkstreamName] = useState("");
// const [error, setError] = useState("");




//   useEffect(() => {
//     const fetchWorkstreamData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/open/workstream", {
//           withCredentials: true, // if using cookies
        
//         });

//         if (res.data.success) {
//           setData(res.data.data);
//         } else {
//           console.error("Failed to load workstream data:", res.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching workstream:", error);
//       }
//     };

//     if (selectedWorkstream === "workstream1") {
//       fetchWorkstreamData();
//     } else {
//       setData([]); // you can later load for workstream2 and workstream3
//     }
//   }, [selectedWorkstream]);

//  const confirmDelete = (id) => {
//   setDeleteId(id);
//   setShowDeleteModal(true);
// };
 
// const handleDelete = async () => {
//   try {
//     const res = await axios.delete(`http://localhost:5000/api/open/workstream/${deleteId}`);
//     if (res.data.success) {
//       setData(prev => prev.filter(item => item.id !== deleteId));
//       setShowDeleteModal(false);
//       setDeleteId(null);
//       setShowSuccessModal(true);
//     } else {
//       alert("Failed to delete");
//     }
//   } catch (error) {
//     console.error("Error deleting entry:", error);
//     alert("Error occurred");
//   }
// };
// const handleAddWorkstream = async () => {
//   if (!newWorkstreamName.trim()) {
//     setError("Workstream name is required");
//     return;
//   }

//   try {
//     await axios.post("http://localhost:5000/api/admin/workstream-list", {
//       name: newWorkstreamName.trim()
//     });

//     setShowModal(false);
//     setNewWorkstreamName("");
//     setError("");
//     // Reload workstream list after adding
//     fetchWorkstreams(); // If your fetch function is named differently, update this
//   } catch (err) {
//     console.error("Failed to add workstream", err);
//     setError("Error while adding workstream");
//   }
// };


//   const exportToExcel = () => {
//   if (data.length === 0) {
//     alert("No data to export.");
//     return;
//   }




//   // Convert JSON to worksheet
//   const worksheet = XLSX.utils.json_to_sheet(data);

//   // Create a new workbook and append the worksheet
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, selectedWorkstream);

//   // Generate Excel file and trigger download
//   XLSX.writeFile(workbook, `${selectedWorkstream}_data.xlsx`);
// };





//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="page-content">
//           <h2 style={{ textAlign: "center" }}>Workstreams</h2>

//           {/* Workstream Cards */}
//           <div className="workstream-cards">
//             {["workstream1"].map((ws, index) => (
//               <div
//                 key={ws}
//                 className={`workstream-card ${
//                   selectedWorkstream === ws ? "selected" : ""
//                 }`}
//                 onClick={() => setSelectedWorkstream(ws)}
//               >
//                 <span role="img" aria-label="clock" style={{ fontSize: 24 }}>
//                   ⏱
//                 </span>
//                 <h3>Workstream {index + 1}</h3>
//                 <p>{ws === "workstream1" ? data.length : "20"} Rows</p>
//               </div>
//             ))}
//             <div className="workstream-card add-card">
//              <button onClick={() => setShowModal(true)} style={{
//   padding: "8px 12px",
//   background: "#2563eb",
//   color: "white",
//   borderRadius: "6px",
//   border: "none",
//   marginBottom: "1rem",
//   cursor: "pointer"
// }}>
//   + Add Workstream
// </button>

//             </div>
//           </div>

//           {/* Actions */}
//           <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//            <button onClick={exportToExcel}>Export</button>

//             {/* <button>Filter</button> */}
//             {/* <button className="add-new">+ Add New</button> */}
//           </div>

//           {/* Data Table */}
//           <div className="workstream-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th><input type="checkbox" /></th>
//                   <th>Users Name</th>
//                   <th>Accessibility</th>
//                   <th>Comments</th>
//                   <th>Review Date</th>
//                   {/* <th>Status</th> */}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" style={{ textAlign: "center" }}>No data found</td>
//                   </tr>
//                 ) : (
//                   data.map((user) => (
//                     <tr key={user.id}>
//                       <td><input type="checkbox" /></td>
//                       <td className="user-info">
//                         <img
//                           src={`https://ui-avatars.com/api/?name=${user.owner_name
//  || "User"}`}
//                           alt={user.owner_name
// }
//                         />
//                         <span>{user.owner_name}</span>
//                       </td>
//                       <td>{user.accessibility}</td>
//                       <td>{user.comments}</td>
//                       <td>{new Date(user.review_date).toLocaleDateString()}</td>
//                       {/* <td>
//                         <span className={`status ${user.status?.toLowerCase()}`}>
//                           {user.status}
//                         </span>
//                       </td> */}
//                       <td><FiEdit style={{ cursor: "pointer" }} />
//  <FiTrash2
//   onClick={() => confirmDelete(user.id)}
//   style={{
//     cursor: "pointer",
//     color: "crimson",
//     fontSize: "18px",
//     marginLeft: "10px"
//   }}
//   title="Delete"
// />

//                        </td>
                       
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <p style={{ marginTop: "10px" }}>{data.length} users</p>
//           </div>
//         </div>
//       </div>
// {/* Confirmation Modal */}
// {showDeleteModal && (
//   <div className="modal-overlay">
//     <div className="modal-box">
//       <button className="modal-close" onClick={() => setShowDeleteModal(false)}>×</button>
//       <h3>Are you sure you want to delete this entry?</h3>
//       <div className="modal-buttons">
//         <button onClick={handleDelete}>Yes</button>
//         <button onClick={() => setShowDeleteModal(false)}>No</button>
//       </div>
//     </div>
//   </div>
// )}

// {/* Success Modal */}
// {showSuccessModal && (
//   <div className="modal-overlay">
//     <div className="modal-box success">
//       <button className="modal-close" onClick={() => setShowSuccessModal(false)}>×</button>
//       <h3>✅ Deleted successfully</h3>
//     </div>

//     {showModal && (
//   <div style={{
//     position: "fixed",
//     top: 0, left: 0, right: 0, bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     display: "flex", justifyContent: "center", alignItems: "center",
//     zIndex: 1000
//   }}>
//     <div style={{
//       background: "white",
//       padding: "24px",
//       borderRadius: "8px",
//       width: "400px",
//       boxShadow: "0 0 10px rgba(0,0,0,0.3)"
//     }}>
//       <h3>Add New Workstream</h3>
//       <input
//         type="text"
//         placeholder="Workstream name"
//         value={newWorkstreamName}
//         onChange={(e) => setNewWorkstreamName(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "8px",
//           marginTop: "10px",
//           marginBottom: "10px",
//           borderRadius: "4px",
//           border: "1px solid #ccc"
//         }}
//       />
//       {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
//       <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//         <button onClick={handleAddWorkstream} style={{
//           padding: "8px 16px",
//           background: "#2563eb",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer"
//         }}>
//           Save
//         </button>
//         <button onClick={() => setShowModal(false)} style={{
//           padding: "8px 16px",
//           background: "#eee",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           cursor: "pointer"
//         }}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//   </div>
// )}



//       {/* CSS */}
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
// .modal-overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0,0,0,0.4);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// }

// .modal-box {
//   background: white;
//   padding: 24px;
//   border-radius: 12px;
//   text-align: center;
//   max-width: 700px;
//   width: 90%;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//   position: relative;
// }

// .modal-box.success {
//   border-left: 6px solid green;
// }

// .modal-buttons {
//   display: flex;
//   justify-content: center;
//   gap: 20px;
//   margin-top: 20px;
// }

// .modal-buttons button {
//   padding: 8px 16px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   font-weight: bold;
// }

// .modal-buttons button:first-child {
//   background-color: crimson;
//   color: white;
// }

// .modal-buttons button:last-child {
//   background-color: #ccc;
// }

// /* Close (X) Button */
// .modal-close {
//   position: absolute;
//   top: 1px;
//   right: 3px;
//   background: transparent;
//   border: none;
//   font-size: 22px;
//   font-weight: bold;
//   color: #888;
//   cursor: pointer;
// }

// .modal-close:hover {
//   color: #000;
// }



//       `}</style>
//     </div>

    
//   );
  
// };

// export default WorkstreamPage;





"use client"

import { useState, useEffect } from "react"
import Sidebar from "../component/Sidebar"
import Topbar from "../component/TopBar"
import "../styles/Layout.css"
import axios from "axios"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import * as XLSX from "xlsx"

const WorkstreamPage = () => {
  const [selectedWorkstream, setSelectedWorkstream] = useState("workstream1")
  const [data, setData] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newWorkstreamName, setNewWorkstreamName] = useState("")
  const [error, setError] = useState("")

  // New state for dynamic workstreams
  const [dynamicWorkstreams, setDynamicWorkstreams] = useState([])

  // Fetch dynamic workstreams
  const fetchWorkstreams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/open/workstream-list", {
        withCredentials: true,
      })
      if (res.data.success) {
        setDynamicWorkstreams(res.data.data)
      }
    } catch (error) {
      console.error("Error fetching workstreams:", error)
    }
  }

  // Load dynamic workstreams on component mount
  useEffect(() => {
    fetchWorkstreams()
  }, [])

  // Fetch data based on selected workstream
  useEffect(() => {
    const fetchWorkstreamData = async () => {
      try {
        let endpoint = ""

        if (selectedWorkstream === "workstream1") {
          // Use existing endpoint for workstream1
          endpoint = "http://localhost:5000/api/open/workstream"
        } else {
          // Use new endpoint for dynamic workstreams
          endpoint = `http://localhost:5000/api/open/workstream/${selectedWorkstream}`
        }

        const res = await axios.get(endpoint, {
          withCredentials: true,
        })

        if (res.data.success) {
          setData(res.data.data)
        } else {
          console.error("Failed to load workstream data:", res.data.message)
          setData([])
        }
      } catch (error) {
        console.error("Error fetching workstream data:", error)
        setData([])
      }
    }

    fetchWorkstreamData()
  }, [selectedWorkstream])

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/open/workstream/${deleteId}`, {
        withCredentials: true,
      })

      if (res.data.success) {
        setData((prev) => prev.filter((item) => item.id !== deleteId))
        setShowDeleteModal(false)
        setDeleteId(null)
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 2000)
      } else {
        alert("Failed to delete")
      }
    } catch (error) {
      console.error("Error deleting entry:", error)
      alert("Error occurred")
    }
  }

  const handleAddWorkstream = async () => {
    if (!newWorkstreamName.trim()) {
      setError("Workstream name is required")
      return
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/open/workstream-list",
        {
          name: newWorkstreamName.trim(),
        },
        {
          withCredentials: true,
        },
      )
      if (res.data.success) {
        setShowModal(false)
        setNewWorkstreamName("")
        setError("")
        // Reload workstream list after adding
        fetchWorkstreams()
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 2000)
      } else {
        setError(res.data.message || "Failed to add workstream")
      }
    } catch (err) {
      console.error("Failed to add workstream", err)
      setError("Error while adding workstream")
    }
  }

  const exportToExcel = () => {
    if (data.length === 0) {
      alert("No data to export.")
      return
    }
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()

    // Get workstream name for export
    let workstreamName = selectedWorkstream
    if (selectedWorkstream !== "workstream1") {
      const workstream = dynamicWorkstreams.find((ws) => ws.id === selectedWorkstream)
      workstreamName = workstream ? workstream.name : selectedWorkstream
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, workstreamName)
    XLSX.writeFile(workbook, `${workstreamName}_data.xlsx`)
  }

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content">
          <h2 style={{ textAlign: "center" }}>Workstreams</h2>

          {/* Workstream Cards */}
          <div className="workstream-cards">
            {/* Original Workstream 1 - Always show this */}
            <div
              className={`workstream-card ${selectedWorkstream === "workstream1" ? "selected" : ""}`}
              onClick={() => setSelectedWorkstream("workstream1")}
            >
              <span role="img" aria-label="clock" style={{ fontSize: 24 }}>
                ⏱
              </span>
              <h3>Workstream 1</h3>
              <p>{selectedWorkstream === "workstream1" ? data.length : "0"} Rows</p>
            </div>

            {/* Dynamic Workstreams - Only show workstreams that are NOT workstream1 */}
            {dynamicWorkstreams
              .filter((workstream) => workstream.name !== "Workstream 1" && workstream.id !== "workstream1")
              .map((workstream, index) => (
                <div
                  key={workstream.id}
                  className={`workstream-card ${selectedWorkstream === workstream.id ? "selected" : ""}`}
                  onClick={() => setSelectedWorkstream(workstream.id)}
                >
                  <span role="img" aria-label="clock" style={{ fontSize: 24 }}>
                    ⏱
                  </span>
                  <h3>{workstream.name}</h3>
                  <p>{selectedWorkstream === workstream.id ? data.length : "0"} Rows</p>
                </div>
              ))}

            {/* Add Workstream Card */}
            <div className="workstream-card add-card">
              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: "8px 12px",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: "6px",
                  border: "none",
                  marginBottom: "1rem",
                  cursor: "pointer",
                }}
              >
                + Add Workstream
              </button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button onClick={exportToExcel} disabled={data.length === 0}>
              Export
            </button>
          </div>

          {/* Data Table */}
          <div className="workstream-table">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Users Name</th>
                  <th>Accessibility</th>
                  <th>Comments</th>
                  <th>Review Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No data found
                    </td>
                  </tr>
                ) : (
                  data.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="user-info">
                        <img
                          src={`https://ui-avatars.com/api/?name=${user.owner_name || "User"}`}
                          alt={user.owner_name}
                        />
                        <span>{user.owner_name}</span>
                      </td>
                      <td>{user.accessibility}</td>
                      <td>{user.comments}</td>
                      <td>{new Date(user.review_date).toLocaleDateString()}</td>
                      <td>
                        <FiEdit style={{ cursor: "pointer" }} />
                        <FiTrash2
                          onClick={() => confirmDelete(user.id)}
                          style={{
                            cursor: "pointer",
                            color: "crimson",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                          title="Delete"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <p style={{ marginTop: "10px" }}>{data.length} users</p>
          </div>
        </div>
      </div>

      {/* Modals remain the same */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowDeleteModal(false)}>
              ×
            </button>
            <h3>Are you sure you want to delete this entry?</h3>
            <div className="modal-buttons">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-box success">
            <button className="modal-close" onClick={() => setShowSuccessModal(false)}>
              ×
            </button>
            <h3>✅ Operation completed successfully</h3>
          </div>
        </div>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>Add New Workstream</h3>
            <input
              type="text"
              placeholder="Workstream name"
              value={newWorkstreamName}
              onChange={(e) => setNewWorkstreamName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "10px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={handleAddWorkstream}
                style={{
                  padding: "8px 16px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 16px",
                  background: "#eee",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS styles remain the same */}
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
          transition: 0.3s;
          background: #fff;
        }
        .workstream-card.selected {
          border-color: #8b5cf6;
          background: #f5f3ff;
        }
        .workstream-card.add-card {
          border-style: dashed;
          color: #888;
        }
        .add-new {
          background-color: #6d28d9;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
        .workstream-table table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .workstream-table th, .workstream-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .user-info img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        .status {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
        }
        .status.active {
          background-color: #d1fae5;
          color: #065f46;
        }
        .status.inactive {
          background-color: #fee2e2;
          color: #991b1b;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-box {
          background: white;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          max-width: 700px;
          width: 90%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          position: relative;
        }
        .modal-box.success {
          border-left: 6px solid green;
        }
        .modal-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
        .modal-buttons button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
        .modal-buttons button:first-child {
          background-color: crimson;
          color: white;
        }
        .modal-buttons button:last-child {
          background-color: #ccc;
        }
        .modal-close {
          position: absolute;
          top: 1px;
          right: 3px;
          background: transparent;
          border: none;
          font-size: 22px;
          font-weight: bold;
          color: #888;
          cursor: pointer;
        }
        .modal-close:hover {
          color: #000;
        }
      `}</style>
    </div>
  )
}

export default WorkstreamPage
