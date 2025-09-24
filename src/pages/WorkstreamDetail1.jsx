"use client"

import { useState, useEffect } from "react"
import { Filter, Download, Share, Plus, Edit, ArrowLeft, Settings, X, Check, Eye } from "lucide-react"
import EditReviewerForm from "../component/EditWorkstream1"
import * as XLSX from "xlsx"
import { useNavigate } from "react-router-dom"

// ... your existing styles (unchanged)

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

  // Edit functionality
  const [editingRecordId, setEditingRecordId] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)

  // View functionality
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewRecord, setViewRecord] = useState(null)

  // Column customization
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

  const alwaysVisibleFields = ["id", "accessibility"]
    const navigate = useNavigate()

  const allFields = {
    id: "ID",
    owner_name: "Reviewed By",
    registration_type: "Registration Type",
    review_status:"Review Status",
    review_type:"Review Type",
    website_url:"Website URL",
    review_date: "Review Date",
      calculated_friday: "Calculated Friday",
    review_month: "Review Month",
    review_year: "Review Year",
    review_traffic:"Review Date Traffic",
    website_operator: "Website Owner",
        website_type: "Website Type",
         accessibility: "Accessibility",
 
    third_party_content: "Third Party Content",
   

    
  
  
    images: "Images Count",
    
    created_at: "Created At",
  }


   const handleAddNew = () => {
    navigate("/new-record")   // 👉 replace with your actual Add New route
  }


  // Fetch workstream data
  const fetchWorkstreamData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      let workstreams = []
      if (Array.isArray(data)) workstreams = data
      else if (data?.data) workstreams = data.data
      else if (data?.workstreams) workstreams = data.workstreams
      else if (typeof data === "object") workstreams = [data]
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

  // --- Edit handlers ---
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
    setWorkstreamData((prev) => prev.map((r) => (r.id === updatedRecord.id ? updatedRecord : r)))
  }

  // --- View handlers ---
  const handleViewRecord = (record) => {
    console.log(record,"record")
    setViewRecord(record)
    setShowViewModal(true)
  }
  const handleCloseViewModal = () => {
    setShowViewModal(false)
    setViewRecord(null)
  }


  const openFieldSelector = () => {
  setTempSelectedFields([...selectedFields])
  setShowFieldSelector(true)
}

const handleFieldToggle = (fieldKey) => {
  if (alwaysVisibleFields.includes(fieldKey)) return
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

// const exportToExcel = () => {
//   try {
//     const exportData = filteredData.map((record) => {
//       const exportRecord = {}
//       selectedFields.forEach((fieldKey) => {
//         const displayName = allFields[fieldKey]
//         exportRecord[displayName] =
//           fieldKey === "accessibility" ? record[fieldKey] || "N/A" : formatFieldValue(record, fieldKey)
//       })
//       return exportRecord
//     })
//     const workbook = XLSX.utils.book_new()
//     const worksheet = XLSX.utils.json_to_sheet(exportData)
//     const columnWidths = selectedFields.map((fieldKey) => {
//       const displayName = allFields[fieldKey]
//       return { wch: Math.max(displayName.length, 15) }
//     })
//     worksheet["!cols"] = columnWidths
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Workstream")
//     const currentDate = new Date().toISOString().split("T")[0]
//     XLSX.writeFile(workbook, `Workstream_${currentDate}.xlsx`)
//   } catch (error) {
//     console.error("Export failed:", error)
//     alert("Export failed. Please try again.")
//   }
// }


  // // Formatters
  // const formatFieldValue = (item, fieldKey) => {
  //   const value = item[fieldKey]
  //   switch (fieldKey) {
  //     case "review_date":
  //     case "created_at":
  //     case "calculated_friday":
  //       return value ? value.split("T")[0] : "N/A"
  //     case "images":
  //       try {
  //         const images = typeof value === "string" ? JSON.parse(value) : value
  //         return Array.isArray(images) ? images.length : 0
  //       } catch {
  //         return 0
  //       }
  //     case "a_checks":
  //       try {
  //         const checks = typeof value === "string" ? JSON.parse(value) : value
  //         return Array.isArray(checks) ? `${checks.filter((c) => c.checked).length}/${checks.length}` : "0/0"
  //       } catch {
  //         return "0/0"
  //       }
  //     default:
  //       return value || "N/A"
  //   }
  // }

  const exportToCSV = () => {
  try {
    const exportData = filteredData.map((record) => {
      const exportRecord = {}
    Object.keys(allFields).forEach((fieldKey) => {

        const displayName = allFields[fieldKey]
        exportRecord[displayName] =
          fieldKey === "accessibility" ? record[fieldKey] || "N/A" : formatFieldValue(record, fieldKey)
      })
      return exportRecord
    })

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const csv = XLSX.utils.sheet_to_csv(worksheet)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    const currentDate = new Date().toISOString().split("T")[0]
    link.download = `Workstream_${currentDate}.csv`
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("CSV export failed:", error)
    alert("CSV export failed. Please try again.")
  }
}

const handleSingleRecordExport = (recordId) => {
  try {
    const record = workstreamData.find((r) => r.id === recordId)
    if (!record) return

    // Export ALL fields, not just selectedFields
    const exportRecord = {}
    Object.keys(allFields).forEach((fieldKey) => {
      const displayName = allFields[fieldKey]
      exportRecord[displayName] =
        fieldKey === "accessibility" ? record[fieldKey] || "N/A" : formatFieldValue(record, fieldKey)
    })

    const worksheet = XLSX.utils.json_to_sheet([exportRecord])
    const csv = XLSX.utils.sheet_to_csv(worksheet)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Workstream_Record_${recordId}.csv`
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Single record CSV export failed:", error)
    alert("Failed to export record.")
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

  const filteredData = workstreamData.filter(
    (r) =>
      (r.owner_name && r.owner_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.registration_site && r.registration_site.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  if (showEditForm && editingRecordId) {
    return <EditReviewerForm recordId={editingRecordId} onBack={handleBackToList} onSave={handleSaveRecord} />
  }

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {/* Back Button */}
        <button style={styles.backButton} onClick={onBack}>
          <ArrowLeft size={16} /> Back to Dashboard 1
        </button>
        <div style={styles.pageHeader}>
  <h1 style={styles.pageTitle}>Workstream</h1>
  <div style={styles.actionButtons}>
    {/* <button style={styles.actionButton}>
      <Filter size={16} />
      Filter
    </button> */}
    <button style={styles.actionButton} onClick={openFieldSelector}>
      <Settings size={16} />
      Manage Columns ({selectedFields.length}/10)
    </button>
    <button
      style={loading || filteredData.length === 0 ? styles.actionButtonDisabled : styles.actionButton}
      onClick={exportToCSV}
      disabled={loading || filteredData.length === 0}
    >
      <Download size={16} />
      Export
    </button>
    <button style={styles.actionButton}>
      <Share size={16} />
      Share
    </button>
    <button style={{ ...styles.actionButton, ...styles.primaryButton }}  onClick={handleAddNew} >
      <Plus size={16} />
      Add New
    </button>
  </div>
</div>


        {/* Table */}
        <div style={styles.table}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>Loading workstream data...</div>
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
                    <tr key={record.id} style={styles.tableRow}>
                      {selectedFields.map((f) => (
                        <td key={f} style={styles.tableCell}>
                          {f === "accessibility" ? getAccessibilityBadge(record[f]) : formatFieldValue(record, f)}
                        </td>
                      ))}
                      <td style={styles.tableCell}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button style={styles.button} onClick={() => handleViewRecord(record)} title="View">
                            <Eye size={16} />
                          </button>
                          <button style={styles.button} onClick={() => handleEditRecord(record.id)} title="Edit">
                            <Edit size={16} />
                          </button>
                          <button
                            style={styles.button}
                            onClick={() => handleSingleRecordExport(record.id)}
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

     
      {/* --- View Modal --- */}
      {showViewModal && viewRecord && (
  <div style={styles.modalOverlay}>
    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        padding: "0", // remove padding to handle header separately
        maxWidth: "700px",
        width: "90%",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ margin: 0 }}>Record Details</h3>
        <button onClick={handleCloseViewModal} style={styles.closeButton}>
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={{ overflowY: "auto", padding: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {/* Standard fields */}
            {Object.entries(allFields).map(([key, label]) => (
              <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ fontWeight: "600", padding: "8px", width: "40%" }}>{label}</td>
                <td style={{ padding: "8px" }}>
                  {key === "accessibility"
                    ? getAccessibilityBadge(viewRecord[key])
                    : formatFieldValue(viewRecord, key)}
                </td>
              </tr>
            ))}

            {/* Conditional fields */}
            {viewRecord.conditional_fields && (
              <>
                <tr>
                  <td colSpan={2} style={{ fontWeight: "600", padding: "8px", background: "#f3f4f6" }}>
                    Conditional Fields
                  </td>
                </tr>
                {Object.entries(viewRecord.conditional_fields).map(([cfKey, cfValue]) => (
                  <tr key={cfKey} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ fontWeight: "600", padding: "8px", width: "40%" }}>{cfKey}</td>
                    <td style={{ padding: "8px" }}>
                      Answer: {cfValue.answer || "N/A"} <br />
                      Comments: {cfValue.comments || "N/A"}
                    </td>
                  </tr>
                ))}
              </>
            )}

            {/* Images */}
            {viewRecord.images && viewRecord.images.length > 0 && (
              <>
                <tr>
                  <td colSpan={2} style={{ fontWeight: "600", padding: "8px", background: "#f3f4f6" }}>
                    Images
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {viewRecord.images.map((img, idx) => (
                      <a key={idx} href={img.url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={img.url}
                          alt={img.originalname || `Image ${idx + 1}`}
                          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
                        />
                      </a>
                    ))}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}



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
                    <span style={{ fontSize: "12px", color: "#888", marginLeft: "4px" }}>
                      (required)
                    </span>
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
