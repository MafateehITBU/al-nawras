import { withAuth } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { getDashboardStats } from "@/lib/services/stats.service";

export const GET = withAuth(async (_request, _context, actor) => {
  const stats = await getDashboardStats(actor);
  return successResponse(stats);
});
