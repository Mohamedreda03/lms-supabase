import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const runtime = "nodejs"; // Explicitly use Node.js runtime

export const GET = handlers.GET;
export const POST = handlers.POST;
