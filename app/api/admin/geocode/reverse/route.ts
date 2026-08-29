import { withPermission } from "@/lib/api/handler";
import { errorResponse, successResponse } from "@/lib/api/response";
import { Permission } from "@prisma/client";

const NOMINATIM_USER_AGENT =
  "Al-Nawras-Admin/1.0 (https://alnawras.com; admin-dashboard)";

export const GET = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request) => {
    const lat = request.nextUrl.searchParams.get("lat");
    const lon = request.nextUrl.searchParams.get("lon");

    if (!lat || !lon) {
      return errorResponse("VALIDATION_ERROR", "Latitude and longitude are required", {
        status: 422,
      });
    }

    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("format", "json");

    const response = await fetch(url.toString(), {
      headers: { "User-Agent": NOMINATIM_USER_AGENT },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return errorResponse("GEOCODE_FAILED", "Reverse geocoding failed", { status: 502 });
    }

    const result = (await response.json()) as { display_name?: string };

    return successResponse({
      label: result.display_name ?? null,
    });
  },
);
