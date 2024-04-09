import { PrismaClient } from "@prisma/client";
import { createBrowserClient } from "@supabase/ssr";

const prisma = new PrismaClient();
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
