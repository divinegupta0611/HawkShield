import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rvkkgpweorxlmpfyktuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2a2tncHdlb3J4bG1wZnlrdHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDgxMzgsImV4cCI6MjA3OTEyNDEzOH0.R3RFQLVgbkDlyicJ-YQG2P-cZw7vPvQEsQKfWlj0lxA";

export const supabase = createClient(supabaseUrl, supabaseKey);
