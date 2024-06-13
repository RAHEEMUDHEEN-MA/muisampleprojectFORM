import { createClient } from "@supabase/supabase-js";

const supabaseKey = "https://dmjpprlaeezazvpmotvw.supabase.co";
const supabaseUrl =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtanBwcmxhZWV6YXp2cG1vdHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDAxNzQsImV4cCI6MjAzMTkxNjE3NH0.Zeci4U2PjfG9IHKxGqCJgGx5AGv3z3prjkX78a-WK_s";

export const supabase = createClient(supabaseKey, supabaseUrl);
