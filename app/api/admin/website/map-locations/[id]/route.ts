import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deleteWebsiteMapLocation,
  getWebsiteMapLocationById,
  updateWebsiteMapLocation,
} from "@/lib/services/website.service";
import { updateWebsiteMapLocationSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    const location = await getWebsiteMapLocationById(id);
    return successResponse(location);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateWebsiteMapLocationSchema);
    const location = await updateWebsiteMapLocation(id, input);

    return successResponse(location, {
      message: "Map location updated successfully",
    });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    await deleteWebsiteMapLocation(id);
    return successResponse({ id }, { message: "Map location deleted successfully" });
  },
);
