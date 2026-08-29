import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  getWebsiteSocialLinkById,
  updateWebsiteSocialLink,
} from "@/lib/services/website.service";
import { updateWebsiteSocialLinkSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    const link = await getWebsiteSocialLinkById(id);
    return successResponse(link);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateWebsiteSocialLinkSchema);
    const link = await updateWebsiteSocialLink(id, input);

    return successResponse(link, { message: "Social link updated successfully" });
  },
);
