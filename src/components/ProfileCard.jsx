export default function ProfileCard({ profile }) {
  return (
    <div style={styles.card}>
      <img src={profile.pictureUrl} alt="avatar" style={styles.avatar} />
      <h2 style={styles.name}>{profile.displayName}</h2>
      <p style={styles.userId}>{profile.userId}</p>
      {profile.statusMessage && (
        <p style={styles.status}>"{profile.statusMessage}"</p>
      )}
    </div>
  );
}

const styles = {
  card: { textAlign: "center", marginBottom: 24 },
  avatar: {
    width: 88, height: 88, borderRadius: "50%",
    border: "3px solid #06C755",
    marginBottom: 16,
  },
  name: { fontSize: 22, fontWeight: 700, color: "#111", marginBottom: 4 },
  userId: { fontSize: 12, color: "#bbb", marginBottom: 8, wordBreak: "break-all" },
  status: { fontSize: 14, color: "#777", fontStyle: "italic" },
};
