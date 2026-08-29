import { AdminRole, PrismaClient, SocialPlatform } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const superAdminEmail =
    process.env.SEED_SUPER_ADMIN_EMAIL ?? "admin@alnawras.com";
  const superAdminPassword =
    process.env.SEED_SUPER_ADMIN_PASSWORD ?? "Admin@123456";

  const passwordHash = await bcrypt.hash(superAdminPassword, 12);

  await prisma.admin.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      name: "Super Admin",
      email: superAdminEmail,
      phoneNumber: "+966500000000",
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      permissions: [],
      isActive: true,
    },
  });

  console.log(`Super admin ready: ${superAdminEmail}`);

  await prisma.websiteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      businessHours: "Sunday – Thursday: 9:00 AM – 5:00 PM",
      contactEmail: "info@alnawras.com",
    },
  });

  console.log("Website settings initialized");

  const socialPlatforms = [
    { platform: SocialPlatform.LINKEDIN, url: "" },
    { platform: SocialPlatform.FACEBOOK, url: "" },
    { platform: SocialPlatform.INSTAGRAM, url: "" },
    { platform: SocialPlatform.X, url: "" },
  ];

  for (const link of socialPlatforms) {
    await prisma.websiteSocialLink.upsert({
      where: { platform: link.platform },
      update: {},
      create: link,
    });
  }

  console.log("Social link placeholders initialized");
  console.log("Seeding complete.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
