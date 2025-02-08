import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhmitdlfkwyudwteerpt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobWl0ZGxma3d5dWR3dGVlcnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTc2NTEsImV4cCI6MjA1MjMzMzY1MX0.8qqUQJZGPsU0FmDDMhRkVJ1QWNkaWOQsG2OleVEY0Lk";
export const supabase = createClient(supabaseUrl, supabaseKey);