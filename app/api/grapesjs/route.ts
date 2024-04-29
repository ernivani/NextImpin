import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Page from "@/models/Page";
import User from "@/models/User";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  if (!data.email || !data.projectName) {
    return NextResponse.json(
      { error: "Email and projectName are required" },
      { status: 400 }
    );
  }

  await connectMongo();
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }
  try {
    const page = new Page({
      owner: user._id,
      projectName: data.projectName,
      assets: data["gjs-assets"],
      components: data["gjs-components"],
      css: data["gjs-css"],
      html: data["gjs-html"],
      style: data["gjs-styles"],
    });
    await page.save();
    console.log(page);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  console.log("Page saved");
  return NextResponse.json({ message: "Page saved" }, { status: 200 });
}
