import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
  );
}

/** Browser Supabase client (anon key — safe to expose). */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Shape of a row in the `pets` table. */
export interface PetRow {
  id: string;
  created_at: string;
  name: string;
  species: string;
  breed: string | null;
  color: string | null;
  health: string | null;
  contact_type: string | null;
  contact: string;
  password: string;
  lost_mode: boolean;
}
