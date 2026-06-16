"use client";

import { PhoneFrame } from "@/components/clay";
import EditScreen from "@/components/screens/EditScreen";
import PasswordGate from "@/components/screens/PasswordGate";
import PublicScreen from "@/components/screens/PublicScreen";
import RegisterScreen from "@/components/screens/RegisterScreen";
import ScanScreen from "@/components/screens/ScanScreen";
import SuccessScreen from "@/components/screens/SuccessScreen";
import TrackingScreen from "@/components/screens/TrackingScreen";
import { usePetQR } from "@/lib/usePetQR";

export default function Home() {
  const app = usePetQR();

  return (
    <main>
      <PhoneFrame>
        {app.screen === "scan" && <ScanScreen app={app} />}
        {app.screen === "register" && <RegisterScreen app={app} />}
        {app.screen === "success" && <SuccessScreen app={app} />}
        {app.screen === "public" && <PublicScreen app={app} />}
        {app.screen === "edit" && <EditScreen app={app} />}
        {app.screen === "tracking" && <TrackingScreen app={app} />}

        {app.gateOpen && <PasswordGate app={app} />}
      </PhoneFrame>
    </main>
  );
}
