/**
 * Dashboard design tokens — single source of truth for brand colors.
 * CSS variables are defined in app/globals.css and mapped in @theme.
 */
export const dashboardTheme = {
  primary: "#27A8E1",
  primaryHover: "#1E96CB",
  secondary: "#FAA628",
  secondaryHover: "#E8941A",
  background: "#F4F6FE",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  textPrimary: "#1A2332",
  textSecondary: "#64748B",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  disabled: "#94A3B8",
} as const;

export type DashboardTheme = typeof dashboardTheme;
