import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deleteWebsitePhone,
  getWebsitePhoneById,
  updateWebsitePhone,
} from "@/lib/services/website.service";
import { updateWebsitePhoneSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    const phone = await getWebsitePhoneById(id);
    return successResponse(phone);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateWebsitePhoneSchema);
    const phone = await updateWebsitePhone(id, input);

    return successResponse(phone, { message: "Phone number updated successfully" });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    await deleteWebsitePhone(id);
    return successResponse({ id }, { message: "Phone number deleted successfully" });
  },
);
