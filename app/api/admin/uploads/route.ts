import { withAuth } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { handleAssetDeletion } from "@/lib/services/upload.service";
import { deleteUploadSchema } from "@/lib/validations/upload";
import { parseJsonBody } from "@/lib/validations/common";

export const DELETE = withAuth(async (request) => {
  const input = await parseJsonBody(request, deleteUploadSchema);
  const result = await handleAssetDeletion(input.publicId, input.resourceType);

  return successResponse(result, { message: "File deleted successfully" });
});
