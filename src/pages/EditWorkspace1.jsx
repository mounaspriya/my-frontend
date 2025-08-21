"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { X, Plus, Upload, AlertCircle } from 'lucide-react'

const EditWorkspace = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    accessibility: "",
    review_date: "",
    website_source_id: "",
    third_party_content: "",
    conditional_response: "",
    website_type: "",
    registration_site: "",
    comments: "",
    website_operator: "",
    owner_name: "",
    review_traffic: "",
    website_url: "",
    calculated_friday: "",
    review_month: "",
    review_year: "",
    images: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // NEW: A-Checks state (same as WorkstreamForm)
  const [aChecks, setAChecks] = useState(Array.from({ length: 19 }, () => ({ checked: false, comment: "" })))

  // Autosuggestion state
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [urlStatus, setUrlStatus] = useState({ isNew: false, message: "" })

  // Helper function to get Friday of any given week
  const getFridayOfWeek = (dateStr) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    const day = date.getDay() // 0 (Sun) to 6 (Sat)
    const diff = 5 - day // 5 = Friday
    const friday = new Date(date)
    friday.setDate(date.getDate() + diff)
    return friday.toISOString().split("T")[0]
  }

  // Helper function to calculate month and year from date
  const getMonthAndYear = (dateStr) => {
    if (!dateStr) return { month: "", year: "" }
    const date = new Date(dateStr)
    return {
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
    }
  }

  // NEW: A-Checks limit function (same as WorkstreamForm)
  const getACheckLimit = () => {
    const value = formData.third_party_content
    if (value === "Yes (Will answer all the questions)") return 19
    if (value === "No (Will skip questions from Column U to Column AI)") return 15
    return 0
  }

  // NEW: Handle A-Check changes (same as WorkstreamForm)
  const handleACheckChange = (index, type, value) => {
    setAChecks((prev) => {
      const updated = [...prev]
      updated[index][type] = value
      return updated
    })
  }

  // Fetch suggestions function
  const fetchSuggestions = async (searchTerm) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/website-sources?search=${searchTerm}`)
      setSuggestions(response.data)
      setShowSuggestions(true)

      const exactMatch = response.data.find((item) => item.website_url.toLowerCase() === searchTerm.toLowerCase())

      if (!exactMatch && searchTerm.length > 3) {
        setUrlStatus({
          isNew: true,
          message: "This URL will be added as a new entry when you update the form.",
        })
      } else {
        setUrlStatus({ isNew: false, message: "" })
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error)
      setSuggestions([])
    }
  }

  // Handle URL input change with autosuggestion
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

  // Handle suggestion click
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const currentImages = formData.images || []
    
    // Filter out any empty objects from current images
    const validCurrentImages = currentImages.filter(img => 
      img && (img instanceof File || img.url || typeof img === 'string')
    )
    
    const remainingSlots = 3 - validCurrentImages.length
    const filesToAdd = files.slice(0, remainingSlots)

    console.log('Adding images:', {
      currentValid: validCurrentImages.length,
      newFiles: filesToAdd.length,
      total: validCurrentImages.length + filesToAdd.length
    })

    setFormData((prev) => ({
      ...prev,
      images: [...validCurrentImages, ...filesToAdd],
    }))

    e.target.value = ""
  }

  const removeImage = (indexToRemove) => {
    setFormData((prev) => {
      const updatedImages = (prev.images || []).filter((_, index) => index !== indexToRemove)
      console.log('Removing image at index:', indexToRemove, 'Remaining:', updatedImages.length)
      return {
        ...prev,
        images: updatedImages,
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/workspace_data/${id}`)
        const data = response.data

        // Format date if it exists
        if (data.review_date) {
          data.review_date = data.review_date.split("T")[0]

          // If calculated fields don't exist in database, calculate them
          if (!data.calculated_friday) {
            data.calculated_friday = getFridayOfWeek(data.review_date)
          } else {
            data.calculated_friday = data.calculated_friday.split("T")[0]
          }

          if (!data.review_month || !data.review_year) {
            const { month, year } = getMonthAndYear(data.review_date)
            data.review_month = data.review_month || month
            data.review_year = data.review_year || year
          }
        }

        // Handle images - parse if they're stored as JSON string
        if (data.images) {
          try {
            data.images = typeof data.images === "string" ? JSON.parse(data.images) : data.images
          } catch (e) {
            console.error("Error parsing images:", e)
            data.images = []
          }
        } else {
          data.images = []
        }

        // NEW: Handle A-Checks data from database
        if (data.a_checks) {
          try {
            const parsedAChecks = typeof data.a_checks === "string" ? JSON.parse(data.a_checks) : data.a_checks
            if (Array.isArray(parsedAChecks)) {
              // Ensure we have exactly 19 items, filling missing ones with default values
              const fullAChecks = Array.from({ length: 19 }, (_, index) => {
                return parsedAChecks[index] || { checked: false, comment: "" }
              })
              setAChecks(fullAChecks)
            }
          } catch (e) {
            console.error("Error parsing a_checks:", e)
            setAChecks(Array.from({ length: 19 }, () => ({ checked: false, comment: "" })))
          }
        } else {
          setAChecks(Array.from({ length: 19 }, () => ({ checked: false, comment: "" })))
        }

        setFormData(data)
      } catch (err) {
        console.error("Error fetching data", err)
        alert("Failed to load workspace data")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    const fridayDate = getFridayOfWeek(selectedDate)
    const { month, year } = getMonthAndYear(selectedDate)

    setFormData((prev) => ({
      ...prev,
      review_date: selectedDate,
      calculated_friday: fridayDate,
      review_month: month,
      review_year: year,
    }))
  }

  const handleUpdate = async () => {
    try {
      setIsUpdating(true)

      // Separate existing images from new file uploads
      const existingImages = []
      const newFiles = []
      
      formData.images.forEach((image) => {
        if (image instanceof File) {
          // This is a new file upload
          newFiles.push(image)
        } else if (image && (image.url || typeof image === 'string')) {
          // This is an existing image from database
          existingImages.push(image)
        }
        // Skip empty objects
      })

      // Create FormData for multipart upload if there are new files
      let dataToUpdate
      let requestConfig = {}

      if (newFiles.length > 0) {
        // Use FormData for file uploads
        const formDataToSend = new FormData()
        
        // Add all text fields
        const textData = {
          ...formData,
          calculated_friday: getFridayOfWeek(formData.review_date),
          review_month: getMonthAndYear(formData.review_date).month,
          review_year: getMonthAndYear(formData.review_date).year,
          a_checks: JSON.stringify(aChecks),
          existing_images: JSON.stringify(existingImages), // Send existing images separately
        }
        
        // Add text fields to FormData
        Object.keys(textData).forEach(key => {
          if (key !== 'images') {
            formDataToSend.append(key, textData[key] || '')
          }
        })
        
        // Add new image files
        newFiles.forEach((file) => {
          formDataToSend.append('images', file)
        })
        
        dataToUpdate = formDataToSend
        requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(percentCompleted)
          },
        }
      } else {
        // No new files, send as JSON
        dataToUpdate = {
          ...formData,
          calculated_friday: getFridayOfWeek(formData.review_date),
          review_month: getMonthAndYear(formData.review_date).month,
          review_year: getMonthAndYear(formData.review_date).year,
          a_checks: JSON.stringify(aChecks),
          images: JSON.stringify(existingImages), // Send existing images as JSON
        }
        requestConfig = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      }

      console.log('Updating with data:', {
        existingImages: existingImages.length,
        newFiles: newFiles.length,
        totalImages: existingImages.length + newFiles.length
      })

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/workspace_data/${id}`, dataToUpdate, requestConfig)
      alert("Updated successfully!")
      navigate("/workspace/1/view")
    } catch (err) {
      console.error("Update failed", err)
      alert("Update failed. Please try again.")
    } finally {
      setIsUpdating(false)
      setUploadProgress(0)
    }
  }

  const handleCancel = () => {
    navigate("/")
  }

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>Loading workspace data...</div>
      </div>
    )
  }

  const aCheckLimit = getACheckLimit()

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={titleStyle}>Edit Workspace Entry (ID: {id})</h2>

        {/* Accessibility */}
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

        {/* Third-party content */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Third-party content:</label>
          <select
            name="third_party_content"
            value={formData.third_party_content || ""}
            onChange={handleChange}
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
            value={formData.website_url || ""}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onFocus={() => {
              if (formData.website_url && formData.website_url.length > 1 && suggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
            style={inputStyle}
            placeholder="Start typing a website URL..."
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
          <div style={sectionStyle}>
            <label style={labelStyle}>Conditional Response:</label>
            <input
              type="text"
              name="conditional_response"
              value={formData.conditional_response || ""}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Conditional Response"
            />
          </div>
        )}

   

        {/* Website Type */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Website Type:</label>
          <input
            type="text"
            name="website_type"
            value={formData.website_type || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter website type"
          />
        </div>

        {/* Registration Site */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Registration Site:</label>
          <input
            type="text"
            name="registration_site"
            value={formData.registration_site || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter registration site"
          />
        </div>

  {/* Comments */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments || ""}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
            placeholder="Enter comments"
          />
        </div>
        
        {/* Website Operator */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Website Operator:</label>
          <input
            type="text"
            name="website_operator"
            value={formData.website_operator || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter website operator"
          />
        </div>

        {/* Owner Name */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Owner Name:</label>
          <input
            type="text"
            name="owner_name"
            value={formData.owner_name || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter owner name"
          />
        </div>

        {/* Review Traffic */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Review Traffic:</label>
          <input
            type="text"
            name="review_traffic"
            value={formData.review_traffic || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter review traffic"
          />
        </div>

        {/* Date Fields Section */}
        <div style={dateFieldsContainerStyle}>
          <div style={dateFieldsHeaderStyle}>
            <h4 style={{ margin: 0, color: "#333" }}>Date Information</h4>
          </div>

          {/* Editable Review Date */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Review Date:</label>
            <input
              type="date"
              name="review_date"
              value={formData.review_date || ""}
              onChange={handleDateChange}
              style={inputStyle}
            />
          </div>

          {/* Auto-calculated Friday Date */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Friday of Same Week:</label>
            <input
              type="date"
              name="calculated_friday"
              value={formData.calculated_friday || ""}
              readOnly
              style={{ ...inputStyle, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />
          </div>

          {/* Auto-calculated Month */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Month:</label>
            <input
              type="text"
              name="review_month"
              value={formData.review_month || ""}
              readOnly
              style={{ ...inputStyle, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />
          </div>

          {/* Auto-calculated Year */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Year:</label>
            <input
              type="text"
              name="review_year"
              value={formData.review_year || ""}
              readOnly
              style={{ ...inputStyle, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />
          </div>
        </div>

        {/* NEW: A-Checks Section (same as WorkstreamForm) */}
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
            {/* Display existing images if any */}
            {formData.images &&
              formData.images.length > 0 &&
              formData.images.map((image, index) => (
                <div key={index} style={thumbnailContainerStyle}>
                  <img
                    src={typeof image === "string" ? image : image.url || URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    style={thumbnailImageStyle}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={removeButtonStyle}
                    disabled={isUpdating}
                  >
                    <X size={16} />
                  </button>
                  <div style={imageInfoStyle}>
                    <div style={imageNameStyle}>
                      {typeof image === "string" ? "Existing Image" : image.originalname || image.name}
                    </div>
                    <div style={imageSizeStyle}>
                      {typeof image === "string" ? "" : `${(image.size / 1024 / 1024).toFixed(2)} MB`}
                    </div>
                  </div>
                </div>
              ))}

            {/* Add more images button */}
            {(!formData.images || formData.images.length < 3) && (
              <div style={addImageContainerStyle}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={hiddenInputStyle}
                  id={`image-upload-${formData.images ? formData.images.length : 0}`}
                  disabled={isUpdating}
                  multiple={!formData.images || formData.images.length === 0}
                />
                <label
                  htmlFor={`image-upload-${formData.images ? formData.images.length : 0}`}
                  style={addImageButtonStyle}
                >
                  <Plus size={24} />
                  <Upload size={20} style={{ marginTop: "8px" }} />
                  <span style={addImageTextStyle}>Add Image</span>
                </label>
              </div>
            )}
          </div>

          {formData.images && formData.images.length > 0 && (
            <div style={imageCountStyle}>{formData.images.length} of 3 images selected</div>
          )}
        </div>

      

        {isUpdating && uploadProgress > 0 && (
          <div style={progressBarContainer}>
            <div style={progressBarLabel}>Updating... {uploadProgress}%</div>
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

        {/* Action Buttons */}
        <div style={buttonContainerStyle}>
          <button
            onClick={handleUpdate}
            style={{
              ...updateButtonStyle,
              opacity: isUpdating ? 0.7 : 1,
              cursor: isUpdating ? "not-allowed" : "pointer",
            }}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
          <button onClick={handleCancel} style={cancelButtonStyle} disabled={isUpdating}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// UI Styles (same as before plus A-Check styles)
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
  color: "#333",
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  marginBottom: "15px",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
}

const radioGroupStyle = {
  display: "flex",
  gap: "15px",
  marginTop: "8px",
}

const radioLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "14px",
  cursor: "pointer",
}

// NEW: A-Check item style (same as WorkstreamForm)
const aCheckItemStyle = {
  marginBottom: "15px",
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

const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "30px",
}

const updateButtonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  flex: 1,
  transition: "background-color 0.2s ease",
}

const cancelButtonStyle = {
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  flex: 1,
  transition: "background-color 0.2s ease",
}

const loadingStyle = {
  textAlign: "center",
  fontSize: "18px",
  color: "#666",
  padding: "40px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
}

// Autosuggestion styles
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

// Image Upload Styles
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

export default EditWorkspace