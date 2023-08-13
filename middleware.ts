export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/tripes", "/reservations", "/properties", "/favorites"],
};
