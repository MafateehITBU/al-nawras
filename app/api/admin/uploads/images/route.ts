import { withAuth } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { handleImageUpload } from "@/lib/services/upload.service";

export const POST = withAuth(async (request) => {
  const formData = await request.formData();
  const asset = await handleImageUpload(formData);

  return successResponse(asset, {
    message: "Image uploaded successfully",
    status: 201,
  });
});
