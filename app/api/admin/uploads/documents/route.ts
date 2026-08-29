import { withAuth } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { handleDocumentUpload } from "@/lib/services/upload.service";

export const POST = withAuth(async (request) => {
  const formData = await request.formData();
  const asset = await handleDocumentUpload(formData);

  return successResponse(asset, {
    message: "Document uploaded successfully",
    status: 201,
  });
});
