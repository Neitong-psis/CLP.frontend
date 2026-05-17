import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default function ProfileRedirectPage() {
  redirect(ROUTES.dashboard.settings);
}
