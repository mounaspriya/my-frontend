// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Form1 = () => {
//   const [workstreams, setWorkstreams] = useState([]);
//   const [selectedWorkstream, setSelectedWorkstream] = useState("");
//   const [form, setForm] = useState({
//     url: "",
//     accessibility: "Yes",
//     thirdParty: "Yes",
//     websiteType: "",
//     thirdPartySite: "",
//     operator: "",
//     owner: "",
//     reviewDate: "",
//     reviewTraffic: "",
//     comments: Array.from({ length: 19 }, (_, i) => ({ label: `A${i + 1}`, value: "" })),
//   });
//   const [showComments, setShowComments] = useState(true);
//   const [images, setImages] = useState([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     axios
//       .get("/api/forms/workstreams", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setWorkstreams(res.data))
//       .catch((err) => console.error(err));
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCommentChange = (index, value) => {
//     const newComments = [...form.comments];
//     newComments[index].value = value;
//     setForm((prev) => ({ ...prev, comments: newComments }));
//   };

//   const handleThirdPartyChange = (value) => {
//     setForm((prev) => ({ ...prev, thirdParty: value }));
//     setShowComments(value === "Yes");
//   };

//   const handleFileChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "/api/forms/submit",
//         {
//           ...form,
//           workstreamId: selectedWorkstream,
//           comments: showComments ? form.comments : [],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const submissionId = res.data.vid;

//       if (showComments && images.length) {
//         const formData = new FormData();
//         formData.append("submissionId", submissionId);
//         images.forEach((img) => formData.append("images", img));

//         await axios.post("/api/upload", formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       }

//       alert("Form submitted successfully.");
//     } catch (err) {
//       console.error(err);
//       alert("Form submission failed.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: "0 auto" }}>
//       <h2>Workstream Submission Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Workstream</label>
//           <select
//             value={selectedWorkstream}
//             onChange={(e) => setSelectedWorkstream(e.target.value)}
//             required
//           >
//             <option value="">-- Select --</option>
//             {workstreams.map((ws) => (
//               <option key={ws.id} value={ws.id}>
//                 {ws.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Website URL</label>
//           <input name="url" value={form.url} onChange={handleChange} required />
//         </div>

//         <div>
//           <label>Accessibility</label>
//           <select name="accessibility" value={form.accessibility} onChange={handleChange}>
//             <option>Yes</option>
//             <option>No</option>
//             <option>NA</option>
//           </select>
//         </div>

//         <div>
//           <label>Third-party content?</label>
//           <select
//             name="thirdParty"
//             value={form.thirdParty}
//             onChange={(e) => handleThirdPartyChange(e.target.value)}
//           >
//             <option>Yes</option>
//             <option>No</option>
//             <option>NA</option>
//           </select>
//         </div>

//         <div>
//           <label>Type of Website</label>
//           <input name="websiteType" value={form.websiteType} onChange={handleChange} />
//         </div>

//         {form.thirdParty === "Yes" && (
//           <div>
//             <label>Third-party site name</label>
//             <input
//               name="thirdPartySite"
//               value={form.thirdPartySite}
//               onChange={handleChange}
//             />
//           </div>
//         )}

//         <div>
//           <label>Website Operator</label>
//           <input name="operator" value={form.operator} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Owner Name</label>
//           <input name="owner" value={form.owner} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Review Date</label>
//           <input type="date" name="reviewDate" value={form.reviewDate} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Review Date Traffic</label>
//           <input name="reviewTraffic" value={form.reviewTraffic} onChange={handleChange} />
//         </div>

//         {showComments && (
//           <>
//             <h4>Comments A1–A19</h4>
//             {form.comments.map((comment, index) => (
//               <div key={index}>
//                 <label>{comment.label}</label>
//                 <input
//                   type="text"
//                   value={comment.value}
//                   onChange={(e) => handleCommentChange(index, e.target.value)}
//                 />
//               </div>
//             ))}

//             <div>
//               <label>Upload Images</label>
//               <input type="file" multiple onChange={handleFileChange} />
//             </div>
//           </>
//         )}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Form1;


// import React, { useState } from "react";
// import axios from "axios";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     age: "",
//     city: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/submit-form", formData);
//       alert("Form submitted successfully!");
//       setFormData({ name: "", email: "", phone: "", age: "", city: "" });
//     } catch (error) {
//       alert("Error submitting form!");
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
//       <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//       <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//       <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
//       <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
//       <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Form;

// import React, { useState } from "react";
// import axios from "axios";

// const WorkstreamForm = () => {
//   const [formData, setFormData] = useState({
//     accessibility: "",
//     third_party_content: "",
//     conditional_response: "",
//     website_type: "",
//     registration_site: "",
//     comments: "",
//     website_operator: "",
//     owner_name: "",
//     review_date: "",
//     review_traffic: "",
//     images: [],
//   });

//   const [aChecks, setAChecks] = useState(
//     Array.from({ length: 19 }, () => ({ checked: false, comment: "" }))
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       images: [...e.target.files],
//     }));
//   };

//   const handleACheckChange = (index, type, value) => {
//     setAChecks(prev => {
//       const updated = [...prev];
//       updated[index][type] = value;
//       return updated;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSubmit = {
//       ...formData,
//       aChecks,
//     };
//     try {
//       await axios.post("http://localhost:5000/submit-workstream", dataToSubmit);
//       alert("Submitted successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Submission failed.");
//     }
//   };

//   // Determine how many A-checks to show based on third_party_content value
//   const getACheckLimit = () => {
//     const value = formData.third_party_content;
//     if (value === "Yes (Will answer all the questions)") return 19;
//     if (value === "No (Will skip questions from Column U to Column AI)") return 15;
//     return 0; // NA or default
//   };

//   const aCheckLimit = getACheckLimit();

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Accessibility:</label>
//         {["Yes", "No", "NA"].map(val => (
//           <label key={val}>
//             <input
//               type="radio"
//               name="accessibility"
//               value={val}
//               checked={formData.accessibility === val}
//               onChange={handleChange}
//             />{" "}
//             {val}
//           </label>
//         ))}
//       </div>

//       <div>
//         <label>Third-party content:</label>
//         <select
//           name="third_party_content"
//           value={formData.third_party_content}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select</option>
//           <option value="Yes (Will answer all the questions)">
//             Yes (Will answer all the questions)
//           </option>
//           <option value="No (Will skip questions from Column U to Column AI)">
//             No (Will skip questions from Column U to Column AI)
//           </option>
//           <option value="NA (Will Stop at Column T)">
//             NA (Will Stop at Column T)
//           </option>
//         </select>
//       </div>

//       {formData.third_party_content && (
//         <input
//           name="conditional_response"
//           placeholder="Conditional Response"
//           value={formData.conditional_response}
//           onChange={handleChange}
//         />
//       )}

//       <input
//         name="website_type"
//         placeholder="Type of Website"
//         value={formData.website_type}
//         onChange={handleChange}
//       />
//       <input
//         name="registration_site"
//         placeholder="If 3rd Party Site, Mention Site"
//         value={formData.registration_site}
//         onChange={handleChange}
//       />
//       <input
//         name="comments"
//         placeholder="Comments"
//         value={formData.comments}
//         onChange={handleChange}
//       />
//       <input
//         name="website_operator"
//         placeholder="Website Operator (on URL)"
//         value={formData.website_operator}
//         onChange={handleChange}
//       />
//       <input
//         name="owner_name"
//         placeholder="Owner Name"
//         value={formData.owner_name}
//         onChange={handleChange}
//       />
//       <input
//         type="date"
//         name="review_date"
//         value={formData.review_date}
//         onChange={handleChange}
//       />
//       <input
//         name="review_traffic"
//         placeholder="Review Date Traffic"
//         value={formData.review_traffic}
//         onChange={handleChange}
//       />

//       {aCheckLimit > 0 && (
//         <>
//           <h4>A1 - A{aCheckLimit} Section</h4>
//           {aChecks.slice(0, aCheckLimit).map((item, index) => (
//             <div key={index}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={item.checked}
//                   onChange={(e) =>
//                     handleACheckChange(index, "checked", e.target.checked)
//                   }
//                 />
//                 A{index + 1}
//               </label>
//               <input
//                 type="text"
//                 placeholder={`A${index + 1} Comment`}
//                 value={item.comment}
//                 onChange={(e) =>
//                   handleACheckChange(index, "comment", e.target.value)
//                 }
//               />
//             </div>
//           ))}
//         </>
//       )}

//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         onChange={handleImageUpload}
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default WorkstreamForm;



// import React, { useState } from "react";
// import axios from "axios";

// const WorkstreamForm = () => {
//   const [formData, setFormData] = useState({
//     accessibility: "",
//     third_party_content: "",
//     conditional_response: "",
//     website_type: "",
//     registration_site: "",
//     comments: "",
//     website_operator: "",
//     owner_name: "",
//     review_date: "",
//     review_traffic: "",
//     images: [],
//   });

//   const [aChecks, setAChecks] = useState(
//     Array.from({ length: 19 }, () => ({ checked: false, comment: "" }))
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: [...e.target.files],
//     }));
//   };

//   const handleACheckChange = (index, type, value) => {
//     setAChecks((prev) => {
//       const updated = [...prev];
//       updated[index][type] = value;
//       return updated;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSubmit = {
//       ...formData,
//       aChecks,
//     };
//     try {
//       await axios.post("http://localhost:5000/submit-workstream", dataToSubmit);
//       alert("Submitted successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Submission failed.");
//     }
//   };

//   const getACheckLimit = () => {
//     const value = formData.third_party_content;
//     if (value === "Yes (Will answer all the questions)") return 19;
//     if (value === "No (Will skip questions from Column U to Column AI)") return 15;
//     return 0;
//   };

//   const aCheckLimit = getACheckLimit();

//   return (
//     <div style={containerStyle}>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <h2 style={titleStyle}>Workstream Submission Form</h2>

//         <div style={sectionStyle}>
//           <label style={labelStyle}>Accessibility:</label>
//           <div style={radioGroupStyle}>
//             {["Yes", "No", "NA"].map((val) => (
//               <label key={val} style={radioLabelStyle}>
//                 <input
//                   type="radio"
//                   name="accessibility"
//                   value={val}
//                   checked={formData.accessibility === val}
//                   onChange={handleChange}
//                 />{" "}
//                 {val}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div style={sectionStyle}>
//           <label style={labelStyle}>Third-party content:</label>
//           <select
//             name="third_party_content"
//             value={formData.third_party_content}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           >
//             <option value="">Select</option>
//             <option value="Yes (Will answer all the questions)">
//               Yes (Will answer all the questions)
//             </option>
//             <option value="No (Will skip questions from Column U to Column AI)">
//               No (Will skip questions from Column U to Column AI)
//             </option>
//             <option value="NA (Will Stop at Column T)">NA (Will Stop at Column T)</option>
//           </select>
//         </div>

//         {formData.third_party_content && (
//           <input
//             name="conditional_response"
//             placeholder="Conditional Response"
//             value={formData.conditional_response}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         )}

//         {[
//           "website_type",
//           "registration_site",
//           "comments",
//           "website_operator",
//           "owner_name",
//           "review_traffic",
//         ].map((field) => (
//           <input
//             key={field}
//             name={field}
//             placeholder={field
//               .replace(/_/g, " ")
//               .replace(/\b\w/g, (l) => l.toUpperCase())}
//             value={formData[field]}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         ))}

//         <input
//           type="date"
//           name="review_date"
//           value={formData.review_date}
//           onChange={handleChange}
//           style={inputStyle}
//         />

//         {aCheckLimit > 0 && (
//           <div style={{ marginTop: "20px" }}>
//             <h4 style={{ marginBottom: "10px" }}>A1 - A{aCheckLimit} Section</h4>
//             {aChecks.slice(0, aCheckLimit).map((item, index) => (
//               <div key={index} style={aCheckItemStyle}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={item.checked}
//                     onChange={(e) =>
//                       handleACheckChange(index, "checked", e.target.checked)
//                     }
//                   />
//                   {" A" + (index + 1)}
//                 </label>
//                 <input
//                   type="text"
//                   placeholder={`A${index + 1} Comment`}
//                   value={item.comment}
//                   onChange={(e) =>
//                     handleACheckChange(index, "comment", e.target.value)
//                   }
//                   style={inputStyle}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={sectionStyle}>
//           <label style={labelStyle}>Upload Images:</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={inputStyle}
//           />
//         </div>

//         <button type="submit" style={buttonStyle}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// // 🔽 Inline CSS Styles
// // const containerStyle = {
// //   height: "100vh",
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   backgroundColor: "#f0f2f5", // optional background for contrast
// // };
// const containerStyle = {
//   minHeight: "100vh",
//     width: '100vw',// Use minHeight instead of fixed height
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "#f0f2f5",
//   padding: "40px 20px",             // Add padding for small screens
//   boxSizing: "border-box",
// };

// const formStyle = {
//   maxWidth: "600px",
//   width: "100%",
//   padding: "30px",
//   borderRadius: "12px",
//   background: "#ffffff",
//   boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//   fontFamily: "sans-serif",
//   // Removed margin: "30px auto"
// };

// const titleStyle = {
//   textAlign: "center",
//   marginBottom: "25px",
//   fontSize: "24px",
//   color: "#333",
// };

// const sectionStyle = {
//   marginBottom: "20px",
// };

// const labelStyle = {
//   fontWeight: "bold",
//   display: "block",
//   marginBottom: "6px",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "14px",
//   marginBottom: "15px",
//   boxSizing: "border-box",
// };

// const radioGroupStyle = {
//   display: "flex",
//   gap: "10px",
// };

// const radioLabelStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "5px",
// };

// const aCheckItemStyle = {
//   marginBottom: "15px",
// };

// const buttonStyle = {
//   backgroundColor: "#007BFF",
//   color: "#fff",
//   border: "none",
//   padding: "12px 20px",
//   borderRadius: "8px",
//   fontSize: "16px",
//   cursor: "pointer",
//   display: "block",
//   width: "100%",
// };

// export default WorkstreamForm;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const WorkstreamForm = () => {
//   const [formData, setFormData] = useState({
//     accessibility: "",
//     third_party_content: "",
//     conditional_response: "",
//     website_type: "",
//     registration_site: "",
//     comments: "",
//     website_operator: "",
//     owner_name: "",
//     review_date: "",
//     review_traffic: "",
//     images: [],
//     website_source_id: "",
//   });

//   const [aChecks, setAChecks] = useState(
//     Array.from({ length: 19 }, () => ({ checked: false, comment: "" }))
//   );

//   const [websiteOptions, setWebsiteOptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch website suggestions
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/website-sources?search=${searchTerm}`
//         );
//         setWebsiteOptions(response.data);
//       } catch (error) {
//         console.error("Failed to fetch website suggestions:", error);
//       }
//     };

//     if (searchTerm.length > 0) {
//       fetchSuggestions();
//     } else {
//       setWebsiteOptions([]);
//     }
//   }, [searchTerm]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: [...e.target.files],
//     }));
//   };

//   const handleACheckChange = (index, type, value) => {
//     setAChecks((prev) => {
//       const updated = [...prev];
//       updated[index][type] = value;
//       return updated;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSubmit = {
//       ...formData,
//       aChecks,
//     };
//     try {
//       await axios.post("http://localhost:5000/submit-workstream", dataToSubmit);
//       alert("Submitted successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Submission failed.");
//     }
//   };

//   const getACheckLimit = () => {
//     const value = formData.third_party_content;
//     if (value === "Yes (Will answer all the questions)") return 19;
//     if (value === "No (Will skip questions from Column U to Column AI)") return 15;
//     return 0;
//   };

//   const aCheckLimit = getACheckLimit();

//   return (
//     <div style={containerStyle}>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <h2 style={titleStyle}>Workstream Submission Form</h2>

//         <div style={sectionStyle}>
//           <label style={labelStyle}>Website URL Sheet Given by Client:</label>
//           <input
//             type="text"
//             placeholder="Start typing..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={inputStyle}
//           />
//           {websiteOptions.length > 0 && (
//             <ul style={{ ...inputStyle, maxHeight: "150px", overflowY: "auto" }}>
//               {websiteOptions.map((option) => (
//                 <li
//                   key={option.id}
//                   onClick={() => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       website_source_id: option.id,
//                     }));
//                     setSearchTerm(option.url); // set the URL as the visible value
//                     setWebsiteOptions([]); // hide suggestions
//                   }}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                     borderBottom: "1px solid #ddd",
//                   }}
//                 >
//                   {option.url} ({option.type})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Other form fields */}
//         <div style={sectionStyle}>
//           <label style={labelStyle}>Accessibility:</label>
//           <div style={radioGroupStyle}>
//             {["Yes", "No", "NA"].map((val) => (
//               <label key={val} style={radioLabelStyle}>
//                 <input
//                   type="radio"
//                   name="accessibility"
//                   value={val}
//                   checked={formData.accessibility === val}
//                   onChange={handleChange}
//                 />
//                 {val}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div style={sectionStyle}>
//           <label style={labelStyle}>Third-party content:</label>
//           <select
//             name="third_party_content"
//             value={formData.third_party_content}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           >
//             <option value="">Select</option>
//             <option value="Yes (Will answer all the questions)">
//               Yes (Will answer all the questions)
//             </option>
//             <option value="No (Will skip questions from Column U to Column AI)">
//               No (Will skip questions from Column U to Column AI)
//             </option>
//             <option value="NA (Will Stop at Column T)">
//               NA (Will Stop at Column T)
//             </option>
//           </select>
//         </div>

//         {formData.third_party_content && (
//           <input
//             name="conditional_response"
//             placeholder="Conditional Response"
//             value={formData.conditional_response}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         )}

//         {[
//           "website_type",
//           "registration_site",
//           "comments",
//           "website_operator",
//           "owner_name",
//           "review_traffic",
//         ].map((field) => (
//           <input
//             key={field}
//             name={field}
//             placeholder={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//             value={formData[field]}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         ))}

//         <input
//           type="date"
//           name="review_date"
//           value={formData.review_date}
//           onChange={handleChange}
//           style={inputStyle}
//         />

//         {aCheckLimit > 0 && (
//           <div style={{ marginTop: "20px" }}>
//             <h4 style={{ marginBottom: "10px" }}>A1 - A{aCheckLimit} Section</h4>
//             {aChecks.slice(0, aCheckLimit).map((item, index) => (
//               <div key={index} style={aCheckItemStyle}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={item.checked}
//                     onChange={(e) =>
//                       handleACheckChange(index, "checked", e.target.checked)
//                     }
//                   />
//                   {" A" + (index + 1)}
//                 </label>
//                 <input
//                   type="text"
//                   placeholder={`A${index + 1} Comment`}
//                   value={item.comment}
//                   onChange={(e) =>
//                     handleACheckChange(index, "comment", e.target.value)
//                   }
//                   style={inputStyle}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={sectionStyle}>
//           <label style={labelStyle}>Upload Images:</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={inputStyle}
//           />
//         </div>

//         <button type="submit" style={buttonStyle}>Submit</button>
//       </form>
//     </div>
//   );
// };

// // 🔽 Inline Styles
// const containerStyle = {
//   minHeight: "100vh",
//   width: "100vw",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "#f0f2f5",
//   padding: "40px 20px",
//   boxSizing: "border-box",
// };

// const formStyle = {
//   maxWidth: "600px",
//   width: "100%",
//   padding: "30px",
//   borderRadius: "12px",
//   background: "#ffffff",
//   boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//   fontFamily: "sans-serif",
// };

// const titleStyle = {
//   textAlign: "center",
//   marginBottom: "25px",
//   fontSize: "24px",
//   color: "#333",
// };

// const sectionStyle = {
//   marginBottom: "20px",
// };

// const labelStyle = {
//   fontWeight: "bold",
//   display: "block",
//   marginBottom: "6px",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "14px",
//   marginBottom: "15px",
//   boxSizing: "border-box",
// };

// const radioGroupStyle = {
//   display: "flex",
//   gap: "10px",
// };

// const radioLabelStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "5px",
// };

// const aCheckItemStyle = {
//   marginBottom: "15px",
// };

// const buttonStyle = {
//   backgroundColor: "#007BFF",
//   color: "#fff",
//   border: "none",
//   padding: "12px 20px",
//   borderRadius: "8px",
//   fontSize: "16px",
//   cursor: "pointer",
//   display: "block",
//   width: "100%",
// };

// export default WorkstreamForm;
