import { withAuth } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { updateOwnProfile } from "@/lib/services/admin.service";
import { updateProfileSchema } from "@/lib/validations/admin";
import { parseJsonBody } from "@/lib/validations/common";

export const GET = withAuth(async (_request, _context, admin) => {
  return successResponse(admin);
});

export const PATCH = withAuth(async (request, _context, admin) => {
  const input = await parseJsonBody(request, updateProfileSchema);
  const updated = await updateOwnProfile(admin, input);

  return successResponse(updated, { message: "Profile updated successfully" });
});
