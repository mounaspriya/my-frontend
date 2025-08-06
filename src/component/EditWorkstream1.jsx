// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Upload, AlertCircle, Trash2, ArrowLeft, Save } from "lucide-react"
// import "../styles/form.css"

// export default function EditReviewerForm({ recordId, onBack, onSave }) {
//   // Helper function to get Friday of any given week using pure string manipulation
//   const getFridayOfWeek = (dateStr) => {
//     if (!dateStr) return null
//     try {
//       // Validate date format
//       const dateRegex = /^\d{4}-\d{2}-\d{2}$/
//       if (!dateRegex.test(dateStr)) {
//         console.error("❌ Invalid date format:", dateStr)
//         return null
//       }
//       // Parse date components as numbers
//       const [year, month, day] = dateStr.split("-").map(Number)
//       // Validate date components
//       if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
//         console.error("❌ Invalid date components:", { year, month, day })
//         return null
//       }
//       // Calculate day of week using Zeller's congruence (no Date object needed)
//       let adjustedMonth = month
//       let adjustedYear = year
//       if (month < 3) {
//         adjustedMonth += 12
//         adjustedYear -= 1
//       }
//       // Zeller's congruence formula
//       const q = day
//       const m = adjustedMonth
//       const k = adjustedYear % 100
//       const j = Math.floor(adjustedYear / 100)
//       const h = (q + Math.floor((13 * (m + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) - 2 * j) % 7
//       // Convert Zeller's result to standard day of week (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
//       const dayOfWeek = (h + 5) % 7 // Convert to 0 = Monday, 1 = Tuesday, ..., 6 = Sunday
//       // Calculate days to add to get to Friday (4 = Friday in 0-based week starting Monday)
//       const daysToFriday = (4 - dayOfWeek + 7) % 7
//       // Add days to get Friday
//       const fridayDay = day + daysToFriday
//       let fridayMonth = month
//       let fridayYear = year
//       // Handle month overflow
//       const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
//       // Check for leap year
//       if (fridayYear % 4 === 0 && (fridayYear % 100 !== 0 || fridayYear % 400 === 0)) {
//         daysInMonth[1] = 29
//       }
//       if (fridayDay > daysInMonth[fridayMonth - 1]) {
//         const newDay = fridayDay - daysInMonth[fridayMonth - 1]
//         fridayMonth += 1
//         if (fridayMonth > 12) {
//           fridayMonth = 1
//           fridayYear += 1
//         }
//         return `${fridayYear}-${String(fridayMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`
//       }
//       return `${fridayYear}-${String(fridayMonth).padStart(2, "0")}-${String(fridayDay).padStart(2, "0")}`
//     } catch (error) {
//       console.error("❌ Error calculating Friday:", error)
//       return null
//     }
//   }

//   // Helper function to get current date values without timezone issues
//   const getCurrentDateValues = () => {
//     // Get current date in local timezone as YYYY-MM-DD string
//     const today = new Date()
//     const year = today.getFullYear()
//     const month = String(today.getMonth() + 1).padStart(2, "0")
//     const day = String(today.getDate()).padStart(2, "0")
//     const todayStr = `${year}-${month}-${day}`
//     const fridayOfWeek = getFridayOfWeek(todayStr)
//     // Get month name and year from Friday date
//     const [fridayYear, fridayMonth] = fridayOfWeek.split("-").map(Number)
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ]
//     return {
//       today: todayStr,
//       fridayOfWeek,
//       month: monthNames[fridayMonth - 1],
//       year: fridayYear,
//     }
//   }

//   // Initialize with current date values
//   const initialDateValues = getCurrentDateValues()

//   const [activeWorkstream, setActiveWorkstream] = useState("01")
//   const [loading, setLoading] = useState(true)
//   const [formData, setFormData] = useState({
//     // ===== NEW FIELDS =====
//     fullName: "", // Reviewed By (maps to owner_name)
//     registrationType: "", // Registration Type dropdown
//     reviewStatus: "", // Completed/Not Completed radio
//     reviewReason: "", // Reason when Not Completed
//     reviewType: "", // New Review/Re-Review dropdown
//     registrationPlatform: "", // Registration platform text
//     conditionalFields: {}, // A1, A2, A3... fields

//     // ===== EXISTING FIELDS =====
//     websiteUrl: "",
//     reviewDate: initialDateValues.today,
//     reviewWeek: initialDateValues.fridayOfWeek,
//     month: initialDateValues.month,
//     year: initialDateValues.year,
//     reviewDateTraffic: "",
//     websiteOwner: "",
//     websiteType: "",
//     accessibility: "",
//     thirdPartyContent: "",
//     uploadedFiles: [],
//     existingImages: [], // For existing images from database
//     website_source_id: "",
//   })

//   // Website URL autocomplete states
//   const [suggestions, setSuggestions] = useState([])
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const [urlStatus, setUrlStatus] = useState({ isNew: false, message: "" })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [uploadProgress, setUploadProgress] = useState(0)

//   const workstreams = [
//     { id: "01", label: "Workstream 01", color: "#E3F2FD" },
//     { id: "02", label: "Workstream 02", color: "#F3E5F5" },
//     { id: "03", label: "Workstream 03", color: "#E8EAF6" },
//     { id: "04", label: "Workstream 04", color: "#E8F5E8" },
//     { id: "05", label: "Workstream 05", color: "#FFF3E0" },
//   ]

//   // Load existing record data
//   useEffect(() => {
//     const loadRecordData = async () => {
//       if (!recordId) return

//       try {
//         setLoading(true)
//         console.log("🔄 Loading record ID:", recordId)

//         const response = await axios.get(`http://localhost:5000/api/workspace_data/${recordId}`)
//         const record = response.data

//         console.log("📝 Loaded record data:", record)

//         // Parse existing images
//         let existingImages = []
//         if (record.images) {
//           try {
//             existingImages = typeof record.images === "string" ? JSON.parse(record.images) : record.images
//           } catch (e) {
//             console.error("Error parsing existing images:", e)
//             existingImages = []
//           }
//         }

//         // Parse conditional fields
//         let conditionalFields = {}
//         if (record.conditional_fields) {
//           try {
//             conditionalFields =
//               typeof record.conditional_fields === "string"
//                 ? JSON.parse(record.conditional_fields)
//                 : record.conditional_fields
//           } catch (e) {
//             console.error("Error parsing conditional fields:", e)
//             conditionalFields = {}
//           }
//         }

//         // Set form data with existing record
//         setFormData({
//           // New fields
//           fullName: record.owner_name || "",
//           registrationType: record.registration_type || "",
//           reviewStatus: record.review_status || "",
//           reviewReason: record.review_reason || "",
//           reviewType: record.review_type || "",
//           registrationPlatform: record.registration_platform || "",
//           conditionalFields: conditionalFields,

//           // Existing fields
//           websiteUrl: record.website_url || "",
//           reviewDate: record.review_date ? record.review_date.split("T")[0] : initialDateValues.today,
//           reviewWeek: record.calculated_friday
//             ? record.calculated_friday.split("T")[0]
//             : initialDateValues.fridayOfWeek,
//           month: record.review_month || initialDateValues.month,
//           year: record.review_year || initialDateValues.year,
//           reviewDateTraffic: record.review_traffic || "",
//           websiteOwner: record.website_operator || "",
//           websiteType: record.website_type || "",
//           accessibility: record.accessibility || "",
//           thirdPartyContent: record.third_party_content || "",
//           uploadedFiles: [], // New files to upload
//           existingImages: existingImages, // Existing images from database
//           website_source_id: record.website_source_id || "",
//         })
//       } catch (error) {
//         console.error("❌ Error loading record:", error)
//         alert("Error loading record: " + (error.response?.data?.message || error.message))
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadRecordData()
//   }, [recordId])

//   // Website URL autocomplete functionality
//   const fetchSuggestions = async (searchTerm) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/website-sources?search=${searchTerm}`)
//       setSuggestions(response.data)
//       setShowSuggestions(true)
//       const exactMatch = response.data.find((item) => item.website_url.toLowerCase() === searchTerm.toLowerCase())
//       if (!exactMatch && searchTerm.length > 3) {
//         setUrlStatus({
//           isNew: true,
//           message: "This URL will be added as a new entry when you submit the form.",
//         })
//       } else {
//         setUrlStatus({ isNew: false, message: "" })
//       }
//     } catch (error) {
//       console.error("Failed to fetch suggestions:", error)
//       setSuggestions([])
//     }
//   }

//   const handleWebsiteUrlChange = (e) => {
//     const value = e.target.value
//     setFormData((prev) => ({
//       ...prev,
//       websiteUrl: value,
//       website_source_id: "",
//     }))
//     if (value.length > 1) {
//       fetchSuggestions(value)
//     } else {
//       setSuggestions([])
//       setShowSuggestions(false)
//       setUrlStatus({ isNew: false, message: "" })
//     }
//   }

//   const handleSuggestionClick = (suggestion) => {
//     setFormData((prev) => ({
//       ...prev,
//       websiteUrl: suggestion.website_url,
//       website_source_id: suggestion.id,
//     }))
//     setSuggestions([])
//     setShowSuggestions(false)
//     setUrlStatus({ isNew: false, message: "" })
//   }

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   // Handle date change with Friday calculation
//   const handleDateChange = (e) => {
//     const selected = e.target.value
//     console.log("📅 Date changed to:", selected)
//     const fridayDate = getFridayOfWeek(selected)
//     console.log("📅 Calculated Friday:", fridayDate)

//     // Get month and year from Friday date using string parsing
//     const [fridayYear, fridayMonth] = fridayDate.split("-").map(Number)
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ]
//     const month = monthNames[fridayMonth - 1]
//     const year = fridayYear

//     console.log("📅 Final values:", { selected, fridayDate, month, year })

//     setFormData((prev) => ({
//       ...prev,
//       reviewDate: selected,
//       reviewWeek: fridayDate,
//       month: month,
//       year: year,
//     }))
//   }

//   // Image upload functionality with multiple selection and validation
//   const [imageError, setImageError] = useState("")

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files)
//     const currentImages = formData.uploadedFiles
//     const existingImagesCount = formData.existingImages.length
//     const totalAfterUpload = currentImages.length + files.length + existingImagesCount

//     // Clear any previous error
//     setImageError("")

//     // Check if total images would exceed 3
//     if (totalAfterUpload > 3) {
//       const remainingSlots = 3 - currentImages.length - existingImagesCount
//       if (remainingSlots === 0) {
//         setImageError("Maximum 3 images allowed. Please remove some images first.")
//       } else {
//         setImageError(`You can only select ${remainingSlots} more image(s). Maximum 3 images allowed.`)
//       }
//       e.target.value = "" // Clear the input
//       return
//     }

//     // Validate file types
//     const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
//     const invalidFiles = files.filter((file) => !validTypes.includes(file.type))

//     if (invalidFiles.length > 0) {
//       setImageError("Please select only image files (JPEG, PNG, GIF, WebP)")
//       e.target.value = ""
//       return
//     }

//     // Validate file sizes (max 25MB per file)
//     const maxSize = 25 * 1024 * 1024 // 25MB
//     const oversizedFiles = files.filter((file) => file.size > maxSize)

//     if (oversizedFiles.length > 0) {
//       setImageError("Each image must be smaller than 25MB")
//       e.target.value = ""
//       return
//     }

//     // All validations passed, add the files
//     setFormData((prev) => ({
//       ...prev,
//       uploadedFiles: [...prev.uploadedFiles, ...files],
//     }))

//     e.target.value = ""

//     // Show success message if multiple files were added
//     if (files.length > 1) {
//       setImageError(`✅ ${files.length} images added successfully!`)
//       setTimeout(() => setImageError(""), 3000) // Clear success message after 3 seconds
//     }
//   }

//   const removeNewImage = (indexToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       uploadedFiles: prev.uploadedFiles.filter((_, index) => index !== indexToRemove),
//     }))
//     // Clear any error when removing images
//     setImageError("")
//   }

//   const removeExistingImage = (indexToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       existingImages: prev.existingImages.filter((_, index) => index !== indexToRemove),
//     }))
//     // Clear any error when removing images
//     setImageError("")
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("🚀 Form update started...")
//     console.log("📝 Form data:", formData)

//     setIsSubmitting(true)

//     try {
//       // Create FormData for file upload
//       const submitData = new FormData()

//       // ===== NEW FIELDS =====
//       submitData.append("fullName", formData.fullName || "")
//       submitData.append("registrationType", formData.registrationType || "")
//       submitData.append("reviewStatus", formData.reviewStatus || "")
//       submitData.append("reviewReason", formData.reviewReason || "")
//       submitData.append("reviewType", formData.reviewType || "")
//       submitData.append("registrationPlatform", formData.registrationPlatform || "")

//       // Fix conditional fields - send as proper JSON string
//       console.log("🔧 Conditional fields being sent:", formData.conditionalFields)
//       submitData.append("conditionalFields", JSON.stringify(formData.conditionalFields || {}))

//       // ===== EXISTING FIELDS =====
//       submitData.append("website_url", formData.websiteUrl || "")
//       submitData.append("accessibility", formData.accessibility || "")
//       submitData.append("third_party_content", formData.thirdPartyContent || "")
//       submitData.append("review_date", formData.reviewDate || "")
//       submitData.append("calculated_friday", formData.reviewWeek || "")
//       submitData.append("review_month", formData.month || "")
//       submitData.append("review_year", formData.year || "")
//       submitData.append("review_traffic", formData.reviewDateTraffic || "")
//       submitData.append("website_operator", formData.websiteOwner || "")
//       submitData.append("website_type", formData.websiteType || "")
//       submitData.append("website_source_id", formData.website_source_id || "")

//       // Add existing images
//       submitData.append("existing_images", JSON.stringify(formData.existingImages))

//       // Add new images
//       if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
//         formData.uploadedFiles.forEach((file, index) => {
//           console.log(`📎 Adding new image ${index + 1}:`, file.name)
//           submitData.append("images", file)
//         })
//       }

//       // Add aChecks (empty for now, but keeping structure)
//       const aChecks = Array.from({ length: 19 }, () => ({ checked: false, comment: "" }))
//       submitData.append("aChecks", JSON.stringify(aChecks))

//       // Debug: Log all FormData entries
//       console.log("📤 FormData contents:")
//       for (const [key, value] of submitData.entries()) {
//         console.log(`  ${key}:`, value)
//       }

//       console.log("🌐 Making API call to: http://localhost:5000/api/workspace_data/" + recordId)

//       const response = await axios.put(`http://localhost:5000/api/workspace_data/${recordId}`, submitData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           console.log(`📊 Upload progress: ${percentCompleted}%`)
//           setUploadProgress(percentCompleted)
//         },
//       })

//       console.log("✅ API Response:", response.data)
//       alert("✅ Record updated successfully!")

//       // Call onSave callback if provided
//       if (onSave) {
//         onSave(response.data.data)
//       }

//       // Go back to list
//       if (onBack) {
//         onBack()
//       }
//     } catch (error) {
//       console.error("❌ Form update error:", error)
//       console.error("❌ Error details:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         statusText: error.response?.statusText,
//       })

//       const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred"
//       alert(`❌ Error updating record: ${errorMessage}`)
//     } finally {
//       setIsSubmitting(false)
//       setUploadProgress(0)
//     }
//   }

//   const getVisibleFields = () => {
//     switch (formData.thirdPartyContent) {
//       case "yes":
//         return Array.from({ length: 19 }, (_, i) => `A${i + 1}`)
//       case "no":
//         return Array.from({ length: 7 }, (_, i) => `A${i + 2}`) // A2-A8
//       case "na":
//         return ["A1"]
//       default:
//         return []
//     }
//   }

//   const handleConditionalFieldChange = (fieldId, type, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       conditionalFields: {
//         ...prev.conditionalFields,
//         [fieldId]: {
//           ...prev.conditionalFields[fieldId],
//           [type]: value,
//         },
//       },
//     }))
//   }

//   const visibleFields = getVisibleFields()

//   if (loading) {
//     return (
//       <div className="form-container">
//         <div className="form-content">
//           <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading record data...</div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="form-container">
//       {/* Back Button */}
//       <button
//         onClick={onBack}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//           background: "transparent",
//           border: "none",
//           color: "#6b7280",
//           cursor: "pointer",
//           fontSize: "14px",
//           marginBottom: "16px",
//           padding: "8px 0",
//         }}
//       >
//         <ArrowLeft size={16} />
//         Back to List
//       </button>

//       {/* Workstream Tabs */}

//       {/* Main Form */}
//       <div className="form-content">
//         {/* <h2 className="form-title">Edit Reviewer Information (ID: {recordId})</h2> */}

//         <form onSubmit={handleSubmit} className="reviewer-form">
//           {/* First Row */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="fullName">Reviewed By</label>
//               <input
//                 type="text"
//                 id="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={(e) => handleInputChange("fullName", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="registrationType">Registration Type</label>
//               <select
//                 id="registrationType"
//                 value={formData.registrationType}
//                 onChange={(e) => handleInputChange("registrationType", e.target.value)}
//               >
//                 <option value="">Select an option</option>
//                 <option value="old-registration">Old Registration</option>
//                 <option value="new-registration">New Registration</option>
//               </select>
//             </div>
//           </div>

//           {/* Review Status Row */}
//           <div className="review-status-row">
//             <div className="form-group">
//               <label>Review Status</label>
//               <div className="radio-group">
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="reviewStatus"
//                     value="completed"
//                     checked={formData.reviewStatus === "completed"}
//                     onChange={(e) => handleInputChange("reviewStatus", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   Completed
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="reviewStatus"
//                     value="not-completed"
//                     checked={formData.reviewStatus === "not-completed"}
//                     onChange={(e) => handleInputChange("reviewStatus", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   Not Completed
//                 </label>
//               </div>
//             </div>

//             {/* Conditional reason field in same row */}
//             {formData.reviewStatus === "not-completed" && (
//               <div className="form-group reason-field">
//                 <label htmlFor="reviewReason">If chosen not, please provide a reason:</label>
//                 <select
//                   id="reviewReason"
//                   value={formData.reviewReason}
//                   onChange={(e) => handleInputChange("reviewReason", e.target.value)}
//                 >
//                   <option value="">Select a reason</option>
//                   <option value="site-offline">Site offline</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="does-not-exist">Does Not Exist</option>
//                   <option value="unable-to-open-site">Unable to open Site</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* Review Type and Website URL Row */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="reviewType">Review Type</label>
//               <select
//                 id="reviewType"
//                 value={formData.reviewType}
//                 onChange={(e) => handleInputChange("reviewType", e.target.value)}
//               >
//                 <option value="">Select an option</option>
//                 <option value="new-review">New Review</option>
//                 <option value="re-review">Re-Review</option>
//               </select>
//             </div>
//             <div className="form-group" style={{ position: "relative" }}>
//               <label htmlFor="websiteUrl">Website URL</label>
//               <input
//                 type="text"
//                 id="websiteUrl"
//                 placeholder="Start typing a website URL..."
//                 value={formData.websiteUrl}
//                 onChange={handleWebsiteUrlChange}
//                 onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//                 onFocus={() => {
//                   if (formData.websiteUrl.length > 1 && suggestions.length > 0) setShowSuggestions(true)
//                 }}
//                 required
//               />

//               {/* New URL Status Indicator */}
//               {urlStatus.isNew && (
//                 <div className="new-url-indicator">
//                   <AlertCircle size={16} style={{ marginRight: "8px" }} />
//                   {urlStatus.message}
//                 </div>
//               )}

//               {/* Suggestions Dropdown */}
//               {showSuggestions && (
//                 <ul className="suggestions-dropdown">
//                   {suggestions.length > 0 ? (
//                     suggestions.map((item) => (
//                       <li key={item.id} onMouseDown={() => handleSuggestionClick(item)} className="suggestion-item">
//                         {item.website_url}
//                       </li>
//                     ))
//                   ) : (
//                     <li className="suggestion-item no-hover">No existing URLs found</li>
//                   )}
//                 </ul>
//               )}
//             </div>
//           </div>

//           {/* URL Information Section */}
//           <h3 className="section-title">URL Information</h3>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="reviewDate">Review Date</label>
//               <input type="date" id="reviewDate" value={formData.reviewDate} onChange={handleDateChange} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="reviewWeek">Review Week (Friday)</label>
//               <input
//                 type="date"
//                 id="reviewWeek"
//                 value={formData.reviewWeek}
//                 readOnly
//                 style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="month">Month</label>
//               <input
//                 type="text"
//                 id="month"
//                 value={formData.month}
//                 readOnly
//                 style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="year">Year</label>
//               <input
//                 type="text"
//                 id="year"
//                 value={formData.year}
//                 readOnly
//                 style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="reviewDateTraffic">Review Date Traffic</label>
//               <input
//                 type="text"
//                 id="reviewDateTraffic"
//                 placeholder="Mention Number"
//                 value={formData.reviewDateTraffic}
//                 onChange={(e) => handleInputChange("reviewDateTraffic", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="websiteOwner">Website Owner</label>
//               <input
//                 type="text"
//                 id="websiteOwner"
//                 placeholder="Company Name"
//                 value={formData.websiteOwner}
//                 onChange={(e) => handleInputChange("websiteOwner", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="websiteType">Website Type</label>
//               <input
//                 type="text"
//                 id="websiteType"
//                 placeholder="Account"
//                 value={formData.websiteType}
//                 onChange={(e) => handleInputChange("websiteType", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Accessibility</label>
//               <div className="radio-group horizontal">
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="accessibility"
//                     value="yes"
//                     checked={formData.accessibility === "yes"}
//                     onChange={(e) => handleInputChange("accessibility", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   Yes
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="accessibility"
//                     value="no"
//                     checked={formData.accessibility === "no"}
//                     onChange={(e) => handleInputChange("accessibility", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   No
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="accessibility"
//                     value="na"
//                     checked={formData.accessibility === "na"}
//                     onChange={(e) => handleInputChange("accessibility", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   N/A
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Third-Party Content */}
//           <div className="form-group full-width">
//             <label>Third-Party Content</label>
//             <div className="radio-group horizontal">
//               <label className="radio-option">
//                 <input
//                   type="radio"
//                   name="thirdPartyContent"
//                   value="yes"
//                   checked={formData.thirdPartyContent === "yes"}
//                   onChange={(e) => handleInputChange("thirdPartyContent", e.target.value)}
//                 />
//                 <span className="radio-custom"></span>
//                 Yes
//               </label>
//               <label className="radio-option">
//                 <input
//                   type="radio"
//                   name="thirdPartyContent"
//                   value="no"
//                   checked={formData.thirdPartyContent === "no"}
//                   onChange={(e) => handleInputChange("thirdPartyContent", e.target.value)}
//                 />
//                 <span className="radio-custom"></span>
//                 No
//               </label>
//               <label className="radio-option">
//                 <input
//                   type="radio"
//                   name="thirdPartyContent"
//                   value="na"
//                   checked={formData.thirdPartyContent === "na"}
//                   onChange={(e) => handleInputChange("thirdPartyContent", e.target.value)}
//                 />
//                 <span className="radio-custom"></span>
//                 N/A
//               </label>
//             </div>
//           </div>

//           {/* Registration Platform */}
//           <div className="form-group full-width">
//             <label htmlFor="registrationPlatform">Registration platform (if third-party)</label>
//             <input
//               type="text"
//               id="registrationPlatform"
//               placeholder="Mention website URL"
//               value={formData.registrationPlatform}
//               onChange={(e) => handleInputChange("registrationPlatform", e.target.value)}
//             />
//           </div>

//           {/* Conditional Fields */}
//           {formData.thirdPartyContent && formData.thirdPartyContent !== "" && (
//             <div className="conditional-fields-section">
//               <h3 className="section-title">
//                 Assessment Fields
//                 <span style={{ fontSize: "14px", fontWeight: "normal", color: "#666" }}>
//                   ({visibleFields.length} fields visible)
//                 </span>
//               </h3>
//               <div className="conditional-fields-grid">
//                 {visibleFields.map((fieldId) => (
//                   <div key={fieldId} className="conditional-field">
//                     <div className="field-header">
//                       <h4 className="field-label">{fieldId}</h4>
//                       <div className="radio-group horizontal">
//                         <label className="radio-option">
//                           <input
//                             type="radio"
//                             name={`${fieldId}-answer`}
//                             value="yes"
//                             checked={formData.conditionalFields[fieldId]?.answer === "yes"}
//                             onChange={(e) => handleConditionalFieldChange(fieldId, "answer", e.target.value)}
//                           />
//                           <span className="radio-custom"></span>
//                           Yes
//                         </label>
//                         <label className="radio-option">
//                           <input
//                             type="radio"
//                             name={`${fieldId}-answer`}
//                             value="no"
//                             checked={formData.conditionalFields[fieldId]?.answer === "no"}
//                             onChange={(e) => handleConditionalFieldChange(fieldId, "answer", e.target.value)}
//                           />
//                           <span className="radio-custom"></span>
//                           No
//                         </label>
//                         <label className="radio-option">
//                           <input
//                             type="radio"
//                             name={`${fieldId}-answer`}
//                             value="na"
//                             checked={formData.conditionalFields[fieldId]?.answer === "na"}
//                             onChange={(e) => handleConditionalFieldChange(fieldId, "answer", e.target.value)}
//                           />
//                           <span className="radio-custom"></span>
//                           N/A
//                         </label>
//                       </div>
//                     </div>
//                     <div className="comments-section">
//                       <textarea
//                         placeholder="Comments"
//                         value={formData.conditionalFields[fieldId]?.comments || ""}
//                         onChange={(e) => handleConditionalFieldChange(fieldId, "comments", e.target.value)}
//                         className="comments-textarea"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Image Upload Section - Grid Layout */}
//           <div className="file-upload-section">
//             <h3 className="section-title">Images (Max 3 total):</h3>

//             {/* Error/Success Message */}
//             {imageError && (
//               <div className={`image-error-message ${imageError.includes("✅") ? "success" : "error"}`}>
//                 {imageError}
//               </div>
//             )}

//             <div className="image-upload-grid">
//               {/* Display existing images */}
//               {formData.existingImages.map((image, index) => (
//                 <div key={`existing-${index}`} className="image-preview-card">
//                   <img src={image.url || "/placeholder.svg"} alt={`Existing ${index + 1}`} className="preview-image" />
//                   <div className="image-card-info">
//                     <div className="image-card-details">
//                       <div className="image-card-name">
//                         {image.originalname && image.originalname.length > 20
//                           ? image.originalname.substring(0, 20) + "..."
//                           : image.originalname || `Image ${index + 1}`}
//                       </div>
//                       <div className="image-card-size">
//                         {image.size ? (image.size / 1024 / 1024).toFixed(2) + " MB" : "Existing"}
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeExistingImage(index)}
//                       className="delete-image-btn-new"
//                       disabled={isSubmitting}
//                       title="Delete existing image"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* Display new uploaded images */}
//               {formData.uploadedFiles.map((file, index) => (
//                 <div key={`new-${index}`} className="image-preview-card">
//                   <img
//                     src={URL.createObjectURL(file) || "/placeholder.svg"}
//                     alt={`New ${index + 1}`}
//                     className="preview-image"
//                   />
//                   <div className="image-card-info">
//                     <div className="image-card-details">
//                       <div className="image-card-name">
//                         {file.name.length > 20 ? file.name.substring(0, 20) + "..." : file.name}
//                       </div>
//                       <div className="image-card-size">{(file.size / 1024 / 1024).toFixed(2)} MB (New)</div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeNewImage(index)}
//                       className="delete-image-btn-new"
//                       disabled={isSubmitting}
//                       title="Delete new image"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* Add Image Card - Show only if less than 3 total images */}
//               {formData.existingImages.length + formData.uploadedFiles.length < 3 && (
//                 <div className="add-image-card">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     style={{ display: "none" }}
//                     id="image-upload-input"
//                     disabled={isSubmitting}
//                     multiple
//                   />
//                   <label htmlFor="image-upload-input" className="add-image-label">
//                     <div className="add-image-icon">+</div>
//                     <div className="upload-icon-small">
//                       <Upload size={20} />
//                     </div>
//                     <span className="add-image-label-text">
//                       {formData.existingImages.length + formData.uploadedFiles.length === 0 ? "Add Images" : "Add More"}
//                     </span>
//                     <span className="add-image-hint">(Select multiple images)</span>
//                   </label>
//                 </div>
//               )}
//             </div>

//             {/* Image counter */}
//             {formData.existingImages.length + formData.uploadedFiles.length > 0 && (
//               <div className="image-counter">
//                 {formData.existingImages.length + formData.uploadedFiles.length} of 3 images selected
//                 {formData.existingImages.length > 0 && (
//                   <span style={{ color: "#6b7280", fontSize: "12px", marginLeft: "8px" }}>
//                     ({formData.existingImages.length} existing, {formData.uploadedFiles.length} new)
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Submit Button with Progress */}
//           <button type="submit" className="submit-button" disabled={isSubmitting}>
//             {isSubmitting ? (
//               <>{uploadProgress > 0 ? `Updating... ${uploadProgress}%` : "Updating..."}</>
//             ) : (
//               <>
//                 <Save size={16} style={{ marginRight: "8px" }} />
//                 Update Record
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Upload, AlertCircle, Trash2, ArrowLeft, Save } from "lucide-react"
import "../styles/Form.css"

export default function EditReviewerForm({ recordId, onBack, onSave }) {
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

  const [activeWorkstream, setActiveWorkstream] = useState("01")
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    // ===== NEW FIELDS =====
    fullName: "", // Reviewed By (maps to owner_name)
    registrationType: "", // Registration Type dropdown
    reviewStatus: "", // Completed/Not Completed radio
    reviewReason: "", // Reason when Not Completed
    reviewType: "", // New Review/Re-Review dropdown
    registrationPlatform: "", // Registration platform text
    conditionalFields: {}, // A1, A2, A3... fields

    // ===== EXISTING FIELDS =====
    websiteUrl: "",
    reviewDate: initialDateValues.today,
    reviewWeek: initialDateValues.fridayOfWeek,
    month: initialDateValues.month,
    year: initialDateValues.year,
    reviewDateTraffic: "",
    websiteOwner: "",
    websiteType: "",
    accessibility: "",
    thirdPartyContent: "",
    uploadedFiles: [],
    existingImages: [], // For existing images from database
    website_source_id: "",
  })

  // Website URL autocomplete states
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [urlStatus, setUrlStatus] = useState({ isNew: false, message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const workstreams = [
    { id: "01", label: "Workstream 01", color: "#E3F2FD" },
    { id: "02", label: "Workstream 02", color: "#F3E5F5" },
    { id: "03", label: "Workstream 03", color: "#E8EAF6" },
    { id: "04", label: "Workstream 04", color: "#E8F5E8" },
    { id: "05", label: "Workstream 05", color: "#FFF3E0" },
  ]

  // Load existing record data
  useEffect(() => {
    const loadRecordData = async () => {
      if (!recordId) return

      try {
        setLoading(true)
        console.log("🔄 Loading record ID:", recordId)

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/workspace_data/${recordId}`)
        const record = response.data

        console.log("📝 Loaded record data:", record)

        // Parse existing images
        let existingImages = []
        if (record.images) {
          try {
            existingImages = typeof record.images === "string" ? JSON.parse(record.images) : record.images
          } catch (e) {
            console.error("Error parsing existing images:", e)
            existingImages = []
          }
        }

        // Parse conditional fields
        let conditionalFields = {}
        if (record.conditional_fields) {
          try {
            conditionalFields =
              typeof record.conditional_fields === "string"
                ? JSON.parse(record.conditional_fields)
                : record.conditional_fields
          } catch (e) {
            console.error("Error parsing conditional fields:", e)
            conditionalFields = {}
          }
        }

        // Set form data with existing record
        setFormData({
          // New fields
          fullName: record.owner_name || "",
          registrationType: record.registration_type || "",
          reviewStatus: record.review_status || "",
          reviewReason: record.review_reason || "",
          reviewType: record.review_type || "",
          registrationPlatform: record.registration_platform || "",
          conditionalFields: conditionalFields,

          // Existing fields
          websiteUrl: record.website_url || "",
          reviewDate: record.review_date ? record.review_date.split("T")[0] : initialDateValues.today,
          reviewWeek: record.calculated_friday
            ? record.calculated_friday.split("T")[0]
            : initialDateValues.fridayOfWeek,
          month: record.review_month || initialDateValues.month,
          year: record.review_year || initialDateValues.year,
          reviewDateTraffic: record.review_traffic || "",
          websiteOwner: record.website_operator || "",
          websiteType: record.website_type || "",
          accessibility: record.accessibility || "",
          thirdPartyContent: record.third_party_content || "",
          uploadedFiles: [], // New files to upload
          existingImages: existingImages, // Existing images from database
          website_source_id: record.website_source_id || "",
        })
      } catch (error) {
        console.error("❌ Error loading record:", error)
        alert("Error loading record: " + (error.response?.data?.message || error.message))
      } finally {
        setLoading(false)
      }
    }

    loadRecordData()
  }, [recordId])

  // Website URL autocomplete functionality
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

  const handleWebsiteUrlChange = (e) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      websiteUrl: value,
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
      websiteUrl: suggestion.website_url,
      website_source_id: suggestion.id,
    }))
    setSuggestions([])
    setShowSuggestions(false)
    setUrlStatus({ isNew: false, message: "" })
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      // Special handling for thirdPartyContent - clear conditional fields when changed
      if (field === "thirdPartyContent") {
        return {
          ...prev,
          [field]: value,
          conditionalFields: {}, // Clear all conditional fields when third-party content changes
        }
      }
      return { ...prev, [field]: value }
    })
  }

  // Handle date change with Friday calculation
  const handleDateChange = (e) => {
    const selected = e.target.value
    console.log("📅 Date changed to:", selected)
    const fridayDate = getFridayOfWeek(selected)
    console.log("📅 Calculated Friday:", fridayDate)

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
      reviewDate: selected,
      reviewWeek: fridayDate,
      month: month,
      year: year,
    }))
  }

  // Image upload functionality with multiple selection and validation
  const [imageError, setImageError] = useState("")

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const currentImages = formData.uploadedFiles
    const existingImagesCount = formData.existingImages.length
    const totalAfterUpload = currentImages.length + files.length + existingImagesCount

    // Clear any previous error
    setImageError("")

    // Check if total images would exceed 3
    if (totalAfterUpload > 3) {
      const remainingSlots = 3 - currentImages.length - existingImagesCount
      if (remainingSlots === 0) {
        setImageError("Maximum 3 images allowed. Please remove some images first.")
      } else {
        setImageError(`You can only select ${remainingSlots} more image(s). Maximum 3 images allowed.`)
      }
      e.target.value = "" // Clear the input
      return
    }

    // Validate file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    const invalidFiles = files.filter((file) => !validTypes.includes(file.type))

    if (invalidFiles.length > 0) {
      setImageError("Please select only image files (JPEG, PNG, GIF, WebP)")
      e.target.value = ""
      return
    }

    // Validate file sizes (max 25MB per file)
    const maxSize = 25 * 1024 * 1024 // 25MB
    const oversizedFiles = files.filter((file) => file.size > maxSize)

    if (oversizedFiles.length > 0) {
      setImageError("Each image must be smaller than 25MB")
      e.target.value = ""
      return
    }

    // All validations passed, add the files
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }))

    e.target.value = ""

    // Show success message if multiple files were added
    if (files.length > 1) {
      setImageError(`✅ ${files.length} images added successfully!`)
      setTimeout(() => setImageError(""), 3000) // Clear success message after 3 seconds
    }
  }

  const removeNewImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, index) => index !== indexToRemove),
    }))
    // Clear any error when removing images
    setImageError("")
  }

  const removeExistingImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, index) => index !== indexToRemove),
    }))
    // Clear any error when removing images
    setImageError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("🚀 Form update started...")
    console.log("📝 Form data:", formData)

    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()

      // ===== NEW FIELDS =====
      submitData.append("fullName", formData.fullName || "")
      submitData.append("registrationType", formData.registrationType || "")
      submitData.append("reviewStatus", formData.reviewStatus || "")
      submitData.append("reviewReason", formData.reviewReason || "")
      submitData.append("reviewType", formData.reviewType || "")
      submitData.append("registrationPlatform", formData.registrationPlatform || "")

      // Fix conditional fields - send as proper JSON string
      console.log("🔧 Conditional fields being sent:", formData.conditionalFields)
      submitData.append("conditionalFields", JSON.stringify(formData.conditionalFields || {}))

      // ===== EXISTING FIELDS =====
      submitData.append("website_url", formData.websiteUrl || "")
      submitData.append("accessibility", formData.accessibility || "")
      submitData.append("third_party_content", formData.thirdPartyContent || "")
      submitData.append("review_date", formData.reviewDate || "")
      submitData.append("calculated_friday", formData.reviewWeek || "")
      submitData.append("review_month", formData.month || "")
      submitData.append("review_year", formData.year || "")
      submitData.append("review_traffic", formData.reviewDateTraffic || "")
      submitData.append("website_operator", formData.websiteOwner || "")
      submitData.append("website_type", formData.websiteType || "")
      submitData.append("website_source_id", formData.website_source_id || "")

      // Add existing images
      submitData.append("existing_images", JSON.stringify(formData.existingImages))

      // Add new images
      if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
        formData.uploadedFiles.forEach((file, index) => {
          console.log(`📎 Adding new image ${index + 1}:`, file.name)
          submitData.append("images", file)
        })
      }

      // Add aChecks (empty for now, but keeping structure)
      const aChecks = Array.from({ length: 19 }, () => ({ checked: false, comment: "" }))
      submitData.append("aChecks", JSON.stringify(aChecks))

      // Debug: Log all FormData entries
      console.log("📤 FormData contents:")
      for (const [key, value] of submitData.entries()) {
        console.log(`  ${key}:`, value)
      }

      console.log("🌐 Making API call to: http://localhost:5000/api/workspace_data/" + recordId)

      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/workspace_data/${recordId}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(`📊 Upload progress: ${percentCompleted}%`)
          setUploadProgress(percentCompleted)
        },
      })

      console.log("✅ API Response:", response.data)
      alert("✅ Record updated successfully!")

      // Call onSave callback if provided
      if (onSave) {
        onSave(response.data.data)
      }

      // Go back to list
      if (onBack) {
        onBack()
      }
    } catch (error) {
      console.error("❌ Form update error:", error)
      console.error("❌ Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      })

      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred"
      alert(`❌ Error updating record: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  const getVisibleFields = () => {
    switch (formData.thirdPartyContent) {
      case "yes":
        return Array.from({ length: 19 }, (_, i) => `A${i + 1}`)
      case "no":
        return Array.from({ length: 7 }, (_, i) => `A${i + 2}`) // A2-A8
      case "na":
        return ["A1"]
      default:
        return []
    }
  }

  // Add this helper function to check if field data should be displayed
  const shouldShowFieldData = (fieldId) => {
    const visibleFields = getVisibleFields()
    return visibleFields.includes(fieldId)
  }

  const handleConditionalFieldChange = (fieldId, type, value) => {
    setFormData((prev) => ({
      ...prev,
      conditionalFields: {
        ...prev.conditionalFields,
        [fieldId]: {
          ...prev.conditionalFields[fieldId],
          [type]: value,
        },
      },
    }))
  }

  const visibleFields = getVisibleFields()

  if (loading) {
    return (
      <div className="form-container">
        <div className="form-content">
          <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading record data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="form-container">
      {/* Back Button */}
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
        <ArrowLeft size={16} />
        Back to List
      </button>

      {/* Workstream Tabs */}
    

      {/* Main Form */}
      <div className="form-content">
        <h2 className="form-title">Edit Reviewer Information (ID: {recordId})</h2>

        <form onSubmit={handleSubmit} className="reviewer-form">
          {/* First Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Reviewed By</label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="registrationType">Registration Type</label>
              <select
                id="registrationType"
                value={formData.registrationType}
                onChange={(e) => handleInputChange("registrationType", e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="old-registration">Old Registration</option>
                <option value="new-registration">New Registration</option>
              </select>
            </div>
          </div>

          {/* Review Status Row */}
          <div className="review-status-row">
            <div className="form-group">
              <label>Review Status</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value="completed"
                    checked={formData.reviewStatus === "completed"}
                    onChange={(e) => handleInputChange("reviewStatus", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  Completed
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value="not-completed"
                    checked={formData.reviewStatus === "not-completed"}
                    onChange={(e) => handleInputChange("reviewStatus", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  Not Completed
                </label>
              </div>
            </div>

            {/* Conditional reason field in same row */}
            {formData.reviewStatus === "not-completed" && (
              <div className="form-group reason-field">
                <label htmlFor="reviewReason">If chosen not, please provide a reason:</label>
                <select
                  id="reviewReason"
                  value={formData.reviewReason}
                  onChange={(e) => handleInputChange("reviewReason", e.target.value)}
                >
                  <option value="">Select a reason</option>
                  <option value="site-offline">Site offline</option>
                  <option value="inactive">Inactive</option>
                  <option value="does-not-exist">Does Not Exist</option>
                  <option value="unable-to-open-site">Unable to open Site</option>
                </select>
              </div>
            )}
          </div>

          {/* Review Type and Website URL Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reviewType">Review Type</label>
              <select
                id="reviewType"
                value={formData.reviewType}
                onChange={(e) => handleInputChange("reviewType", e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="new-review">New Review</option>
                <option value="re-review">Re-Review</option>
              </select>
            </div>
            <div className="form-group" style={{ position: "relative" }}>
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                type="text"
                id="websiteUrl"
                placeholder="Start typing a website URL..."
                value={formData.websiteUrl}
                onChange={handleWebsiteUrlChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => {
                  if (formData.websiteUrl.length > 1 && suggestions.length > 0) setShowSuggestions(true)
                }}
                required
              />

              {/* New URL Status Indicator */}
              {urlStatus.isNew && (
                <div className="new-url-indicator">
                  <AlertCircle size={16} style={{ marginRight: "8px" }} />
                  {urlStatus.message}
                </div>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <ul className="suggestions-dropdown">
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <li key={item.id} onMouseDown={() => handleSuggestionClick(item)} className="suggestion-item">
                        {item.website_url}
                      </li>
                    ))
                  ) : (
                    <li className="suggestion-item no-hover">No existing URLs found</li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* URL Information Section */}
          <h3 className="section-title">URL Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reviewDate">Review Date</label>
              <input type="date" id="reviewDate" value={formData.reviewDate} onChange={handleDateChange} />
            </div>
            <div className="form-group">
              <label htmlFor="reviewWeek">Review Week (Friday)</label>
              <input
                type="date"
                id="reviewWeek"
                value={formData.reviewWeek}
                readOnly
                style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="month">Month</label>
              <input
                type="text"
                id="month"
                value={formData.month}
                readOnly
                style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                id="year"
                value={formData.year}
                readOnly
                style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reviewDateTraffic">Review Date Traffic</label>
              <input
                type="text"
                id="reviewDateTraffic"
                placeholder="Mention Number"
                value={formData.reviewDateTraffic}
                onChange={(e) => handleInputChange("reviewDateTraffic", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="websiteOwner">Website Owner</label>
              <input
                type="text"
                id="websiteOwner"
                placeholder="Company Name"
                value={formData.websiteOwner}
                onChange={(e) => handleInputChange("websiteOwner", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="websiteType">Website Type</label>
              <input
                type="text"
                id="websiteType"
                placeholder="Account"
                value={formData.websiteType}
                onChange={(e) => handleInputChange("websiteType", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Accessibility</label>
              <div className="radio-group horizontal">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="accessibility"
                    value="yes"
                    checked={formData.accessibility === "yes"}
                    onChange={(e) => handleInputChange("accessibility", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  Yes
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="accessibility"
                    value="no"
                    checked={formData.accessibility === "no"}
                    onChange={(e) => handleInputChange("accessibility", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  No
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="accessibility"
                    value="na"
                    checked={formData.accessibility === "na"}
                    onChange={(e) => handleInputChange("accessibility", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  N/A
                </label>
              </div>
            </div>
          </div>

          {/* Third-Party Content */}
          <div className="form-group full-width">
            <label>Third-Party Content</label>
            <div className="radio-group horizontal">
              <label className="radio-option">
                <input
                  type="radio"
                  name="thirdPartyContent"
                  value="yes"
                  checked={formData.thirdPartyContent === "yes"}
                  onChange={(e) => handleInputChange("thirdPartyContent", e.target.value)}
                />
                <span className="radio-custom"></span>
                Yes
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="thirdPartyContent"
                  value="no"
                  checked={formData.thirdPartyContent === "no"}
                  onChange={(e) => handleInputChange("thirdPartyContent", e.target.value)}
                />
                <span className="radio-custom"></span>
                No
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="thirdPartyContent"
                  value="na"
                  checked={formData.thirdPartyContent === "na"}
                  onChange={(e) => handleInputChange("thirdPartyContent", e.target.value)}
                />
                <span className="radio-custom"></span>
                N/A
              </label>
            </div>
          </div>

          {/* Registration Platform */}
          <div className="form-group full-width">
            <label htmlFor="registrationPlatform">Registration platform (if third-party)</label>
            <input
              type="text"
              id="registrationPlatform"
              placeholder="Mention website URL"
              value={formData.registrationPlatform}
              onChange={(e) => handleInputChange("registrationPlatform", e.target.value)}
            />
          </div>

          {/* Conditional Fields */}
          {formData.thirdPartyContent && formData.thirdPartyContent !== "" && (
            <div className="conditional-fields-section">
              <h3 className="section-title">
                Assessment Fields
                <span style={{ fontSize: "14px", fontWeight: "normal", color: "#666" }}>
                  ({visibleFields.length} fields visible)
                </span>
              </h3>
              <div className="conditional-fields-grid">
                {visibleFields.map((fieldId) => (
                  <div key={fieldId} className="conditional-field">
                    <div className="field-header">
                      <h4 className="field-label">{fieldId}</h4>
                      <div className="radio-group horizontal">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name={`${fieldId}-answer`}
                            value="yes"
                            checked={
                              shouldShowFieldData(fieldId) && formData.conditionalFields[fieldId]?.answer === "yes"
                            }
                            onChange={(e) => handleConditionalFieldChange(fieldId, "answer", e.target.value)}
                          />
                          <span className="radio-custom"></span>
                          Yes
                        </label>
                        <label className="radio-option">
                          <input
                            type="radio"
                            name={`${fieldId}-answer`}
                            value="no"
                            checked={
                              shouldShowFieldData(fieldId) && formData.conditionalFields[fieldId]?.answer === "no"
                            }
                            onChange={(e) => handleConditionalFieldChange(fieldId, "answer", e.target.value)}
                          />
                          <span className="radio-custom"></span>
                          No
                        </label>
                        <label className="radio-option">
                          <input
                            type="radio"
                            name={`${fieldId}-answer`}
                            value="na"
                            checked={
                              shouldShowFieldData(fieldId) && formData.conditionalFields[fieldId]?.answer === "na"
                            }
                            onChange={(e) => handleConditionalFieldChange(fieldId, "answer", e.target.value)}
                          />
                          <span className="radio-custom"></span>
                          N/A
                        </label>
                      </div>
                    </div>
                    <div className="comments-section">
                      <textarea
                        placeholder="Comments"
                        value={shouldShowFieldData(fieldId) ? formData.conditionalFields[fieldId]?.comments || "" : ""}
                        onChange={(e) => handleConditionalFieldChange(fieldId, "comments", e.target.value)}
                        className="comments-textarea"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Upload Section - Grid Layout */}
          <div className="file-upload-section">
            <h3 className="section-title">Images (Max 3 total):</h3>

            {/* Error/Success Message */}
            {imageError && (
              <div className={`image-error-message ${imageError.includes("✅") ? "success" : "error"}`}>
                {imageError}
              </div>
            )}

            <div className="image-upload-grid">
              {/* Display existing images */}
              {formData.existingImages.map((image, index) => (
                <div key={`existing-${index}`} className="image-preview-card">
                  <img src={image.url || "/placeholder.svg"} alt={`Existing ${index + 1}`} className="preview-image" />
                  <div className="image-card-info">
                    <div className="image-card-details">
                      <div className="image-card-name">
                        {image.originalname && image.originalname.length > 20
                          ? image.originalname.substring(0, 20) + "..."
                          : image.originalname || `Image ${index + 1}`}
                      </div>
                      <div className="image-card-size">
                        {image.size ? (image.size / 1024 / 1024).toFixed(2) + " MB" : "Existing"}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="delete-image-btn-new"
                      disabled={isSubmitting}
                      title="Delete existing image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Display new uploaded images */}
              {formData.uploadedFiles.map((file, index) => (
                <div key={`new-${index}`} className="image-preview-card">
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={`New ${index + 1}`}
                    className="preview-image"
                  />
                  <div className="image-card-info">
                    <div className="image-card-details">
                      <div className="image-card-name">
                        {file.name.length > 20 ? file.name.substring(0, 20) + "..." : file.name}
                      </div>
                      <div className="image-card-size">{(file.size / 1024 / 1024).toFixed(2)} MB (New)</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="delete-image-btn-new"
                      disabled={isSubmitting}
                      title="Delete new image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Image Card - Show only if less than 3 total images */}
              {formData.existingImages.length + formData.uploadedFiles.length < 3 && (
                <div className="add-image-card">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="image-upload-input"
                    disabled={isSubmitting}
                    multiple
                  />
                  <label htmlFor="image-upload-input" className="add-image-label">
                    <div className="add-image-icon">+</div>
                    <div className="upload-icon-small">
                      <Upload size={20} />
                    </div>
                    <span className="add-image-label-text">
                      {formData.existingImages.length + formData.uploadedFiles.length === 0 ? "Add Images" : "Add More"}
                    </span>
                    <span className="add-image-hint">(Select multiple images)</span>
                  </label>
                </div>
              )}
            </div>

            {/* Image counter */}
            {formData.existingImages.length + formData.uploadedFiles.length > 0 && (
              <div className="image-counter">
                {formData.existingImages.length + formData.uploadedFiles.length} of 3 images selected
                {formData.existingImages.length > 0 && (
                  <span style={{ color: "#6b7280", fontSize: "12px", marginLeft: "8px" }}>
                    ({formData.existingImages.length} existing, {formData.uploadedFiles.length} new)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Submit Button with Progress */}
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <>{uploadProgress > 0 ? `Updating... ${uploadProgress}%` : "Updating..."}</>
            ) : (
              <>
                <Save size={16} style={{ marginRight: "8px" }} />
                Update Record
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

