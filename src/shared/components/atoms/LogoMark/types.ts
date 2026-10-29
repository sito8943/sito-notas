import type { SVGProps } from "react";

export type LogoMarkProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "fill">;
