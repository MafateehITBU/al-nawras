import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { getWebsiteContent } from "@/lib/services/website.service";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_WEBSITE_SETTINGS, async () => {
  const data = await getWebsiteContent();
  return successResponse(data);
});
