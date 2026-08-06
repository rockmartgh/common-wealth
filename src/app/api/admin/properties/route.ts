import { NextResponse } from "next/server";
import type { Property } from "@/data/properties";
import { getAdminSession } from "@/lib/admin-auth";
import { createProperty, deleteProperty, listProperties } from "@/lib/properties-store";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const properties = await listProperties();
    return NextResponse.json({ properties });
  } catch (error) {
    console.error("admin properties GET error:", error);
    return NextResponse.json(
      { error: "Unable to load properties." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as Partial<Property>;

    const address = body.address?.trim() ?? "";
    const city = body.city?.trim() ?? "";
    const state = body.state?.trim() || "FL";
    const zip = body.zip?.trim() ?? "";
    const description = body.description?.trim() ?? "";
    const type = body.type?.trim() || "Single Family";
    const image = body.image?.trim() ?? "";
    const gallery = Array.isArray(body.gallery)
      ? body.gallery.map(String).filter(Boolean)
      : [];
    const features = Array.isArray(body.features)
      ? body.features.map((item) => String(item).trim()).filter(Boolean)
      : [];

    const price = Number(body.price);
    const sqft = Number(body.sqft);

    if (!address || !city || !zip || !description || !image) {
      return NextResponse.json(
        {
          error:
            "Address, city, zip, description, and at least one image are required.",
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { error: "A valid price is required." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(sqft) || sqft <= 0) {
      return NextResponse.json(
        { error: "A valid square footage is required." },
        { status: 400 }
      );
    }

    const status =
      body.status === "Pending" ||
      body.status === "Sold" ||
      body.status === "Commercial" ||
      body.status === "For Sale"
        ? body.status
        : "For Sale";

    const category =
      body.category === "commercial" ? "commercial" : "residential";

    const agentSlug =
      body.agentSlug === "renee-reed" ? "renee-reed" : "anita-boyd";

    const bedsRaw =
      body.beds === undefined || body.beds === null
        ? undefined
        : Number(body.beds);
    const bathsRaw =
      body.baths === undefined || body.baths === null
        ? undefined
        : Number(body.baths);

    const property = await createProperty({
      address,
      city,
      state,
      zip,
      price,
      sqft,
      type,
      description,
      features,
      image,
      gallery: gallery.length ? gallery : [image],
      status,
      category,
      agentSlug,
      featured: Boolean(body.featured),
      beds: bedsRaw !== undefined && Number.isFinite(bedsRaw) ? bedsRaw : undefined,
      baths:
        bathsRaw !== undefined && Number.isFinite(bathsRaw) ? bathsRaw : undefined,
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error("admin properties POST error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to create property.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim() ?? "";

    if (!slug) {
      return NextResponse.json(
        { error: "Property slug is required." },
        { status: 400 }
      );
    }

    const deleted = await deleteProperty(slug);
    if (!deleted) {
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin properties DELETE error:", error);
    return NextResponse.json(
      { error: "Unable to delete property." },
      { status: 500 }
    );
  }
}
