// "use client"
// import { useState, useEffect } from "react"
// import axios from "axios"
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

// const INPUT_TYPES = [
//   "text", "textarea", "number", "date", "email", "password",
//   "url", "color", "range", "checkbox", "radio", "select",
//   "file", "checkbox-group",
// ]

// const FormBuilder = ({ workstream }) => {
//   const [formSchema, setFormSchema] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     fetchFormSchema()
//   }, [workstream])

//   const fetchFormSchema = async () => {
//     setLoading(true)
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/${workstream}/field-config`
//       )
//       if (res.data.success) setFormSchema(res.data.data)
//       else setFormSchema([])
//     } catch (err) {
//       console.error("Error fetching form schema:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddField = (fieldType) => {
//     const newField = {
//       id: Date.now().toString(),
//       label: "New Field",
//       type: fieldType,
//       required: false,
//       options:
//         fieldType === "select" || fieldType === "radio" || fieldType === "checkbox-group"
//           ? ["Option 1"]
//           : [],
//     }
//     setFormSchema([...formSchema, newField])
//   }

//   const handleUpdateField = (id, key, value) => {
//     setFormSchema(
//       formSchema.map((field) => (field.id === id ? { ...field, [key]: value } : field))
//     )
//   }

//   const handleAddOption = (id) => {
//     setFormSchema(
//       formSchema.map((field) =>
//         field.id === id
//           ? { ...field, options: [...(field.options || []), `Option ${field.options.length + 1}`] }
//           : field
//       )
//     )
//   }

//   const handleOptionChange = (id, index, value) => {
//     setFormSchema(
//       formSchema.map((field) =>
//         field.id === id
//           ? {
//               ...field,
//               options: field.options.map((opt, i) => (i === index ? value : opt)),
//             }
//           : field
//       )
//     )
//   }

//   const handleDeleteField = (id) => {
//     setFormSchema(formSchema.filter((field) => field.id !== id))
//   }

//   const handleSave = async () => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/${workstream}/form-schema`,
//         { fields: formSchema }
//       )
//       if (res.data.success) alert("Form schema saved successfully!")
//       else alert("Failed to save schema")
//     } catch (err) {
//       console.error("Save error:", err)
//       alert("Error saving schema")
//     }
//   }

//   // ✅ Handle Drag & Drop
//   const onDragEnd = (result) => {
//     if (!result.destination) return
//     const items = Array.from(formSchema)
//     const [reorderedItem] = items.splice(result.source.index, 1)
//     items.splice(result.destination.index, 0, reorderedItem)
//     setFormSchema(items)
//   }

//   return (
//     <div>
//       <h3>Form Builder for {workstream.toUpperCase()}</h3>

//       {loading ? (
//         <p>Loading form schema...</p>
//       ) : (
//         <div>
//           {/* Buttons to add field types */}
//           <div style={{ marginBottom: "10px" }}>
//             {INPUT_TYPES.map((type) => (
//               <button
//                 key={type}
//                 onClick={() => handleAddField(type)}
//                 style={{
//                   marginRight: "8px",
//                   padding: "6px 12px",
//                   background: "#2563eb",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   marginBottom: "6px",
//                 }}
//               >
//                 + {type.charAt(0).toUpperCase() + type.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* ✅ DragDropContext wraps field list */}
//           <DragDropContext onDragEnd={onDragEnd}>
//             <Droppable droppableId="formFields">
//               {(provided) => (
//                 <ul
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   style={{ listStyle: "none", padding: 0 }}
//                 >
//                   {formSchema.map((f, index) => (
//                     <Draggable key={f.id} draggableId={f.id.toString()} index={index}>
//                       {(provided) => (
//                         <li
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={{
//                             marginBottom: "15px",
//                             padding: "10px",
//                             border: "1px solid #ccc",
//                             borderRadius: "6px",
//                             background: "#f9fafb",
//                             ...provided.draggableProps.style,
//                           }}
//                         >
//                           <input
//                             type="text"
//                             value={f.label}
//                             onChange={(e) =>
//                               handleUpdateField(f.id, "label", e.target.value)
//                             }
//                             placeholder="Field Label"
//                             style={{ marginRight: "10px", padding: "4px" }}
//                           />
//                           ({f.type})
//                           <label style={{ marginLeft: "10px" }}>
//                             <input
//                               type="checkbox"
//                               checked={f.required}
//                               onChange={(e) =>
//                                 handleUpdateField(f.id, "required", e.target.checked)
//                               }
//                             />{" "}
//                             Required
//                           </label>

//                           {/* Show options for select, radio, checkbox-group */}
//                           {(f.type === "select" ||
//                             f.type === "radio" ||
//                             f.type === "checkbox-group") && (
//                             <div style={{ marginLeft: "20px", marginTop: "5px" }}>
//                               <strong>Options:</strong>
//                               {f.options.map((opt, idx) => (
//                                 <div key={idx} style={{ marginTop: "5px" }}>
//                                   <input
//                                     type="text"
//                                     value={opt}
//                                     onChange={(e) =>
//                                       handleOptionChange(f.id, idx, e.target.value)
//                                     }
//                                     style={{ marginRight: "5px", padding: "3px" }}
//                                   />
//                                 </div>
//                               ))}
//                               <button
//                                 onClick={() => handleAddOption(f.id)}
//                                 style={{
//                                   marginTop: "5px",
//                                   padding: "4px 8px",
//                                   background: "#16a34a",
//                                   color: "#fff",
//                                   border: "none",
//                                   borderRadius: "4px",
//                                   cursor: "pointer",
//                                 }}
//                               >
//                                 + Add Option
//                               </button>
//                             </div>
//                           )}

//                           <button
//                             onClick={() => handleDeleteField(f.id)}
//                             style={{
//                               marginLeft: "10px",
//                               padding: "4px 8px",
//                               background: "red",
//                               color: "#fff",
//                               border: "none",
//                               borderRadius: "4px",
//                               cursor: "pointer",
//                             }}
//                           >
//                             Delete
//                           </button>
//                         </li>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </ul>
//               )}
//             </Droppable>
//           </DragDropContext>

//           {/* Save button */}
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <button
//               onClick={handleSave}
//               style={{
//                 marginTop: "20px",
//                 padding: "14px 24px",
//                 background: "#6d28d9",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//               }}
//             >
//               💾 Save Schema
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default FormBuilder




"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

const INPUT_TYPES = [
  "text", "textarea", "number", "date", "email", "password",
  "url", "range", "checkbox", "radio", "select",
  "file", "checkbox-group",
]

const FormBuilder = ({ workstream }) => {
  const [formSchema, setFormSchema] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFormSchema()
  }, [workstream])

  const fetchFormSchema = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/${workstream}/field-config`
      )
      if (res.data.success) setFormSchema(res.data.data)
      else setFormSchema([])
    } catch (err) {
      console.error("Error fetching form schema:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddField = (fieldType) => {
    const newField = {
      id: Date.now().toString(),
      label: "New Field",
      type: fieldType,
      required: false,
      options:
        fieldType === "select" || fieldType === "radio" || fieldType === "checkbox-group"
          ? ["Option 1"]
          : [],
    }
    setFormSchema([...formSchema, newField])
  }

  const handleUpdateField = (id, key, value) => {
    setFormSchema(
      formSchema.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    )
  }

  const handleAddOption = (id) => {
    setFormSchema(
      formSchema.map((field) =>
        field.id === id
          ? { ...field, options: [...(field.options || []), `Option ${field.options.length + 1}`] }
          : field
      )
    )
  }

  const handleOptionChange = (id, index, value) => {
    setFormSchema(
      formSchema.map((field) =>
        field.id === id
          ? {
              ...field,
              options: field.options.map((opt, i) => (i === index ? value : opt)),
            }
          : field
      )
    )
  }

  const handleDeleteField = (id) => {
    setFormSchema(formSchema.filter((field) => field.id !== id))
  }

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/${workstream}/form-schema`,
        { fields: formSchema }
      )
      if (res.data.success) alert("Form schema saved successfully!")
      else alert("Failed to save schema")
    } catch (err) {
      console.error("Save error:", err)
      alert("Error saving schema")
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(formSchema)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setFormSchema(items)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "20px", color: "#1f2937" }}>
        Form Builder for {workstream.toUpperCase()}
      </h2>

      {loading ? (
        <p>Loading form schema...</p>
      ) : (
        <div>
          {/* Buttons */}
          <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {INPUT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleAddField(type)}
                style={{
                  padding: "8px 14px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                + {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Fields */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="formFields">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {formSchema.map((f, index) => (
                    <Draggable key={f.id} draggableId={f.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            marginBottom: "15px",
                            padding: "16px",
                            border: "1px solid #e5e7eb",
                            borderRadius: "10px",
                            background: "#ffffff",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <input
                              type="text"
                              value={f.label}
                              onChange={(e) =>
                                handleUpdateField(f.id, "label", e.target.value)
                              }
                              placeholder="Field Label"
                              style={{
                                flex: "1",
                                padding: "8px 10px",
                                borderRadius: "6px",
                                border: "1px solid #d1d5db",
                                fontSize: "14px",
                              }}
                            />
                            <span style={{ color: "#6b7280", fontSize: "14px" }}>({f.type})</span>
                            <label style={{ fontSize: "14px", color: "#374151" }}>
                              <input
                                type="checkbox"
                                checked={f.required}
                                onChange={(e) =>
                                  handleUpdateField(f.id, "required", e.target.checked)
                                }
                                style={{ marginRight: "6px" }}
                              />
                              Required
                            </label>
                            <button
                              onClick={() => handleDeleteField(f.id)}
                              style={{
                                padding: "6px 12px",
                                background: "#ef4444",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "13px",
                              }}
                            >
                              Delete
                            </button>
                          </div>

                          {/* Options */}
                          {(f.type === "select" ||
                            f.type === "radio" ||
                            f.type === "checkbox-group") && (
                            <div style={{ marginTop: "12px" }}>
                              <p style={{ fontWeight: "500", fontSize: "14px", color: "#374151" }}>
                                Options:
                              </p>
                              {f.options.map((opt, idx) => (
                                <input
                                  key={idx}
                                  type="text"
                                  value={opt}
                                  onChange={(e) =>
                                    handleOptionChange(f.id, idx, e.target.value)
                                  }
                                  style={{
                                    display: "block",
                                    marginTop: "6px",
                                    padding: "6px 8px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    width: "50%",
                                  }}
                                />
                              ))}
                              <button
                                onClick={() => handleAddOption(f.id)}
                                style={{
                                  marginTop: "10px",
                                  padding: "6px 12px",
                                  background: "#10b981",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                }}
                              >
                                + Add Option
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* Save */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleSave}
              style={{
                marginTop: "24px",
                padding: "14px 28px",
                background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              💾 Save Schema
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormBuilder
