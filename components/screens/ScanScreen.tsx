"use client";

import { ClayButton, cx } from "@/components/clay";
import { ArrowRightIcon, CameraIcon, QrFullIcon, QrIcon } from "@/components/icons";
import type { PetQRApi } from "@/lib/usePetQR";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import tagnongLogo from "../../public/images/tagnongLogoNoBg.png";

type CamState = "idle" | "starting" | "live" | "error";

/* Minimal typing for the experimental BarcodeDetector API (Chromium-only).
   Auto-scan is progressive enhancement — the live camera still works without it. */
interface DetectedBarcode {
    rawValue: string;
}
interface BarcodeDetectorLike {
    detect: (source: CanvasImageSource) => Promise<DetectedBarcode[]>;
}
interface BarcodeDetectorCtor {
    new (options?: { formats?: string[] }): BarcodeDetectorLike;
}

export default function ScanScreen({ app }: { app: PetQRApi }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const rafRef = useRef<number | null>(null);

    const [cam, setCam] = useState<CamState>("idle");
    const [error, setError] = useState("");
    const [noAutoScan, setNoAutoScan] = useState(false);

    const stop = useCallback(() => {
        if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        if (videoRef.current) videoRef.current.srcObject = null;
        setCam("idle");
    }, []);

    // A real collar QR points at the public "found me" page — go there on a hit.
    const onDetected = useCallback(() => {
        stop();
        app.go("public");
    }, [stop, app]);

    const startDetectLoop = useCallback(() => {
        const Ctor = (window as unknown as { BarcodeDetector?: BarcodeDetectorCtor }).BarcodeDetector;
        if (!Ctor) {
            setNoAutoScan(true);
            return;
        }
        let detector: BarcodeDetectorLike;
        try {
            detector = new Ctor({ formats: ["qr_code"] });
        } catch {
            setNoAutoScan(true);
            return;
        }
        let busy = false;
        const tick = async () => {
            const video = videoRef.current;
            if (!video || !streamRef.current) return;
            if (!busy && video.readyState >= 2) {
                busy = true;
                try {
                    const codes = await detector.detect(video);
                    if (codes[0]?.rawValue) {
                        onDetected();
                        return;
                    }
                } catch {
                    // ignore per-frame decode hiccups (e.g. zero-size frame)
                }
                busy = false;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    }, [onDetected]);

    const start = useCallback(async () => {
        setError("");
        setNoAutoScan(false);
        if (!navigator.mediaDevices?.getUserMedia) {
            setCam("error");
            setError("เบราว์เซอร์นี้เปิดกล้องไม่ได้ — ต้องเปิดผ่าน HTTPS หรือ localhost นะ");
            return;
        }
        setCam("starting");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: "environment" } },
                audio: false,
            });
            const video = videoRef.current;
            if (!video) {
                stream.getTracks().forEach((t) => t.stop());
                return;
            }
            streamRef.current = stream;
            video.srcObject = stream;
            await video.play();
            setCam("live");
            startDetectLoop();
        } catch (err) {
            stop();
            setCam("error");
            const name = (err as DOMException)?.name;
            if (name === "NotAllowedError" || name === "SecurityError") {
                setError("ไม่ได้รับอนุญาตให้ใช้กล้อง — กดอนุญาตในเบราว์เซอร์แล้วลองใหม่");
            } else if (name === "NotFoundError" || name === "OverconstrainedError") {
                setError("ไม่พบกล้องบนอุปกรณ์นี้");
            } else {
                setError("เปิดกล้องไม่สำเร็จ ลองอีกครั้งนะ");
            }
        }
    }, [stop, startDetectLoop]);

    // Always release the camera when leaving the scan screen.
    useEffect(() => stop, [stop]);

    const live = cam === "live";
    const heading = live ? "เล็ง QR ให้อยู่ในกรอบ" : "สแกน QR ที่ปลอกคอ";
    const sub = error
        ? error
        : live
          ? noAutoScan
              ? "เบราว์เซอร์นี้สแกนอัตโนมัติไม่ได้ — ลองใช้ปุ่มจำลองด้านล่างได้เลย"
              : "ระบบกำลังค้นหา QR code ให้อัตโนมัติ…"
          : "หันกล้องไปที่ QR code บนปลอกคอน้อง ระบบจะพาไปยังหน้าที่ถูกต้องให้เอง";
    const showDemo = !live || noAutoScan;

    return (
        <div className="pqr-scroll flex h-dvh flex-col overflow-y-auto px-5.5 pb-9 pt-6">
            {/* Wordmark */}
            <div className="mt-2 flex items-center gap-2.5">
                <Image src={tagnongLogo} height={58} width={58} alt="Tagnong Logo" />
                <div className="whitespace-nowrap font-display text-xl font-bold tracking-[0.2px] text-ink">
                    Tagnong
                </div>
            </div>

            {/* Scan reticle */}
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-0 pb-2 pt-4.5 text-center">
                <div className="relative flex size-59 items-center justify-center overflow-hidden rounded-2xl bg-surface shadow-clay">
                    <div className="relative flex size-40 items-center justify-center overflow-hidden rounded-3xl bg-cream shadow-clay-inset">
                        {/* live camera feed */}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={cx(
                                "absolute inset-0 size-full object-cover transition-opacity duration-300",
                                live ? "opacity-100" : "opacity-0",
                            )}
                        />
                        {/* idle / error glyph */}
                        {!live && <QrFullIcon size={104} stroke="#C99A57" className="relative opacity-85" />}
                        {/* scanline */}
                        <div className="absolute left-[8%] right-[8%] top-[8%] h-0.75 animate-pqr-scanline rounded-[3px] bg-[linear-gradient(90deg,transparent,#F89D06,transparent)] shadow-[0_0_12px_2px_rgba(248,157,6,0.7)]" />
                        {/* corners */}
                        <span className="absolute left-2.5 top-2.5 size-6 rounded-tl-lg border-l-[3px] border-t-[3px] border-cta" />
                        <span className="absolute right-2.5 top-2.5 size-6 rounded-tr-lg border-r-[3px] border-t-[3px] border-cta" />
                        <span className="absolute bottom-2.5 left-2.5 size-6 rounded-bl-lg border-b-[3px] border-l-[3px] border-cta" />
                        <span className="absolute bottom-2.5 right-2.5 size-6 rounded-br-lg border-b-[3px] border-r-[3px] border-cta" />
                    </div>
                </div>
                <h1 className="mt-5 font-display text-[26px] font-bold leading-tight text-ink">{heading}</h1>
                <p
                    className={cx(
                        "mx-4.5 mt-1.5 max-w-75 text-[15px] leading-relaxed",
                        error ? "font-medium text-error" : "text-ink-2",
                    )}
                >
                    {sub}
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
                {live ? (
                    <ClayButton variant="secondary" className="h-13.5 text-[17px]" onClick={stop}>
                        ปิดกล้อง
                    </ClayButton>
                ) : (
                    <ClayButton
                        variant="cta"
                        className="h-13.5 text-[17px]"
                        onClick={start}
                        disabled={cam === "starting"}
                        leftIcon={<CameraIcon size={22} />}
                    >
                        {cam === "starting"
                            ? "กำลังเปิดกล้อง…"
                            : cam === "error"
                              ? "ลองเปิดกล้องอีกครั้ง"
                              : "เปิดกล้องสแกน QR"}
                    </ClayButton>
                )}

                {showDemo && (
                    <>
                        <ClayButton
                            variant="ghost"
                            className="h-12 text-[15px]"
                            onClick={() => app.go("register")}
                            leftIcon={<QrIcon size={18} />}
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
                    </>
                )}
                <p className="mt-0.5 text-center text-xs text-ink-3">เดโม่ — แตะปุ่มเพื่อทดลองแต่ละเส้นทาง</p>
            </div>
        </div>
    );
}
