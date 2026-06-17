import type { ThemeConfig } from "antd";

/**
 * Ant Design v5 theme for the Tagnong claymorphism system.
 * antd handles core tokens / radii / control heights; the "double" clay
 * shadows are applied via Tailwind `shadow-clay*` classes on top, so we
 * disable antd's own shadows here.
 */
export const clayTheme: ThemeConfig = {
  token: {
    colorPrimary: "#F89D06",
    colorInfo: "#F89D06",
    colorSuccess: "#2EB872",
    colorWarning: "#F5A623",
    colorError: "#E5484D",
    colorBgBase: "#FFF6E9",
    colorBgContainer: "#FFFFFF",
    colorText: "#3A2A14",
    colorTextSecondary: "#8A745A",
    colorTextPlaceholder: "#B6A488",
    colorBorder: "transparent",
    borderRadius: 16,
    borderRadiusLG: 20,
    borderRadiusSM: 12,
    controlHeight: 44,
    controlHeightLG: 52,
    fontFamily: '"Prompt", "Noto Sans Thai", sans-serif',
    fontSize: 15,
    boxShadow: "none",
    boxShadowSecondary: "none",
  },
  components: {
    Button: {
      controlHeight: 48,
      borderRadius: 20,
      fontWeight: 600,
      paddingInline: 24,
      primaryShadow: "none",
      defaultShadow: "none",
    },
    Input: {
      controlHeight: 48,
      borderRadius: 16,
      paddingBlock: 12,
      activeShadow: "none",
      colorBorder: "transparent",
      colorBgContainer: "#FFFFFF",
    },
    Select: { controlHeight: 48, borderRadius: 16 },
    Card: { borderRadiusLG: 28, colorBorderSecondary: "transparent" },
    Modal: { borderRadiusLG: 28 },
    Segmented: { borderRadius: 16, trackBg: "#FEF3E0" },
    Tag: { borderRadiusSM: 999 },
    Message: { borderRadiusLG: 20 },
  },
};
