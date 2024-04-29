import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Page from "@/models/Page";

export async function GET(req: NextRequest) {
  await connectMongo(); // Ensure the MongoDB connection is established

  // Extract the id from the URL assuming the URL ends with the ID like `/pages/[id]`
  const id = req.nextUrl.pathname.split("/").pop();
  console.log(id);

  // Attempt to find the page by id in MongoDB
  try {
    const page = await Page.findOne({ _id:id });
    console.log("Found page:", page);

    // If no page found, respond with an appropriate message and status
    if (!page) {
      return new NextResponse(JSON.stringify({ message: "No record found" }), {
        status: 200,
      });
    }

    // Construct the response with page details
    const responseData = {
      id: page.id,
      projectName: page.projectName,
      "gjs-assets": page.assets,
      "gjs-components": page.components,
      "gjs-css": page.css,
      "gjs-html": page.html,
      "gjs-styles": page.styles,
    };

    // Return the JSON response with the page data
    return new NextResponse(JSON.stringify(responseData), { status: 200 });
  } catch (e) {
    console.error(e);
    // Handle any errors that occur during fetch or processing
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 400,
    });
  }
}
