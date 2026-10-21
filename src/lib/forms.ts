import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { ZodTypeAny } from "zod";

/**
 * Connects a zod schema from the shared contracts to react-hook-form, so the browser
 * checks exactly what the server will check. (We avoid @hookform/resolvers on purpose.)
 */
export function zodResolver<T extends FieldValues>(schema: ZodTypeAny): Resolver<T> {
  return async (values) => {
    const result = await schema.safeParseAsync(values);
    if (result.success) return { values: result.data as T, errors: {} };
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join(".");
      if (!errors[key]) errors[key] = { type: issue.code, message: issue.message };
    }
    return { values: {}, errors: errors as FieldErrors<T> };
  };
}
