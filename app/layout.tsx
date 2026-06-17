import type { Metadata, Viewport } from "next";
import { Baloo_2, Prompt, Noto_Sans_Thai } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

// "Baloo 2" covers Latin display (the "Tagnong" wordmark). Its Thai sibling
// "Baloo Thai 2" isn't in next/font's catalog, so it's loaded via <link> below
// and referenced in the --font-display stack for Thai headings.
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-baloo",
  display: "swap",
});
const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});
const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tagnong — ปลอกคอ QR สำหรับน้อง",
  description:
    "ระบบ QR code ติดปลอกคอสัตว์เลี้ยง เมื่อน้องหาย คนที่เจอสแกน QR แล้วแจ้งเจ้าของพร้อมตำแหน่งได้ทันที",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFF6E9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${baloo.variable} ${prompt.variable} ${notoThai.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Thai+2:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
