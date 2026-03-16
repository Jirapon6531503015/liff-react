import { useEffect, useState } from "react";
import { useLiff } from "./hook/useLiff";
import { useCheckin } from "./hook/useCheckin";
import LoadingScreen from "./components/Loadingscreen";
import ProfileCard from "./components/ProfileCard";
import CheckinButton from "./components/CheckinButton";
import CheckinHistory from "./components/CheckinHistory";

export default function App() {
  const { profile, loading, error, sendMessage } = useLiff();
  const { checkin, fetchHistory, history, loading: checkinLoading } = useCheckin();
  const [status, setStatus] = useState(null); // success/error message

  // โหลดประวัติพอได้ profile
  useEffect(() => {
    if (profile) fetchHistory(profile.userId);
  }, [profile]);

  if (loading || error) return <LoadingScreen error={error} />;

  const handleCheckin = async () => {
    try {
      const result = await checkin(profile);

      // ส่งข้อความยืนยันใน LINE chat
      await sendMessage(
        `✅ เช็คอินสำเร็จ!\n📍 ${result.lat.toFixed(5)}, ${result.lng.toFixed(5)}\n🕐 ${new Date().toLocaleString("th-TH")}`
      );

      setStatus({ type: "success", text: "เช็คอินสำเร็จ! ✅" });
      fetchHistory(profile.userId); // refresh ประวัติ
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>📍 ระบบเช็คอิน</div>
        <ProfileCard profile={profile} />

        {status && (
          <p style={{
            ...styles.status,
            color: status.type === "success" ? "#06C755" : "#e33",
          }}>
            {status.text}
          </p>
        )}

        <CheckinButton onCheckin={handleCheckin} loading={checkinLoading} />
        <CheckinHistory history={history} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex", alignItems: "flex-start", justifyContent: "center",
    background: "#f5f5f5", padding: 16,
  },
  card: {
    background: "white", borderRadius: 20,
    padding: "32px 24px", width: "100%", maxWidth: 360,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    marginTop: 16,
  },
  badge: {
    display: "inline-block", marginBottom: 24,
    padding: "4px 12px", borderRadius: 99,
    background: "#e8faf0", color: "#06C755",
    fontSize: 12, fontWeight: 600,
  },
  status: {
    textAlign: "center", fontSize: 14,
    marginBottom: 12, fontWeight: 500,
  },
};