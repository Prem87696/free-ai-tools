import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://gkdzomlvefbywnhazcjt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZHpvbWx2ZWZieXduaGF6Y2p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTcyMzksImV4cCI6MjA5MDE3MzIzOX0.LVxlx6IIkz6iBrYf0zG7kVOHJMRvN1wl7SZuyFydEw0"
);
