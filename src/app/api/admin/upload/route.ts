import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Blob storage is not configured." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const slugHint = String(formData.get("slug") ?? "property")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "An image file is required." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, or GIF images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Images must be under 8MB." },
        { status: 400 }
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const pathname = `properties/${slugHint || "property"}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("upload error:", error);
    return NextResponse.json(
      { error: "Unable to upload image right now." },
      { status: 500 }
    );
  }
}
