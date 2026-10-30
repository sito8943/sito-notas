export const FabPosition = {
  TopLeft: "top-left",
  TopRight: "top-right",
  BottomLeft: "bottom-left",
  BottomRight: "bottom-right",
} as const;

export type FabPosition = (typeof FabPosition)[keyof typeof FabPosition];
