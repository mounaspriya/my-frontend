// import React, { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
// import Topbar from "../component/TopBar";
// import "../styles/UsersPage.css";
// import "../styles/Layout.css";
// import axios from "axios";

// const UsersPage = () => {
//     const [users, setUsers] = useState([]);
//     console.log(users,"users")



//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/open/users");
//       setUsers(res.data.users);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // useEffect(() => {
//   //   fetch("https://your-api.com/api/users") // Change to your actual API
//   //     .then((res) => res.json())
//   //     .then((data) => setUsers(data))
//   //     .catch((err) => console.error("Error loading users", err));
//   // }, []);



//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="users-page">
//           <h2>User List</h2>
//           <table className="users-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr><td colSpan="4">Loading...</td></tr>
//               ) : (
//                 users.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.id}</td>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>{user.role}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersPage;


// import React, { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
// import Topbar from "../component/TopBar";
// import "../styles/UsersPage.css";
// import "../styles/Layout.css";
// import axios from "axios";

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [isAllSelected, setIsAllSelected] = useState(false);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/open/users");
//       setUsers(res.data.users);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleSelectUser = (userId) => {
//     setSelectedUsers((prev) =>
//       prev.includes(userId)
//         ? prev.filter((id) => id !== userId)
//         : [...prev, userId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (isAllSelected) {
//       setSelectedUsers([]);
//     } else {
//       setSelectedUsers(users.map((user) => user.id));
//     }
//     setIsAllSelected(!isAllSelected);
//   };

//   const handleDelete = async (userIds) => {
//     try {
//       await axios.post("http://localhost:5000/api/admin/delete-users", {
//         ids: userIds,
//       });
//       fetchUsers();
//       setSelectedUsers([]);
//       setIsAllSelected(false);
//     } catch (error) {
//       console.error("Delete failed", error);
//     }
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <div className="users-page">
//           <h2>User List</h2>

//           {selectedUsers.length > 0 && (
//             <div style={{ marginBottom: "10px" }}>
//               <button
//                 onClick={() => handleDelete(selectedUsers)}
//                 style={{
//                   padding: "8px 12px",
//                   backgroundColor: "#ff4d4d",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Delete Selected ({selectedUsers.length})
//               </button>
//             </div>
//           )}

//           <table className="users-table">
//             <thead>
//               <tr>
//                 <th>
//                   <input
//                     type="checkbox"
//                     onChange={handleSelectAll}
//                     checked={isAllSelected}
//                   />
//                 </th>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="6">Loading...</td>
//                 </tr>
//               ) : (
//                 users.map((user) => (
//                   <tr key={user.id}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={selectedUsers.includes(user.id)}
//                         onChange={() => handleSelectUser(user.id)}
//                       />
//                     </td>
//                     <td>{user.id}</td>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>{user.role}</td>
//                     <td>
//                       <button
//                         onClick={() => handleDelete([user.id])}
//                         style={{
//                           padding: "4px 8px",
//                           backgroundColor: "#e74c3c",
//                           color: "#fff",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersPage;



import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/TopBar";
import "../styles/UsersPage.css";
import "../styles/Layout.css";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    password: "",
    isSuperAdmin: false,
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/open/users`);
      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(searchTerm)
  );

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleDelete = async (userIds) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/delete-users`, {
        ids: userIds,
      });
      fetchUsers();
      setSelectedUsers([]);
      setIsAllSelected(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleCloseModal = () => {
  setShowModal(false);
  setNewUser({ email: "", name: "", password: "", isSuperAdmin: false });
};

  // const handleCreateUser = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/admin/create-user", {
  //       email: newUser.email,
  //       name: newUser.name,
  //       password: newUser.password,
  //       role: newUser.isSuperAdmin ? "admin" : "viewer",
  //     });
  //     setShowModal(false);
  //     setNewUser({ email: "", name: "", password: "", isSuperAdmin: false });
  //     fetchUsers();
  //   } catch (error) {
  //     console.error("Failed to create user:", error);
  //   }
  // };


const handleCreateUser = async () => {
  const { name, email, password, isSuperAdmin } = newUser;

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
      role: isSuperAdmin ? "admin" : "viewer"
    });

    if (res.data.success) {
      alert("User created successfully!");
      setShowModal(false);
      setNewUser({ email: "", name: "", password: "", isSuperAdmin: false });
      fetchUsers(); // refresh user list
    } else {
      alert("Failed to create user: " + res.data.message);
    }
  } catch (err) {
    console.error("Create user error:", err);
    alert(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar onSearch={setSearchTerm}/>
        <div className="users-page">
          <h2>User List</h2>

          {/* Create Button */}
          <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#1d4ed8",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              + Create New User
            </button>

            {selectedUsers.length > 0 && (
              <button
                onClick={() => handleDelete(selectedUsers)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#e11d48",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete Selected ({selectedUsers.length})
              </button>
            )}
          </div>

          {/* Table */}
          {/* <table className="users-table" >
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                  />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => handleDelete([user.id])}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table> */}
  <table className="users-table">
  <thead>
    <tr>
      <th>
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={isAllSelected}
        />
      </th>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.length === 0 ? (
      <tr>
        <td colSpan="6">No users found.</td>
      </tr>
    ) : (
      filteredUsers.map((user) => (
        <tr key={user.id}>
          <td>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleSelectUser(user.id)}
            />
          </td>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button
              onClick={() => handleDelete([user.id])}
              style={{
                padding: "4px 8px",
                backgroundColor: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>


          {/* Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                 <button
              // onClick={() => setShowModal(false)}
              onClick={handleCloseModal}
              className="close-btn"
              title="Close"
            >
              &times;
            </button>
                <h3>Create New User</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
                <label style={{ marginTop: "8px" }}>
                  <input
                    type="checkbox"
                    name="isSuperAdmin"
                    checked={newUser.isSuperAdmin}
                    onChange={handleInputChange}
                  />{" "}
                  Super Admin?
                </label>
                <div style={{ marginTop: "12px" }}>
                  <button onClick={handleCreateUser} style={{ marginRight: "10px" }}>
                    Save
                  </button>
                  <button    onClick={handleCloseModal}>Cancel</button>
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>

     

      <style>{`
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    position: relative;
    background: white;
    padding: 24px;
    border-radius: 8px;
    min-width: 600px;
    display: flex;
    flex-direction: column;
  }
  .modal-content input {
    margin: 6px 0;
    padding: 8px;
    font-size: 14px;
  }
  .modal-content button {
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
  }
  .close-btn {
    position: absolute;
    top: 8px;
    right: 12px;
    background: transparent;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
  }
  .close-btn:hover {
    color: #e11d48;
  }
`}</style>

    </div>
  );
};

export default UsersPage;
