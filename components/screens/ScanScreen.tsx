"use client";

import { ClayButton } from "@/components/clay";
import { ArrowRightIcon, PawIcon, QrFullIcon, QrIcon } from "@/components/icons";
import type { PetQRApi } from "@/lib/usePetQR";

export default function ScanScreen({ app }: { app: PetQRApi }) {
  return (
    <div className="pqr-scroll flex h-[100dvh] flex-col overflow-y-auto px-[22px] pb-9 pt-6">
      {/* Wordmark */}
      <div className="mt-2 flex items-center gap-2.5">
        <div className="flex size-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-clay-brand">
          <PawIcon size={22} strokeWidth={2.2} />
        </div>
        <div className="whitespace-nowrap font-display text-xl font-bold tracking-[0.2px] text-ink">
          Tagnong
        </div>
      </div>

      {/* Scan reticle */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-0 pb-2 pt-[18px] text-center">
        <div className="relative flex size-[236px] items-center justify-center overflow-hidden rounded-2xl bg-surface shadow-clay">
          <div className="relative flex size-40 items-center justify-center rounded-3xl bg-cream shadow-clay-inset">
            <QrFullIcon size={104} stroke="#C99A57" className="opacity-85" />
            {/* scanline */}
            <div className="absolute left-[8%] right-[8%] top-[8%] h-[3px] animate-[pqr-scanline_2.6s_ease-in-out_infinite] rounded-[3px] bg-[linear-gradient(90deg,transparent,#F89D06,transparent)] shadow-[0_0_12px_2px_rgba(248,157,6,0.7)]" />
            {/* corners */}
            <span className="absolute left-2.5 top-2.5 size-6 rounded-tl-lg border-l-[3px] border-t-[3px] border-cta" />
            <span className="absolute right-2.5 top-2.5 size-6 rounded-tr-lg border-r-[3px] border-t-[3px] border-cta" />
            <span className="absolute bottom-2.5 left-2.5 size-6 rounded-bl-lg border-b-[3px] border-l-[3px] border-cta" />
            <span className="absolute bottom-2.5 right-2.5 size-6 rounded-br-lg border-b-[3px] border-r-[3px] border-cta" />
          </div>
        </div>
        <h1 className="mt-5 font-display text-[26px] font-bold leading-tight text-ink">
          สแกน QR ที่ปลอกคอ
        </h1>
        <p className="mx-[18px] mt-1.5 max-w-[300px] text-[15px] leading-relaxed text-ink-2">
          หันกล้องไปที่ QR code บนปลอกคอน้อง ระบบจะพาไปยังหน้าที่ถูกต้องให้เอง
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <ClayButton
          variant="cta"
          className="h-[54px] text-[17px]"
          onClick={() => app.go("register")}
          leftIcon={<QrIcon size={22} />}
        >
          จำลองสแกนปลอกคอใหม่
        </ClayButton>
        <ClayButton
          variant="ghost"
          className="h-12 text-[15px]"
          onClick={() => app.go("public")}
          rightIcon={<ArrowRightIcon size={18} />}
        >
          หรือดูหน้าที่คนเจอน้องเห็น
        </ClayButton>
        <p className="mt-0.5 text-center text-xs text-ink-3">
          เดโม่ — แตะปุ่มเพื่อทดลองแต่ละเส้นทาง
        </p>
      </div>
    </div>
  );
}
