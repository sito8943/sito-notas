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
      <path d="M483 472V517H345L333.5 472H483ZM528 517H483V0H528V517ZM345 149H300V0H345V149ZM483 0V45.0001H345V0H483ZM45 45.0001V0H168L179.5 45.0001H45ZM0 0H45V517H0V0ZM168 368H213V517H168V368ZM45 517V472H168V517H45ZM168 0L213 0L345 517H300L168 0Z" />
    </svg>
  );
}

export default LogoMark;
