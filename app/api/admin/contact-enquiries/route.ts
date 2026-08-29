import { withPermission } from "@/lib/api/handler";
import { paginatedResponse } from "@/lib/api/response";
import { listContactEnquiries } from "@/lib/services/contact-enquiry.service";
import { listContactEnquiriesQuerySchema } from "@/lib/validations/content";
import { parseSearchParams } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_CONTACT_ENQUIRIES,
  async (request) => {
    const query = parseSearchParams(
      request.nextUrl.searchParams,
      listContactEnquiriesQuerySchema,
    );
    const result = await listContactEnquiries(query);
    return paginatedResponse(result.items, result.pagination);
  },
);
