# Pet QR Code — Design System (Claymorphism)

Stack: Next.js 16 · Tailwind CSS (v4) · Ant Design v5 · Mobile-first
สไตล์: Claymorphism (ผิวนุ่ม นูนเหมือนดินปั้น มุมโค้งมน เงาคู่ใน-นอก)

แนวคิดดีไซน์: แอปสัตว์เลี้ยงที่ต้อง "อุ่น เป็นมิตร จับต้องได้" — claymorphism ให้ความรู้สึกของของเล่นนุ่มๆ เหมาะกับสัตว์เลี้ยง สีส้มอุ่น (#F89D06) เป็นพระเอก พื้นหลังครีมนวลให้การ์ดขาวลอยเด่น ปุ่มสำคัญใช้ส้มเข้ม (#DD5601) เพื่อให้ "กดแล้วเกิดอะไรขึ้นจริง" โดดออกมาจากปุ่มทั่วไป

โมเดลการใช้งาน: QR ติดมากับปลอกคอตั้งแต่ผลิต ลูกค้าซื้อ → รับที่บ้าน → สแกนครั้งแรก = ลงทะเบียนสัตว์ + ตั้งรหัสผ่าน (ไม่ต้องสมัครบัญชีก่อน) การสแกนซ้ำ คนทั่วไปเห็นข้อมูลจำกัด + แจ้งเจ้าของได้ ส่วนเจ้าของต้องใส่รหัสผ่านก่อนจึงแก้ไขข้อมูลได้ ดีไซน์จึงต้องทำให้ "หน้าสแกนครั้งแรก" และ "หน้าสาธารณะ" ลื่นไหลและเข้าใจง่ายที่สุด

---

## 1. Color tokens

| Token | Hex | ใช้กับ |
|---|---|---|
| `cream` | `#FFF6E9` | พื้นหลังแอป (canvas) ให้การ์ดขาวลอยขึ้น |
| `surface` | `#FFFFFF` | พื้นการ์ด / sheet / input |
| `brand-50` | `#FEF3E0` | พื้นอ่อน, hover เบาๆ |
| `brand-100` | `#FDE2B0` | แท็ก/ชิป พื้นอ่อน |
| `brand-200` | `#FBC95E` | ไฮไลต์ |
| `brand-400` | `#FAB02E` | ไล่เฉดบนปุ่มส้ม |
| `brand-500` | `#F89D06` | สีหลัก (primary) |
| `brand-600` | `#E58A04` | primary hover/active |
| `cta` | `#DD5601` | ปุ่มสำคัญ (CTA) เช่น แจ้งเจ้าของ, ชำระเงิน |
| `cta-600` | `#C44A00` | CTA hover/active |
| `ink` | `#3A2A14` | ตัวอักษรหลัก (น้ำตาลเข้มอุ่น อ่านง่ายกว่าดำสนิท) |
| `ink-2` | `#8A745A` | ตัวอักษรรอง / helper |
| `ink-3` | `#B6A488` | placeholder / disabled |
| `line` | `#F0E2CE` | เส้นคั่นบางๆ (clay ใช้น้อย เน้นเงาแทนเส้น) |
| `success` | `#2EB872` | สถานะสำเร็จ / สัตว์ปลอดภัย |
| `warning` | `#F5A623` | เตือน |
| `error` | `#E5484D` | ผิดพลาด / สถานะ "หาย" |

หลักการคอนทราสต์: ตัวอักษรบนพื้นส้ม (`brand-500`/`cta`) ใช้สีขาว; ตัวอักษรบนพื้นครีม/ขาวใช้ `ink`. ตรวจ contrast ≥ 4.5:1 สำหรับ body text

---

## 2. Typography

คู่ฟอนต์ (Google Fonts, รองรับไทย+อังกฤษ):

- Display / หัวข้อ: `"Baloo 2"` + `"Baloo Thai 2"` — อ้วนกลม เป็นมิตร เข้ากับ claymorphism มาก
- Body / UI: `"Prompt"` (สำรอง `"Noto Sans Thai"`) — เรขาคณิต อ่านง่ายในขนาดเล็ก

```css
--font-display: "Baloo 2", "Baloo Thai 2", sans-serif;
--font-sans: "Prompt", "Noto Sans Thai", sans-serif;
```

Type scale (root 16px, mobile-first):

| ระดับ | size | line-height | weight | ฟอนต์ |
|---|---|---|---|---|
| display | 28px | 1.25 | 700 | display |
| h1 | 24px | 1.3 | 600 | display |
| h2 | 20px | 1.35 | 600 | display |
| h3 | 18px | 1.4 | 600 | sans |
| body-lg | 16px | 1.6 | 400 | sans |
| body | 15px | 1.6 | 400 | sans |
| label | 14px | 1.4 | 500 | sans |
| caption | 13px | 1.4 | 400 | sans |
| tiny | 12px | 1.3 | 400 | sans |

ใช้น้ำหนักแค่ 400 / 500 / 600 / 700 พอ อย่าผสมทุกน้ำหนัก

---

## 3. Spacing · radius · breakpoints

Spacing (ฐาน 4px): `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`
ระยะขอบจอมือถือ (gutter): `16px`

Radius — claymorphism ต้องมนเยอะ:

```
--radius-sm: 12px   (ชิป, แท็กเล็ก)
--radius-md: 16px   (input, ปุ่มเล็ก)
--radius-lg: 20px   (ปุ่มหลัก)
--radius-xl: 28px   (การ์ด)
--radius-2xl: 36px  (bottom sheet, การ์ดใหญ่)
--radius-full: 999px (avatar, pill, FAB)
```

Breakpoints (mobile-first): `base 0 · sm 480 · md 768 · lg 1024`
คอนเทนต์หลัก max-width `480px` จัดกึ่งกลางบนจอใหญ่ (แอปนี้ออกแบบสำหรับมือถือเป็นหลัก)

---

## 4. Claymorphism shadows (ลายเซ็นของระบบ)

หัวใจของ claymorphism = เงา 1 ชั้นด้านนอก + เงา inset 2 ชั้น (สว่างจากบน, มืดจากล่าง) ให้ดูนูนเหมือนปั้นจากดิน ที่นี่ปรับโทนเงาให้ "อุ่น" (อมส้ม/น้ำตาล) แทนเทาดำ

```css
/* การ์ด/พื้นผิวสีขาวบนพื้นครีม — นูนขึ้น */
--shadow-clay:
  6px 6px 14px rgba(214,170,110,0.30),
  -6px -6px 14px rgba(255,255,255,0.85),
  inset 3px 3px 6px rgba(255,255,255,0.65),
  inset -4px -4px 8px rgba(214,170,110,0.20);

/* input / ช่องกรอก / สถานะ active — กดลึกเข้าไป (carved) */
--shadow-clay-inset:
  inset 4px 4px 8px rgba(214,170,110,0.30),
  inset -4px -4px 8px rgba(255,255,255,0.85);

/* ปุ่ม primary สีส้ม */
--shadow-clay-brand:
  0 6px 14px rgba(248,157,6,0.40),
  inset 3px 3px 6px rgba(255,206,120,0.80),
  inset -4px -4px 8px rgba(193,112,0,0.45);

/* ปุ่ม CTA สีส้มเข้ม */
--shadow-clay-cta:
  0 6px 14px rgba(221,86,1,0.40),
  inset 3px 3px 6px rgba(255,150,90,0.65),
  inset -4px -4px 8px rgba(150,55,0,0.50);

/* bottom nav / FAB — ลอยสูง */
--shadow-clay-float:
  0 12px 28px rgba(214,150,80,0.35),
  -4px -4px 12px rgba(255,255,255,0.80),
  inset 2px 2px 4px rgba(255,255,255,0.60);
```

State การกด (pressed): ลด/เอาเงานอกออก แล้วเพิ่ม inset เพื่อให้รู้สึก "ยุบลง"
```css
--shadow-clay-pressed:
  inset 4px 4px 10px rgba(193,112,0,0.45),
  inset -3px -3px 8px rgba(255,206,120,0.55);
```

กฎ claymorphism ที่ต้องคุม: ห้ามใช้ border เส้นคมร่วมกับ clay (ใช้เงาแทน), ทุก element นูนต้องมีมุมโค้ง ≥ 16px, อย่าซ้อนการ์ด clay ลึกเกิน 2 ชั้น (รก)

---

## 5. Tailwind v4 config (`globals.css`)

Tailwind v4 ใช้ `@theme` ใน CSS — token เหล่านี้จะกลายเป็น utility อัตโนมัติ (`bg-brand-500`, `rounded-xl`, `shadow-clay`, `font-display`)

```css
@import "tailwindcss";

@theme {
  --color-cream: #FFF6E9;
  --color-surface: #FFFFFF;
  --color-brand-50: #FEF3E0;
  --color-brand-100: #FDE2B0;
  --color-brand-200: #FBC95E;
  --color-brand-400: #FAB02E;
  --color-brand-500: #F89D06;
  --color-brand-600: #E58A04;
  --color-cta: #DD5601;
  --color-cta-600: #C44A00;
  --color-ink: #3A2A14;
  --color-ink-2: #8A745A;
  --color-ink-3: #B6A488;
  --color-line: #F0E2CE;
  --color-success: #2EB872;
  --color-warning: #F5A623;
  --color-error: #E5484D;

  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-2xl: 36px;

  --font-display: "Baloo 2", "Baloo Thai 2", sans-serif;
  --font-sans: "Prompt", "Noto Sans Thai", sans-serif;

  --shadow-clay:
    6px 6px 14px rgba(214,170,110,0.30),
    -6px -6px 14px rgba(255,255,255,0.85),
    inset 3px 3px 6px rgba(255,255,255,0.65),
    inset -4px -4px 8px rgba(214,170,110,0.20);
  --shadow-clay-inset:
    inset 4px 4px 8px rgba(214,170,110,0.30),
    inset -4px -4px 8px rgba(255,255,255,0.85);
  --shadow-clay-brand:
    0 6px 14px rgba(248,157,6,0.40),
    inset 3px 3px 6px rgba(255,206,120,0.80),
    inset -4px -4px 8px rgba(193,112,0,0.45);
  --shadow-clay-cta:
    0 6px 14px rgba(221,86,1,0.40),
    inset 3px 3px 6px rgba(255,150,90,0.65),
    inset -4px -4px 8px rgba(150,55,0,0.50);
  --shadow-clay-float:
    0 12px 28px rgba(214,150,80,0.35),
    -4px -4px 12px rgba(255,255,255,0.80),
    inset 2px 2px 4px rgba(255,255,255,0.60);
}

body { background: var(--color-cream); color: var(--color-ink); font-family: var(--font-sans); }
```

(ถ้าใช้ Tailwind v3 ให้ย้าย token ไปไว้ใน `theme.extend` ของ `tailwind.config.js` แทน รูปแบบค่าเหมือนกัน)

---

## 6. Ant Design theme (`ConfigProvider`)

antd จัดการ token หลัก/มุมโค้ง/ความสูง control ได้ แต่ "เงาคู่แบบ clay" antd ทำไม่ได้ในตัว → ใส่ `className="shadow-clay"` (จาก Tailwind) ทับบน `Button`/`Card`/`Input` เอา

```tsx
const clayTheme = {
  token: {
    colorPrimary: "#F89D06",
    colorInfo: "#F89D06",
    colorSuccess: "#2EB872",
    colorWarning: "#F5A623",
    colorError: "#E5484D",
    colorBgBase: "#FFF6E9",
    colorBgContainer: "#FFFFFF",
    colorText: "#3A2A14",
    colorTextSecondary: "#8A745A",
    colorBorder: "transparent",
    borderRadius: 16,
    borderRadiusLG: 20,
    borderRadiusSM: 12,
    controlHeight: 44,
    controlHeightLG: 52,
    fontFamily: '"Prompt", "Noto Sans Thai", sans-serif',
    fontSize: 15,
    boxShadow: "none", // ปล่อยให้ Tailwind shadow-clay คุมแทน
  },
  components: {
    Button: { controlHeight: 48, borderRadius: 20, fontWeight: 600, paddingInline: 24, primaryShadow: "none", defaultShadow: "none" },
    Input: { controlHeight: 48, borderRadius: 16, paddingBlock: 12, activeShadow: "none", colorBorder: "transparent", colorBgContainer: "#FFFFFF" },
    Select: { controlHeight: 48, borderRadius: 16 },
    Card: { borderRadiusLG: 28, colorBorderSecondary: "transparent" },
    Modal: { borderRadiusLG: 28 },
    Segmented: { borderRadius: 16, trackBg: "#FEF3E0" },
    Tag: { borderRadiusSM: 999 },
  },
};
```

ปุ่ม CTA สีส้มเข้ม `#DD5601` ทำเป็นปุ่ม custom (antd ไม่มี variant นี้): ใช้ `<Button className="bg-cta shadow-clay-cta text-white ...">` หรือสร้างคอมโพเนนต์ `<ClayButton variant="cta">` ครอบไว้

---

## 7. Component specs

ทุกคอมโพเนนต์ mobile-first, เป้ากดขั้นต่ำ 44×44px

- Button / Primary — พื้น `brand-500`, ตัวอักษรขาว, radius `lg`, สูง 48px, เงา `shadow-clay-brand`, กด→ `shadow-clay-pressed` + ขยับลง 1px
- Button / CTA (สำคัญ) — พื้น `cta`, เงา `shadow-clay-cta`, ใช้กับ "แจ้งเจ้าของ", "ชำระเงิน", "เปิดโหมดหาย" เท่านั้น (1 หน้ามี CTA หลักได้ปุ่มเดียว)
- Button / Secondary — พื้น `surface` ขาว, ตัวอักษร `ink`, เงา `shadow-clay`
- Button / Ghost — โปร่ง ไม่มีเงา ตัวอักษร `brand-600` ใช้กับ action รอง
- FAB (สแกน QR) — วงกลม 60px พื้น `cta`, ไอคอน QR ขาว, เงา `shadow-clay-float`, ลอยกลางล่างเหนือ bottom nav
- Input / TextField — พื้น `surface`, เงา `shadow-clay-inset` (ดูเหมือนช่องเว้าเข้าไป), radius `md`, focus→ ขอบเรืองสี `brand-500` 2px
- Card — พื้น `surface`, radius `xl`, เงา `shadow-clay`, padding 20px
- Pet card — การ์ดแนวนอน: avatar กลม (รูปสัตว์) + ชื่อ/พันธุ์ + status chip ด้านขวา
- Status chip — pill: "ปลอดภัย" พื้น `brand-100`/ตัวอักษร `brand-600`; "กำลังตามหา" พื้น error อ่อน/ตัวอักษร error
- Bottom navigation — แถบลอย radius `2xl`, เงา `shadow-clay-float`, 4 ไอคอน (หน้าหลัก · สัตว์ของฉัน · แจ้งเตือน · โปรไฟล์) + เว้าตรงกลางให้ FAB สแกน
- Top app bar — โปร่งบนพื้นครีม, ชื่อหน้าใช้ฟอนต์ display, ปุ่ม back เป็น icon button clay กลม
- Bottom sheet — ใช้แทน modal บนมือถือ, ดึงขึ้นจากล่าง, radius บน `2xl`, มี handle bar
- Toast — การ์ด clay เล็ก ลอยบน, ไอคอนสถานะนำหน้า
- Map card (จุดที่เจอสัตว์) — การ์ด clay ครอบ map, มีหมุดตำแหน่ง + ปุ่ม "เปิดใน Google Maps"
- Password gate — bottom sheet: ช่องกรอกรหัสผ่าน (clay inset) + ปุ่ม "ยืนยันเพื่อแก้ไข" (CTA) ขึ้นเมื่อเจ้าของกดแก้ไข, แสดง error ถ้ารหัสผิด + จำกัดจำนวนครั้ง
- First-scan banner — แถบ/การ์ดต้อนรับบนหน้าลงทะเบียนครั้งแรก ("ปลอกคอนี้ยังไม่มีข้อมูล เริ่มลงทะเบียนน้องเลย") พื้น `brand-50`, ไอคอน QR

---

## 8. รายการหน้าจอ (สำหรับ Claude Design)

จุดเข้าหลักคือ "การสแกน QR" ไม่ใช่หน้าล็อกอิน — ระบบเช็คว่า QR ลงทะเบียนแล้วหรือยัง แล้วแตกเส้นทาง

หน้าสาธารณะ (เข้าจากการสแกน QR):
1. สแกนครั้งแรก → หน้าลงทะเบียน — แบนเนอร์ต้อนรับ + ฟอร์ม (ชื่อ พันธุ์ รูป ข้อมูลสุขภาพ + ช่องติดต่อเจ้าของ + ตั้งรหัสผ่านแก้ไข) → หน้าลงทะเบียนสำเร็จ **[สำคัญสุด อันดับ 1]**
2. สแกนซ้ำ → หน้าข้อมูลสัตว์ (แสดงจำกัด): รูป + ชื่อ + ป้ายสถานะ + ปุ่ม CTA "แจ้งเจ้าของ + แชร์ตำแหน่ง" + ปุ่มรอง "เจ้าของแก้ไขข้อมูล" (ไม่โชว์ที่อยู่บ้าน/เบอร์ตรง) **[สำคัญสุด อันดับ 2]**
3. Password gate (bottom sheet) — กรอกรหัสผ่านก่อนเข้าหน้าแก้ไข
4. หน้าแก้ไขข้อมูลสัตว์ (หลังยืนยันรหัส) + ปุ่มเปิด/ปิด "โหมดตามหา" (Lost Mode)

ก่อนสแกน (การซื้อ/บัญชี — ไม่บังคับ):
5. เลือกแพ็กเกจปลอกคอ + ชำระเงิน (checkout, ซื้อแบบ guest ได้)
6. ติดตามการจัดส่ง
7. (ออปชัน) หน้ารวมสัตว์ของฉัน + แจ้งเตือน + การ์ดแผนที่จุดที่เจอสัตว์ (GPS) — สำหรับเจ้าของที่สมัครบัญชี

(ฝั่ง Admin เป็นตาราง/แดชบอร์ด เน้นเดสก์ท็อป ไม่ต้องเป็น clay จัด — ทำทีหลังแยกได้)

---

## 9. Prompt สำหรับวางใน Claude Design

> คัดลอกบล็อกด้านล่างไปวางใน Claude Design ได้เลย ปรับรายชื่อหน้าตามที่อยากให้สร้างก่อน

```
ออกแบบ UI ของแอป "Pet QR Code" — ระบบ QR code ติดปลอกคอสัตว์เลี้ยง เมื่อสัตว์หาย คนที่เจอสแกน QR แล้วแจ้งเจ้าของพร้อมตำแหน่ง GPS ได้

โมเดลการใช้งาน (สำคัญต่อ flow): QR ติดมากับปลอกคอตั้งแต่ผลิต ลูกค้าซื้อแล้วรับที่บ้าน การสแกน QR ครั้งแรก (ยังไม่มีข้อมูล) จะกลายเป็นหน้าลงทะเบียนสัตว์ + ตั้งรหัสผ่าน โดยไม่ต้องสมัครบัญชีก่อน เมื่อลงทะเบียนแล้ว ใครสแกนก็เห็นข้อมูลแบบจำกัด แต่การแก้ไขข้อมูลต้องใส่รหัสผ่านก่อน จุดเข้าหลักของแอปคือ "การสแกน" ไม่ใช่หน้าล็อกอิน

กลุ่มผู้ใช้: เจ้าของสัตว์เลี้ยง (คนรักสัตว์ทั่วไป) ใช้งานบนมือถือเป็นหลัก ภาษาไทย โทนเป็นมิตร อบอุ่น

สไตล์ภาพ: Claymorphism — พื้นผิวนุ่ม นูนเหมือนดินปั้น มุมโค้งมนเยอะ ใช้ "เงาคู่" (เงานอก 1 ชั้น + เงา inset สว่างจากบน/มืดจากล่าง) แทนการใช้เส้นขอบ พื้นหลังครีมนวลให้การ์ดขาวลอยเด่น โทนเงาอุ่นอมส้ม ไม่ใช่เทาดำ ความรู้สึกเหมือนของเล่นนุ่มๆ

Layout: mobile-first ออกแบบที่ความกว้าง ~390px คอนเทนต์ max-width 480px จัดกึ่งกลาง มี bottom navigation แบบลอย + ปุ่ม FAB สแกน QR ตรงกลาง

โทเคนสี (ใช้ตามนี้เป๊ะ):
- พื้นหลังแอป (cream): #FFF6E9
- พื้นการ์ด/surface: #FFFFFF
- สีหลัก (primary): #F89D06  → ปุ่มหลัก, ไฮไลต์
- ปุ่มสำคัญ/CTA: #DD5601  → ใช้กับ "แจ้งเจ้าของ", "ชำระเงิน", "เปิดโหมดตามหา" เท่านั้น 1 ปุ่มต่อหน้า
- ตัวอักษรหลัก: #3A2A14   ตัวอักษรรอง: #8A745A
- สำเร็จ/ปลอดภัย: #2EB872   ผิดพลาด/หาย: #E5484D

ตัวอักษรบนพื้นส้มใช้สีขาว

ฟอนต์: หัวข้อใช้ "Baloo 2" (อ้วนกลม เป็นมิตร), เนื้อหา/UI ใช้ "Prompt" รองรับไทย

มุมโค้ง: input/ปุ่มเล็ก 16px, ปุ่มหลัก 20px, การ์ด 28px, bottom sheet 36px, avatar/FAB วงกลม

เงา claymorphism (ใช้ค่านี้):
- การ์ดขาวนูน: 6px 6px 14px rgba(214,170,110,.30), -6px -6px 14px rgba(255,255,255,.85), inset 3px 3px 6px rgba(255,255,255,.65), inset -4px -4px 8px rgba(214,170,110,.20)
- ช่องกรอก (เว้าเข้า): inset 4px 4px 8px rgba(214,170,110,.30), inset -4px -4px 8px rgba(255,255,255,.85)
- ปุ่มส้ม primary: 0 6px 14px rgba(248,157,6,.40), inset 3px 3px 6px rgba(255,206,120,.80), inset -4px -4px 8px rgba(193,112,0,.45)
- ปุ่ม CTA ส้มเข้ม: 0 6px 14px rgba(221,86,1,.40), inset 3px 3px 6px rgba(255,150,90,.65), inset -4px -4px 8px rgba(150,55,0,.50)

หน้าจอที่อยากให้ออกแบบ (เริ่มจากหน้าสำคัญสุดก่อน):
1. หน้าลงทะเบียนตอนสแกนครั้งแรก (สาธารณะ): แบนเนอร์ต้อนรับ "ปลอกคอนี้ยังไม่มีข้อมูล" + ฟอร์มกรอกข้อมูลสัตว์ (ชื่อ พันธุ์ รูป ข้อมูลสุขภาพ) + ช่องติดต่อเจ้าของ + ช่องตั้งรหัสผ่านสำหรับแก้ไขภายหลัง + ปุ่ม CTA "ลงทะเบียนน้อง"
2. หน้าสแกน QR ที่ลงทะเบียนแล้ว (สาธารณะ) ที่คนเจอสัตว์เห็น: รูปสัตว์ + ชื่อ + ป้ายสถานะ "กำลังตามหา" + ปุ่ม CTA ใหญ่ "แจ้งเจ้าของ + แชร์ตำแหน่ง" + ปุ่มรองเล็ก "เจ้าของแก้ไขข้อมูล" — ห้ามโชว์ที่อยู่บ้านหรือเบอร์เจ้าของตรงๆ เพื่อความปลอดภัย
3. Password gate (bottom sheet): ช่องกรอกรหัสผ่าน + ปุ่มยืนยัน ขึ้นเมื่อกด "เจ้าของแก้ไขข้อมูล" แสดง error ถ้ารหัสผิด
4. หน้าแจ้งเตือน/ติดตาม (สำหรับเจ้าของ): การ์ดแผนที่แสดงจุดที่เจอสัตว์ (หมุด GPS) + ปุ่มเปิดใน Google Maps

ข้อความในแอป (copy): ภาษาไทย กระชับ ใช้กริยาบอกสิ่งที่จะเกิดขึ้น (เช่น "แจ้งเจ้าของ" ไม่ใช่ "ส่ง") โทนอุ่นแต่ไม่เล่นเกินไป หน้าว่าง/error ให้บอกวิธีแก้ ไม่ใช่แค่ขอโทษ

มาตรฐานคุณภาพ: เป้ากดขั้นต่ำ 44px, คอนทราสต์อ่านง่าย, มี focus state ที่มองเห็น, รองรับ reduced motion
```

---

ปรับได้ตามใจ: ถ้าฟอนต์ Baloo ดูเด็กไป สลับหัวข้อเป็น "Mitr" หรือ "Prompt" หนา 600 ได้; ถ้าอยากให้ส้มจัดน้อยลง เพิ่มพื้นที่ขาว/ครีมและใช้ส้มเฉพาะปุ่มกับไฮไลต์
