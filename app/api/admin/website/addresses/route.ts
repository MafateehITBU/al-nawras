import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  createWebsiteAddress,
  listWebsiteAddresses,
} from "@/lib/services/website.service";
import { createWebsiteAddressSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_WEBSITE_SETTINGS, async () => {
  const addresses = await listWebsiteAddresses();
  return successResponse(addresses);
});

export const POST = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request) => {
    const input = await parseJsonBody(request, createWebsiteAddressSchema);
    const address = await createWebsiteAddress(input);

    return successResponse(address, {
      message: "Address added successfully",
      status: 201,
    });
  },
);
