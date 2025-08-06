"use client"

import { useState } from "react"
import { Search, User, Filter, Download, Share, Plus, ArrowLeft, Settings } from "lucide-react"

// Same styles as WorkstreamDetail1
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
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
  navButtonActive: {
    color: "#2563eb",
  },
  navButtonInactive: {
    color: "#6b7280",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  searchContainer: {
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    width: "16px",
    height: "16px",
  },
  searchInput: {
    paddingLeft: "40px",
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    width: "256px",
    fontSize: "14px",
    outline: "none",
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
    maxWidth: "1400px",
    margin: "0 auto",
  },
  backButton: {
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
  },
  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#111827",
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#374151",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "1px solid #3b82f6",
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
    borderBottom: "1px solid #e5e7eb",
  },
  tableCell: {
    padding: "16px 24px",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
}

export default function WorkstreamDetail4({ onBack }) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div style={styles.container}>
      {/* Header */}
   

      {/* Main Content */}
      <main style={styles.main}>
        <button style={styles.backButton} onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Workstream 04</h1>
          <div style={styles.actionButtons}>
            <button style={styles.actionButton}>
              <Filter size={16} />
              Filter
            </button>
            <button style={styles.actionButton}>
              <Settings size={16} />
              Manage Columns
            </button>
            <button style={styles.actionButton}>
              <Download size={16} />
              Export (0)
            </button>
            <button style={styles.actionButton}>
              <Share size={16} />
              Share
            </button>
            <button style={{ ...styles.actionButton, ...styles.primaryButton }}>
              <Plus size={16} />
              Add New
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div style={styles.table}>
          <table style={{ width: "100%" }}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>ID</th>
                <th style={styles.tableHeaderCell}>Owner Name</th>
                <th style={styles.tableHeaderCell}>Registration Site</th>
                <th style={styles.tableHeaderCell}>Accessibility</th>
                <th style={styles.tableHeaderCell}>Review Date</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" style={{ ...styles.tableCell, textAlign: "center", color: "#6b7280", padding: "40px" }}>
                  <div>
                    <div style={{ fontSize: "16px", marginBottom: "8px" }}>No records found for Workstream 04</div>
                    <div style={{ fontSize: "14px" }}>This workstream doesn't have any data yet</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
