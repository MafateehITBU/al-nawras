import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deleteWebsiteAddress,
  getWebsiteAddressById,
  updateWebsiteAddress,
} from "@/lib/services/website.service";
import { updateWebsiteAddressSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    const address = await getWebsiteAddressById(id);
    return successResponse(address);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateWebsiteAddressSchema);
    const address = await updateWebsiteAddress(id, input);

    return successResponse(address, { message: "Address updated successfully" });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    await deleteWebsiteAddress(id);
    return successResponse({ id }, { message: "Address deleted successfully" });
  },
);
