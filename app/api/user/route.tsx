import { updateUser } from "@/lib/userActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  if(!data?.password?.trim()?.length){
    data.password = undefined
  }

  await updateUser(data.mobile, data);

  return NextResponse.json({ message: `User updated` });
}
