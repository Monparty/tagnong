# Tagnong — Tagnong Code

ระบบ QR code ติดปลอกคอสัตว์เลี้ยง — เมื่อน้องหาย คนที่เจอสแกน QR แล้วแจ้งเจ้าของพร้อมตำแหน่งได้ทันที

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Ant Design v5 · Mobile-first
**สไตล์:** Claymorphism — ผิวนุ่ม นูนเหมือนดินปั้น มุมโค้งมน เงาคู่ใน-นอก โทนส้มอุ่น

หน้านี้สร้างจาก design handoff bundle ของ Claude Design (`Tagnong Code.dc.html`) และพอร์ตมาเป็น React/Next.js แบบ pixel-faithful

## เริ่มใช้งาน

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Flow (state machine เดียว, เดโม่กดได้จริง)

จุดเข้าหลักคือ **การสแกน QR** ไม่ใช่หน้าล็อกอิน:

```
scan ──► register ──► success ──► public ──► (password gate) ──► edit
            │                        │                              │
            └────────────────────────┴──────────────► tracking ◄────┘
```

| Screen | ไฟล์ | บทบาท |
|---|---|---|
| `scan` | `components/screens/ScanScreen.tsx` | หน้าเริ่ม — จำลองสแกนปลอกคอ |
| `register` | `RegisterScreen.tsx` | สแกนครั้งแรก → ฟอร์มลงทะเบียน + ตั้งรหัสผ่าน |
| `success` | `SuccessScreen.tsx` | ลงทะเบียนสำเร็จ |
| `public` | `PublicScreen.tsx` | หน้าสาธารณะที่คนเจอน้องเห็น (ข้อมูลจำกัด + แจ้งเจ้าของ) |
| `edit` | `EditScreen.tsx` | แก้ไขข้อมูล + สวิตช์โหมดตามหา (Lost Mode) |
| `tracking` | `TrackingScreen.tsx` | หน้าเจ้าของ — แผนที่จุดที่พบน้อง + bottom nav + FAB |
| gate | `PasswordGate.tsx` | bottom sheet ยืนยันรหัสผ่านก่อนแก้ไข (เดโม่: `1234`) |

State + computed values ทั้งหมดอยู่ใน `lib/usePetQR.ts` (พอร์ตจาก `DCLogic` ของ prototype)

## โครงสร้าง

- `app/globals.css` — Tailwind v4 `@theme` tokens: สี, radius, ฟอนต์, และ **clay shadows** (`shadow-clay`, `shadow-clay-inset`, `shadow-clay-brand`, `shadow-clay-cta`, `shadow-clay-float`)
- `lib/theme.ts` — Ant Design `ConfigProvider` theme (antd คุม token/มุมโค้ง/ความสูง control; เงา clay มาจาก Tailwind)
- `app/providers.tsx` — AntdRegistry (SSR) + ConfigProvider + React 19 compat patch
- `components/clay.tsx` — clay primitives: `ClayButton`, `ClayInput`, `ClayTextarea`, `ClaySegmented`, `PhoneFrame`
- `components/icons.tsx` — ไอคอน SVG ที่ใช้ซ้ำ

## Design tokens (ย่อ)

| Token | Hex | ใช้กับ |
|---|---|---|
| `cream` | `#FFF6E9` | พื้นหลังแอป |
| `brand-500` | `#F89D06` | สีหลัก / ปุ่ม primary |
| `cta` | `#DD5601` | ปุ่มสำคัญ (แจ้งเจ้าของ, ลงทะเบียน) — 1 ปุ่มต่อหน้า |
| `ink` / `ink-2` | `#3A2A14` / `#8A745A` | ตัวอักษรหลัก / รอง |
| `success` / `error` | `#2EB872` / `#E5484D` | ปลอดภัย / กำลังตามหา |

ฟอนต์: หัวข้อ `Baloo 2` + `Baloo Thai 2`, เนื้อหา `Prompt` (สำรอง `Noto Sans Thai`)
