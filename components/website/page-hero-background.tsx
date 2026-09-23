import Image from "next/image";

export function PageHeroBackground({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
  );
}
