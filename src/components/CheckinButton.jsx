export default function CheckinButton({ onCheckin, loading }) {
  return (
    <button
      style={{
        ...styles.btn,
        opacity: loading ? 0.7 : 1,
        cursor: loading ? "not-allowed" : "pointer",
      }}
      onClick={onCheckin}
      disabled={loading}
    >
      {loading ? "กำลังเช็คอิน..." : "📍 เช็คอินตอนนี้"}
    </button>
  );
}

const styles = {
  btn: {
    width: "100%", padding: "14px 0",
    background: "#06C755", color: "white",
    border: "none", borderRadius: 12,
    fontSize: 16, fontWeight: 600,
    transition: "opacity 0.2s",
  },
};