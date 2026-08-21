import { Resend } from "resend";

// Single shared client — every route that sends mail (quote form, contact
// form, ...) reuses this instead of instantiating its own.
export const resend = new Resend(process.env.RESEND_API_KEY);
