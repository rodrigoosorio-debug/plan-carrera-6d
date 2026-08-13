import { LandingPage } from "@/features/landing";
import { baseUrl } from "@/shared/data/url";

export default function Home() {
  return <LandingPage baseUrl={baseUrl} />;
}
