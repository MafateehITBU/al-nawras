import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  createWebsitePhone,
  listWebsitePhones,
} from "@/lib/services/website.service";
import { createWebsitePhoneSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_WEBSITE_SETTINGS, async () => {
  const phones = await listWebsitePhones();
  return successResponse(phones);
});

export const POST = withPermission(
  Permission.MANAGE_WEBSITE_SETTINGS,
  async (request) => {
    const input = await parseJsonBody(request, createWebsitePhoneSchema);
    const phone = await createWebsitePhone(input);

    return successResponse(phone, {
      message: "Phone number added successfully",
      status: 201,
    });
  },
);
