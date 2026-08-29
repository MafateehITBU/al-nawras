import { getEnv } from "@/lib/env";
import { AppError } from "@/lib/api/errors";
import { v2 as cloudinary } from "cloudinary";

let configured = false;

export function getCloudinaryClient() {
  const env = getEnv();

  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new AppError(
      "CLOUDINARY_NOT_CONFIGURED",
      "Cloudinary credentials are not configured",
      503,
    );
  }

  if (!configured) {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }

  return cloudinary;
}

export function isCloudinaryConfigured(): boolean {
  const env = getEnv();
  return Boolean(
    env.CLOUDINARY_CLOUD_NAME &&
      env.CLOUDINARY_API_KEY &&
      env.CLOUDINARY_API_SECRET,
  );
}
