"use client";

import { useState } from "react";
import { RequestResetStep } from "./request-reset-step";
import { ResetPasswordStep } from "./reset-password-step";

/** Forgot password: email first, then the emailed code with a new password. */
export function ForgotPasswordFlow() {
  const [email, setEmail] = useState<string | null>(null);
  return email ? <ResetPasswordStep email={email} onChangeEmail={() => setEmail(null)} /> : <RequestResetStep onSent={setEmail} />;
}
