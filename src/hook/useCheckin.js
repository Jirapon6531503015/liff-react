import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export function useCheckin() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // เช็คอิน — บันทึกลง Firestore
  const checkin = async (profile) => {
    setLoading(true);
    try {
      // ขอ GPS จากเบราว์เซอร์
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const data = {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy, 
        timestamp: serverTimestamp(), 
      };

      // บันทึกลง collection "checkins"
      await addDoc(collection(db, "checkins"), data);

      return {
        success: true,
        lat: data.lat,
        lng: data.lng,
      };
    } catch (err) {
      // GPS ถูกปฏิเสธ หรือ error อื่น
      throw new Error(err.code === 1 ? "กรุณาอนุญาต GPS ก่อนเช็คอิน" : err.message);
    } finally {
      setLoading(false);
    }
  };

  // ดึงประวัติเช็คอินของ userId นี้
  const fetchHistory = async (userId) => {
    const q = query(
      collection(db, "checkins"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    const records = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // แปลง Firestore Timestamp → JS Date
      timestamp: doc.data().timestamp?.toDate(),
    }));
    setHistory(records);
  };

  return { checkin, fetchHistory, history, loading };
}