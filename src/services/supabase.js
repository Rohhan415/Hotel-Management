import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uaxushqdohfrreprmwfp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVheHVzaHFkb2hmcnJlcHJtd2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NTM0NzgsImV4cCI6MjAyNzAyOTQ3OH0.AAKj8BD05UoeN4D-fczItjUW1OODYh-_DkDZ6nZhu_I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
