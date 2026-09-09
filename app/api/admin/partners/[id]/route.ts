import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deletePartner,
  getPartnerById,
  updatePartner,
} from "@/lib/services/partner.service";
import { updatePartnerSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    const partner = await getPartnerById(id);
    return successResponse(partner);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updatePartnerSchema);
    const partner = await updatePartner(id, input);

    return successResponse(partner, { message: "Partner updated successfully" });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (_request, context) => {
    const { id } = await context.params;
    await deletePartner(id);
    return successResponse({ id }, { message: "Partner deleted successfully" });
  },
);
