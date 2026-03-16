export default function CheckinHistory({ history }) {
  if (history.length === 0) {
    return <p style={styles.empty}>ยังไม่มีประวัติเช็คอิน</p>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>ประวัติเช็คอิน</h3>
      {history.map((item) => (
        <div key={item.id} style={styles.card}>
          <div style={styles.row}>
            <img src={item.pictureUrl} style={styles.avatar} alt="" />
            <div>
              <p style={styles.name}>{item.displayName}</p>
              <p style={styles.time}>
                🕐 {item.timestamp?.toLocaleString("th-TH")}
              </p>
              <p style={styles.gps}>
                📍 {item.lat?.toFixed(5)}, {item.lng?.toFixed(5)}
              </p>
              {/* กดดูใน Google Maps */}
              <a
                href={`https://maps.google.com/?q=${item.lat},${item.lng}`}
                target="_blank"
                rel="noreferrer"
                style={styles.mapLink}
              >
                ดูใน Google Maps →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { marginTop: 24 },
  title: { fontSize: 15, fontWeight: 600, marginBottom: 12, color: "#333" },
  card: {
    background: "#f9f9f9", borderRadius: 10,
    padding: "12px", marginBottom: 10,
  },
  row: { display: "flex", gap: 12, alignItems: "flex-start" },
  avatar: { width: 40, height: 40, borderRadius: "50%", flexShrink: 0 },
  name: { fontWeight: 600, fontSize: 14, margin: 0 },
  time: { fontSize: 12, color: "#666", margin: "4px 0" },
  gps: { fontSize: 12, color: "#666", margin: 0 },
  mapLink: { fontSize: 12, color: "#06C755", textDecoration: "none" },
  empty: { textAlign: "center", color: "#bbb", fontSize: 14, marginTop: 16 },
};