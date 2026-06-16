"use client";

import { ClayButton } from "@/components/clay";
import { AlertIcon, LockIcon } from "@/components/icons";
import type { PetQRApi } from "@/lib/usePetQR";

export default function PasswordGate({ app }: { app: PetQRApi }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Scrim */}
      <button
        type="button"
        aria-label="ปิด"
        onClick={app.closeGate}
        className="absolute inset-0 animate-[pqr-fade_0.25s_ease] cursor-default border-none bg-[rgba(58,42,20,0.42)]"
      />

      {/* Sheet */}
      <div className="relative animate-[pqr-sheet_0.32s_cubic-bezier(0.2,0.8,0.3,1)_both] rounded-t-[36px] bg-cream px-6 pb-[calc(28px+env(safe-area-inset-bottom))] pt-3.5 shadow-[0_-10px_30px_rgba(150,90,40,0.2)]">
        <div className="mx-auto mb-[18px] h-[5px] w-11 rounded-full bg-[#E6D2B4]" />

        <div className="flex flex-col items-center text-center">
          <div className="mb-3.5 flex size-[66px] items-center justify-center rounded-full bg-surface text-cta shadow-clay">
            <LockIcon size={30} />
          </div>
          <h2 className="m-0 font-display text-[22px] font-bold text-ink">
            ยืนยันตัวเจ้าของ
          </h2>
          <p className="mx-3.5 mt-1.5 text-sm leading-relaxed text-ink-2">
            ใส่รหัสผ่านที่ตั้งไว้ตอนลงทะเบียน เพื่อแก้ไขข้อมูลหรือเปิดโหมดตามหา
          </p>
        </div>

        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={app.gatePwd}
          onChange={(e) => app.setGatePwd(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") app.submitGate();
          }}
          autoFocus
          className="mt-[22px] w-full rounded-md border-none bg-surface px-[18px] py-[15px] text-center text-[17px] tracking-[2px] text-ink outline-none shadow-clay-inset transition-shadow focus:shadow-[inset_4px_4px_8px_rgba(214,170,110,0.30),inset_-4px_-4px_8px_rgba(255,255,255,0.85),0_0_0_2px_#F89D06]"
        />

        {app.gateError ? (
          <div className="mt-2.5 flex items-center justify-center gap-[7px] text-[13.5px] font-medium text-error">
            <AlertIcon size={16} />
            รหัสผ่านไม่ถูกต้อง ลองอีกครั้ง
          </div>
        ) : null}

        <ClayButton
          variant="cta"
          className="mt-[18px] h-[54px] text-[17px]"
          onClick={app.submitGate}
        >
          ยืนยันเพื่อแก้ไข
        </ClayButton>

        <div className="mt-3 text-center text-xs text-ink-3">
          เดโม่ — รหัสผ่านคือ <b className="text-ink-2">{app.demoPwd}</b>
        </div>
      </div>
    </div>
  );
}
