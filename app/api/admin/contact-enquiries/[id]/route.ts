import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deleteContactEnquiry,
  getContactEnquiryById,
  updateContactEnquiry,
} from "@/lib/services/contact-enquiry.service";
import { updateContactEnquirySchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_CONTACT_ENQUIRIES,
  async (_request, context) => {
    const { id } = await context.params;
    const enquiry = await getContactEnquiryById(id);
    return successResponse(enquiry);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_CONTACT_ENQUIRIES,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateContactEnquirySchema);
    const enquiry = await updateContactEnquiry(id, input);

    return successResponse(enquiry, {
      message: "Contact enquiry updated successfully",
    });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_CONTACT_ENQUIRIES,
  async (_request, context) => {
    const { id } = await context.params;
    await deleteContactEnquiry(id);
    return successResponse({ id }, {
      message: "Contact enquiry deleted successfully",
    });
  },
);
