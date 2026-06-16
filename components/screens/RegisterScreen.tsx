"use client";

import {
  ClayButton,
  ClayIconButton,
  ClayInput,
  ClaySegmented,
  ClayTextarea,
  FieldLabel,
} from "@/components/clay";
import {
  AlertIcon,
  CameraIcon,
  ChevronLeftIcon,
  LockIcon,
  PawIcon,
  PlusIcon,
  QrIcon,
} from "@/components/icons";
import { CONTACT_OPTIONS, SPECIES_OPTIONS, type PetQRApi } from "@/lib/usePetQR";

export default function RegisterScreen({ app }: { app: PetQRApi }) {
  const { form } = app;

  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-3 px-[18px] pb-2 pt-4">
        <ClayIconButton aria-label="ย้อนกลับ" onClick={() => app.go("scan")}>
          <ChevronLeftIcon size={22} />
        </ClayIconButton>
        <div className="font-display text-[21px] font-bold text-ink">
          ลงทะเบียนน้อง
        </div>
      </div>

      {/* Scrollable form */}
      <div className="pqr-scroll flex-1 overflow-y-auto px-[18px] pb-[120px] pt-2">
        {/* First-scan banner */}
        <div className="mb-5 flex items-center gap-3.5 rounded-3xl bg-brand-50 p-4 shadow-[inset_3px_3px_6px_rgba(255,255,255,0.7),inset_-4px_-4px_8px_rgba(214,170,110,0.18)]">
          <div className="flex size-[46px] flex-shrink-0 items-center justify-center rounded-[14px] bg-surface text-cta shadow-clay-sm">
            <QrIcon size={24} />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-ink">
              ปลอกคอนี้ยังไม่มีข้อมูล
            </div>
            <div className="mt-0.5 text-[13px] leading-snug text-ink-2">
              กรอกข้อมูลน้องเพื่อเปิดใช้งานปลอกคอ ไม่ต้องสมัครบัญชี
            </div>
          </div>
        </div>

        {/* Photo picker */}
        <div className="mb-[22px] flex flex-col items-center gap-2">
          <button
            type="button"
            className="relative flex size-[104px] cursor-pointer items-center justify-center rounded-full border-none bg-cream shadow-clay-inset transition-colors hover:bg-brand-50"
            aria-label="เพิ่มรูปน้อง"
          >
            <CameraIcon size={34} stroke="#C99A57" />
            <span className="absolute bottom-0.5 right-0.5 flex size-8 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_4px_10px_rgba(248,157,6,0.45),inset_2px_2px_4px_rgba(255,206,120,0.8)]">
              <PlusIcon size={18} />
            </span>
          </button>
          <div className="text-[13px] text-ink-2">เพิ่มรูปน้อง</div>
        </div>

        {/* Name */}
        <FieldLabel>ชื่อน้อง</FieldLabel>
        <ClayInput
          className="mb-[18px]"
          placeholder="เช่น มะม่วง"
          value={form.name}
          onChange={(e) => app.setForm("name", e.target.value)}
        />

        {/* Species */}
        <FieldLabel>ชนิดสัตว์</FieldLabel>
        <div className="mb-[18px]">
          <ClaySegmented
            ariaLabel="ชนิดสัตว์"
            options={SPECIES_OPTIONS}
            value={form.species}
            onChange={(v) => app.setForm("species", v)}
          />
        </div>

        {/* Breed + color */}
        <div className="mb-[18px] flex gap-3">
          <div className="flex-1">
            <FieldLabel>พันธุ์</FieldLabel>
            <ClayInput
              placeholder="ไทยขนสั้น"
              value={form.breed}
              onChange={(e) => app.setForm("breed", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <FieldLabel>สี / ลักษณะเด่น</FieldLabel>
            <ClayInput
              placeholder="ส้มลายเสือ"
              value={form.color}
              onChange={(e) => app.setForm("color", e.target.value)}
            />
          </div>
        </div>

        {/* Health */}
        <FieldLabel hint="(ไม่บังคับ)">ข้อมูลสุขภาพ</FieldLabel>
        <ClayTextarea
          className="mb-6"
          rows={2}
          placeholder="โรคประจำตัว ยาที่กิน อาหารที่แพ้..."
          value={form.health}
          onChange={(e) => app.setForm("health", e.target.value)}
        />

        {/* Owner contact */}
        <div className="mb-1.5 font-display text-base font-semibold text-ink">
          ช่องทางติดต่อเจ้าของ
        </div>
        <div className="mb-3.5 flex items-start gap-[7px] rounded-[14px] bg-surface px-3 py-2.5 shadow-[4px_4px_10px_rgba(214,170,110,0.20),-3px_-3px_8px_rgba(255,255,255,0.85)]">
          <LockIcon
            size={16}
            stroke="#2EB872"
            className="mt-px flex-shrink-0"
          />
          <div className="text-[12.5px] leading-snug text-ink-2">
            ข้อมูลนี้ <b className="text-ink">ไม่แสดงต่อสาธารณะ</b>{" "}
            ใช้เพื่อแจ้งเตือนเมื่อมีคนพบน้องเท่านั้น
          </div>
        </div>
        <div className="mb-2.5">
          <ClaySegmented
            ariaLabel="ประเภทช่องทางติดต่อ"
            options={CONTACT_OPTIONS}
            value={form.contactType}
            onChange={(v) => app.setForm("contactType", v)}
          />
        </div>
        <ClayInput
          className="mb-6"
          placeholder={app.contactPlaceholder}
          value={form.contact}
          onChange={(e) => app.setForm("contact", e.target.value)}
        />

        {/* Password */}
        <div className="mb-1.5 font-display text-base font-semibold text-ink">
          ตั้งรหัสผ่านสำหรับแก้ไข
        </div>
        <ClayInput
          type="password"
          placeholder="ตั้งรหัสไว้แก้ไขข้อมูลภายหลัง"
          value={form.pwd}
          onChange={(e) => app.setForm("pwd", e.target.value)}
        />
        <div className="mt-[7px] text-[12.5px] leading-snug text-ink-3">
          จำรหัสนี้ไว้ให้ดี — ใช้ยืนยันตัวตนเวลาแก้ไขข้อมูลหรือเปิดโหมดตามหา
        </div>

        {/* Error */}
        {app.formErr ? (
          <div className="mt-4 flex items-center gap-2 rounded-[14px] bg-[#FCEBEB] px-3.5 py-[11px] text-[13.5px] font-medium text-error">
            <AlertIcon size={18} />
            {app.formErr}
          </div>
        ) : null}
      </div>

      {/* Sticky submit */}
      <div className="flex-shrink-0 bg-[linear-gradient(to_top,#FFF6E9_70%,rgba(255,246,233,0))] px-[18px] pb-[calc(16px+env(safe-area-inset-bottom))] pt-3.5">
        <ClayButton
          variant="cta"
          className="h-[54px] text-[17px]"
          onClick={app.submitRegister}
          leftIcon={<PawIcon size={22} strokeWidth={2.2} />}
        >
          ลงทะเบียนน้อง
        </ClayButton>
      </div>
    </div>
  );
}
