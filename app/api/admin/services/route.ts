import { withPermission } from "@/lib/api/handler";
import { paginatedResponse, successResponse } from "@/lib/api/response";
import { createService, listServices } from "@/lib/services/service.service";
import {
  createServiceSchema,
  listServicesQuerySchema,
} from "@/lib/validations/content";
import { parseJsonBody, parseSearchParams } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_SERVICES, async (request) => {
  const query = parseSearchParams(
    request.nextUrl.searchParams,
    listServicesQuerySchema,
  );
  const result = await listServices(query);
  return paginatedResponse(result.items, result.pagination);
});

export const POST = withPermission(Permission.MANAGE_SERVICES, async (request) => {
  const input = await parseJsonBody(request, createServiceSchema);
  const service = await createService(input);

  return successResponse(service, {
    message: "Service created successfully",
    status: 201,
  });
});
