import { withHandler } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { createContactEnquiry } from "@/lib/services/contact-enquiry.service";
import { createContactEnquirySchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";

export const POST = withHandler(async (request) => {
  const input = await parseJsonBody(request, createContactEnquirySchema);
  const enquiry = await createContactEnquiry(input);

  return successResponse(
    { id: enquiry.id },
    {
      message: "Your enquiry has been submitted successfully",
      status: 201,
    },
  );
});
