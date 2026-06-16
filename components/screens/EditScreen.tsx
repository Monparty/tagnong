"use client";

import {
  ClayButton,
  ClayIconButton,
  ClayInput,
  ClayTextarea,
  FieldLabel,
  cx,
} from "@/components/clay";
import { CheckSmallIcon, ChevronLeftIcon, MapPinIcon } from "@/components/icons";
import type { PetQRApi } from "@/lib/usePetQR";

export default function EditScreen({ app }: { app: PetQRApi }) {
  const { pet } = app;
  const lost = pet.lostMode;

  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between px-[18px] pb-2 pt-4">
        <div className="flex items-center gap-3">
          <ClayIconButton aria-label="ย้อนกลับ" onClick={() => app.go("public")}>
            <ChevronLeftIcon size={22} />
          </ClayIconButton>
          <div className="font-display text-[21px] font-bold text-ink">
            แก้ไขข้อมูลน้อง
          </div>
        </div>
        <div className="flex items-center gap-[5px] text-[12.5px] font-semibold text-success">
          <CheckSmallIcon size={15} />
          ยืนยันแล้ว
        </div>
      </div>

      {/* Scroll body */}
      <div className="pqr-scroll flex-1 overflow-y-auto px-[18px] pb-[120px] pt-2">
        {/* Lost-mode toggle card */}
        <div
          className={cx(
            "mb-[22px] rounded-3xl p-4 transition-colors duration-250",
            lost
              ? "bg-[#FCEBEB] shadow-[inset_3px_3px_6px_rgba(255,255,255,0.5),inset_-4px_-4px_8px_rgba(229,72,77,0.12)]"
              : "bg-surface shadow-clay",
          )}
        >
          <div className="flex items-center gap-[13px]">
            <div
              className={cx(
                "flex size-11 flex-shrink-0 items-center justify-center rounded-[14px]",
                lost
                  ? "bg-error text-white shadow-[0_4px_10px_rgba(229,72,77,0.35)]"
                  : "bg-brand-50 text-brand-600 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(214,170,110,0.25)]",
              )}
            >
              <MapPinIcon size={24} />
            </div>
            <div className="flex-1">
              <div
                className={cx(
                  "font-display text-[17px] font-semibold",
                  lost ? "text-[#C23438]" : "text-ink",
                )}
              >
                โหมดตามหา
              </div>
              <div
                className={cx(
                  "mt-px text-[13px] leading-snug",
                  lost ? "text-[#A85053]" : "text-ink-2",
                )}
              >
                {app.lostDesc}
              </div>
            </div>
            {/* Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={lost}
              aria-label="สลับโหมดตามหา"
              onClick={app.toggleLost}
              className={cx(
                "relative h-[34px] w-[58px] flex-shrink-0 cursor-pointer rounded-full border-none p-0 shadow-[inset_2px_2px_5px_rgba(150,90,40,0.35),inset_-2px_-2px_5px_rgba(255,255,255,0.5)] transition-colors duration-250",
                lost ? "bg-error" : "bg-[#E6D2B4]",
              )}
            >
              <span
                className={cx(
                  "absolute left-1 top-1 size-[26px] rounded-full bg-white shadow-[2px_2px_5px_rgba(150,90,40,0.3)] transition-transform duration-200 [transition-timing-function:cubic-bezier(0.3,1.3,0.5,1)]",
                  lost ? "translate-x-6" : "translate-x-0",
                )}
              />
            </button>
          </div>
        </div>

        {/* Name */}
        <FieldLabel>ชื่อน้อง</FieldLabel>
        <ClayInput
          className="mb-[18px]"
          value={pet.name}
          onChange={(e) => app.setPet("name", e.target.value)}
        />

        {/* Breed + color */}
        <div className="mb-[18px] flex gap-3">
          <div className="flex-1">
            <FieldLabel>พันธุ์</FieldLabel>
            <ClayInput
              value={pet.breed}
              onChange={(e) => app.setPet("breed", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <FieldLabel>สี / ลักษณะ</FieldLabel>
            <ClayInput
              value={pet.color}
              onChange={(e) => app.setPet("color", e.target.value)}
            />
          </div>
        </div>

        {/* Health */}
        <FieldLabel>ข้อมูลสุขภาพ</FieldLabel>
        <ClayTextarea
          className="mb-[18px]"
          rows={2}
          value={pet.health}
          onChange={(e) => app.setPet("health", e.target.value)}
        />

        {/* Contact */}
        <FieldLabel hint="(ซ่อนจากสาธารณะ)">ช่องทางติดต่อ</FieldLabel>
        <ClayInput
          placeholder="เบอร์โทร หรือ LINE ID"
          value={pet.contact}
          onChange={(e) => app.setPet("contact", e.target.value)}
        />
      </div>

      {/* Save */}
      <div className="flex-shrink-0 bg-[linear-gradient(to_top,#FFF6E9_70%,rgba(255,246,233,0))] px-[18px] pb-[calc(16px+env(safe-area-inset-bottom))] pt-3.5">
        <ClayButton
          variant="primary"
          className="h-[52px] text-base"
          onClick={() => app.go("public")}
        >
          บันทึกข้อมูล
        </ClayButton>
      </div>
    </div>
  );
}
