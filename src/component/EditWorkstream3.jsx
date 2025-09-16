// "use client"

// import { useState, useEffect } from "react"
// import { ArrowLeft, Save } from "lucide-react"

// const styles = {
//   container: { padding: "24px", maxWidth: "800px", margin: "0 auto" },
//   header: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" },
//   label: { fontWeight: "600", marginBottom: "4px" },
//   input: { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" },
//   formGroup: { marginBottom: "16px" },
//   button: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     padding: "10px 16px",
//     borderRadius: "6px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "500",
//   },
//   saveBtn: { backgroundColor: "#3b82f6", color: "white" },
// }

// export default function EditWorkstream3({ recordId, onBack, onSave }) {
//   const [formData, setFormData] = useState({})
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchRecord()
//   }, [recordId])

//   const fetchRecord = async () => {
//     try {
//       setLoading(true)
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${recordId}`)
//       const data = await res.json()
//       if (data.success) {
//         const parsed = typeof data.data.submission === "string"
//           ? JSON.parse(data.data.submission)
//           : data.data.submission
//         setFormData(parsed)
//       }
//     } catch (err) {
//       console.error("Error fetching record:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }))
//   }

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${recordId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ submission: formData }),
//       })
//       const result = await res.json()
//       if (result.success) {
//         alert("Record updated successfully")
//         if (onSave) onSave(result.data)
//         onBack()
//       } else {
//         alert("Failed to update record")
//       }
//     } catch (err) {
//       console.error("Update error:", err)
//       alert("Error updating record")
//     }
//   }

//   if (loading) return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <button onClick={onBack} style={styles.button}>
//           <ArrowLeft size={16} /> Back
//         </button>
//         <h2>Edit Workstream 3 Record</h2>
//       </div>

//       <form>
//         {Object.entries(formData).map(([key, value]) => (
//           <div key={key} style={styles.formGroup}>
//             <label style={styles.label}>{key}</label>
//             <input
//               type="text"
//               value={value}
//               onChange={(e) => handleChange(key, e.target.value)}
//               style={styles.input}
//             />
//           </div>
//         ))}
//       </form>

//       <button onClick={handleSubmit} style={{ ...styles.button, ...styles.saveBtn }}>
//         <Save size={16} /> Save Changes
//       </button>
//     </div>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save } from "lucide-react"
import "../styles/Form.css"

export default function EditWorkstream3({ recordId, onBack, onSave }) {
  const [formSchema, setFormSchema] = useState([])
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchFormSchema()
  }, [])

  useEffect(() => {
    if (formSchema.length > 0) {
      fetchRecord()
    }
  }, [formSchema, recordId])

  // ✅ Fetch schema
  const fetchFormSchema = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream3/field-config`)
      const data = await res.json()
      if (data.success) {
        setFormSchema(data.data)
      }
    } catch (err) {
      console.error("Error fetching schema:", err)
    }
  }

  // ✅ Fetch record by ID
  const fetchRecord = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${recordId}`)
      const data = await res.json()
      if (data.success) {
        const parsed =
          typeof data.data.submission === "string"
            ? JSON.parse(data.data.submission)
            : data.data.submission
        setFormData(parsed)
      }
    } catch (err) {
      console.error("Error fetching record:", err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Input handlers
  const handleInputChange = (fieldLabel, value) => {
    setFormData((prev) => ({ ...prev, [fieldLabel]: value }))
  }

  const handleCheckboxGroupChange = (fieldLabel, optionValue, checked) => {
    setFormData((prev) => {
      const currentValues = prev[fieldLabel] || []
      if (checked) {
        return { ...prev, [fieldLabel]: [...currentValues, optionValue] }
      } else {
        return { ...prev, [fieldLabel]: currentValues.filter((v) => v !== optionValue) }
      }
    })
  }

  // ✅ Render fields
  const renderField = (field, index) => {
    const { label, type, required, options } = field
    const value = formData[label] || ""

    const parseOptions = (optionsData) => {
      if (!optionsData) return []
      if (Array.isArray(optionsData)) return optionsData
      const optionsString = String(optionsData)
      try {
        const parsed = JSON.parse(optionsString)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return optionsString
          .split(",")
          .map((o) => o.trim())
          .filter((o) => o.length > 0)
      }
    }

    switch (type) {
      case "text":
        return (
          <>
            <label>{label} {required && "*"}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </>
        )
      case "date":
        return (
          <>
            <label>{label} {required && "*"}</label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </>
        )
      case "radio":
        return (
          <>
            <label>{label} {required && "*"}</label>
            <div className="radio-group horizontal">
              {parseOptions(options).map((option, i) => (
                <label key={i} className="radio-option">
                  <input
                    type="radio"
                    name={`field-${index}`}
                    value={option}
                    checked={value === option}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                    required={required}
                  />
                  <span className="radio-custom"></span>
                  {option}
                </label>
              ))}
            </div>
          </>
        )
      default:
        return (
          <>
            <label>{label} {required && "*"}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </>
        )
    }
  }

  // ✅ Group fields into rows (2 per row, full width for textarea/checkbox-group)
  const groupFieldsIntoRows = (fields) => {
    const rows = []
    let currentRow = []

    fields.forEach((field) => {
      const isFullWidth = field.type === "textarea" || field.type === "checkbox-group"
      if (isFullWidth) {
        if (currentRow.length > 0) {
          rows.push(currentRow)
          currentRow = []
        }
        rows.push([field])
      } else {
        currentRow.push(field)
        if (currentRow.length === 2) {
          rows.push(currentRow)
          currentRow = []
        }
      }
    })

    if (currentRow.length > 0) rows.push(currentRow)
    return rows
  }

  // ✅ Submit handler
  const handleSubmit = async () => {
    try {
      setIsSaving(true)
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream3/${recordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission: formData }),
      })
      const result = await res.json()
      if (result.success) {
        alert("Record updated successfully")
        if (onSave) onSave(result.data)
        onBack()
      } else {
        alert("Failed to update record")
      }
    } catch (err) {
      console.error("Update error:", err)
      alert("Error updating record")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) return <div className="form-container"><p>Loading...</p></div>

  const fieldRows = groupFieldsIntoRows(formSchema)

  return (
    <div className="form-container-edit">
      <div className="form-content">

          <button
          onClick={onBack}
          style={{
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
          }}
        >
          ← Back to Workstream 3
        </button>
          <h2 className="form-title">Edit Workstream 3 Record</h2>
    

        <form>
          {fieldRows.map((row, rowIndex) => (
            <div key={rowIndex} className={row.length === 1 ? "form-row single" : "form-row"}>
              {row.map((field, i) => (
                <div key={i} className="form-group">
                  {renderField(field, i)}
                </div>
              ))}
            </div>
          ))}
        </form>

        <button onClick={handleSubmit} className="submit-button" disabled={isSaving}>
          {isSaving ? "Saving..." : <><Save size={16} /> Save Changes</>}
        </button>
      </div>
    </div>
  )
}
