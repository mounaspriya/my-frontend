"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { X, Plus, Upload, AlertCircle } from "lucide-react"

const WorkstreamForm = () => {
  // Helper function to get Friday of any given week using pure string manipulation
  const getFridayOfWeek = (dateStr) => {
    if (!dateStr) return null

    try {
      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(dateStr)) {
        console.error("❌ Invalid date format:", dateStr)
        return null
      }

      // Parse date components as numbers
      const [year, month, day] = dateStr.split("-").map(Number)

      // Validate date components
      if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
        console.error("❌ Invalid date components:", { year, month, day })
        return null
      }

      // Calculate day of week using Zeller's congruence (no Date object needed)
      let adjustedMonth = month
      let adjustedYear = year

      if (month < 3) {
        adjustedMonth += 12
        adjustedYear -= 1
      }

      // Zeller's congruence formula
      const q = day
      const m = adjustedMonth
      const k = adjustedYear % 100
      const j = Math.floor(adjustedYear / 100)

      const h = (q + Math.floor((13 * (m + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) - 2 * j) % 7

      // Convert Zeller's result to standard day of week (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
      const dayOfWeek = (h + 5) % 7 // Convert to 0 = Monday, 1 = Tuesday, ..., 6 = Sunday

      // Calculate days to add to get to Friday (4 = Friday in 0-based week starting Monday)
      const daysToFriday = (4 - dayOfWeek + 7) % 7

      // Add days to get Friday
      const fridayDay = day + daysToFriday
      let fridayMonth = month
      let fridayYear = year

      // Handle month overflow
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

      // Check for leap year
      if (fridayYear % 4 === 0 && (fridayYear % 100 !== 0 || fridayYear % 400 === 0)) {
        daysInMonth[1] = 29
      }

      if (fridayDay > daysInMonth[fridayMonth - 1]) {
        const newDay = fridayDay - daysInMonth[fridayMonth - 1]
        fridayMonth += 1

        if (fridayMonth > 12) {
          fridayMonth = 1
          fridayYear += 1
        }

        return `${fridayYear}-${String(fridayMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`
      }

      return `${fridayYear}-${String(fridayMonth).padStart(2, "0")}-${String(fridayDay).padStart(2, "0")}`
    } catch (error) {
      console.error("❌ Error calculating Friday:", error)
      return null
    }
  }

  // Helper function to get current date values without timezone issues
  const getCurrentDateValues = () => {
    // Get current date in local timezone as YYYY-MM-DD string
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    const todayStr = `${year}-${month}-${day}`

    const fridayOfWeek = getFridayOfWeek(todayStr)

    // Get month name and year from Friday date
    const [fridayYear, fridayMonth] = fridayOfWeek.split("-").map(Number)
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    return {
      today: todayStr,
      fridayOfWeek,
      month: monthNames[fridayMonth - 1],
      year: fridayYear,
    }
  }

  // Initialize with current date values
  const initialDateValues = getCurrentDateValues()

  const [selectedDate, setSelectedDate] = useState(initialDateValues.today)
  const [calculatedFriday, setCalculatedFriday] = useState(initialDateValues.fridayOfWeek)

  const [formData, setFormData] = useState({
    website_url: "",
    accessibility: "",
    third_party_content: "",
    conditional_response: "",
    website_type: "",
    registration_site: "",
    comments: "",
    website_operator: "",
    owner_name: "",
    review_date: initialDateValues.today,
    calculated_friday: initialDateValues.fridayOfWeek,
    review_month: initialDateValues.month,
    review_year: initialDateValues.year,
    review_traffic: "",
    images: [],
    website_source_id: "",
  })

  const [aChecks, setAChecks] = useState(Array.from({ length: 19 }, () => ({ checked: false, comment: "" })))
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [urlStatus, setUrlStatus] = useState({ isNew: false, message: "" })

  // Reset date fields to current values on component mount and when needed
  useEffect(() => {
    const resetToCurrentDate = () => {
      const currentValues = getCurrentDateValues()

      console.log("🔄 Resetting to current date values:", currentValues)

      setSelectedDate(currentValues.today)
      setCalculatedFriday(currentValues.fridayOfWeek)

      setFormData((prev) => ({
        ...prev,
        review_date: currentValues.today,
        calculated_friday: currentValues.fridayOfWeek,
        review_month: currentValues.month,
        review_year: currentValues.year,
      }))
    }

    // Reset on component mount
    resetToCurrentDate()

    // Optional: Reset every time the component becomes visible (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        resetToCurrentDate()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  const fetchSuggestions = async (searchTerm) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/website-sources?search=${searchTerm}`)
      setSuggestions(response.data)
      setShowSuggestions(true)

      const exactMatch = response.data.find((item) => item.website_url.toLowerCase() === searchTerm.toLowerCase())

      if (!exactMatch && searchTerm.length > 3) {
        setUrlStatus({
          isNew: true,
          message: "This URL will be added as a new entry when you submit the form.",
        })
      } else {
        setUrlStatus({ isNew: false, message: "" })
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error)
      setSuggestions([])
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      website_url: value,
      website_source_id: "",
    }))

    if (value.length > 1) {
      fetchSuggestions(value)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setUrlStatus({ isNew: false, message: "" })
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      website_url: suggestion.website_url,
      website_source_id: suggestion.id,
    }))
    setSuggestions([])
    setShowSuggestions(false)
    setUrlStatus({ isNew: false, message: "" })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle date change without timezone conversion
  const handleDateChange = (e) => {
    const selected = e.target.value
    console.log("📅 Date changed to:", selected)

    const fridayDate = getFridayOfWeek(selected)
    console.log("�� Calculated Friday:", fridayDate)

    // Get month and year from Friday date using string parsing
    const [fridayYear, fridayMonth] = fridayDate.split("-").map(Number)
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const month = monthNames[fridayMonth - 1]
    const year = fridayYear

    console.log("📅 Final values:", { selected, fridayDate, month, year })

    setFormData((prev) => ({
      ...prev,
      review_date: selected,
      calculated_friday: fridayDate,
      review_month: month,
      review_year: year,
    }))

    setSelectedDate(selected)
    setCalculatedFriday(fridayDate)
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const currentImages = formData.images
    const remainingSlots = 3 - currentImages.length
    const filesToAdd = files.slice(0, remainingSlots)

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filesToAdd],
    }))

    e.target.value = ""
  }

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleACheckChange = (index, type, value) => {
    setAChecks((prev) => {
      const updated = [...prev]
      updated[index][type] = value
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      const formDataToSend = new FormData()

      // Add all normal text fields except images
      for (const key in formData) {
        if (key !== "images") {
          formDataToSend.append(key, formData[key])
        }
      }

      // Calculate auto Friday date without timezone conversion
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, "0")
      const day = String(today.getDate()).padStart(2, "0")
      const todayStr = `${year}-${month}-${day}`

      const autoFridayDate = getFridayOfWeek(todayStr)
      formDataToSend.append("auto_friday_date", autoFridayDate)

      // Add image files
      formData.images.forEach((file) => {
        formDataToSend.append("images", file)
      })

      // Add aChecks array as JSON string
      formDataToSend.append("aChecks", JSON.stringify(aChecks))

      console.log("📤 Submitting form with data:")
      console.log("- review_date:", formData.review_date)
      console.log("- calculated_friday:", formData.calculated_friday)
      console.log("- auto_friday_date:", autoFridayDate)

    //  const response = await axios.post("http://localhost:5000/api/workstream", formDataToSend,  {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: (progressEvent) => {
    //       const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //       setUploadProgress(percentCompleted)
    //     },
    //   })
    const response = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/api/workstream`,
  formDataToSend,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      setUploadProgress(percentCompleted)
    },
  }
)


      console.log("✅ Submission response:", response.data)
      alert(`Submitted successfully! Response: ${JSON.stringify(response.data, null, 2)}`)

      // Reset form with fresh current date values
      const resetDateValues = getCurrentDateValues()
      setFormData({
        website_url: "",
        accessibility: "",
        third_party_content: "",
        conditional_response: "",
        website_type: "",
        registration_site: "",
        comments: "",
        website_operator: "",
        owner_name: "",
        review_date: resetDateValues.today,
        calculated_friday: resetDateValues.fridayOfWeek,
        review_month: resetDateValues.month,
        review_year: resetDateValues.year,
        review_traffic: "",
        images: [],
        website_source_id: "",
      })

      setSelectedDate(resetDateValues.today)
      setCalculatedFriday(resetDateValues.fridayOfWeek)
      setAChecks(Array.from({ length: 19 }, () => ({ checked: false, comment: "" })))
      setUrlStatus({ isNew: false, message: "" })
    } catch (error) {
      console.error("❌ Submission error:", error)
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Submission failed: ${error.response.data.error}`)
      } else {
        alert("Submission failed. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  // Function to manually reset date fields (optional button)
  const resetDateFields = () => {
    const currentValues = getCurrentDateValues()

    console.log("🔄 Manual reset to current date values:", currentValues)

    setSelectedDate(currentValues.today)
    setCalculatedFriday(currentValues.fridayOfWeek)

    setFormData((prev) => ({
      ...prev,
      review_date: currentValues.today,
      calculated_friday: currentValues.fridayOfWeek,
      review_month: currentValues.month,
      review_year: currentValues.year,
    }))
  }

  const getACheckLimit = () => {
    const value = formData.third_party_content
    if (value === "Yes (Will answer all the questions)") return 19
    if (value === "No (Will skip questions from Column U to Column AI)") return 15
    return 0
  }

  const aCheckLimit = getACheckLimit()

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Workstream Submission Form</h2>

        <div style={sectionStyle}>
          <label style={labelStyle}>Accessibility:</label>
          <div style={radioGroupStyle}>
            {["Yes", "No", "NA"].map((val) => (
              <label key={val} style={radioLabelStyle}>
                <input
                  type="radio"
                  name="accessibility"
                  value={val}
                  checked={formData.accessibility === val}
                  onChange={handleChange}
                />
                {val}
              </label>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Third-party content:</label>
          <select
            name="third_party_content"
            value={formData.third_party_content}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select</option>
            <option value="Yes (Will answer all the questions)">Yes (Will answer all the questions)</option>
            <option value="No (Will skip questions from Column U to Column AI)">
              No (Will skip questions from Column U to Column AI)
            </option>
            <option value="NA (Will Stop at Column T)">NA (Will Stop at Column T)</option>
          </select>
        </div>

        {/* Website URL Autocomplete with New URL Indicator */}
        <div style={{ ...sectionStyle, position: "relative" }}>
          <label style={labelStyle}>Website URL</label>
          <input
            type="text"
            value={formData.website_url}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onFocus={() => {
              if (formData.website_url.length > 1 && suggestions.length > 0) setShowSuggestions(true)
            }}
            style={inputStyle}
            placeholder="Start typing a website URL..."
            required
          />

          {/* New URL Status Indicator */}
          {urlStatus.isNew && (
            <div style={newUrlIndicatorStyle}>
              <AlertCircle size={16} style={{ marginRight: "8px" }} />
              {urlStatus.message}
            </div>
          )}

          {showSuggestions && (
            <ul style={styles.suggestions}>
              {suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSuggestionClick(item)} style={styles.suggestionItem}>
                    {item.website_url}
                  </li>
                ))
              ) : (
                <li style={styles.suggestionItem}>No existing URLs found</li>
              )}
            </ul>
          )}
        </div>

        {formData.third_party_content && (
          <input
            name="conditional_response"
            placeholder="Conditional Response"
            value={formData.conditional_response}
            onChange={handleChange}
            style={inputStyle}
          />
        )}

        {["website_type", "registration_site", "comments", "website_operator", "owner_name", "review_traffic"].map(
          (field) => (
            <input
              key={field}
              name={field}
              placeholder={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              value={formData[field]}
              onChange={handleChange}
              style={inputStyle}
            />
          ),
        )}

        {/* Date Fields Section */}
        <div style={dateFieldsContainerStyle}>
          <div style={dateFieldsHeaderStyle}>
            <h4 style={{ margin: 0, color: "#333" }}>Date Information</h4>
            <button type="button" onClick={resetDateFields} style={resetButtonStyle} title="Reset to current date">
              🔄 Reset to Today
            </button>
          </div>

          {/* Editable Review Date */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Review Date</label>
            <input type="date" name="review_date" value={selectedDate} onChange={handleDateChange} style={inputStyle} />
          </div>

          {/* Auto-filled Friday Date */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Friday of Same Week</label>
            <input
              type="date"
              name="calculated_friday"
              value={calculatedFriday}
              readOnly
              style={{ ...inputStyle, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />
          </div>

          {/* Auto-filled Month */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Month</label>
            <input
              type="text"
              name="review_month"
              value={formData.review_month}
              readOnly
              style={{ ...inputStyle, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />
          </div>

          {/* Auto-filled Year */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Year</label>
            <input
              type="text"
              name="review_year"
              value={formData.review_year}
              readOnly
              style={{ ...inputStyle, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />
          </div>
        </div>

        {aCheckLimit > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>A1 - A{aCheckLimit} Section</h4>
            {aChecks.slice(0, aCheckLimit).map((item, index) => (
              <div key={index} style={aCheckItemStyle}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => handleACheckChange(index, "checked", e.target.checked)}
                  />
                  {" A" + (index + 1)}
                </label>
                <input
                  type="text"
                  placeholder={`A${index + 1} Comment`}
                  value={item.comment}
                  onChange={(e) => handleACheckChange(index, "comment", e.target.value)}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
        )}

        {/* Image Upload Section with Thumbnails */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Upload Images (Max 3):</label>

          <div style={imageGridStyle}>
            {/* Display uploaded images with thumbnails */}
            {formData.images.map((file, index) => (
              <div key={index} style={thumbnailContainerStyle}>
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  style={thumbnailImageStyle}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  style={removeButtonStyle}
                  disabled={isSubmitting}
                >
                  <X size={16} />
                </button>
                <div style={imageInfoStyle}>
                  <div style={imageNameStyle}>{file.name}</div>
                  <div style={imageSizeStyle}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              </div>
            ))}

            {/* Add more images button */}
            {formData.images.length < 3 && (
              <div style={addImageContainerStyle}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={hiddenInputStyle}
                  id={`image-upload-${formData.images.length}`}
                  disabled={isSubmitting}
                  multiple={formData.images.length === 0}
                />
                <label htmlFor={`image-upload-${formData.images.length}`} style={addImageButtonStyle}>
                  <Plus size={24} />
                  <Upload size={20} style={{ marginTop: "8px" }} />
                  <span style={addImageTextStyle}>Add Image</span>
                </label>
              </div>
            )}
          </div>

          {formData.images.length > 0 && (
            <div style={imageCountStyle}>{formData.images.length} of 3 images selected</div>
          )}
        </div>

        {isSubmitting && uploadProgress > 0 && (
          <div style={progressBarContainer}>
            <div style={progressBarLabel}>Uploading... {uploadProgress}%</div>
            <div style={progressBarBackground}>
              <div
                style={{
                  ...progressBarFill,
                  width: `${uploadProgress}%`,
                }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          style={{
            ...buttonStyle,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

// UI Styles (keeping all the existing styles)
const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f2f5",
  padding: "40px 20px",
  boxSizing: "border-box",
}

const formStyle = {
  maxWidth: "600px",
  width: "100%",
  padding: "30px",
  borderRadius: "12px",
  background: "#ffffff",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  fontFamily: "sans-serif",
}

const titleStyle = {
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "24px",
  color: "#333",
}

const sectionStyle = {
  marginBottom: "20px",
}

const labelStyle = {
  fontWeight: "bold",
  display: "block",
  marginBottom: "6px",
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  marginBottom: "15px",
  boxSizing: "border-box",
}

const radioGroupStyle = {
  display: "flex",
  gap: "10px",
}

const radioLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
}

const aCheckItemStyle = {
  marginBottom: "15px",
}

const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  display: "block",
  width: "100%",
}

const dateFieldsContainerStyle = {
  backgroundColor: "#f8f9fa",
  padding: "20px",
  borderRadius: "8px",
  border: "2px solid #e9ecef",
  marginBottom: "20px",
}

const dateFieldsHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
}

const resetButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
}

const newUrlIndicatorStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff3cd",
  color: "#856404",
  padding: "8px 12px",
  borderRadius: "4px",
  fontSize: "14px",
  marginTop: "5px",
  border: "1px solid #ffeaa7",
}

const imageGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "15px",
  marginTop: "10px",
}

const thumbnailContainerStyle = {
  position: "relative",
  border: "2px solid #e9ecef",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "#f8f9fa",
}

const thumbnailImageStyle = {
  width: "100%",
  height: "120px",
  objectFit: "cover",
  display: "block",
}

const removeButtonStyle = {
  position: "absolute",
  top: "5px",
  right: "5px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "12px",
}

const imageInfoStyle = {
  padding: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
}

const imageNameStyle = {
  fontSize: "12px",
  fontWeight: "500",
  color: "#333",
  marginBottom: "2px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}

const imageSizeStyle = {
  fontSize: "11px",
  color: "#6c757d",
}

const addImageContainerStyle = {
  position: "relative",
}

const hiddenInputStyle = {
  display: "none",
}

const addImageButtonStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "150px",
  border: "2px dashed #007BFF",
  borderRadius: "8px",
  backgroundColor: "#f8f9ff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  color: "#007BFF",
}

const addImageTextStyle = {
  marginTop: "8px",
  fontSize: "12px",
  fontWeight: "500",
}

const imageCountStyle = {
  marginTop: "10px",
  fontSize: "14px",
  color: "#6c757d",
  textAlign: "center",
}

const progressBarContainer = {
  marginBottom: "20px",
}

const progressBarLabel = {
  marginBottom: "5px",
  fontSize: "14px",
  color: "#333",
}

const progressBarBackground = {
  width: "100%",
  height: "20px",
  backgroundColor: "#e9ecef",
  borderRadius: "10px",
  overflow: "hidden",
}

const progressBarFill = {
  height: "100%",
  backgroundColor: "#007BFF",
  transition: "width 0.3s ease",
}

const styles = {
  suggestions: {
    listStyle: "none",
    margin: 0,
    padding: "0.5rem",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    maxHeight: "150px",
    overflowY: "auto",
    position: "absolute",
    zIndex: 999,
    width: "100%",
    top: "100%",
    left: 0,
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  suggestionItem: {
    padding: "0.5rem",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
    transition: "background-color 0.2s ease",
  },
}

export default WorkstreamForm
