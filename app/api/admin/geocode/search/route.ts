import { withPermission } from "@/lib/api/handler";
import { errorResponse, successResponse } from "@/lib/api/response";
import { Permission } from "@prisma/client";

const NOMINATIM_USER_AGENT =
  "Al-Nawras-Admin/1.0 (https://alnawras.com; admin-dashboard)";

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

export const GET = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request) => {
    const query = request.nextUrl.searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return errorResponse("VALIDATION_ERROR", "Search query must be at least 2 characters", {
        status: 422,
      });
    }

    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "5");
    url.searchParams.set("addressdetails", "1");

    const response = await fetch(url.toString(), {
      headers: { "User-Agent": NOMINATIM_USER_AGENT },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return errorResponse("GEOCODE_FAILED", "Location search failed", { status: 502 });
    }

    const results = (await response.json()) as NominatimResult[];

    return successResponse(
      results.map((item) => ({
        placeId: item.place_id,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        label: item.display_name,
      })),
    );
  },
);
