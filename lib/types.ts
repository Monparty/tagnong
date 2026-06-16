export type Screen =
  | "scan"
  | "register"
  | "success"
  | "public"
  | "edit"
  | "tracking";

export type Species = "แมว" | "สุนัข" | "อื่นๆ";
export type ContactType = "โทรศัพท์" | "LINE";

export interface PetForm {
  name: string;
  species: Species;
  breed: string;
  color: string;
  health: string;
  contactType: ContactType;
  contact: string;
  pwd: string;
}

export interface Pet {
  name: string;
  species: Species;
  breed: string;
  color: string;
  health: string;
  contact: string;
  lostMode: boolean;
}

/** Demo defaults — mirror the prototype's configurable props */
export const DEMO_PASSWORD = "1234";

export const initialForm: PetForm = {
  name: "",
  species: "แมว",
  breed: "",
  color: "",
  health: "",
  contactType: "โทรศัพท์",
  contact: "",
  pwd: "",
};

export const initialPet: Pet = {
  name: "มะม่วง",
  species: "แมว",
  breed: "ไทยขนสั้น",
  color: "ส้มลายเสือ ตาเหลือง",
  health: "แพ้อาหารทะเล • กินยาหัวใจ เช้า-เย็น",
  contact: "",
  lostMode: true,
};
