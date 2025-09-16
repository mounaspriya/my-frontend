




// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import "../styles/Form.css"
// import { useCurrencies } from '../hooks/useCurrencies'
// import { getCurrencyDisplayName } from '../utils/currencyUtils'

// export default function Workstream2Form() {
//   const [activeWorkstream, setActiveWorkstream] = useState("02")

//   const handleExpiryDateChange = (value) => {
//     // Remove any non-digit characters
//     let cleaned = value.replace(/\D/g, '')
    
//     // Add slash after 2 digits
//     if (cleaned.length >= 2) {
//       cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
//     }
    
//     // Limit to MM/YY format
//     if (cleaned.length > 5) {
//       cleaned = cleaned.substring(0, 5)
//     }
    
//     handleInputChange("expiryDate", cleaned)
//   }

//   const [formData, setFormData] = useState({
//     // ===== WORKSTREAM 2 SPECIFIC FIELDS =====
//     caseNo: "", // Case No. (Number - unique id)
//     testSuccessful: "", // Test Successful (Radio)
//     cardNo: "", // Card No (number)
//     cardCountry: "", // Card Country (char)
//     expiryDate: "", // Expiry date (date)
//     cvv: "", // Cvv (varchar)
//     email: "", // Email (email)
//     testedUrlHomepage: "", // Tested URL homepage (varchar)
//     testedUrl: "", // Tested URL (char)
//     testedOnDate: "", // Tested on Date (date)
//     testedAmount: "", // Tested amount (number)
//     testedCurrency: "INR", // Tested Currency (currency)
//     billingAddress: "", // Billing Address if asked (varchar - text area)
//     billingPhoneNumber: "", // Billing Phone Number (Number)
//     billingName: "", // Billing Name (char)
//     declinedMessage: "", // Declined Message (char)
//     comments: "", // Comments (dropdown)
//     notTestedBreakup: "", // Not Tested Breakup (dropdown)
//     idVerificationRequired: "", // ID Verification required (dropdown) - Now with N/A
//     bypassIdVerification: "", // Where you able to bypass ID Verification (dropdown) - Now with N/A
//     violationTestedProduct: "", // Violation Tested Product (dropdown) - Now with N/A
//     testedProduct: "", // NEW: Tested Product (Radio - Yes/No/N/A)
//     merchantName: "", // Merchant Name (dropdown) - Now with N/A
//     logGenerated: "", // Log generated Y/N (dropdown) - Now with N/A
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencies()

//   // Updated dropdown options for Workstream 2 - All now have Yes/No/N/A
//   const dropdownOptions = {
//     testedCurrency: currencies,
//     comments: ["Yes","No","NA"],
//     notTestedBreakup: [
//       "Not Tested breakup",
//       "Not Tested - CC option unavailable",
//       "Not Tested - Other",
//       "Not Tested - Target Juridiction Blocked",
//       "Not Tested - Redirect",
//       "Not Tested - Dysfunctional",
//       "Not Tested - Review Only",
//       "Not Tested - Parked/Offline",
//       "Not Tested - KYC Requirements",
//       "Not Tested - SMS Verification",
//       "Not Tested - Not Reportable",
//       "Not Tested - Non-Client CCs Only",
//       "Not Tested - Blank Screen",
//       "Not Tested - Incorrect phone number"
//     ],
//     idVerificationRequired: ["Yes", "No", "N/A"],
//     bypassIdVerification: ["Yes", "No", "N/A"],
//     violationTestedProduct: ["Yes", "No", "N/A"],
//     merchantName: ["Yes", "No", "N/A"],
//     logGenerated: ["Yes", "No", "N/A"]
//   }



//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("🚀 Workstream 2 Form submission started...")
//     console.log("📝 Form data:", formData)
//     setIsSubmitting(true)

//     try {
//       // Create FormData for submission
//       const submitData = new FormData()

//       // ===== WORKSTREAM 2 FIELDS =====
//       submitData.append("case_no", formData.caseNo || "")
//       submitData.append("test_successful", formData.testSuccessful || "")
//       submitData.append("card_no", formData.cardNo || "")
//       submitData.append("card_country", formData.cardCountry || "")
//       submitData.append("expiry_date", formData.expiryDate || "")
//       submitData.append("cvv", formData.cvv || "")
//       submitData.append("email", formData.email || "")
//       submitData.append("tested_url_homepage", formData.testedUrlHomepage || "")
//       submitData.append("tested_url", formData.testedUrl || "")
//       submitData.append("tested_on_date", formData.testedOnDate || "")
//       submitData.append("tested_amount", formData.testedAmount || "")
//       submitData.append("tested_currency", formData.testedCurrency || "")
//       submitData.append("billing_address", formData.billingAddress || "")
//       submitData.append("billing_phone_number", formData.billingPhoneNumber || "")
//       submitData.append("billing_name", formData.billingName || "")
//       submitData.append("declined_message", formData.declinedMessage || "")
//       submitData.append("comments", formData.comments || "")
//       submitData.append("not_tested_breakup", formData.notTestedBreakup || "")
//       submitData.append("id_verification_required", formData.idVerificationRequired || "")
//       submitData.append("bypass_id_verification", formData.bypassIdVerification || "")
//       submitData.append("violation_tested_product", formData.violationTestedProduct || "")
//       submitData.append("tested_product", formData.testedProduct || "")
//       submitData.append("merchant_name", formData.merchantName || "")
//       submitData.append("log_generated", formData.logGenerated || "")

//       // Debug: Log all FormData entries
//       console.log("📤 FormData contents:")
//       for (const [key, value] of submitData.entries()) {
//         console.log(`  ${key}:`, value)
//       }

//       console.log("🌐 Making API call to: ${import.meta.env.VITE_API_BASE_URL}/api/workstream2")
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/workstream2`, submitData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })

//       console.log("✅ API Response:", response.data)
//       alert("✅ Workstream 2 form submitted successfully!")

//       // Reset form
//       setFormData({
//         caseNo: "",
//         testSuccessful: "",
//         cardNo: "",
//         cardCountry: "",
//         expiryDate: "",
//         cvv: "",
//         email: "",
//         testedUrlHomepage: "",
//         testedUrl: "",
//         testedOnDate: "",
//         testedAmount: "",
//         testedCurrency: "USD",
//         billingAddress: "",
//         billingPhoneNumber: "",
//         billingName: "",
//         declinedMessage: "",
//         comments: "",
//         notTestedBreakup: "",
//         idVerificationRequired: "",
//         bypassIdVerification: "",
//         violationTestedProduct: "",
//         testedProduct: "",
//         merchantName: "",
//         logGenerated: "",
//       })
//     } catch (error) {
//       console.error("❌ Form submission error:", error)
//       console.error("❌ Error details:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         statusText: error.response?.statusText,
//       })
//       const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred"
//       alert(`❌ Error submitting form: ${errorMessage}`)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="form-container">
//       {/* Workstream Tabs */}
  

//       {/* Main Form */}
//       <div className="form-content">
//         <h2 className="form-title">Workstream 02 - Payment Testing Form</h2>

//         <form onSubmit={handleSubmit} className="reviewer-form">
//           {/* First Row - Case Info */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="caseNo">Case No. *</label>
//               <input
//                 type="number"
//                 id="caseNo"
//                 placeholder="Enter unique case number"
//                 value={formData.caseNo}
//                 onChange={(e) => handleInputChange("caseNo", e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Test Successful *</label>
//               <div className="radio-group horizontal">
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="testSuccessful"
//                     value="yes"
//                     checked={formData.testSuccessful === "yes"}
//                     onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   Yes
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="testSuccessful"
//                     value="no"
//                     checked={formData.testSuccessful === "no"}
//                     onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   No
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="testSuccessful"
//                     value="na"
//                     checked={formData.testSuccessful === "na"}
//                     onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   N/A
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Card Information Section */}
        
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="cardNo">Card No</label>
//               <input
//                 type="text"
//                 id="cardNo"
//                 placeholder="Enter card number"
//                 value={formData.cardNo}
//                 onChange={(e) => handleInputChange("cardNo", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="cardCountry">Card Country</label>
//               <input
//                 type="text"
//                 id="cardCountry"
//                 placeholder="Enter card country"
//                 value={formData.cardCountry}
//                 onChange={(e) => handleInputChange("cardCountry", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="expiryDate">Expiry Date</label>
//               <input
//                 type="text"
//                 id="expiryDate"
//                 placeholder="MM/YY (e.g., 09/25)"
//                 value={formData.expiryDate}
//                 onChange={(e) => handleExpiryDateChange(e.target.value)}
//                 pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
//                 maxLength="5"
//                 title="Enter expiry date in MM/YY format"
//               />
//               <div className="help-text">Enter in MM/YY format (e.g., 09/25)</div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="cvv">CVV</label>
//               <input
//                 type="text"
//                 id="cvv"
//                 placeholder="Enter CVV"
//                 value={formData.cvv}
//                 onChange={(e) => handleInputChange("cvv", e.target.value)}
//                 maxLength="4"
//               />
//             </div>
//           </div>

//           {/* Contact & URL Information */}
       
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter email address"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="testedUrlHomepage">Tested URL Homepage</label>
//               <input
//                 type="url"
//                 id="testedUrlHomepage"
//                 placeholder="Enter homepage URL"
//                 value={formData.testedUrlHomepage}
//                 onChange={(e) => handleInputChange("testedUrlHomepage", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="testedUrl">Tested URL</label>
//               <input
//                 type="url"
//                 id="testedUrl"
//                 placeholder="Enter tested URL"
//                 value={formData.testedUrl}
//                 onChange={(e) => handleInputChange("testedUrl", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="testedOnDate">Tested on Date</label>
//               <input
//                 type="date"
//                 id="testedOnDate"
//                 value={formData.testedOnDate}
//                 onChange={(e) => handleInputChange("testedOnDate", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Transaction Information */}
        
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="testedAmount">Tested Amount</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 id="testedAmount"
//                 placeholder="Enter amount"
//                 value={formData.testedAmount}
//                 onChange={(e) => handleInputChange("testedAmount", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="testedCurrency">Tested Currency</label>
//               <select
//                 id="testedCurrency"
//                 value={formData.testedCurrency}
//                 onChange={(e) => handleInputChange("testedCurrency", e.target.value)}
//                 disabled={currenciesLoading}
//               >
//                 {currenciesLoading ? (
//                   <option value="">Loading currencies...</option>
//                 ) : currenciesError ? (
//                   <option value="">Error loading currencies</option>
//                 ) : (
//                   <>
//                     <option value="">Select currency</option>
//                     {currencies.map((currency) => (
//                       <option key={currency} value={currency}>
//                         {getCurrencyDisplayName(currency)}
//                       </option>
//                     ))}
//                   </>
//                 )}
//               </select>
//               {currenciesError && (
//                 <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
//                   Failed to load currencies. Using fallback list.
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Billing Information */}
        
//           <div className="form-group full-width">
//             <label htmlFor="billingAddress">Billing Address</label>
//             <textarea
//               id="billingAddress"
//               placeholder="Enter billing address if requested"
//               value={formData.billingAddress}
//               onChange={(e) => handleInputChange("billingAddress", e.target.value)}
//               rows="3"
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "2px solid #e9ecef",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 fontFamily: "inherit",
//                 resize: "vertical",
//               }}
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="billingPhoneNumber">Billing Phone Number</label>
//               <input
//                 type="tel"
//                 id="billingPhoneNumber"
//                 placeholder="Enter phone number"
//                 value={formData.billingPhoneNumber}
//                 onChange={(e) => handleInputChange("billingPhoneNumber", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="billingName">Billing Name</label>
//               <input
//                 type="text"
//                 id="billingName"
//                 placeholder="Enter billing name"
//                 value={formData.billingName}
//                 onChange={(e) => handleInputChange("billingName", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Test Results & Analysis */}
        
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="declinedMessage">Declined Message</label>
//               <input
//                 type="text"
//                 id="declinedMessage"
//                 placeholder="Enter declined message if any"
//                 value={formData.declinedMessage}
//                 onChange={(e) => handleInputChange("declinedMessage", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="comments">Comments</label>
//               <select
//                 id="comments"
//                 value={formData.comments}
//                 onChange={(e) => handleInputChange("comments", e.target.value)}
//               >
//                 <option value="">Select comment</option>
//                 {dropdownOptions.comments.map((comment) => (
//                   <option key={comment} value={comment}>
//                     {comment}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="notTestedBreakup">Not Tested Breakup</label>
//             <select
//               id="notTestedBreakup"
//               value={formData.notTestedBreakup}
//               onChange={(e) => handleInputChange("notTestedBreakup", e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "2px solid #e9ecef",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 fontFamily: "inherit",
//               }}
//             >
//               <option value="">Select breakup reason</option>
//               {dropdownOptions.notTestedBreakup.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Verification & Compliance */}
        
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="idVerificationRequired">ID Verification Required</label>
//               <select
//                 id="idVerificationRequired"
//                 value={formData.idVerificationRequired}
//                 onChange={(e) => handleInputChange("idVerificationRequired", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.idVerificationRequired.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="bypassIdVerification">Bypass ID Verification</label>
//               <select
//                 id="bypassIdVerification"
//                 value={formData.bypassIdVerification}
//                 onChange={(e) => handleInputChange("bypassIdVerification", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.bypassIdVerification.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="violationTestedProduct">Violation Tested Product</label>
//               <select
//                 id="violationTestedProduct"
//                 value={formData.violationTestedProduct}
//                 onChange={(e) => handleInputChange("violationTestedProduct", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.violationTestedProduct.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="testedProduct">Tested Product</label>
//               <select
//                 id="testedProduct"
//                 value={formData.testedProduct}
//                 onChange={(e) => handleInputChange("testedProduct", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//                 <option value="na">N/A</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="merchantName">Merchant Name</label>
//               <select
//                 id="merchantName"
//                 value={formData.merchantName}
//                 onChange={(e) => handleInputChange("merchantName", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.merchantName.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="logGenerated">Log Generated Y/N</label>
//               <select
//                 id="logGenerated"
//                 value={formData.logGenerated}
//                 onChange={(e) => handleInputChange("logGenerated", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.logGenerated.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="submit-button" disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Submit Payment Test Form"}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }





// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import "../styles/Form.css"
// import { useCurrencies } from '../hooks/useCurrencies'
// import { getCurrencyDisplayName } from '../utils/currencyUtils'

// export default function Workstream2Form() {
//   const [activeWorkstream, setActiveWorkstream] = useState("02")

//   const handleExpiryDateChange = (value) => {
//     // Remove any non-digit characters
//     let cleaned = value.replace(/\D/g, '')
    
//     // Add slash after 2 digits
//     if (cleaned.length >= 2) {
//       cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
//     }
    
//     // Limit to MM/YY format
//     if (cleaned.length > 5) {
//       cleaned = cleaned.substring(0, 5)
//     }
    
//     handleInputChange("expiryDate", cleaned)
//   }

//   const [formData, setFormData] = useState({
//     // ===== WORKSTREAM 2 SPECIFIC FIELDS =====
//     caseNo: "", // Case No. (Number - unique id)
//     testSuccessful: "", // Test Successful (Radio)
//     cardNo: "", // Card No (number)
//     cardCountry: "", // Card Country (char)
//     expiryDate: "", // Expiry date (date)
//     cvv: "", // Cvv (varchar)
//     email: "", // Email (email)
//     testedUrlHomepage: "", // Tested URL homepage (varchar)
//     testedUrl: "", // Tested URL (char)
//     testedOnDate: "", // Tested on Date (date)
//     testedAmount: "", // Tested amount (number)
//     testedCurrency: "INR", // Tested Currency (currency)
//     billingAddress: "", // Billing Address if asked (varchar - text area)
//     billingPhoneNumber: "", // Billing Phone Number (Number)
//     billingName: "", // Billing Name (char)
//     declinedMessage: "", // Declined Message (char)
//     comments: "", // Comments (dropdown)
//     notTestedBreakup: "", // Not Tested Breakup (dropdown)
//     idVerificationRequired: "", // ID Verification required (dropdown) - Now with N/A
//     bypassIdVerification: "", // Where you able to bypass ID Verification (dropdown) - Now with N/A
//     violationTestedProduct: "", // Violation Tested Product (dropdown) - Now with N/A
//     testedProduct: "", // NEW: Tested Product (Radio - Yes/No/N/A)
//     merchantName: "", // Merchant Name (dropdown) - Now with N/A
//     logGenerated: "", // Log generated Y/N (dropdown) - Now with N/A
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencies()

//   // Updated dropdown options for Workstream 2 - All now have Yes/No/N/A
//   const dropdownOptions = {
//     testedCurrency: currencies,
//     comments: ["Yes","No","NA"],
//     notTestedBreakup: [
//       "Not Tested breakup",
//       "Not Tested - CC option unavailable",
//       "Not Tested - Other",
//       "Not Tested - Target Juridiction Blocked",
//       "Not Tested - Redirect",
//       "Not Tested - Dysfunctional",
//       "Not Tested - Review Only",
//       "Not Tested - Parked/Offline",
//       "Not Tested - KYC Requirements",
//       "Not Tested - SMS Verification",
//       "Not Tested - Not Reportable",
//       "Not Tested - Non-Client CCs Only",
//       "Not Tested - Blank Screen",
//       "Not Tested - Incorrect phone number"
//     ],
//     idVerificationRequired: ["Yes", "No", "N/A"],
//     bypassIdVerification: ["Yes", "No", "N/A"],
//     violationTestedProduct: ["Yes", "No", "N/A"],
//     merchantName: ["Yes", "No", "N/A"],
//     logGenerated: ["Yes", "No", "N/A"]
//   }

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   // === UPDATE THE FORM SUBMISSION ===
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("🚀 Workstream 2 Form submission started...")
//     setIsSubmitting(true)

//     try {
//       // Create payload with ALL 56 fields
//       const submitData = {
//         // === 24 FORM FIELDS (with actual data) ===
//         case_no: formData.caseNo || "",
//         test_successful: formData.testSuccessful || "",
//         card_no: formData.cardNo || "",
//         card_country: formData.cardCountry || "",
//         expiry_date: formData.expiryDate || "",
//         cvv: formData.cvv || "",
//         email: formData.email || "",
//         tested_url_homepage: formData.testedUrlHomepage || "",
//         tested_url: formData.testedUrl || "",
//         tested_on_date: formData.testedOnDate || "",
//         tested_amount: formData.testedAmount || "",
//         tested_currency: formData.testedCurrency || "",
//         billing_address: formData.billingAddress || "",
//         billing_phone_number: formData.billingPhoneNumber || "",
//         billing_name: formData.billingName || "",
//         declined_message: formData.declinedMessage || "",
//         not_tested_breakup: formData.notTestedBreakup || "",
//         comments: formData.comments || "",
//         id_verification_required: formData.idVerificationRequired || "",
//         bypass_id_verification: formData.bypassIdVerification || "",
//         violation_tested_product: formData.violationTestedProduct || "",
//         tested_product: formData.testedProduct || "",
//         merchant_name: formData.merchantName || "",
//         log_generated: formData.logGenerated || "",

//         // === 30 ADDITIONAL FIELDS (empty for now, ready for future functionality) ===
//         transaction_gmt_date: null,
//         account_number_masked: null,
//         acquiring_identifier: null,
//         acquiring_user_bid: null,
//         acquirer_name: null,
//         acquiring_identifier_region: null,
//         acquirer_region: null,
//         acquiring_identifier_legal_country: null,
//         acquirer_country: null,
//         merchant_name_acceptor: null,
//         merchant_city: null,
//         merchant_state_code: null,
//         merchant_state: null,
//         merchant_country_code: null,
//         merchant_country: null,
//         merchant_category_code: null,
//         enriched_merchant_category: null,
//         card_acceptor_id: null,
//         card_acceptor_terminal_id: null,
//         pos_entry_mode: null,
//         enriched_pos_entry_mode: null,
//         pos_condition_code: null,
//         pos_condition: null,
//         transaction_identifier: null,
//         transaction_currency_code: null,
//         eci_moto_group_code: null,
//         metrics: null,
//         auth_transaction_count: null,
//         transaction_amount_usd: null,
//         auth_transaction_amount: null,
//       }

//       console.log("📤 Sending all 56 fields to API:", submitData)

//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/workstream2`, submitData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })

//       console.log("✅ API Response:", response.data)
      
//       // Handle the new response structure
//       if (response.data.success) {
//         alert(`✅ Workstream 2 form submitted successfully! 
//         📊 Fields: ${response.data.field_summary?.total_fields || 56} total
//         ✅ Populated: ${response.data.field_summary?.populated_fields || 26}
//         ⭕ Empty: ${response.data.field_summary?.empty_fields || 30}`)
//       }

//       // Reset form with all fields
//       setFormData({
//         caseNo: "",
//         testSuccessful: "",
//         cardNo: "",
//         cardCountry: "",
//         expiryDate: "",
//         cvv: "",
//         email: "",
//         testedUrlHomepage: "",
//         testedUrl: "",
//         testedOnDate: "",
//         testedAmount: "",
//         testedCurrency: "INR",
//         billingAddress: "",
//         billingPhoneNumber: "",
//         billingName: "",
//         declinedMessage: "",
//         comments: "",
//         notTestedBreakup: "",
//         idVerificationRequired: "",
//         bypassIdVerification: "",
//         violationTestedProduct: "",
//         testedProduct: "",
//         merchantName: "",
//         logGenerated: "",
//       })
//     } catch (error) {
//       console.error("❌ Form submission error:", error)
//       const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred"
//       alert(`❌ Error submitting form: ${errorMessage}`)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
   
//     <div className="form-container">
//       {/* Main Form */}
//       <div className="form-content">
//         <h2 className="form-title">Workstream 02 - Payment Testing Form</h2>

//         <form onSubmit={handleSubmit} className="reviewer-form">
//           {/* First Row - Case Info */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="caseNo">Case No. *</label>
//               <input
//                 type="number"
//                 id="caseNo"
//                 placeholder="Enter unique case number"
//                 value={formData.caseNo}
//                 onChange={(e) => handleInputChange("caseNo", e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Test Successful *</label>
//               <div className="radio-group horizontal">
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="testSuccessful"
//                     value="yes"
//                     checked={formData.testSuccessful === "yes"}
//                     onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   Yes
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="testSuccessful"
//                     value="no"
//                     checked={formData.testSuccessful === "no"}
//                     onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   No
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="testSuccessful"
//                     value="na"
//                     checked={formData.testSuccessful === "na"}
//                     onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
//                   />
//                   <span className="radio-custom"></span>
//                   N/A
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="cardNo">Card No</label>
//               <input
//                 type="text"
//                 id="cardNo"
//                 placeholder="Enter card number"
//                 value={formData.cardNo}
//                 onChange={(e) => handleInputChange("cardNo", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="cardCountry">Card Country</label>
//               <input
//                 type="text"
//                 id="cardCountry"
//                 placeholder="Enter card country"
//                 value={formData.cardCountry}
//                 onChange={(e) => handleInputChange("cardCountry", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="expiryDate">Expiry Date</label>
//               <input
//                 type="text"
//                 id="expiryDate"
//                 placeholder="MM/YY (e.g., 09/25)"
//                 value={formData.expiryDate}
//                 onChange={(e) => handleExpiryDateChange(e.target.value)}
//                 pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
//                 maxLength="5"
//                 title="Enter expiry date in MM/YY format"
//               />
//               <div className="help-text">Enter in MM/YY format (e.g., 09/25)</div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="cvv">CVV</label>
//               <input
//                 type="text"
//                 id="cvv"
//                 placeholder="Enter CVV"
//                 value={formData.cvv}
//                 onChange={(e) => handleInputChange("cvv", e.target.value)}
//                 maxLength="4"
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter email address"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="testedUrlHomepage">Tested URL Homepage</label>
//               <input
//                 type="url"
//                 id="testedUrlHomepage"
//                 placeholder="Enter homepage URL"
//                 value={formData.testedUrlHomepage}
//                 onChange={(e) => handleInputChange("testedUrlHomepage", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="testedUrl">Tested URL</label>
//               <input
//                 type="url"
//                 id="testedUrl"
//                 placeholder="Enter tested URL"
//                 value={formData.testedUrl}
//                 onChange={(e) => handleInputChange("testedUrl", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="testedOnDate">Tested on Date</label>
//               <input
//                 type="date"
//                 id="testedOnDate"
//                 value={formData.testedOnDate}
//                 onChange={(e) => handleInputChange("testedOnDate", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="testedAmount">Tested Amount</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 id="testedAmount"
//                 placeholder="Enter amount"
//                 value={formData.testedAmount}
//                 onChange={(e) => handleInputChange("testedAmount", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="testedCurrency">Tested Currency</label>
//               <select
//                 id="testedCurrency"
//                 value={formData.testedCurrency}
//                 onChange={(e) => handleInputChange("testedCurrency", e.target.value)}
//                 disabled={currenciesLoading}
//               >
//                 {currenciesLoading ? (
//                   <option value="">Loading currencies...</option>
//                 ) : currenciesError ? (
//                   <option value="">Error loading currencies</option>
//                 ) : (
//                   <>
//                     <option value="">Select currency</option>
//                     {currencies.map((currency) => (
//                       <option key={currency} value={currency}>
//                         {getCurrencyDisplayName(currency)}
//                       </option>
//                     ))}
//                   </>
//                 )}
//               </select>
//               {currenciesError && (
//                 <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
//                   Failed to load currencies. Using fallback list.
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="billingAddress">Billing Address</label>
//             <textarea
//               id="billingAddress"
//               placeholder="Enter billing address if requested"
//               value={formData.billingAddress}
//               onChange={(e) => handleInputChange("billingAddress", e.target.value)}
//               rows="3"
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "2px solid #e9ecef",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 fontFamily: "inherit",
//                 resize: "vertical",
//               }}
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="billingPhoneNumber">Billing Phone Number</label>
//               <input
//                 type="tel"
//                 id="billingPhoneNumber"
//                 placeholder="Enter phone number"
//                 value={formData.billingPhoneNumber}
//                 onChange={(e) => handleInputChange("billingPhoneNumber", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="billingName">Billing Name</label>
//               <input
//                 type="text"
//                 id="billingName"
//                 placeholder="Enter billing name"
//                 value={formData.billingName}
//                 onChange={(e) => handleInputChange("billingName", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="declinedMessage">Declined Message</label>
//               <input
//                 type="text"
//                 id="declinedMessage"
//                 placeholder="Enter declined message if any"
//                 value={formData.declinedMessage}
//                 onChange={(e) => handleInputChange("declinedMessage", e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="comments">Comments</label>
//               <select
//                 id="comments"
//                 value={formData.comments}
//                 onChange={(e) => handleInputChange("comments", e.target.value)}
//               >
//                 <option value="">Select comment</option>
//                 {dropdownOptions.comments.map((comment) => (
//                   <option key={comment} value={comment}>
//                     {comment}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="notTestedBreakup">Not Tested Breakup</label>
//             <select
//               id="notTestedBreakup"
//               value={formData.notTestedBreakup}
//               onChange={(e) => handleInputChange("notTestedBreakup", e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "2px solid #e9ecef",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 fontFamily: "inherit",
//               }}
//             >
//               <option value="">Select breakup reason</option>
//               {dropdownOptions.notTestedBreakup.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="idVerificationRequired">ID Verification Required</label>
//               <select
//                 id="idVerificationRequired"
//                 value={formData.idVerificationRequired}
//                 onChange={(e) => handleInputChange("idVerificationRequired", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.idVerificationRequired.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="bypassIdVerification">Bypass ID Verification</label>
//               <select
//                 id="bypassIdVerification"
//                 value={formData.bypassIdVerification}
//                 onChange={(e) => handleInputChange("bypassIdVerification", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.bypassIdVerification.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="violationTestedProduct">Violation Tested Product</label>
//               <select
//                 id="violationTestedProduct"
//                 value={formData.violationTestedProduct}
//                 onChange={(e) => handleInputChange("violationTestedProduct", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.violationTestedProduct.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="testedProduct">Tested Product</label>
//               <select
//                 id="testedProduct"
//                 value={formData.testedProduct}
//                 onChange={(e) => handleInputChange("testedProduct", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//                 <option value="na">N/A</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="merchantName">Merchant Name</label>
//               <select
//                 id="merchantName"
//                 value={formData.merchantName}
//                 onChange={(e) => handleInputChange("merchantName", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.merchantName.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="logGenerated">Log Generated Y/N</label>
//               <select
//                 id="logGenerated"
//                 value={formData.logGenerated}
//                 onChange={(e) => handleInputChange("logGenerated", e.target.value)}
//               >
//                 <option value="">Select option</option>
//                 {dropdownOptions.logGenerated.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="submit-button" disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Submit Payment Test Form"}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }











"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/Form.css"
import { useCurrencies } from "../hooks/useCurrencies"
import { getCurrencyDisplayName } from "../utils/currencyUtils"

export default function Workstream2Form() {
  const [activeWorkstream, setActiveWorkstream] = useState("02")
  const [fieldLabels, setFieldLabels] = useState({})

  useEffect(() => {
    const fetchFieldLabels = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/workstream/workstream2/field-config`,
        )
        if (response.data.success) {
          const labels = {}
          response.data.data.forEach((field) => {
            labels[field.field_name] = field.display_name || field.field_name
          })
          setFieldLabels(labels)
        }
      } catch (error) {
        console.error("Error fetching field labels:", error)
      }
    }

    fetchFieldLabels()
  }, [])

  const getFieldLabel = (fieldName, fallback) => {
    return fieldLabels[fieldName] || fallback
  }

  const handleExpiryDateChange = (value) => {
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

    handleInputChange("expiryDate", cleaned)
  }

  const [formData, setFormData] = useState({
    caseNo: "", // Case No. (Number - unique id)
    testSuccessful: "", // Test Successful (Radio)
    cardNo: "", // Card No (number)
    cardCountry: "", // Card Country (char)
    expiryDate: "", // Expiry date (date)
    cvv: "", // Cvv (varchar)
    email: "", // Email (email)
    testedUrlHomepage: "", // Tested URL homepage (varchar)
    testedUrl: "", // Tested URL (char)
    testedOnDate: "", // Tested on Date (date)
    testedAmount: "", // Tested amount (number)
    testedCurrency: "INR", // Tested Currency (currency)
    billingAddress: "", // Billing Address if asked (varchar - text area)
    billingPhoneNumber: "", // Billing Phone Number (Number)
    billingName: "", // Billing Name (char)
    declinedMessage: "", // Declined Message (char)
    comments: "", // Comments (dropdown)
    notTestedBreakup: "", // Not Tested Breakup (dropdown)
    idVerificationRequired: "", // ID Verification required (dropdown) - Now with N/A
    bypassIdVerification: "", // Where you able to bypass ID Verification (dropdown) - Now with N/A
    violationTestedProduct: "", // Violation Tested Product (dropdown) - Now with N/A
    testedProduct: "", // NEW: Tested Product (Radio - Yes/No/N/A)
    merchantName: "", // Merchant Name (dropdown) - Now with N/A
    logGenerated: "", // Log generated Y/N (dropdown) - Now with N/A
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencies()

  const dropdownOptions = {
    testedCurrency: currencies,
    comments: ["Yes", "No", "NA"],
    notTestedBreakup: [
      "Not Tested breakup",
      "Not Tested - CC option unavailable",
      "Not Tested - Other",
      "Not Tested - Target Juridiction Blocked",
      "Not Tested - Redirect",
      "Not Tested - Dysfunctional",
      "Not Tested - Review Only",
      "Not Tested - Parked/Offline",
      "Not Tested - KYC Requirements",
      "Not Tested - SMS Verification",
      "Not Tested - Not Reportable",
      "Not Tested - Non-Client CCs Only",
      "Not Tested - Blank Screen",
      "Not Tested - Incorrect phone number",
    ],
    idVerificationRequired: ["Yes", "No", "N/A"],
    bypassIdVerification: ["Yes", "No", "N/A"],
    violationTestedProduct: ["Yes", "No", "N/A"],
    merchantName: ["Yes", "No", "N/A"],
    logGenerated: ["Yes", "No", "N/A"],
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("🚀 Workstream 2 Form submission started...")
    setIsSubmitting(true)

    try {
      const submitData = {
        case_no: formData.caseNo || "",
        test_successful: formData.testSuccessful || "",
        card_no: formData.cardNo || "",
        card_country: formData.cardCountry || "",
        expiry_date: formData.expiryDate || "",
        cvv: formData.cvv || "",
        email: formData.email || "",
        tested_url_homepage: formData.testedUrlHomepage || "",
        tested_url: formData.testedUrl || "",
        tested_on_date: formData.testedOnDate || "",
        tested_amount: formData.testedAmount || "",
        tested_currency: formData.testedCurrency || "",
        billing_address: formData.billingAddress || "",
        billing_phone_number: formData.billingPhoneNumber || "",
        billing_name: formData.billingName || "",
        declined_message: formData.declinedMessage || "",
        not_tested_breakup: formData.notTestedBreakup || "",
        comments: formData.comments || "",
        id_verification_required: formData.idVerificationRequired || "",
        bypass_id_verification: formData.bypassIdVerification || "",
        violation_tested_product: formData.violationTestedProduct || "",
        tested_product: formData.testedProduct || "",
        merchant_name: formData.merchantName || "",
        log_generated: formData.logGenerated || "",
        transaction_gmt_date: null,
        account_number_masked: null,
        acquiring_identifier: null,
        acquiring_user_bid: null,
        acquirer_name: null,
        acquiring_identifier_region: null,
        acquirer_region: null,
        acquiring_identifier_legal_country: null,
        acquirer_country: null,
        merchant_name_acceptor: null,
        merchant_city: null,
        merchant_state_code: null,
        merchant_state: null,
        merchant_country_code: null,
        merchant_country: null,
        merchant_category_code: null,
        enriched_merchant_category: null,
        card_acceptor_id: null,
        card_acceptor_terminal_id: null,
        pos_entry_mode: null,
        enriched_pos_entry_mode: null,
        pos_condition_code: null,
        pos_condition: null,
        transaction_identifier: null,
        transaction_currency_code: null,
        eci_moto_group_code: null,
        metrics: null,
        auth_transaction_count: null,
        transaction_amount_usd: null,
        auth_transaction_amount: null,
      }

      console.log("📤 Sending all 56 fields to API:", submitData)

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/workstream2`, submitData, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("✅ API Response:", response.data)

      if (response.data.success) {
        alert(`✅ Workstream 2 form submitted successfully! 
        📊 Fields: ${response.data.field_summary?.total_fields || 56} total
        ✅ Populated: ${response.data.field_summary?.populated_fields || 26}
        ⭕ Empty: ${response.data.field_summary?.empty_fields || 30}`)
      }

      setFormData({
        caseNo: "",
        testSuccessful: "",
        cardNo: "",
        cardCountry: "",
        expiryDate: "",
        cvv: "",
        email: "",
        testedUrlHomepage: "",
        testedUrl: "",
        testedOnDate: "",
        testedAmount: "",
        testedCurrency: "INR",
        billingAddress: "",
        billingPhoneNumber: "",
        billingName: "",
        declinedMessage: "",
        comments: "",
        notTestedBreakup: "",
        idVerificationRequired: "",
        bypassIdVerification: "",
        violationTestedProduct: "",
        testedProduct: "",
        merchantName: "",
        logGenerated: "",
      })
    } catch (error) {
      console.error("❌ Form submission error:", error)
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred"
      alert(`❌ Error submitting form: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-container">
      <div className="form-content">
        <h2 className="form-title">Workstream 02 - Payment Testing Form</h2>

        <form onSubmit={handleSubmit} className="reviewer-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="caseNo">{getFieldLabel("case_no", "Case No.")} *</label>
              <input
                type="number"
                id="caseNo"
                placeholder="Enter unique case number"
                value={formData.caseNo}
                onChange={(e) => handleInputChange("caseNo", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>{getFieldLabel("test_successful", "Test Successful")} *</label>
              <div className="radio-group horizontal">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="testSuccessful"
                    value="yes"
                    checked={formData.testSuccessful === "yes"}
                    onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  Yes
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="testSuccessful"
                    value="no"
                    checked={formData.testSuccessful === "no"}
                    onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  No
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="testSuccessful"
                    value="na"
                    checked={formData.testSuccessful === "na"}
                    onChange={(e) => handleInputChange("testSuccessful", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  N/A
                </label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cardNo">{getFieldLabel("card_no", "Card No")}</label>
              <input
                type="text"
                id="cardNo"
                placeholder="Enter card number"
                value={formData.cardNo}
                onChange={(e) => handleInputChange("cardNo", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardCountry">{getFieldLabel("card_country", "Card Country")}</label>
              <input
                type="text"
                id="cardCountry"
                placeholder="Enter card country"
                value={formData.cardCountry}
                onChange={(e) => handleInputChange("cardCountry", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">{getFieldLabel("expiry_date", "Expiry Date")}</label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY (e.g., 09/25)"
                value={formData.expiryDate}
                onChange={(e) => handleExpiryDateChange(e.target.value)}
                pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                maxLength="5"
                title="Enter expiry date in MM/YY format"
              />
              <div className="help-text">Enter in MM/YY format (e.g., 09/25)</div>
            </div>
            <div className="form-group">
              <label htmlFor="cvv">{getFieldLabel("cvv", "CVV")}</label>
              <input
                type="text"
                id="cvv"
                placeholder="Enter CVV"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength="4"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">{getFieldLabel("email", "Email")}</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="testedUrlHomepage">{getFieldLabel("tested_url_homepage", "Tested URL Homepage")}</label>
              <input
                type="url"
                id="testedUrlHomepage"
                placeholder="Enter homepage URL"
                value={formData.testedUrlHomepage}
                onChange={(e) => handleInputChange("testedUrlHomepage", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="testedUrl">{getFieldLabel("tested_url", "Tested URL")}</label>
              <input
                type="url"
                id="testedUrl"
                placeholder="Enter tested URL"
                value={formData.testedUrl}
                onChange={(e) => handleInputChange("testedUrl", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="testedOnDate">{getFieldLabel("tested_on_date", "Tested on Date")}</label>
              <input
                type="date"
                id="testedOnDate"
                value={formData.testedOnDate}
                onChange={(e) => handleInputChange("testedOnDate", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="testedAmount">{getFieldLabel("tested_amount", "Tested Amount")}</label>
              <input
                type="number"
                step="0.01"
                id="testedAmount"
                placeholder="Enter amount"
                value={formData.testedAmount}
                onChange={(e) => handleInputChange("testedAmount", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="testedCurrency">{getFieldLabel("tested_currency", "Tested Currency")}</label>
              <select
                id="testedCurrency"
                value={formData.testedCurrency}
                onChange={(e) => handleInputChange("testedCurrency", e.target.value)}
                disabled={currenciesLoading}
              >
                {currenciesLoading ? (
                  <option value="">Loading currencies...</option>
                ) : currenciesError ? (
                  <option value="">Error loading currencies</option>
                ) : (
                  <>
                    <option value="">Select currency</option>
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {getCurrencyDisplayName(currency)}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {currenciesError && (
                <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>
                  Failed to load currencies. Using fallback list.
                </div>
              )}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="billingAddress">{getFieldLabel("billing_address", "Billing Address")}</label>
            <textarea
              id="billingAddress"
              placeholder="Enter billing address if requested"
              value={formData.billingAddress}
              onChange={(e) => handleInputChange("billingAddress", e.target.value)}
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="billingPhoneNumber">
                {getFieldLabel("billing_phone_number", "Billing Phone Number")}
              </label>
              <input
                type="tel"
                id="billingPhoneNumber"
                placeholder="Enter phone number"
                value={formData.billingPhoneNumber}
                onChange={(e) => handleInputChange("billingPhoneNumber", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="billingName">{getFieldLabel("billing_name", "Billing Name")}</label>
              <input
                type="text"
                id="billingName"
                placeholder="Enter billing name"
                value={formData.billingName}
                onChange={(e) => handleInputChange("billingName", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="declinedMessage">{getFieldLabel("declined_message", "Declined Message")}</label>
              <input
                type="text"
                id="declinedMessage"
                placeholder="Enter declined message if any"
                value={formData.declinedMessage}
                onChange={(e) => handleInputChange("declinedMessage", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">{getFieldLabel("comments", "Comments")}</label>
              <select
                id="comments"
                value={formData.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
              >
                <option value="">Select comment</option>
                {dropdownOptions.comments.map((comment) => (
                  <option key={comment} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="notTestedBreakup">{getFieldLabel("not_tested_breakup", "Not Tested Breakup")}</label>
            <select
              id="notTestedBreakup"
              value={formData.notTestedBreakup}
              onChange={(e) => handleInputChange("notTestedBreakup", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            >
              <option value="">Select breakup reason</option>
              {dropdownOptions.notTestedBreakup.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="idVerificationRequired">
                {getFieldLabel("id_verification_required", "ID Verification Required")}
              </label>
              <select
                id="idVerificationRequired"
                value={formData.idVerificationRequired}
                onChange={(e) => handleInputChange("idVerificationRequired", e.target.value)}
              >
                <option value="">Select option</option>
                {dropdownOptions.idVerificationRequired.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bypassIdVerification">
                {getFieldLabel("bypass_id_verification", "Bypass ID Verification")}
              </label>
              <select
                id="bypassIdVerification"
                value={formData.bypassIdVerification}
                onChange={(e) => handleInputChange("bypassIdVerification", e.target.value)}
              >
                <option value="">Select option</option>
                {dropdownOptions.bypassIdVerification.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="violationTestedProduct">
                {getFieldLabel("violation_tested_product", "Violation Tested Product")}
              </label>
              <select
                id="violationTestedProduct"
                value={formData.violationTestedProduct}
                onChange={(e) => handleInputChange("violationTestedProduct", e.target.value)}
              >
                <option value="">Select option</option>
                {dropdownOptions.violationTestedProduct.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="testedProduct">{getFieldLabel("tested_product", "Tested Product")}</label>
              <select
                id="testedProduct"
                value={formData.testedProduct}
                onChange={(e) => handleInputChange("testedProduct", e.target.value)}
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="na">N/A</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="merchantName">{getFieldLabel("merchant_name", "Merchant Name")}</label>
              <select
                id="merchantName"
                value={formData.merchantName}
                onChange={(e) => handleInputChange("merchantName", e.target.value)}
              >
                <option value="">Select option</option>
                {dropdownOptions.merchantName.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="logGenerated">{getFieldLabel("log_generated", "Log Generated Y/N")}</label>
              <select
                id="logGenerated"
                value={formData.logGenerated}
                onChange={(e) => handleInputChange("logGenerated", e.target.value)}
              >
                <option value="">Select option</option>
                {dropdownOptions.logGenerated.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Payment Test Form"}
          </button>
        </form>
      </div>
    </div>
  )
}

