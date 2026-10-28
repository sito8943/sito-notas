export const FabPosition = {
  TopLeft: "top-left",
  TopRight: "top-right",
  BottomLeft: "bottom-left",
  BottomRight: "bottom-right",
} as const;

export type FabPosition = (typeof FabPosition)[keyof typeof FabPosition];

export const FAB_POSITION_CLASSNAME: Record<FabPosition, string> = {
  [FabPosition.TopLeft]: "top-5 left-5",
  [FabPosition.TopRight]: "top-5 right-5",
  [FabPosition.BottomLeft]: "bottom-5 left-5",
  [FabPosition.BottomRight]: "bottom-5 right-5",
};
