import { useState, useEffect } from "react";
import liff from "@line/liff";

const LIFF_ID = "2009477679-1obbLMWU";

export function useLiff() {
  const [state, setState] = useState({
    profile: null,
    isInClient: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function init() {
      try {
        await liff.init({ liffId: LIFF_ID });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();

        setState({
          profile,
          isInClient: liff.isInClient(),
          loading: false,
          error: null,
        });
      } catch (err) {
        setState((prev) => ({ ...prev, loading: false, error: err.message }));
      }
    }

    init();
  }, []);

  const sendMessage = async (text) => {
    if (!liff.isInClient()) {
      alert("กรุณาเปิดใน LINE เพื่อส่งข้อความ");
      return;
    }
    await liff.sendMessages([{ type: "text", text }]);
  };

  const closeWindow = () => liff.closeWindow();

  return { ...state, sendMessage, closeWindow };
}