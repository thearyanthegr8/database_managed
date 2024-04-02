import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/lib/types/database.types";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, mobile, email, password, type } = await request.json();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    phone: mobile.toString(),
    options: {
      data: {
        name,
        mobile: mobile.toString(),
        type,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json({ message: "User registered" }, { status: 201 });
}
