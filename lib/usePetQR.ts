"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DEMO_PASSWORD,
  initialForm,
  initialPet,
  type ContactType,
  type Pet,
  type PetForm,
  type Screen,
  type Species,
} from "./types";

export interface PetQRApi {
  // raw state
  screen: Screen;
  form: PetForm;
  pet: Pet;
  formErr: string;
  notified: boolean;
  gateOpen: boolean;
  gateError: boolean;
  gatePwd: string;
  demoPwd: string;

  // computed
  petMeta: string;
  petColorOut: string;
  petHealthOut: string;
  statusText: string;
  contactPlaceholder: string;
  lostDesc: string;

  // navigation
  go: (screen: Screen) => void;

  // form (register)
  setForm: <K extends keyof PetForm>(key: K, value: PetForm[K]) => void;
  submitRegister: () => void;

  // pet (edit)
  setPet: <K extends keyof Pet>(key: K, value: Pet[K]) => void;
  toggleLost: () => void;

  // public actions
  notifyOwner: () => void;

  // password gate
  openGate: () => void;
  closeGate: () => void;
  setGatePwd: (value: string) => void;
  submitGate: () => void;
}

export function usePetQR(): PetQRApi {
  const [screen, setScreen] = useState<Screen>("register");
  const [form, setFormState] = useState<PetForm>(initialForm);
  const [pet, setPetState] = useState<Pet>(initialPet);
  const [formErr, setFormErr] = useState("");
  const [notified, setNotified] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [gateError, setGateError] = useState(false);
  const [gatePwd, setGatePwdState] = useState("");
  const [petPwd, setPetPwd] = useState("");

  const demoPwd = DEMO_PASSWORD;

  const go = useCallback((next: Screen) => {
    setScreen(next);
    setNotified(false);
    setGateOpen(false);
  }, []);

  const setForm = useCallback(
    <K extends keyof PetForm>(key: K, value: PetForm[K]) => {
      setFormState((f) => ({ ...f, [key]: value }));
      setFormErr("");
    },
    [],
  );

  const setPet = useCallback(<K extends keyof Pet>(key: K, value: Pet[K]) => {
    setPetState((p) => ({ ...p, [key]: value }));
  }, []);

  const submitRegister = useCallback(() => {
    if (!form.name.trim() || !form.contact.trim() || !form.pwd.trim()) {
      setFormErr("กรอกชื่อน้อง ช่องทางติดต่อ และรหัสผ่านก่อนนะ");
      return;
    }
    setPetState({
      name: form.name.trim(),
      species: form.species,
      breed: form.breed.trim() || "ไม่ระบุ",
      color: form.color.trim() || "—",
      health: form.health.trim() || "—",
      contact: form.contact.trim(),
      lostMode: false,
    });
    setPetPwd(form.pwd);
    setScreen("success");
  }, [form]);

  const toggleLost = useCallback(() => {
    setPetState((p) => ({ ...p, lostMode: !p.lostMode }));
  }, []);

  const notifyOwner = useCallback(() => setNotified(true), []);

  const openGate = useCallback(() => {
    setGateOpen(true);
    setGateError(false);
    setGatePwdState("");
  }, []);
  const closeGate = useCallback(() => setGateOpen(false), []);
  const setGatePwd = useCallback((value: string) => {
    setGatePwdState(value);
    setGateError(false);
  }, []);
  const submitGate = useCallback(() => {
    const expected = petPwd || demoPwd;
    if (gatePwd === expected || gatePwd === demoPwd) {
      setGateOpen(false);
      setScreen("edit");
      setNotified(false);
    } else {
      setGateError(true);
    }
  }, [gatePwd, petPwd, demoPwd]);

  const petMeta = useMemo(() => {
    const parts = [pet.species, pet.breed].filter(
      (x) => x && x !== "ไม่ระบุ" && x !== "—",
    );
    return parts.join(" • ") || pet.species;
  }, [pet.species, pet.breed]);

  return {
    screen,
    form,
    pet,
    formErr,
    notified,
    gateOpen,
    gateError,
    gatePwd,
    demoPwd,

    petMeta,
    petColorOut: pet.color && pet.color !== "—" ? pet.color : "ไม่ระบุ",
    petHealthOut:
      pet.health && pet.health !== "—" ? pet.health : "ไม่มีข้อมูลเพิ่มเติม",
    statusText: pet.lostMode ? "กำลังตามหา" : "ปลอดภัย • มีเจ้าของ",
    contactPlaceholder:
      form.contactType === "LINE" ? "LINE ID ของคุณ" : "เบอร์โทรของคุณ",
    lostDesc: pet.lostMode
      ? "เปิดอยู่ — หน้าสาธารณะจะแสดงปุ่มแจ้งเจ้าของ"
      : "ปิดอยู่ — เปิดเมื่อน้องหายเพื่อให้คนช่วยตามหา",

    go,
    setForm,
    submitRegister,
    setPet,
    toggleLost,
    notifyOwner,
    openGate,
    closeGate,
    setGatePwd,
    submitGate,
  };
}

export const SPECIES_OPTIONS: readonly Species[] = ["แมว", "สุนัข", "อื่นๆ"];
export const CONTACT_OPTIONS: readonly ContactType[] = ["โทรศัพท์", "LINE"];
