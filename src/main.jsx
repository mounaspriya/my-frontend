// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/login.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import Register from './pages/Register.jsx';
// import './index.css';
// import Workspace from './pages/Workspace.jsx';
// import Form1 from './pages/Form1.jsx';
// import Form2 from './pages/Form2.jsx';
// import WorkspaceDataViewer from './pages/Workspace1DataViewer.jsx';
// import EditWorkspace from './pages/EditWorkspace1.jsx';

// import AdminDashboard from './pages/AdminDashboard.jsx';
// import DashboardView from './pages/DashboardView.jsx';
// import UsersPage from './pages/UsersPage.jsx';
// import AdminWorkstream from './pages/AdminWorkstream.jsx';
// import ConfigurePage from './component/ConfigurePage.jsx';
// import NewRecordPage from "./pages/NewRecordPage.jsx";
// import { SearchProvider } from "./component/SearchContext.jsx"


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//    <SearchProvider>
//     <Routes>
//       {/* Set Register as default page on "/" */}
//       <Route path="/" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/workspace/:id" element={<Workspace />} />
//       <Route path="/workspace/1/form" element={<Form1 />} />
//       <Route path="/workspace/2/form" element={<Form2 />} />
//       <Route path="/workspace/3/form" element={<Form1 />} />
//       <Route path="/workspace/4/form" element={<Form1 />} />
//       <Route path="/workspace/1/view" element={<WorkspaceDataViewer />} />
//         <Route path="/edit/:id" element={<EditWorkspace />} />
//          <Route path="/admindashboard" element={<AdminDashboard />} />
            

//              <Route path="/dashboardview" element={<DashboardView />} />
            
//              <Route path="/users" element={<UsersPage />} />
//              <Route path="/workstream" element={<AdminWorkstream />} />
//                 <Route path="/workstream/configure" element={<ConfigurePage />} />
//                        <Route path="/new-record" element={<NewRecordPage />} />


//     </Routes>
//        </SearchProvider>
//   </BrowserRouter>
// );





import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import ProtectedRoute, { AdminRoute, ViewerRoute } from "./component/ProtectedRoute.jsx"
import Login from "./pages/login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import RegisterPage from "./pages/Register.jsx" // Updated to use the correct RegisterPage component
import "./index.css"
import Workspace from "./pages/Workspace.jsx"
import Form1 from "./pages/Form1.jsx"
import Form2 from "./pages/Form2.jsx"
import WorkspaceDataViewer from "./pages/Workspace1DataViewer.jsx"
import EditWorkspace from "./pages/EditWorkspace1.jsx"

import AdminDashboard from "./pages/AdminDashboard.jsx"
import DashboardView from "./pages/DashboardView.jsx"
import UsersPage from "./pages/UsersPage.jsx"
import AdminWorkstream from "./pages/AdminWorkstream.jsx"
import ConfigurePage from "./component/ConfigurePage.jsx"
import NewRecordPage from "./pages/NewRecordPage.jsx"
import { SearchProvider } from "./component/SearchContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <Routes>
          {/* Public routes - no authentication required */}
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workspace/:id"
            element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workspace/1/form"
            element={
              <ProtectedRoute>
                <Form1 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workspace/2/form"
            element={
              <ProtectedRoute>
                <Form2 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workspace/3/form"
            element={
              <ProtectedRoute>
                <Form1 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workspace/4/form"
            element={
              <ProtectedRoute>
                <Form1 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workspace/1/view"
            element={
              <ProtectedRoute>
                <WorkspaceDataViewer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditWorkspace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/new-record"
            element={
              <ProtectedRoute>
                <NewRecordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admindashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/users"
            element={
              <AdminRoute>
                <UsersPage />
              </AdminRoute>
            }
          />

          <Route
            path="/workstream"
            element={
              <AdminRoute>
                <AdminWorkstream />
              </AdminRoute>
            }
          />

          <Route
            path="/workstream/configure"
            element={
              <AdminRoute>
                <ConfigurePage />
              </AdminRoute>
            }
          />

          <Route
            path="/dashboardview"
            element={
              <ViewerRoute>
                <DashboardView />
              </ViewerRoute>
            }
          />
        </Routes>
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>,
)
