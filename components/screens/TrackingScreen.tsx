"use client";

import {
  AlertIcon,
  BellIcon,
  HomeIcon,
  MapPinIcon,
  MapPinSolidIcon,
  PawIcon,
  UserIcon,
} from "@/components/icons";
import type { PetQRApi } from "@/lib/usePetQR";

export default function TrackingScreen({ app }: { app: PetQRApi }) {
  const { pet } = app;

  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between px-5 pb-1.5 pt-[18px]">
        <div className="font-display text-2xl font-bold text-ink">
          การแจ้งเตือน
        </div>
        <div className="relative flex size-[42px] items-center justify-center rounded-full bg-surface text-brand-600 shadow-[6px_6px_14px_rgba(214,170,110,0.30),-5px_-5px_12px_rgba(255,255,255,0.85)]">
          <BellIcon size={22} />
          <span className="absolute right-[9px] top-2 size-[9px] rounded-full border-2 border-white bg-error" />
        </div>
      </div>

      {/* Body */}
      <div className="pqr-scroll flex-1 overflow-y-auto px-5 pb-[130px] pt-2.5">
        {/* Found alert */}
        <div className="mb-[18px] flex items-center gap-[11px] rounded-[20px] bg-[#FCEBEB] px-4 py-3.5">
          <div className="flex size-[42px] flex-shrink-0 items-center justify-center rounded-full bg-error text-white shadow-[0_4px_10px_rgba(229,72,77,0.4)]">
            <MapPinIcon size={22} />
          </div>
          <div className="flex-1">
            <div className="text-[15.5px] font-semibold text-[#C23438]">
              มีคนพบ {pet.name}!
            </div>
            <div className="mt-px text-[13px] text-[#A85053]">
              เมื่อสักครู่ • มีคนสแกนปลอกคอและแชร์ตำแหน่ง
            </div>
          </div>
        </div>

        {/* Map card */}
        <div className="rounded-[28px] bg-surface p-4 shadow-clay">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-display text-[17px] font-semibold text-ink">
              ตำแหน่งที่พบน้อง
            </div>
            <div className="text-[12.5px] text-ink-2">14:32 น.</div>
          </div>

          {/* Faux map */}
          <div className="relative h-[188px] overflow-hidden rounded-[20px] shadow-clay-inset [background-image:repeating-linear-gradient(0deg,transparent_0_40px,rgba(255,255,255,0.85)_40px_47px),repeating-linear-gradient(90deg,transparent_0_52px,rgba(255,255,255,0.85)_52px_59px),linear-gradient(135deg,#E4EFDD,#D9E8E2)]">
            <div className="absolute left-[18%] top-[60%] h-[30%] w-[46%] rounded-[10px] bg-[rgba(248,210,150,0.4)]" />
            <div className="absolute left-1/2 top-[46%] size-[54px] -translate-x-1/2 -translate-y-1/2 animate-[pqr-pulse_2.2s_ease-out_infinite] rounded-full bg-[rgba(229,72,77,0.18)]" />
            <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full drop-shadow-[0_4px_6px_rgba(229,72,77,0.4)]">
              <MapPinSolidIcon size={40} />
            </div>
          </div>

          <div className="mx-0.5 mb-3.5 mt-3 text-[13.5px] leading-snug text-ink-2">
            ใกล้ซอยลาดพร้าว 71 • ห่างจากบ้านคุณราว 1.2 กม.
          </div>
          <button
            type="button"
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md border-none bg-cta font-display text-[15px] font-semibold text-white shadow-clay-cta transition-transform active:translate-y-px"
          >
            <MapPinIcon size={19} />
            เปิดใน Google Maps
          </button>
        </div>

        {/* Activity */}
        <div className="mx-1 mb-2.5 mt-6 font-display text-base font-semibold text-ink">
          กิจกรรมล่าสุด
        </div>
        <div className="flex flex-col gap-2.5">
          <ActivityRow
            tone="brand"
            icon={<MapPinIcon size={19} />}
            title="มีคนสแกนและแชร์ตำแหน่ง"
            time="วันนี้ 14:32 น."
          />
          <ActivityRow
            tone="error"
            icon={<AlertIcon size={19} />}
            title="เปิดโหมดตามหาแล้ว"
            time="วันนี้ 09:10 น."
          />
        </div>
      </div>

      {/* Floating bottom nav + FAB */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 justify-center">
        <div className="relative h-full w-full max-w-[430px]">
          <nav className="pointer-events-auto absolute inset-x-[18px] bottom-[calc(14px+env(safe-area-inset-bottom))] flex h-[62px] items-center justify-between rounded-[28px] bg-surface px-[26px] shadow-clay-float">
            <NavIcon active={false}>
              <HomeIcon size={23} />
            </NavIcon>
            <NavIcon active={false}>
              <PawIcon size={23} strokeWidth={2} />
            </NavIcon>
            <div className="w-14" />
            <NavIcon active badge>
              <BellIcon size={23} strokeWidth={2.2} />
            </NavIcon>
            <NavIcon active={false}>
              <UserIcon size={23} />
            </NavIcon>
          </nav>
          <button
            type="button"
            onClick={() => app.go("scan")}
            aria-label="สแกน QR"
            className="pointer-events-auto absolute bottom-[calc(46px+env(safe-area-inset-bottom))] left-1/2 flex size-[62px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-cta text-white shadow-[0_12px_24px_rgba(221,86,1,0.45),inset_3px_3px_6px_rgba(255,150,90,0.7),inset_-4px_-4px_8px_rgba(150,55,0,0.5)] transition-transform active:translate-y-0.5"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.6" />
              <rect x="14" y="3" width="7" height="7" rx="1.6" />
              <rect x="3" y="14" width="7" height="7" rx="1.6" />
              <path d="M14 14h3M21 14v3M14 21v-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function NavIcon({
  children,
  active,
  badge,
}: {
  children: React.ReactNode;
  active: boolean;
  badge?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col items-center gap-[3px] ${
        active ? "text-cta" : "text-ink-3"
      }`}
    >
      {children}
      {badge ? (
        <span className="absolute -top-0.5 right-1.5 size-[7px] rounded-full border-[1.5px] border-white bg-error" />
      ) : null}
    </div>
  );
}

function ActivityRow({
  tone,
  icon,
  title,
  time,
}: {
  tone: "brand" | "error";
  icon: React.ReactNode;
  title: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[20px] bg-surface px-[15px] py-[13px] shadow-clay-sm">
      <div
        className={`flex size-[38px] flex-shrink-0 items-center justify-center rounded-full ${
          tone === "brand"
            ? "bg-brand-50 text-brand-600"
            : "bg-[#FCEBEB] text-error"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[14.5px] font-medium text-ink">{title}</div>
        <div className="text-[12.5px] text-ink-3">{time}</div>
      </div>
    </div>
  );
}
