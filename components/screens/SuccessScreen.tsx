"use client";

import { ClayButton } from "@/components/clay";
import { CheckIcon, PawIcon } from "@/components/icons";
import type { PetQRApi } from "@/lib/usePetQR";

export default function SuccessScreen({ app }: { app: PetQRApi }) {
  const { pet } = app;

  return (
    <div className="pqr-scroll flex h-[100dvh] flex-col items-center justify-center overflow-y-auto px-6 py-8 text-center">
      {/* Animated check */}
      <div className="relative mb-2 size-[120px] animate-[pqr-pop_0.5s_cubic-bezier(0.3,1.4,0.5,1)]">
        <div className="absolute inset-0 animate-[pqr-pulse_2s_ease-out_infinite] rounded-full bg-success opacity-[0.18]" />
        <div className="relative flex size-[120px] items-center justify-center rounded-full bg-surface text-success shadow-clay">
          <CheckIcon size={58} />
        </div>
      </div>

      <h1 className="mt-[18px] font-display text-[28px] font-bold text-ink">
        ลงทะเบียนสำเร็จ!
      </h1>
      <p className="mx-4 mt-2 text-[15.5px] leading-relaxed text-ink-2">
        ปลอกคอของ <b className="text-ink">{pet.name}</b>{" "}
        พร้อมใช้งานแล้ว ต่อจากนี้ถ้ามีคนสแกนเจอ ระบบจะแจ้งเตือนคุณทันที
      </p>

      {/* Pet summary card */}
      <div className="mt-[26px] flex w-full items-center gap-3.5 rounded-3xl bg-surface p-4 shadow-clay">
        <div className="flex size-[58px] flex-shrink-0 items-center justify-center rounded-full bg-cream text-brand-500 shadow-[inset_3px_3px_6px_rgba(214,170,110,0.30),inset_-3px_-3px_6px_rgba(255,255,255,0.85)]">
          <PawIcon size={30} />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="font-display text-lg font-semibold text-ink">
            {pet.name}
          </div>
          <div className="truncate text-[13px] text-ink-2">{app.petMeta}</div>
        </div>
        <div className="flex-shrink-0 rounded-full bg-brand-100 px-3 py-1.5 text-[12.5px] font-semibold text-brand-600">
          เปิดใช้งาน
        </div>
      </div>

      {/* Actions */}
      <div className="mt-7 flex w-full flex-col gap-3">
        <ClayButton
          variant="primary"
          className="h-[52px] text-base"
          onClick={() => app.go("public")}
        >
          ดูหน้าสาธารณะของน้อง
        </ClayButton>
        <ClayButton
          variant="ghost"
          className="h-12 text-[15px]"
          onClick={() => app.go("tracking")}
        >
          ไปหน้าจัดการของเจ้าของ
        </ClayButton>
      </div>
    </div>
  );
}
