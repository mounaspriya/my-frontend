"use client"
import { useState, useEffect } from "react"
import { User, Monitor, Edit } from "lucide-react"
import WorkstreamDetail1 from "./WorkstreamDetail1"
import WorkstreamDetail2 from "./WorkstreamDetail2"
import DynamicWorkstreamDetail from "./DynamicWorkstreamDetail" // New import
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios" // Import axios for fetching workstream list

// Same styles as before...
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    width: "100vw",
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
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    width: "16px",
    height: "16px",
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: "44px",
    paddingRight: "12px",
    padding: "10px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    width: "280px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#f9fafb",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
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
    maxWidth: "1280px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    maxWidth: "400px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "box-shadow 0.2s",
  },
  cardContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  cardIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  },
  cardTitle: {
    fontWeight: "500",
    fontSize: "14px",
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
  navButtonActive: {
    backgroundColor: "#fff",
    color: "#0000FF",
  },
  navButtonInactive: {
    backgroundColor: "#eee",
    color: "#999",
  },
}
// Color variants for cards
const cardVariants = {
  blue: { backgroundColor: "#dbeafe", color: "#1d4ed8" },
  purple: { backgroundColor: "#e9d5ff", color: "#7c3aed" },
  green: { backgroundColor: "#dcfce7", color: "#16a34a" },
}
// Color variants for badges
const badgeVariants = {
  green: { backgroundColor: "#dcfce7", color: "#16a34a" },
  yellow: { backgroundColor: "#fef3c7", color: "#d97706" },
  red: { backgroundColor: "#fee2e2", color: "#dc2626" },
  gray: { backgroundColor: "#f3f4f6", color: "#374151" },
}

// Helper to get a consistent color for dynamic workstreams
const getWorkstreamColor = (index) => {
  const colors = [
    { bg: "#dbeafe", icon: "#3b82f6" }, // blue
    { bg: "#e9d5ff", icon: "#8b5cf6" }, // purple
    { bg: "#dcfce7", icon: "#16a34a" }, // green
    { bg: "#ffe4e6", icon: "#ef4444" }, // red-ish
    { bg: "#e0f2fe", icon: "#0ea5e9" }, // light blue
    { bg: "#f0fdf4", icon: "#22c55e" }, // light green
  ]
  return colors[index % colors.length]
}

export default function DashboardView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentRecordsData, setRecentRecordsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentView, setCurrentView] = useState("dashboard")
  const [dynamicWorkstreamCards, setDynamicWorkstreamCards] = useState([]) // New state for dynamic cards

  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const isWorkstream = currentPath === "/dashboardview"
  const isNewRecord = currentPath === "/new-record"

  // Fetch dynamic workstreams for cards
  useEffect(() => {
    const fetchDynamicWorkstreams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/open/workstream-list", {
          withCredentials: true,
        })
        if (res.data.success) {
          // Map fetched workstreams to card format
          const mappedCards = res.data.data.map((ws, index) => {
            const colors = getWorkstreamColor(index)
            return {
              id: ws.id,
              title: ws.name,
              variant:
                Object.keys(cardVariants).find((key) => cardVariants[key].backgroundColor === colors.bg) || "blue", // Find matching variant or default
              iconColor: colors.icon,
            }
          })
          setDynamicWorkstreamCards(mappedCards)
        }
      } catch (error) {
        console.error("Error fetching dynamic workstreams for cards:", error)
      }
    }
    fetchDynamicWorkstreams()
  }, []) // Empty dependency array to run once on mount

  // Fetch recent records data (for the table at the bottom)
  useEffect(() => {
    const fetchRecentRecords = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/open/workstream`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        let workstreams = []
        if (Array.isArray(data)) {
          workstreams = data
        } else if (data && Array.isArray(data.data)) {
          workstreams = data.data
        } else if (data && Array.isArray(data.workstreams)) {
          workstreams = data.workstreams
        } else if (data && typeof data === "object") {
          workstreams = [data]
        } else {
          throw new Error("Invalid data format received from API")
        }
        const transformedData = workstreams.map((item) => ({
          id: item.id,
          reviewsBy: item.owner_name || "Unknown",
          websiteUrl: item.website_url || "N/A",
          accessibility: item.accessibility
            ? item.accessibility.toLowerCase() === "yes"
              ? "Yes"
              : item.accessibility.toLowerCase() === "no"
                ? "No"
                : "N/A"
            : "N/A",
          reviewDate: item.review_date ? new Date(item.review_date).toLocaleDateString() : "N/A",
          addedIn: item.review_month && item.review_year ? `${item.review_month} ${item.review_year}` : "N/A",
          status:
            item.review_status === "completed"
              ? "Complete"
              : item.review_status === "not-completed"
                ? "Not Completed"
                : "Unknown",
          websiteType: item.website_type || "N/A",
          comments: item.comments || "N/A",
          websiteOperator: item.website_operator || "N/A",
          reviewTraffic: item.review_traffic || "N/A",
          conditionalResponse: item.conditional_response,
          thirdPartyContent: item.third_party_content || "N/A",
          images: item.images || [],
          createdAt: item.created_at,
          calculatedFriday: item.calculated_friday,
        }))
        setRecentRecordsData(transformedData)
        setError(null)
      } catch (err) {
        console.error("Error fetching workstreams:", err)
        setError(`Failed to load workstream data: ${err.message}`)
        setRecentRecordsData([])
      } finally {
        setLoading(false)
      }
    }
    fetchRecentRecords()
  }, [])

  const getAccessibilityBadge = (level) => {
    const badgeStyle = { ...styles.badge }
    switch (level) {
      case "Yes":
        return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Yes</span>
      case "No":
        return <span style={{ ...badgeStyle, ...badgeVariants.yellow }}>No</span>
      case "N/A":
        return <span style={{ ...badgeStyle, ...badgeVariants.red }}>N/A</span>
      default:
        return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{level}</span>
    }
  }

  const getStatusBadge = (status) => {
    const badgeStyle = { ...styles.badge }
    switch (status) {
      case "Complete":
        return <span style={{ ...badgeStyle, ...badgeVariants.green }}>Complete</span>
      case "Not Completed":
        return <span style={{ ...badgeStyle, ...badgeVariants.red }}>Not Complete</span>
      default:
        return <span style={{ ...badgeStyle, ...badgeVariants.gray }}>{status}</span>
    }
  }

  const renderWorkstreamDetail = () => {
    // Find the selected workstream from the dynamic list
    const selectedWs = dynamicWorkstreamCards.find((card) => card.id === currentView)

    if (currentView === "workstream1") {
      return <WorkstreamDetail1 onBack={() => setCurrentView("dashboard")} />
    } else if (currentView === "workstream2") {
      return <WorkstreamDetail2 onBack={() => setCurrentView("dashboard")} />
    } else if (selectedWs) {
      // For any other dynamic workstream, use the generic DynamicWorkstreamDetail
      return (
        <DynamicWorkstreamDetail
          workstreamId={selectedWs.id}
          workstreamName={selectedWs.title}
          onBack={() => setCurrentView("dashboard")}
        />
      )
    }
    return null
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>
              <img src="/gBitLogo.png" alt="Gbit Logo" style={styles.logoImage} />
            </div>
            <nav style={styles.nav}>
              <button
                style={{
                  ...styles.navButton,
                  ...(isWorkstream ? styles.navButtonActive : styles.navButtonInactive),
                }}
                onClick={() => navigate("/dashboardview")}
              >
                WORKSTREAM
              </button>
              <button
                style={{
                  ...styles.navButton,
                  ...(isNewRecord ? styles.navButtonActive : styles.navButtonInactive),
                }}
                onClick={() => navigate("/new-record")}
              >
                NEW RECORD
              </button>
            </nav>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.searchContainer}>
              <input
                style={styles.searchInput}
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "white"
                  e.target.style.borderColor = "#3b82f6"
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "#f9fafb"
                  e.target.style.borderColor = "#e5e7eb"
                  e.target.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                }}
              />
            </div>
            <div style={styles.avatar}>
              <User size={16} />
            </div>
          </div>
        </div>
      </header>
      {currentView === "dashboard" && (
        <main style={styles.main}>
          {/* Quick Access Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Quick Access</h2>
            <div style={styles.grid}>
              {dynamicWorkstreamCards.map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.card,
                    ...cardVariants[item.variant],
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
                  }}
                  onClick={() => {
                    setCurrentView(item.id) // Use item.id directly for currentView
                  }}
                >
                  <div style={styles.cardContent}>
                    <div
                      style={{
                        ...styles.cardIcon,
                        backgroundColor: item.iconColor,
                      }}
                    >
                      <Monitor size={24} color="white" />
                    </div>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Recent Records Section */}
          <section>
            <h2 style={styles.sectionTitle}>Recent Records</h2>
            <div style={styles.table}>
              {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading workstream data...</div>
              ) : error ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>
              ) : (
                <table style={{ width: "100%" }}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Reviews By</th>
                      <th style={styles.tableHeaderCell}>Website Url</th>
                      <th style={styles.tableHeaderCell}>Accessibility</th>
                      <th style={styles.tableHeaderCell}>Review Date</th>
                      <th style={styles.tableHeaderCell}>Added In</th>
                      <th style={styles.tableHeaderCell}>Status</th>
                      <th style={styles.tableHeaderCell}>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRecordsData.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280" }}>
                          No workstream data available
                        </td>
                      </tr>
                    ) : (
                      recentRecordsData.map((record) => (
                        <tr key={record.id} style={styles.tableRow}>
                          <td style={{ ...styles.tableCell, fontWeight: "500" }}>{record.reviewsBy}</td>
                          <td style={{ ...styles.tableCell, color: "#2563eb" }}>
                            {record.websiteUrl.length > 30
                              ? `${record.websiteUrl.substring(0, 30)}...`
                              : record.websiteUrl}
                          </td>
                          <td style={styles.tableCell}>{getAccessibilityBadge(record.accessibility)}</td>
                          <td style={styles.tableCell}>{record.reviewDate}</td>
                          <td style={styles.tableCell}>{record.addedIn}</td>
                          <td style={styles.tableCell}>{getStatusBadge(record.status)}</td>
                          <td style={styles.tableCell}>
                            <button style={{ ...styles.button, width: "32px", height: "32px" }}>
                              <Edit size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      )}
      {/* Render specific workstream detail components */}
      {currentView !== "dashboard" && renderWorkstreamDetail()}
    </div>
  )
}
