import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  createWebsiteMapLocation,
  listWebsiteMapLocations,
} from "@/lib/services/website.service";
import { createWebsiteMapLocationSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_WEBSITE_SETTINGS, async () => {
  const locations = await listWebsiteMapLocations();
  return successResponse(locations);
});

export const POST = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request) => {
    const input = await parseJsonBody(request, createWebsiteMapLocationSchema);
    const location = await createWebsiteMapLocation(input);

    return successResponse(location, {
      message: "Map location added successfully",
      status: 201,
    });
  },
);
