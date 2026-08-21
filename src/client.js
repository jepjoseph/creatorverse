import { createClient } from "@supabase/supabase-js";

const API_URL = "https://lqrzqtkoqnhswmeczoku.supabase.co";
const API_KEY = "sb_publishable_7KwItVu3t49zSJKXGQdO9A_yRlNG6jk";

export const supabase = createClient(API_URL, API_KEY);
