import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { listWebsiteSocialLinks } from "@/lib/services/website.service";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_WEBSITE_SETTINGS, async () => {
  const links = await listWebsiteSocialLinks();
  return successResponse(links);
});
