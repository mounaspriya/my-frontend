"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/Form.css"

export default function Workstream3Form() {
  const [formSchema, setFormSchema] = useState([])
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFormSchema()
  }, [])

  const fetchFormSchema = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream3/field-config`)
      if (response.data.success) {
        setFormSchema(response.data.data)
        // Initialize form data with empty values
        const initialData = {}
        response.data.data.forEach((field) => {
          initialData[field.label] = field.type === "checkbox-group" ? [] : ""
        })
        setFormData(initialData)
      }
    } catch (error) {
      console.error("Error fetching form schema:", error)
      alert("Error loading form configuration")
    } finally {
      setLoading(false)
    }
  }

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

  const handleExpiryDateChange = (fieldLabel, value) => {
    // Remove any non-digit characters
    let cleaned = value.replace(/\D/g, "")

    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      cleaned = cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4)
    }

    // Limit to MM/YY format
    if (cleaned.length > 5) {
      cleaned = cleaned.substring(0, 5)
    }

    handleInputChange(fieldLabel, cleaned)
  }

  const renderField = (field, index) => {
    const { label, type, required, options } = field
    const value = formData[label] || ""

    // Handle special expiry date formatting
    const isExpiryField = label.toLowerCase().includes("expiry") && type === "text"

    const parseOptions = (optionsData) => {
      // Handle null, undefined, or empty values
      if (!optionsData) return []

      // If already an array, return it
      if (Array.isArray(optionsData)) return optionsData

      // Convert to string if it's not already a string
      const optionsString = String(optionsData)

      try {
        // Try parsing as JSON first
        const parsed = JSON.parse(optionsString)
        return Array.isArray(parsed) ? parsed : []
      } catch (error) {
        // If JSON parsing fails, treat as comma-separated string
        return optionsString
          .split(",")
          .map((option) => option.trim())
          .filter((option) => option.length > 0)
      }
    }

    switch (type) {
      case "text":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="text"
              id={`field-${index}`}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={value}
              onChange={(e) =>
                isExpiryField ? handleExpiryDateChange(label, e.target.value) : handleInputChange(label, e.target.value)
              }
              required={required}
              {...(isExpiryField && {
                pattern: "^(0[1-9]|1[0-2])\\/([0-9]{2})$",
                maxLength: "5",
                title: "Enter expiry date in MM/YY format",
              })}
            />
            {isExpiryField && <div className="help-text">Enter in MM/YY format (e.g., 09/25)</div>}
          </div>
        )

      case "textarea":
        return (
          <div className="form-group full-width" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <textarea
              id={`field-${index}`}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
              rows="3"
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
          </div>
        )

      case "number":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="number"
              id={`field-${index}`}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
              {...(label.toLowerCase().includes("amount") && { step: "0.01" })}
            />
          </div>
        )

      case "date":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="date"
              id={`field-${index}`}
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </div>
        )

      case "email":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="email"
              id={`field-${index}`}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </div>
        )

      case "url":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="url"
              id={`field-${index}`}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </div>
        )

      case "password":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="password"
              id={`field-${index}`}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </div>
        )

      case "select":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <select
              id={`field-${index}`}
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            >
              <option value="">Select {label.toLowerCase()}</option>
              {parseOptions(options).map((option, optIndex) => (
                <option key={optIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )

      case "radio":
        return (
          <div className="form-group" key={index}>
            <label>
              {label} {required && "*"}
            </label>
            <div className="radio-group horizontal">
              {parseOptions(options).map((option, optIndex) => (
                <label key={optIndex} className="radio-option">
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
          </div>
        )

      case "checkbox":
        return (
          <div className="form-group" key={index}>
            <label className="radio-option">
              <input
                type="checkbox"
                checked={value === true || value === "true"}
                onChange={(e) => handleInputChange(label, e.target.checked)}
                required={required}
              />
              <span className="radio-custom"></span>
              {label} {required && "*"}
            </label>
          </div>
        )

      case "checkbox-group":
        return (
          <div className="form-group full-width" key={index}>
            <label>
              {label} {required && "*"}
            </label>
            <div className="radio-group">
              {parseOptions(options).map((option, optIndex) => (
                <label key={optIndex} className="radio-option">
                  <input
                    type="checkbox"
                    checked={(value || []).includes(option)}
                    onChange={(e) => handleCheckboxGroupChange(label, option, e.target.checked)}
                  />
                  <span className="radio-custom"></span>
                  {option}
                </label>
              ))}
            </div>
          </div>
        )

      case "file":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="file"
              id={`field-${index}`}
              onChange={(e) => handleInputChange(label, e.target.files[0])}
              required={required}
            />
          </div>
        )

      case "color":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="color"
              id={`field-${index}`}
              value={value || "#000000"}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </div>
        )

      case "range":
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"} (Value: {value || 0})
            </label>
            <input
              type="range"
              id={`field-${index}`}
              value={value || 0}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
              min="0"
              max="100"
            />
          </div>
        )

      default:
        return (
          <div className="form-group" key={index}>
            <label htmlFor={`field-${index}`}>
              {label} {required && "*"}
            </label>
            <input
              type="text"
              id={`field-${index}`}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required={required}
            />
          </div>
        )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("🚀 Workstream 3 Form submission started...")
    setIsSubmitting(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/workstream3/submit`,
        { submission: formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      console.log("✅ API Response:", response.data)

      if (response.data.success) {
        alert("✅ Workstream 3 form submitted successfully!")

        // Reset form data
        const resetData = {}
        formSchema.forEach((field) => {
          resetData[field.label] = field.type === "checkbox-group" ? [] : ""
        })
        setFormData(resetData)
      }
    } catch (error) {
      console.error("❌ Form submission error:", error)
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred"
      alert(`❌ Error submitting form: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Group fields into rows (2 fields per row, except full-width fields)
  const groupFieldsIntoRows = (fields) => {
    const rows = []
    let currentRow = []

    fields.forEach((field, index) => {
      const isFullWidth = field.type === "textarea" || field.type === "checkbox-group"

      if (isFullWidth) {
        // If current row has fields, push it first
        if (currentRow.length > 0) {
          rows.push(currentRow)
          currentRow = []
        }
        // Add full-width field as its own row
        rows.push([field])
      } else {
        currentRow.push(field)
        // If current row has 2 fields, push it and start new row
        if (currentRow.length === 2) {
          rows.push(currentRow)
          currentRow = []
        }
      }
    })

    // Add remaining fields in current row
    if (currentRow.length > 0) {
      rows.push(currentRow)
    }

    return rows
  }

  if (loading) {
    return (
      <div className="form-container">
        <div className="form-content">
          <h2 className="form-title">Loading Workstream 03 Form...</h2>
          <p>Please wait while we load the form configuration.</p>
        </div>
      </div>
    )
  }

  if (formSchema.length === 0) {
    return (
      <div className="form-container">
        <div className="form-content">
          <h2 className="form-title">Workstream 03 - Dynamic Form</h2>
          <p>No form fields have been configured yet. Please contact the administrator to set up the form fields.</p>
        </div>
      </div>
    )
  }

  const fieldRows = groupFieldsIntoRows(formSchema)

  return (
    <div className="form-container">
      <div className="form-content">
        <h2 className="form-title">Workstream 03 - Dynamic Form</h2>

        <form onSubmit={handleSubmit} className="reviewer-form">
          {fieldRows.map((row, rowIndex) => {
            const isFullWidthRow = row.length === 1 && (row[0].type === "textarea" || row[0].type === "checkbox-group")

            return (
              <div key={rowIndex} className={isFullWidthRow ? "" : "form-row"}>
                {row.map((field, fieldIndex) => {
                  const originalIndex = formSchema.findIndex((f) => f.id === field.id)
                  return renderField(field, originalIndex)
                })}
              </div>
            )
          })}

          {/* Submit Button */}
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Dynamic Form"}
          </button>
        </form>
      </div>
    </div>
  )
}
