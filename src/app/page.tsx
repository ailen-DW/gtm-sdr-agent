import { redirect } from "next/navigation";

/** Home → dashboard */
export default function HomePage() {
  redirect("/dashboard");
}
