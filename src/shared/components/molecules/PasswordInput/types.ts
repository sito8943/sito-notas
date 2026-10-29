import type { TextInputProps } from "../TextInput";

export type PasswordInputProps = Omit<TextInputProps, "type" | "endAdornment">;
