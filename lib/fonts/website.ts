import localFont from "next/font/local";

export const hankenGrotesk = localFont({
  src: "../../public/fonts/HankenGrotesk-Variable.ttf",
  variable: "--font-heading",
  weight: "400 700",
  display: "swap",
  preload: true,
});

export const inter = localFont({
  src: "../../public/fonts/Inter-Variable.ttf",
  variable: "--font-body",
  weight: "400 700",
  display: "swap",
  preload: true,
});

export const websiteFontVariables = `${hankenGrotesk.variable} ${inter.variable}`;
