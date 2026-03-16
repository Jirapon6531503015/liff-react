import { useLiff } from "./hook/useLiff";
import LoadingScreen from "./components/Loadingscreen";
import ProfileCard from "./components/ProfileCard";
import ActionButtons from "./components/ActionButtons";

export default function App() {
  const { profile, isInClient, loading, error, sendMessage, closeWindow } = useLiff();

  if (loading || error) {
    return <LoadingScreen error={error} />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>LINE LIFF App</div>
        <ProfileCard profile={profile} />
        <ActionButtons
          profile={profile}
          isInClient={isInClient}
          onSend={sendMessage}
          onClose={closeWindow}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f5f5f5",
    padding: 16,
  },
  card: {
    background: "white", borderRadius: 20,
    padding: "32px 24px", width: "100%", maxWidth: 360,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  },
  badge: {
    display: "inline-block", marginBottom: 24,
    padding: "4px 12px", borderRadius: 99,
    background: "#e8faf0", color: "#06C755",
    fontSize: 12, fontWeight: 600,
  },
};