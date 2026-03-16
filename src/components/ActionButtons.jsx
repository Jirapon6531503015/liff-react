export default function ActionButtons({ profile, isInClient, onSend, onClose }) {
  return (
    <div style={styles.container}>
      <button
        style={styles.primary}
        onClick={() => onSend(`สวัสดี! ฉันชื่อ ${profile.displayName} 👋`)}
      >
        💬 ส่งข้อความหาตัวเอง
      </button>

      {isInClient && (
        <button style={styles.secondary} onClick={onClose}>
          ✕ ปิดหน้าต่าง
        </button>
      )}
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: 10 },
  primary: {
    padding: "14px 0", borderRadius: 12, border: "none",
    background: "#06C755", color: "white",
    fontSize: 16, fontWeight: 600, cursor: "pointer",
    transition: "opacity 0.2s",
  },
  secondary: {
    padding: "14px 0", borderRadius: 12,
    border: "1px solid #eee", background: "white",
    fontSize: 15, color: "#666", cursor: "pointer",
  },
};