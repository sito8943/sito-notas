import type { LogoMarkProps } from "./types";

/**
 * Sito Notas "N" mark, inlined from src/assets/logo.svg. Painted with
 * currentColor so it follows the surrounding text color in light and dark.
 */
function LogoMark(props: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 528 517"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M483 472V517H345L333.5 472H483Z" />
      <path d="M528 517H483V0H528V517Z" />
      <path d="M345 149H300V0H345V149Z" />
      <path d="M483 0V45H345V0H483Z" />
      <path d="M45 45V0H168L179.5 45H45Z" />
      <path d="M0 0H45V517H0V0Z" />
      <path d="M168 368H213V517H168V368Z" />
      <path d="M45 517V472H168V517H45Z" />
      <path d="M168 0L213 0L345 517H300L168 0Z" />
    </svg>
  );
}

export default LogoMark;
