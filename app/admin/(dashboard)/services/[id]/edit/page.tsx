import { ServiceFormPage } from "@/components/features/services/service-form-page";

export default async function AdminEditServiceRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ServiceFormPage serviceId={id} />;
}
