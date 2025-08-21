"use client"

import { useState } from "react"
import { Search, User } from "lucide-react"
import Workstream01Form from "../component/AddWorkstream1"
import Workstream02Form from "../component/AddWorkstream2"
import { useNavigate, useLocation } from "react-router-dom"

const WorkstreamDashboard = () => {
  const [selectedWorkstream, setSelectedWorkstream] = useState(1)
  const [activeTab, setActiveTab] = useState("new-record")
  const [currentView, setCurrentView] = useState("dashboard")

  const navigate = useNavigate()
  const location = useLocation()

  const isWorkstream = location.pathname === "/dashboardview"
  const isNewRecord = location.pathname === "/new-record"

  const workstreamCards = [
    { id: 1, title: "Workstream 01", color: "#dbeafe", textColor: "#1e40af", iconBg: "#2563eb" },
    { id: 2, title: "Workstream 02", color: "#f3e8ff", textColor: "#7c3aed", iconBg: "#8b5cf6" },
    // { id: 3, title: "Workstream 03", color: "#e0e7ff", textColor: "#4338ca", iconBg: "#6366f1" },
    // { id: 4, title: "Workstream 04", color: "#dcfce7", textColor: "#166534", iconBg: "#16a34a" },
    // { id: 5, title: "Workstream 05", color: "#fed7aa", textColor: "#c2410c", iconBg: "#ea580c" },
  ]

  // Styles with viewport fixes but original layout
  const styles = {
    container: {
      height: "100vh", // Fixed height to prevent overflow
      backgroundColor: "#f9fafb",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden", // Prevent container overflow
    },
    header: {
      backgroundColor: "white",
      borderBottom: "1px solid #e5e7eb",
      padding: "16px 24px",
      flexShrink: 0, // Prevent header from shrinking
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
    logoText: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
    },
    nav: {
      display: "flex",
      gap: "4px",
    },
    navButton: {
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: "500",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    },
      navButtonActive: {
      backgroundColor: "#fff",
      color: "#0000FF",
    },
    navButtonInactive: {
      backgroundColor: "#eee",
      color: "#999",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    searchContainer: {
      position: "relative",
    },
    searchInput: {
      paddingLeft: "40px",
      paddingRight: "16px",
      paddingTop: "8px",
      paddingBottom: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      width: "256px",
      outline: "none",
      fontSize: "14px",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
    },
    userIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "#e5e7eb",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    main: {
      flex: 1, // Take remaining space
      overflow: "auto", // Allow scrolling only in main content
      padding: "24px",
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "24px",
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
    // Back to original horizontal grid layout
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "16px",
      maxWidth: "800px", // Limit width to prevent cards from stretching too much
    },
    card: {
      padding: "16px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s",
      position: "relative",
    },
    cardSelected: {
      boxShadow: "0 0 0 2px #3b82f6",
      transform: "scale(1.02)",
    },
    cardContent: {
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
    cardIconInner: {
      width: "24px",
      height: "24px",
      backgroundColor: "white",
      borderRadius: "4px",
      opacity: 0.8,
    },
    cardTitle: {
      fontSize: "14px",
      fontWeight: "500",
    },
    // Form wrapper with proper constraints
    formSection: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      border: "1px solid #e5e7eb",
      overflow: "hidden", // Prevent form from overflowing
    },
  }

  const renderWorkstreamForm = () => {
    switch (selectedWorkstream) {
      case 1:
        return <Workstream01Form />
      case 2:
        return <Workstream02Form />
      case 3:
        return (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#111827", marginBottom: "8px" }}>
              Workstream 03
            </h3>
            <p style={{ color: "#6b7280" }}>Content Management Review form coming soon...</p>
          </div>
        )
      case 4:
        return (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#111827", marginBottom: "8px" }}>
              Workstream 04
            </h3>
            <p style={{ color: "#6b7280" }}>Security Assessment form coming soon...</p>
          </div>
        )
      case 5:
        return (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#111827", marginBottom: "8px" }}>
              Workstream 05
            </h3>
            <p style={{ color: "#6b7280" }}>Performance & Analytics form coming soon...</p>
          </div>
        )
      default:
        return <Workstream01Form />
    }
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            {/* Logo */}
            <div style={styles.logo}>
              <img src="/gBitLogo.png" alt="Gbit Logo" style={styles.logoImage} />
            </div>
            {/* Navigation */}
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
          {/* Header Right */}
          <div style={styles.headerRight}>
            {/* <div style={styles.searchContainer}>
              <Search style={styles.searchIcon} size={16} />
              <input type="text" placeholder="Search..." style={styles.searchInput} />
            </div> */}
            <div style={styles.userIcon}>
              <User size={16} style={{ color: "#6b7280" }} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.title}>Add New Record</h1>

        {/* Choose Workstream Section - Original Layout */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Choose Workstream</h2>
          <div style={styles.cardGrid}>
            {workstreamCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedWorkstream(card.id)}
                style={{
                  ...styles.card,
                  backgroundColor: card.color,
                  color: card.textColor,
                  ...(selectedWorkstream === card.id ? styles.cardSelected : {}),
                }}
                onMouseEnter={(e) => {
                  if (selectedWorkstream !== card.id) {
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedWorkstream !== card.id) {
                    e.currentTarget.style.boxShadow = "none"
                  }
                }}
              >
                <div style={styles.cardContent}>
                  <div style={{ ...styles.cardIcon, backgroundColor: card.iconBg }}>
                    <div style={styles.cardIconInner}></div>
                  </div>
                  <span style={styles.cardTitle}>{card.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Form Based on Selected Workstream - Original Layout */}
        <div style={styles.formSection}>{renderWorkstreamForm()}</div>
      </main>
    </div>
  )
}

export default WorkstreamDashboard
