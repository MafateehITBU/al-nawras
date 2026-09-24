import { WebsiteNotFoundPage } from "@/components/website/not-found-page";
import { websiteFontVariables } from "@/lib/fonts/website";
import { cn } from "@/lib/utils";

export default function RootNotFound() {
  return (
    <div className={cn("website-root flex min-h-dvh flex-col", websiteFontVariables)}>
      <WebsiteNotFoundPage />
    </div>
  );
}
