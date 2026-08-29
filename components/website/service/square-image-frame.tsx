import Image from "next/image";
import { cn } from "@/lib/utils";

export function SquareImageFrame({
  src,
  alt,
  frameColor,
  className,
}: {
  src: string | null;
  alt: string;
  frameColor?: string;
  className?: string;
}) {
  const hasImage = src && src.trim().length > 0;

  return (
    <div className={cn("relative w-full max-w-xl sm:max-w-2xl lg:max-w-none", className)}>
      {frameColor && (
        <div
          className="absolute -bottom-3 -end-3 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)] rounded-2xl"
          style={{ backgroundColor: frameColor }}
          aria-hidden="true"
        />
      )}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-website-bg">
        {hasImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-website-muted">—</div>
        )}
      </div>
    </div>
  );
}
