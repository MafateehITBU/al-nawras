import { withPermission } from "@/lib/api/handler";
import { paginatedResponse, successResponse } from "@/lib/api/response";
import {
  createPartner,
  listPartnersPaginated,
} from "@/lib/services/partner.service";
import {
  createPartnerSchema,
  listPartnersQuerySchema,
} from "@/lib/validations/content";
import { parseJsonBody, parseSearchParams } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request) => {
    const query = parseSearchParams(
      request.nextUrl.searchParams,
      listPartnersQuerySchema,
    );
    const result = await listPartnersPaginated(query);
    return paginatedResponse(result.items, result.pagination);
  },
);

export const POST = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request) => {
    const input = await parseJsonBody(request, createPartnerSchema);
    const partner = await createPartner(input);

    return successResponse(partner, {
      message: "Partner added successfully",
      status: 201,
    });
  },
);
