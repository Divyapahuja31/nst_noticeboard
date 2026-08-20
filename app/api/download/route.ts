import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");

  if (!fileUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const headers = new Headers();
    const filename = fileUrl.split("/").pop() || "policy.pdf";
    
    // Force attachment download in browser
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    headers.set("Content-Type", response.headers.get("Content-Type") || "application/octet-stream");

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Error downloading file:", error);
    return new NextResponse(error.message || "Failed to download file", { status: 500 });
  }
}
