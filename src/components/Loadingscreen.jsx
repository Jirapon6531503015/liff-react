export default function LoadingScreen({ error }) {
  return (
    <div style={styles.container}>
      {error ? (
        <>
          <div style={styles.errorIcon}>✕</div>
          <p style={styles.errorText}>เกิดข้อผิดพลาด</p>
          <p style={styles.errorDetail}>{error}</p>
        </>
      ) : (
        <>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>กำลังโหลด...</p>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    height: "100vh", gap: "12px",
  },
  spinner: {
    width: 40, height: 40,
    border: "3px solid #eee",
    borderTop: "3px solid #06C755",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: { color: "#999", fontSize: 14 },
  errorIcon: {
    width: 48, height: 48, borderRadius: "50%",
    background: "#fee", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontSize: 20, color: "#e33",
  },
  errorText: { fontWeight: 600, color: "#333" },
  errorDetail: { fontSize: 13, color: "#999", textAlign: "center", maxWidth: 280 },
};