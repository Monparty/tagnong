"use client";

import { ClayButton, cx } from "@/components/clay";
import {
  CheckIcon,
  LockIcon,
  MapPinIcon,
  PawIcon,
} from "@/components/icons";
import type { PetQRApi } from "@/lib/usePetQR";

export default function PublicScreen({ app }: { app: PetQRApi }) {
  const { pet } = app;
  const lost = pet.lostMode;

  return (
    <div className="pqr-scroll flex h-[100dvh] flex-col overflow-y-auto px-5 pb-8 pt-[18px]">
      {/* Mini header */}
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-[30px] items-center justify-center rounded-full bg-brand-500 text-white shadow-[inset_2px_2px_4px_rgba(255,206,120,0.8),inset_-2px_-2px_4px_rgba(193,112,0,0.45)]">
            <PawIcon size={17} strokeWidth={2.2} />
          </div>
          <div className="whitespace-nowrap font-display text-base font-bold text-ink-2">
            Tagnong
          </div>
        </div>
        <button
          type="button"
          onClick={() => app.go("scan")}
          className="cursor-pointer border-none bg-transparent text-[13px] text-ink-3"
        >
          ออก
        </button>
      </div>

      {/* Hero */}
      <div className="mt-2.5 flex flex-col items-center text-center">
        <div className="relative mb-1.5 size-[140px]">
          <div
            className={cx(
              "absolute -inset-1.5 rounded-full opacity-35 blur-[2px]",
              lost
                ? "bg-[conic-gradient(#E5484D,#F5A623,#E5484D)]"
                : "bg-[conic-gradient(#FBC95E,#2EB872,#FBC95E)]",
            )}
          />
          <div className="relative flex size-[140px] items-center justify-center overflow-hidden rounded-full bg-cream text-brand-500 shadow-[6px_6px_14px_rgba(214,170,110,0.30),-6px_-6px_14px_rgba(255,255,255,0.85),inset_4px_4px_8px_rgba(214,170,110,0.20),inset_-4px_-4px_8px_rgba(255,255,255,0.85)]">
            <PawIcon size={68} strokeWidth={1.7} />
          </div>
        </div>
        <h1 className="mt-2.5 font-display text-[30px] font-bold text-ink">
          {pet.name}
        </h1>
        <div className="mt-0.5 text-sm text-ink-2">{app.petMeta}</div>
        <div
          className={cx(
            "mt-3.5 inline-flex items-center gap-[7px] rounded-full px-4 py-2 text-sm font-semibold",
            lost ? "bg-[#FCDEDE] text-[#D43439]" : "bg-brand-100 text-brand-600",
          )}
        >
          <span
            className={cx(
              "size-2 rounded-full",
              lost ? "bg-error" : "bg-success",
            )}
          />
          {app.statusText}
        </div>
      </div>

      {/* Lost-mode banner */}
      {lost ? (
        <div className="mt-5 flex items-start gap-[11px] rounded-[20px] bg-[#FCEBEB] px-4 py-3.5">
          <MapPinIcon size={20} stroke="#E5484D" className="mt-px flex-shrink-0" />
          <div className="text-sm leading-relaxed text-ink">
            น้องตัวนี้กำลังพลัดหลงและเจ้าของตามหาอยู่ — ขอบคุณที่หยุดช่วยเหลือ
            แตะปุ่มด้านล่างเพื่อแจ้งเจ้าของพร้อมตำแหน่งของคุณ
          </div>
        </div>
      ) : null}

      {/* Detail card */}
      <div className="mt-4 rounded-3xl bg-surface px-[18px] py-1.5 shadow-clay">
        <DetailRow label="ชนิด" value={pet.species} />
        <DetailRow label="สี / ลักษณะ" value={app.petColorOut} clampRight />
        <DetailRow label="ข้อมูลสุขภาพ" value={app.petHealthOut} last />
      </div>

      <div className="min-h-[18px] flex-1" />

      {/* Notify / notified */}
      {app.notified ? (
        <>
          <div className="mb-3 flex items-center gap-3 rounded-[20px] bg-[#E7F7EF] p-4">
            <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-success text-white shadow-[0_4px_10px_rgba(46,184,114,0.4)]">
              <CheckIcon size={22} />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-[#1B7A4B]">
                แจ้งเจ้าของแล้ว
              </div>
              <div className="mt-px text-[13px] text-[#3F8C66]">
                ส่งตำแหน่งของคุณให้เจ้าของเรียบร้อย โปรดรอการติดต่อกลับ
              </div>
            </div>
          </div>
          <ClayButton
            variant="ghost"
            className="h-[46px] text-[14.5px]"
            onClick={() => app.go("tracking")}
          >
            ดูสิ่งที่เจ้าของเห็น (เดโม่)
          </ClayButton>
        </>
      ) : (
        <>
          <ClayButton
            variant="cta"
            className="h-[58px] text-[17px]"
            onClick={app.notifyOwner}
            leftIcon={<MapPinIcon size={22} />}
          >
            แจ้งเจ้าของ + แชร์ตำแหน่ง
          </ClayButton>
          <div className="mt-3 flex items-center justify-center gap-[7px] px-2 text-center text-[12.5px] leading-snug text-ink-3">
            <LockIcon size={15} className="flex-shrink-0" />
            เบอร์และที่อยู่เจ้าของถูกซ่อนไว้เพื่อความปลอดภัย
            ระบบจะแจ้งเจ้าของให้ติดต่อกลับเอง
          </div>
        </>
      )}

      {/* Owner edit entry */}
      <button
        type="button"
        onClick={app.openGate}
        className="mt-2.5 flex h-[46px] w-full cursor-pointer items-center justify-center gap-[7px] rounded-md border-none bg-transparent text-sm font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
      >
        <LockIcon size={16} />
        เป็นเจ้าของ? แก้ไขข้อมูลน้อง
      </button>
    </div>
  );
}

function DetailRow({
  label,
  value,
  last,
  clampRight,
}: {
  label: string;
  value: string;
  last?: boolean;
  clampRight?: boolean;
}) {
  return (
    <div
      className={cx(
        "flex items-start justify-between gap-4 py-[13px]",
        !last && "border-b-[1.5px] border-line",
        last ? "items-start" : "items-center",
      )}
    >
      <span className="flex-shrink-0 text-sm text-ink-2">{label}</span>
      <span
        className={cx(
          "text-right text-[14.5px] font-semibold leading-snug text-ink",
          clampRight && "max-w-[60%]",
          last && "font-medium text-sm",
        )}
      >
        {value}
      </span>
    </div>
  );
}
