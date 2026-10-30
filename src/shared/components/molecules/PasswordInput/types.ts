import type { TextInputProps } from "@/shared/components/molecules/TextInput";

export type PasswordInputProps = Omit<TextInputProps, "type" | "endAdornment">;
