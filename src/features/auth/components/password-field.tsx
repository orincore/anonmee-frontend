"use client";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextField, type TextFieldProps } from "@/components/ui/text-field";

/** Password input with a show/hide button, so typos on a phone keyboard are easy to catch. */
export function PasswordField(props: Omit<TextFieldProps, "type" | "trailing">) {
  const [shown, setShown] = useState(false);
  return (
    <TextField
      {...props}
      type={shown ? "text" : "password"}
      trailing={
        <Button type="button" variant="ghost" size="icon" onClick={() => setShown((s) => !s)} aria-label={shown ? "Hide password" : "Show password"} aria-pressed={shown}>
          {shown ? <EyeSlash aria-hidden className="size-5" /> : <Eye aria-hidden className="size-5" />}
        </Button>
      }
    />
  );
}
