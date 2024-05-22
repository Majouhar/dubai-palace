import { updateUser } from "@/lib/userActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("ASDASDASDAAAAAAAAAAAAAAAAAAAAAAaaa")
  const data = await request.json();
  console.log(["Debug"],data)
  if(!data?.password?.trim()?.length){
    data.password = undefined
  }

  await updateUser(data.mobile, data);

  return NextResponse.json({ message: `User updated` });
}
