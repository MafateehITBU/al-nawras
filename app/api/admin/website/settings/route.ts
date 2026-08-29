import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { updateWebsiteSettings } from "@/lib/services/website.service";
import { updateWebsiteSettingsSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const PATCH = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request) => {
    const input = await parseJsonBody(request, updateWebsiteSettingsSchema);
    const settings = await updateWebsiteSettings(input);

    return successResponse(settings, {
      message: "Website settings updated successfully",
    });
  },
);
